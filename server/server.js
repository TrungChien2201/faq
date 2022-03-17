import "@babel/polyfill";
import dotenv from "dotenv";
import "isomorphic-fetch";
import createShopifyAuth, { verifyRequest } from "@shopify/koa-shopify-auth";
import Shopify, { ApiVersion, DataType } from "@shopify/shopify-api";
import Koa from "koa";
import next from "next";
import Router from "koa-router";
import Shop from "../models/shop.model";
import Shortcode from "../models/shortcode.model";
import TestimonialForm from "../models/testimonialform.model";
import {
  storeCallback,
  loadCallback,
  deleteCallback,
} from "../utilities/redis-store";
import Testimonial from "../models/testimonial.model";

const _ = require("lodash");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb://127.0.0.1:27017/testimonial", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    if (process.env.NODE_ENV !== "test") {
      console.log("Connected to %s", "mongodb://127.0.0.1:27017/testimonial");
    }
  });

dotenv.config();
const getSubscriptionUrl = require("./getSubscriptionUrl");
const getSubscriptionUrlDev = require("./getSubscriptionUrlDev");
const path = require("path");
const serve = require("koa-static");
const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SCOPES
    ? process.env.SCOPES.split(",")
    : "read_content,write_content,read_script_tags,write_script_tags,read_products,read_themes",
  HOST_NAME: process.env.HOST.replace(/https:\/\//, ""),
  API_VERSION: process.env.SHOPIFY_API_VERSION,
  IS_EMBEDDED_APP: false,
  SESSION_STORAGE: new Shopify.Session.CustomSessionStorage(
    storeCallback,
    loadCallback,
    deleteCallback
  ),
});

// Storing the currently active shops in memory will force them to re-login when your server restarts. You should
// persist this object in your app.
const ACTIVE_SHOPIFY_SHOPS = {};

ACTIVE_SHOPIFY_SHOPS["tien-store-theme.myshopify.com"] = "access_token";

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      accessMode: "offline",
      async afterAuth(ctx) {
        // Access token and shop available in ctx.state.shopify
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;
        ACTIVE_SHOPIFY_SHOPS[shop] = scope;

        await Shop.findOneAndUpdate(
          { shop: shop },
          {
            shop: shop,
            token: accessToken,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const response = await Shopify.Webhooks.Registry.register({
          shop,
          accessToken,
          path: "/webhooks",
          topic: "APP_UNINSTALLED",
          webhookHandler: async (topic, shop, body) => {
            uninstallApp(shop);
          },
        });

        if (!response.success) {
          console.log(
            `Failed to register APP_UNINSTALLED webhook: ${response.result}`
          );
        }

        ctx.cookies.set("shop", shop);

        let jwtToken = jwt.sign(
          { shop: shop },
          process.env.SHOPIFY_API_SECRET,
          { expiresIn: "1h" }
        );

        ctx.cookies.set("x-access-token", jwtToken);

        // Redirect to app with shop parameter upon auth
        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const uninstallApp = async (shop) => {
    await Shop.deleteOne({ shop });
    await Shortcode.deleteMany({ shop });
    await TestimonialForm.deleteMany({ shop });
    await Testimonial.deleteMany({ shop });
    delete ACTIVE_SHOPIFY_SHOPS[shop];
  };

  const hasActiveCharge = async (shop, accessToken) => {
    let client = new Shopify.Clients.Rest(shop, accessToken);

    let response = await client.get({
      path: "recurring_application_charges",
    });

    let charges = response.body.recurring_application_charges;

    let active = _.find(charges, { status: "active" });

    return active;
  };

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  const verifyToken = (token) => {
    try {
      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
      }
      let decoded = jwt.verify(token, process.env.SHOPIFY_API_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  };

  const verifyCookie = async (ctx, next) => {
    let shop = ctx.cookies.get("shop");
    let token = ctx.cookies.get("x-access-token");

    if (!token && !shop) {
      ctx.redirect("/authorize");
      return;
    }

    let decoded = verifyToken(token);

    if (!decoded) {
      if (shop) {
        ctx.redirect(`/auth?shop=${shop}`);
        return;
      }

      ctx.redirect("/authorize");
      return;
    }

    return next();
  };

  const verifyAPI = async (ctx, next) => {
    let shop = ctx.cookies.get("shop");
    let token = ctx.headers["x-access-token"] || ctx.headers["authorization"];
    if (!verifyToken(token)) {
      ctx.redirect(`/authorize?shop=${shop}`);
      ctx.status = 401;
      ctx.body = {
        success: false,
      };
    }

    return next();
  };

  const verifyIfActiveShopifyShop = async (ctx, next) => {
    const { shop } = ctx.query;

    if (!shop) {
      ctx.redirect("/authorize");
      return;
    }

    const shopData = await Shop.findOne({ shop });

    // This shop hasn't been seen yet, go through OAuth to create a session
    if (ACTIVE_SHOPIFY_SHOPS[shop] === undefined || !shopData) {
      ctx.redirect(`/auth?shop=${shop}`);
      return;
    }

    return next();
  };

  const isOnlineStore2 = async (client, themeId) => {
    const APP_BLOCK_TEMPLATES = ["article", "index", "page", "product"];

    const {
      body: { assets },
    } = await client.get({
      path: `themes/${themeId}/assets`,
    });

    const templateJSONFiles = assets.filter((file) => {
      return APP_BLOCK_TEMPLATES.some(
        (template) => file.key === `templates/${template}.json`
      );
    });

    const templateJSONAssetContents = await Promise.all(
      templateJSONFiles.map(async (file) => {
        const {
          body: { asset },
        } = await client.get({
          path: `themes/${themeId}/assets`,
          query: { "asset[key]": file.key },
        });

        return asset;
      })
    );

    const templateMainSections = templateJSONAssetContents
      .map((asset, index) => {
        const json = JSON.parse(asset.value);
        const main = json.sections.main && json.sections.main.type;

        return assets.find((file) => file.key === `sections/${main}.liquid`);
      })
      .filter((value) => value);

    const sectionsWithAppBlock = (
      await Promise.all(
        templateMainSections.map(async (file, index) => {
          let acceptsAppBlock = false;
          const {
            body: { asset },
          } = await client.get({
            path: `themes/${themeId}/assets`,
            query: { "asset[key]": file.key },
          });

          const match = asset.value.match(
            /\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m
          );
          const schema = JSON.parse(match[1]);

          if (schema && schema.blocks) {
            acceptsAppBlock = schema.blocks.some((b) => b.type === "@app");
          }

          return acceptsAppBlock ? file : null;
        })
      )
    ).filter((value) => value);

    const supportsSe = templateJSONFiles.length > 0;

    return supportsSe && sectionsWithAppBlock.length > 0;
  };

  const uninstallCode = async (shop, themeId) => {
    let shopData = await Shop.findOne({ shop });

    let client = new Shopify.Clients.Rest(shopData.shop, shopData.token);
    let responseAssets = await client.get({
      path: `themes/${themeId}/assets`,
    });

    if (
      _.filter(responseAssets.body.assets, {
        key: "snippets/simesy-testimonial-slider-snippet.liquid",
      }).length > 0
    ) {
      await client.delete({
        path: `themes/${themeId}/assets`,
        query: {
          "asset[key]": "snippets/simesy-testimonial-slider-snippet.liquid",
        },
      });
    }
    if (
      _.filter(responseAssets.body.assets, {
        key: "sections/simesy-testimonial-slider.liquid",
      }).length > 0
    ) {
      await client.delete({
        path: `themes/${themeId}/assets`,
        query: { "asset[key]": "sections/simesy-testimonial-slider.liquid" },
      });
    }

    let themeFileResposne = await client.get({
      path: `themes/${themeId}/assets`,
      query: {
        "asset[key]": "layout/theme.liquid",
      },
    });

    let themeFileValue = themeFileResposne.body.asset.value;
    if (
      themeFileValue.includes(
        "{% include 'simesy-testimonial-slider-snippet' %}"
      )
    ) {
      themeFileValue = themeFileValue.replace(
        "{% include 'simesy-testimonial-slider-snippet' %}\n</body>",
        "</body>"
      );
      await client.put({
        path: `themes/${themeId}/assets`,
        data: {
          asset: {
            key: "layout/theme.liquid",
            value: themeFileValue,
          },
        },
        type: "application/json",
      });
    }
  };

  const installCode = async (shop, themeId) => {
    let shopData = await Shop.findOne({ shop });

    let client = new Shopify.Clients.Rest(shopData.shop, shopData.token);

    let responseAssets = await client.get({
      path: `themes/${themeId}/assets`,
    });

    if (
      _.filter(responseAssets.body.assets, {
        key: "snippets/simesy-testimonial-slider-snippet.liquid",
      }).length == 0
    ) {
      await client.put({
        path: `themes/${themeId}/assets`,
        data: {
          asset: {
            key: "snippets/simesy-testimonial-slider-snippet.liquid",
            value: fs
              .readFileSync(
                `${path.join(
                  process.cwd(),
                  "public_assets"
                )}/simesy-testimonial-slider-snippet.liquid`
              )
              .toString(),
          },
        },
        type: "application/json",
      });
    }
    const isStore2 = await isOnlineStore2(client, themeId);

    if (!isStore2) {
      if (
        _.filter(responseAssets.body.assets, {
          key: "sections/simesy-testimonial-slider.liquid",
        }).length == 0
      ) {
        await client.put({
          path: `themes/${themeId}/assets`,
          data: {
            asset: {
              key: "sections/simesy-testimonial-slider.liquid",
              value: fs
                .readFileSync(
                  `${path.join(
                    process.cwd(),
                    "public_assets"
                  )}/simesy-testimonial-slider.liquid`
                )
                .toString(),
            },
          },
          type: "application/json",
        });
      }
    }

    let themeFileResposne = await client.get({
      path: `themes/${themeId}/assets`,
      query: {
        "asset[key]": "layout/theme.liquid",
      },
    });

    let themeFileValue = themeFileResposne.body.asset.value;
    if (
      !themeFileValue.includes(
        "{% include 'simesy-testimonial-slider-snippet' %}"
      )
    ) {
      if (themeFileValue.includes("</body>")) {
        themeFileValue = themeFileValue.replace(
          "</body>",
          "{% include 'simesy-testimonial-slider-snippet' %}\n</body>"
        );
      }
      await client.put({
        path: `themes/${themeId}/assets`,
        data: {
          asset: {
            key: "layout/theme.liquid",
            value: themeFileValue,
          },
        },
        type: "application/json",
      });
    }
  };

  const filterTestimonial = async ({
    ctx,
    filterData,
    orderBy,
    orderType,
    randomOrder,
    testimonials,
    shortCode,
    testimonialArrayId,
  }) => {
    if (filterData === "latest") {
      if (randomOrder) {
        const newTestimonial = await Testimonial.find({
          "config.status": "published",
        });
        testimonials = _.shuffle(newTestimonial);
      } else {
        switch (orderBy) {
          case "ID":
            testimonials = await Testimonial.find({
              "config.status": "published",
            }).sort({
              _id: orderType === "DESC" ? -1 : 1,
            });
            break;
          case "date":
            testimonials = await Testimonial.find({
              "config.status": "published",
            }).sort({
              createdAt: orderType === "DESC" ? -1 : 1,
            });
            break;
          case "title":
            testimonials = await Testimonial.find({
              "config.status": "published",
            }).sort({
              "config.title": orderType === "DESC" ? -1 : 1,
            });
            break;
          case "modified":
            testimonials = await Testimonial.find({
              "config.status": "published",
            }).sort({
              updatedAt: orderType === "DESC" ? -1 : 1,
            });
            break;
          case "menu_order":
            const results = await Testimonial.find({
              "config.status": "published",
            }).sort({
              createdAt: -1,
            });

            const indexObject = _.reduce(
              results,
              function (result, currentObject) {
                result[currentObject._id] = currentObject;
                return result;
              },
              {}
            );
            let resultFilter =
              orderType === "DESC"
                ? _.map(
                    testimonialArrayId?.testimonial_order,
                    function (currentGUID) {
                      return indexObject[currentGUID];
                    }
                  ).reverse()
                : _.map(
                    testimonialArrayId?.testimonial_order,
                    function (currentGUID) {
                      return indexObject[currentGUID];
                    }
                  );
            testimonials = resultFilter?.filter(
              (item) => item !== null && item !== undefined && item
            );
            break;
          default:
            break;
        }
      }
    } else if (filterData === "specific_testimonials") {
      let specific = shortCode.specific_testimonial;
      testimonials = await Testimonial.find({
        _id: { $in: specific },
        "config.status": "published",
      }).sort({
        createdAt: -1,
      });
    } else {
      let exclude = shortCode.exclude_testimonial;

      if (randomOrder) {
        const newTestimonial = await Testimonial.find({
          _id: { $nin: exclude },
          "config.status": "published",
        });
        testimonials = _.shuffle(newTestimonial);
      } else {
        switch (orderBy) {
          case "ID":
            testimonials = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            }).sort({
              _id: orderType === "DESC" ? -1 : 1,
            });

            break;
          case "date":
            testimonials = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            }).sort({
              "config.date": orderType === "DESC" ? -1 : 1,
            });

            break;
          case "title":
            testimonials = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            }).sort({
              "config.title": orderType === "DESC" ? -1 : 1,
            });
            break;
          case "modified":
            testimonials = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            }).sort({
              updatedAt: orderType === "DESC" ? -1 : 1,
            });
            break;
          case "menu_order":
            const results = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            }).sort({
              createdAt: -1,
            });

            const indexObject = _.reduce(
              results,
              function (result, currentObject) {
                result[currentObject._id] = currentObject;
                return result;
              },
              {}
            );
            let result =
              orderType === "DESC"
                ? _.map(
                    testimonialArrayId?.testimonial_order,
                    function (currentGUID) {
                      return indexObject[currentGUID];
                    }
                  ).reverse()
                : _.map(
                    testimonialArrayId?.testimonial_order,
                    function (currentGUID) {
                      return indexObject[currentGUID];
                    }
                  );
            testimonials = result?.filter(
              (item) => item !== null && item !== undefined && item
            );
            break;
          default:
            break;
        }
      }
    }

    let shortCodeData = {};

    if (
      shortCode?.layout[0] &&
      ["grid", "masonry", "list"].includes(shortCode?.layout[0]) &&
      shortCode.grid_pagination
    ) {
      let numberPerPage = Number(shortCode.tp_per_page);
      let totalTestimonialPages = Math.ceil(
        testimonials.length / numberPerPage
      );
      testimonials = _.take(testimonials, numberPerPage);
      shortCodeData = {
        testimonials: testimonials,
        totalTestimonialPages,
      };
    } else {
      shortCodeData = {
        testimonials: testimonials,
      };
    }
    ctx.status = 200;
    ctx.body = {
      success: true,
      data: {
        shortCode: shortCodeData,
      },
    };
  };

  router.get("/authorize", async (ctx) => {
    let { shop } = ctx.query;
    if (shop) {
      ctx.redirect(`/auth?shop=${shop}`);
      return;
    }
    await handleRequest(ctx);
    return;
  });

  router.get("/", verifyCookie, async (ctx) => {
    let shop = ctx.cookies.get("shop");

    let shopData = await Shop.findOne({ shop });

    if (!shopData) {
      ctx.redirect(`/auth?shop=${shop}`);
      return;
    }

    if (!shopData.installed) {
      let client = new Shopify.Clients.Rest(shopData.shop, shopData.token);

      let responseThemes = await client.get({
        path: "themes",
      });

      let filter = _.filter(responseThemes.body.themes, { role: "main" });

      if (!filter) {
        return;
      }

      let active = filter[0];

      let themeId = active.id;
      await installCode(shop, themeId);
      await Shop.updateOne({ shop }, { installed: true });
    }

    if (!shopData.plan || shopData.plan === "FREE") {
      await handleRequest(ctx);
      return;
    }

    let active = hasActiveCharge(shopData.shop, shopData.token);

    if (active) {
      await handleRequest(ctx);
      return;
    }

    await Shop.updateOne({ shop: shop }, { plan: "FREE", charge_id: "" });

    let pending = _.find(charges, { status: "pending" });

    if (pending && pending.hasOwnProperty("return_url")) {
      ctx.redirect(pending.return_url);
      return;
    }

    let restClient = new Shopify.Clients.Rest(shopData.shop, shopData.token);

    let shopResponse = await restClient.get({
      path: "shop",
    });

    let plan_name = shopResponse.body.shop.plan_name;

    let subscriptionUrl;

    if (plan_name === "affiliate" || plan_name === "partner_test") {
      subscriptionUrl = await getSubscriptionUrlDev(
        shopData.token,
        shopData.shop,
        `https://${Shopify.Context.HOST_NAME}/change_plan?shop=${shopData.shop}`
      );
    } else {
      subscriptionUrl = await getSubscriptionUrl(
        shopData.token,
        shopData.shop,
        `https://${Shopify.Context.HOST_NAME}/change_plan?shop=${shopData.shop}`
      );
    }

    ctx.redirect(subscriptionUrl);

    return;
  });

  router.post(
    "/api/get-theme-installed",
    bodyParser(),
    verifyAPI,
    async (ctx) => {
      let { shop } = ctx.request.body;
      let shopData = await Shop.findOne({ shop });
      let client = new Shopify.Clients.Rest(shopData.shop, shopData.token);

      try {
        let response = await client.get({
          path: "themes",
        });
        if (response) {
          ctx.status = 200;
          ctx.body = {
            themes: response?.body?.themes,
            success: true,
          };
        }
      } catch (e) {
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.get("/change_plan", bodyParser(), verifyAPI, async (ctx) => {
    let { charge_id, shop } = ctx.query;
    let shopData = await Shop.findOne({ shop });
    let client = new Shopify.Clients.Rest(shopData.shop, shopData.token);

    try {
      let response = await client.get({
        path: `recurring_application_charges/${charge_id}`,
        type: "application/json",
      });
      let charge = response.body.recurring_application_charge;
      if (
        charge.hasOwnProperty("status") &&
        charge.status === "active" &&
        charge.hasOwnProperty("name") &&
        charge.name === "PREMIUM"
      ) {
        await Shop.updateOne(
          { shop: shop },
          { plan: "PREMIUM", charge_id: charge_id }
        );
      }
      ctx.redirect(`/auth?shop=${shop}`);
    } catch (e) {
      ctx.redirect(`/auth?shop=${shop}`);
    }
  });

  router.post("/api/change_plan", bodyParser(), verifyAPI, async (ctx) => {
    let { shop, plan } = ctx.request.body;

    try {
      let shopData = await Shop.findOne({ shop });
      let returnUrl = `https://${Shopify.Context.HOST_NAME}/change_plan?shop=${shopData.shop}`;

      if (plan === "FREE") {
        let shopData = await Shop.findOne({ shop });
        let cancel = await cancelSubscription(
          shopData.token,
          shopData.shop,
          shopData.charge_id
        );

        if (cancel) {
          await Shop.updateOne({ shop: shop }, { plan: "FREE", charge_id: "" });
          ctx.status = 200;
          ctx.body = {
            success: true,
          };
        } else {
          ctx.status = 400;
          ctx.body = {
            success: false,
          };
        }
      }

      let active = await hasActiveCharge(shopData.shop, shopData.token);

      if (active) {
        ctx.status = 200;
        ctx.body = {
          success: false,
        };
      }

      let restClient = new Shopify.Clients.Rest(shopData.shop, shopData.token);

      let shopResponse = await restClient.get({
        path: "shop",
      });

      let plan_name = shopResponse.body.shop.plan_name;

      let subscriptionUrl;

      if (plan_name === "affiliate" || plan_name === "partner_test") {
        subscriptionUrl = await getSubscriptionUrlDev(
          shopData.token,
          shopData.shop,
          returnUrl
        );
      } else {
        subscriptionUrl = await getSubscriptionUrl(
          shopData.token,
          shopData.shop,
          returnUrl
        );
      }

      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          subscriptionUrl,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/webhooks", async (ctx) => {
    try {
      await Shopify.Webhooks.Registry.process(ctx.req, ctx.res);
      console.log(`Webhook processed, returned status code 200`);
    } catch (error) {
      console.log(`Failed to process webhook: ${error}`);
    }
  });

  router.post("/webhooks/customers/redact", async (ctx) => {
    ctx.status = 200;
  });

  router.post("/webhooks/shop/redact", async (ctx) => {
    ctx.status = 200;
  });

  router.post("/webhooks/customers/data_request", async (ctx) => {
    ctx.status = 200;
  });

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.post(
    "/api/save_form_data",
    bodyParser(),
    verifyAPI,
    cors(),
    async (ctx) => {
      let { shop, config } = ctx.request.body;

      try {
        let testimonial = new Testimonial({ shop, config });
        let shopData = await Shop.findOne({ shop });
        const testimonial_order = JSON.stringify(shopData?.testimonial_order);
        let newOrder;
        await testimonial.save();
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonial,
          },
        };

        if (Array.isArray(JSON.parse(testimonial_order))) {
          newOrder = JSON.parse(testimonial_order);
          newOrder?.unshift(testimonial?._id);
        }
        await Shop.updateOne({ shop: shop }, { testimonial_order: newOrder });
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post(
    "/api/get_shortcode",
    verifyAPI,
    cors(),
    bodyParser(),
    async (ctx) => {
      let { id, shop } = ctx.request.body;

      try {
        let shortCode = await Shortcode.findById(id);
        await Shortcode.findByIdAndUpdate(
          id,
          { $set: { view: Number(shortCode?.view + 1) } },
          { new: true }
        );
        let testimonialArrayId = await Shop.findOne({ shop });
        let testimonialList = await Testimonial.find({
          "config.status": "published",
        });
        let testimonials;
        if (!shortCode || !testimonialList) {
          ctx.status = 400;
          ctx.body = {
            success: false,
          };
          return;
        }
        let filterData = shortCode.config.display_testimonials_from;
        let orderBy = shortCode.config.testimonial_order_by;
        let orderType = shortCode.config.testimonial_order;
        let randomOrder = shortCode.config.random_order;

        await filterTestimonial({
          filterData,
          orderBy,
          orderType,
          randomOrder,
          testimonials,
          shortCode: shortCode.config,
          testimonialArrayId,
          ctx,
        });
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post(
    "/api/get_testimonial_widget",
    verifyAPI,
    cors(),
    bodyParser(),
    async (ctx) => {
      let { shortCode, shop } = ctx.request.body;

      try {
        let testimonialArrayId = await Shop.findOne({ shop });
        let testimonialList = await Testimonial.find({
          "config.status": "published",
        });
        let testimonials;
        if (!shortCode || !testimonialList) {
          ctx.status = 400;
          ctx.body = {
            success: false,
          };
          return;
        }
        let filterData = shortCode.display_testimonials_from;
        let orderBy = shortCode.testimonial_order_by;
        let orderType = shortCode.testimonial_order;
        let randomOrder = shortCode.random_order;
        await filterTestimonial({
          filterData,
          orderBy,
          orderType,
          randomOrder,
          testimonials,
          shortCode,
          testimonialArrayId,
          ctx,
        });
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post(
    "/api/get_more_testimonial",
    cors(),
    bodyParser(),
    verifyAPI,
    async (ctx) => {
      let { id, shop, page } = ctx.request.body;

      try {
        let shortCode = await Shortcode.findById(id);
        let testimonialArrayId = await Shop.findOne({ shop });
        let testimonialList = await Testimonial.find({
          "config.status": "published",
        });
        let testimonials;
        if (!shortCode || !testimonialList) {
          ctx.status = 400;
          ctx.body = {
            success: false,
          };
          return;
        }
        let filterData = shortCode.config.display_testimonials_from;
        let orderBy = shortCode.config.testimonial_order_by;
        let orderType = shortCode.config.testimonial_order;
        let randomOrder = shortCode.config.random_order;
        let numberPerPage = shortCode.config.tp_per_page;

        if (filterData === "latest") {
          if (randomOrder) {
            const newTestimonial = await Testimonial.find({
              "config.status": "published",
            });
            testimonials = _.shuffle(newTestimonial);
          } else {
            switch (orderBy) {
              case "ID":
                testimonials = await Testimonial.find({
                  "config.status": "published",
                }).sort({
                  _id: orderType === "DESC" ? -1 : 1,
                });
                break;
              case "date":
                testimonials = await Testimonial.find({
                  "config.status": "published",
                }).sort({
                  createdAt: orderType === "DESC" ? -1 : 1,
                });
                break;
              case "title":
                testimonials = await Testimonial.find({
                  "config.status": "published",
                }).sort({
                  "config.title": orderType === "DESC" ? -1 : 1,
                });
                break;
              case "modified":
                testimonials = await Testimonial.find({
                  "config.status": "published",
                }).sort({
                  updatedAt: orderType === "DESC" ? -1 : 1,
                });
                break;
              case "menu_order":
                const results = await Testimonial.find({
                  "config.status": "published",
                }).sort({
                  createdAt: -1,
                });

                const indexObject = _.reduce(
                  results,
                  function (result, currentObject) {
                    result[currentObject._id] = currentObject;
                    return result;
                  },
                  {}
                );
                let resultFilter =
                  orderType === "DESC"
                    ? _.map(
                        testimonialArrayId?.testimonial_order,
                        function (currentGUID) {
                          return indexObject[currentGUID];
                        }
                      ).reverse()
                    : _.map(
                        testimonialArrayId?.testimonial_order,
                        function (currentGUID) {
                          return indexObject[currentGUID];
                        }
                      );
                testimonials = resultFilter?.filter(
                  (item) => item !== null && item !== undefined && item
                );
                break;
              default:
                break;
            }
          }
        } else if (filterData === "specific_testimonials") {
          let specific = shortCode.config.specific_testimonial;
          testimonials = await Testimonial.find({
            _id: { $in: specific },
            "config.status": "published",
          }).sort({
            createdAt: -1,
          });
        } else {
          let exclude = shortCode.config.exclude_testimonial;

          if (randomOrder) {
            const newTestimonial = await Testimonial.find({
              _id: { $nin: exclude },
              "config.status": "published",
            });
            testimonials = _.shuffle(newTestimonial);
          } else {
            switch (orderBy) {
              case "ID":
                testimonials = await Testimonial.find({
                  _id: { $nin: exclude },
                  "config.status": "published",
                }).sort({
                  _id: orderType === "DESC" ? -1 : 1,
                });

                break;
              case "date":
                testimonials = await Testimonial.find({
                  _id: { $nin: exclude },
                  "config.status": "published",
                }).sort({
                  createdAt: orderType === "DESC" ? -1 : 1,
                });

                break;
              case "title":
                testimonials = await Testimonial.find({
                  _id: { $nin: exclude },
                  "config.status": "published",
                }).sort({
                  "config.title": orderType === "DESC" ? -1 : 1,
                });
                break;
              case "modified":
                testimonials = await Testimonial.find({
                  _id: { $nin: exclude },
                  "config.status": "published",
                }).sort({
                  updatedAt: orderType === "DESC" ? -1 : 1,
                });
                break;
              case "menu_order":
                const results = await Testimonial.find({
                  _id: { $nin: exclude },
                  "config.status": "published",
                }).sort({
                  createdAt: -1,
                });

                const indexObject = _.reduce(
                  results,
                  function (result, currentObject) {
                    result[currentObject._id] = currentObject;
                    return result;
                  },
                  {}
                );
                let result =
                  orderType === "DESC"
                    ? _.map(
                        testimonialArrayId?.testimonial_order,
                        function (currentGUID) {
                          return indexObject[currentGUID];
                        }
                      ).reverse()
                    : _.map(
                        testimonialArrayId?.testimonial_order,
                        function (currentGUID) {
                          return indexObject[currentGUID];
                        }
                      );
                testimonials = result?.filter(
                  (item) => item !== null && item !== undefined && item
                );
                break;
              default:
                break;
            }
          }
        }

        let totalTestimonialPages = Math.ceil(
          testimonials.length / numberPerPage
        );

        testimonials = _.take(
          _.drop(testimonials, (page - 1) * numberPerPage),
          numberPerPage
        );

        let shortCodeData = {
          config: shortCode.config,
          shop: shortCode.shop,
          testimonials: testimonials,
          totalTestimonialPages,
        };
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            shortCode: shortCodeData,
          },
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post("/api/get_form", verifyAPI, cors(), bodyParser(), async (ctx) => {
    let { id, shop } = ctx.request.body;

    try {
      let testimonialForm = await TestimonialForm.findById(id);

      if (!testimonialForm) {
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
        return;
      }

      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          testimonialForm,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post(
    "/api/get_pages",
    verifyAPI,
    bodyParser(),
    // verifyRequest({ accessMode: "offline" }),
    async (ctx) => {
      let { shop } = ctx.request.body;

      try {
        let shopData = await Shop.findOne({ shop });
        let client = new Shopify.Clients.Rest(shop, shopData.token);
        let response = await client.get({
          path: "pages",
        });
        let pages = response.body.pages;
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            pages,
          },
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post(
    "/api/update_page",
    verifyAPI,
    bodyParser(),
    // verifyRequest({ accessMode: "offline" }),
    async (ctx) => {
      let { shop, page_id, body_html } = ctx.request.body;

      try {
        let shopData = await Shop.findOne({ shop });
        let client = new Shopify.Clients.Rest(shop, shopData.token);
        let response = await client.put({
          path: `pages/${page_id}`,
          data: {
            page: {
              id: page_id,
              body_html: body_html,
            },
          },
          type: DataType.JSON,
        });
        const page = response.body.page;
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            page,
          },
        };
      } catch (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  // if (process.env.NODE_ENV === "development") {
  router.post("/api/get_shop_plan", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;

    try {
      let shopData = await Shop.findOne({ shop });
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          shop: {
            url: shopData.shop,
            plan: shopData.plan, // FREE | PREMIUM,
          },
        },
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/testimonials", bodyParser(), verifyAPI, async (ctx) => {
    let { shop } = ctx.request.body;

    try {
      let testimonials = await Testimonial.find({ shop }).sort({
        createdAt: -1,
      });
      if (!testimonials) {
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
      const arrayIdSort = await Shop.findOne({ shop });

      if (
        arrayIdSort?.testimonial_order?.length > 0 &&
        testimonials?.length > 0
      ) {
        const indexObject = _.reduce(
          testimonials,
          function (result, currentObject) {
            result[currentObject._id] = currentObject;
            return result;
          },
          {}
        );
        const sortedCollection = _.map(
          arrayIdSort.testimonial_order,
          function (currentGUID) {
            return indexObject[currentGUID];
          }
        );
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonials: sortedCollection,
          },
        };
      } else {
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonials,
          },
        };
      }
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
        error: error,
      };
    }
  });

  router.post("/api/testimonials/new", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, config } = ctx.request.body;

    try {
      let testimonial = new Testimonial({ shop, config });
      await testimonial.save();
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          testimonial,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.put("/api/sort-testimonials", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, config } = ctx.request.body;
    try {
      let shopData = await Shop.findOne({ shop });
      await Shop.updateOne({ shop: shop }, { testimonial_order: config });
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: config,
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/testimonials/:id", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;
    let { id } = ctx.params;

    try {
      let testimonial = await Testimonial.findById(id);
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          testimonial,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.put("/api/testimonials/:id", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, config } = ctx.request.body;
    let { id } = ctx.params;

    try {
      let testimonial = await Testimonial.findByIdAndUpdate(
        id,
        { $set: { config: config } },
        { new: true }
      );
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          testimonial,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.delete(
    "/api/testimonials/:id",
    verifyAPI,
    bodyParser(),
    async (ctx) => {
      let { shop } = ctx.request.body;
      let { id } = ctx.params;

      try {
        await Testimonial.deleteOne({ _id: id });
        ctx.status = 200;
        ctx.body = {
          success: true,
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post("/api/shortcodes", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;

    try {
      let shortCodes = await Shortcode.find({ shop }).sort({ createdAt: -1 });
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          shortCodes,
        },
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/shortcodes/view", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;

    try {
      let totalWidget = await Shortcode.aggregate([
        { $group: { _id: null, view: { $sum: "$view" } } },
      ]);
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          totalWidget,
        },
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/shortcodes/new", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, config } = ctx.request.body;

    try {
      let shortCodes = new Shortcode({
        shop,
        config: {
          ...config,
        },
      });
      await shortCodes.save();
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          shortCodes,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/shortcodes/:id", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;
    let { id } = ctx.params;

    try {
      let shortCodes = await Shortcode.findById(id);
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          shortCodes,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.put("/api/shortcodes/:id", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, config } = ctx.request.body;
    let { id } = ctx.params;

    try {
      let shortCodes = await Shortcode.findByIdAndUpdate(
        id,
        { $set: { config: config } },
        { new: true }
      );
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          shortCodes,
        },
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.delete("/api/shortcodes/:id", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;
    let { id } = ctx.params;

    try {
      await Shortcode.deleteOne({ _id: id });
      ctx.status = 200;
      ctx.body = {
        success: true,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  // testimonial form

  router.post("/api/testimonial-form", verifyAPI, bodyParser(), async (ctx) => {
    let { shop } = ctx.request.body;

    try {
      let testimonialForm = await TestimonialForm.find({ shop }).sort({
        createdAt: -1,
      });
      ctx.status = 200;
      ctx.body = {
        success: true,
        data: {
          testimonialForm,
        },
      };
    } catch (error) {
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post(
    "/api/testimonial-form/new",
    verifyAPI,
    bodyParser(),
    async (ctx) => {
      let { shop, config } = ctx.request.body;

      try {
        let testimonialForm = new TestimonialForm({ shop, config });
        await testimonialForm.save();
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonialForm,
          },
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.post("/api/install_code", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, themeId } = ctx.request.body;

    try {
      await installCode(shop, themeId);
      ctx.status = 200;
      ctx.body = {
        success: true,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post("/api/uninstall_code", verifyAPI, bodyParser(), async (ctx) => {
    let { shop, themeId } = ctx.request.body;

    try {
      await uninstallCode(shop, themeId);
      ctx.status = 200;
      ctx.body = {
        success: true,
      };
    } catch (error) {
      console.log(error);
      ctx.status = 400;
      ctx.body = {
        success: false,
      };
    }
  });

  router.post(
    "/api/testimonial-form/:id",
    verifyAPI,
    bodyParser(),
    async (ctx) => {
      let { shop } = ctx.request.body;
      let { id } = ctx.params;

      try {
        let testimonialForm = await TestimonialForm.findById(id);
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonialForm,
          },
        };
      } catch (error) {
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.put(
    "/api/testimonial-form/:id",
    verifyAPI,
    bodyParser(),
    async (ctx) => {
      let { config } = ctx.request.body;
      let { id } = ctx.params;

      try {
        let testimonialForm = await TestimonialForm.findByIdAndUpdate(
          id,
          { $set: { config: config } },
          { new: true }
        );
        ctx.status = 200;
        ctx.body = {
          success: true,
          data: {
            testimonialForm,
          },
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );

  router.delete(
    "/api/testimonial-form/:id",
    verifyAPI,
    bodyParser(),
    async (ctx) => {
      let { id } = ctx.params;

      try {
        await TestimonialForm.deleteOne({ _id: id });
        ctx.status = 200;
        ctx.body = {
          success: true,
        };
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );
  // } else {
  // router.post("/api/get_shop_plan", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;

  //   try {
  //     let shopData = await Shop.findOne({ shop });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         shop: {
  //           url: shopData.shop,
  //           plan: shopData.plan, // FREE | PREMIUM,
  //         },
  //       },
  //     };
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/testimonials", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;

  //   try {
  //     let testimonials = await Testimonial.find({ shop }).sort({
  //       createdAt: -1,
  //     });
  //     if (!testimonials) {
  //       ctx.status = 400;
  //       ctx.body = {
  //         success: false,
  //       };
  //     }
  //     const arrayIdSort = await Shop.findOne({ shop });

  //     if (
  //       arrayIdSort?.testimonial_order?.length > 0 &&
  //       testimonials?.length > 0
  //     ) {
  //       const indexObject = _.reduce(
  //         testimonials,
  //         function (result, currentObject) {
  //           result[currentObject._id] = currentObject;
  //           return result;
  //         },
  //         {}
  //       );
  //       const sortedCollection = _.map(
  //         arrayIdSort.testimonial_order,
  //         function (currentGUID) {
  //           return indexObject[currentGUID];
  //         }
  //       );
  //       ctx.status = 200;
  //       ctx.body = {
  //         success: true,
  //         data: {
  //           testimonials: sortedCollection,
  //         },
  //       };
  //     } else {
  //       ctx.status = 200;
  //       ctx.body = {
  //         success: true,
  //         data: {
  //           testimonials,
  //         },
  //       };
  //     }
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //       error: error,
  //     };
  //   }
  // });

  // router.post("/api/testimonials/new", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;

  //   try {
  //     let testimonial = new Testimonial({ shop, config });
  //     await testimonial.save();
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonial,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.put("/api/sort-testimonials", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;
  //   try {
  //     let shopData = await Shop.findOne({ shop });
  //     await Shop.updateOne({ shop: shop }, { testimonial_order: config });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: config,
  //     };
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/testimonials/:id", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let testimonial = await Testimonial.findById(id);
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonial,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.put("/api/testimonials/:id", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let testimonial = await Testimonial.findByIdAndUpdate(
  //       id,
  //       { $set: { config: config } },
  //       { new: true }
  //     );
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonial,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.delete("/api/testimonials/:id", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     await Testimonial.deleteOne({ _id: id });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/shortcodes", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;

  //   try {
  //     let shortCodes = await Shortcode.find({ shop }).sort({ createdAt: -1 });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         shortCodes,
  //       },
  //     };
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/shortcodes/new", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;

  //   try {
  //     let shortCodes = new Shortcode({
  //       shop,
  //       config: {
  //         ...config
  //       },
  //     });
  //     await shortCodes.save();
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         shortCodes,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/shortcodes/:id", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let shortCodes = await Shortcode.findById(id);
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         shortCodes,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.put("/api/shortcodes/:id", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let shortCodes = await Shortcode.findByIdAndUpdate(
  //       id,
  //       { $set: { config: config } },
  //       { new: true }
  //     );
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         shortCodes,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.delete("/api/shortcodes/:id", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     await Shortcode.deleteOne({ _id: id });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // // testimonial form

  // router.post("/api/testimonial-form", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;

  //   try {
  //     let testimonialForm = await TestimonialForm.find({ shop }).sort({
  //       createdAt: -1,
  //     });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonialForm,
  //       },
  //     };
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/testimonial-form/new", bodyParser(), async (ctx) => {
  //   let { shop, config } = ctx.request.body;

  //   try {
  //     let testimonialForm = new TestimonialForm({ shop, config });
  //     await testimonialForm.save();
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonialForm,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.post("/api/testimonial-form/:id", bodyParser(), async (ctx) => {
  //   let { shop } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let testimonialForm = await TestimonialForm.findById(id);
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonialForm,
  //       },
  //     };
  //   } catch (error) {
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.put("/api/testimonial-form/:id", bodyParser(), async (ctx) => {
  //   let { config } = ctx.request.body;
  //   let { id } = ctx.params;

  //   try {
  //     let testimonialForm = await TestimonialForm.findByIdAndUpdate(
  //       id,
  //       { $set: { config: config } },
  //       { new: true }
  //     );
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //       data: {
  //         testimonialForm,
  //       },
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });

  // router.delete("/api/testimonial-form/:id", bodyParser(), async (ctx) => {
  //   let { id } = ctx.params;

  //   try {
  //     await TestimonialForm.deleteOne({ _id: id });
  //     ctx.status = 200;
  //     ctx.body = {
  //       success: true,
  //     };
  //   } catch (error) {
  //     console.log(error);
  //     ctx.status = 400;
  //     ctx.body = {
  //       success: false,
  //     };
  //   }
  // });
  // }

  router.post(
    "/api/check_theme",
    verifyAPI,
    bodyParser(),
    // verifyRequest({ accessMode: "offline"}),
    async (ctx) => {
      try {
        const { shop } = ctx.request.body;
        const shopData = await Shop.findOne({ shop });
        const clients = {
          rest: new Shopify.Clients.Rest(shopData.shop, shopData.token),
        };

        // Check if App Blocks are supported
        // -----------------------------------

        // Specify the name of the template we want our app to integrate with
        const APP_BLOCK_TEMPLATES = ["article", "index", "page", "product"];

        // Use `client.get` to request list of themes on store
        const {
          body: { themes },
        } = await clients.rest.get({
          path: "themes",
        });

        // Find the published theme
        const publishedTheme = themes.find((theme) => theme.role === "main");

        // Get list of assets contained within the published theme
        const {
          body: { assets },
        } = await clients.rest.get({
          path: `themes/${publishedTheme.id}/assets`,
        });

        // Check if template JSON files exist for the template specified in APP_BLOCK_TEMPLATES
        const templateJSONFiles = assets.filter((file) => {
          return APP_BLOCK_TEMPLATES.some(
            (template) => file.key === `templates/${template}.json`
          );
        });

        // Get bodies of template JSONs
        const templateJSONAssetContents = await Promise.all(
          templateJSONFiles.map(async (file) => {
            const {
              body: { asset },
            } = await clients.rest.get({
              path: `themes/${publishedTheme.id}/assets`,
              query: { "asset[key]": file.key },
            });

            return asset;
          })
        );

        // Find what section is set as 'main' for each template JSON's body
        const templateMainSections = templateJSONAssetContents
          .map((asset, index) => {
            const json = JSON.parse(asset.value);
            const main = json.sections.main && json.sections.main.type;

            return assets.find(
              (file) => file.key === `sections/${main}.liquid`
            );
          })
          .filter((value) => value);

        // Request the content of each section and check if it has a schema that contains a
        // block of type '@app'
        const sectionsWithAppBlock = (
          await Promise.all(
            templateMainSections.map(async (file, index) => {
              let acceptsAppBlock = false;
              const {
                body: { asset },
              } = await clients.rest.get({
                path: `themes/${publishedTheme.id}/assets`,
                query: { "asset[key]": file.key },
              });

              const match = asset.value.match(
                /\{\%\s+schema\s+\%\}([\s\S]*?)\{\%\s+endschema\s+\%\}/m
              );
              const schema = JSON.parse(match[1]);

              if (schema && schema.blocks) {
                acceptsAppBlock = schema.blocks.some((b) => b.type === "@app");
              }

              return acceptsAppBlock ? file : null;
            })
          )
        ).filter((value) => value);

        /**
         * This is where we check if the theme supports apps blocks.
         * To do so, we check if the main-product section supports blocks of type @app
         */
        const supportsSe = templateJSONFiles.length > 0;
        const supportsAppBlocks = supportsSe && sectionsWithAppBlock.length > 0;

        ctx.body = {
          theme: publishedTheme,
          supportsSe,
          supportsAppBlocks,
        };
        ctx.res.statusCode = 200;
      } catch (error) {
        console.log(error);
        ctx.status = 400;
        ctx.body = {
          success: false,
        };
      }
    }
  );
  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", verifyCookie, handleRequest);

  const staticDirPath = path.join(process.cwd(), "public");
  server.use(serve(staticDirPath));
  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
