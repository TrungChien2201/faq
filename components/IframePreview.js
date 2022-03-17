import { useEffect, useRef, useState } from "react";
import { Liquid } from "liquidjs";
import template from "../liquid_templates/widget-template.liquid";
import { getSessionToken } from "@shopify/app-bridge-utils";
import { useAppBridge } from "@shopify/app-bridge-react";
import axios from "axios";

export default function IframePreview({ formik, shop, accessToken }) {
  const iframe = useRef();
  const engine = new Liquid();
  const app = NODE_ENV === "development" ? null : null;
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonial = async () => {
    // let sessionToken = "";

    // if (NODE_ENV === "production") {
    //   sessionToken = await getSessionToken(app);
    // }

    let config = {
      headers: {
        // Authorization: `Bearer ${sessionToken}`,
        "x-access-token": accessToken,
      },
    };
    let datas = {
      shop: shop,
      shortCode: { ...formik.values },
    };
    try {
      const { data } = await axios.post(
        `/api/get_testimonial_widget`,
        datas,
        config
      );
      if (data?.success) {
        setTestimonials(data?.data?.shortCode?.testimonials);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTestimonial();
  }, [
    formik.values.display_testimonials_from,
    formik.values.specific_testimonial,
    formik.values.exclude_testimonial,
    formik.values.number_of_total_testimonials,
    formik.values.random_order,
    formik.values.testimonial_order_by,
    formik.values.testimonial_order,
    formik.values.tp_per_page,
  ]);

  useEffect(() => {
    if (formik) {
      render({
        config: formik.values,
        testimonials,
      });
    }
  }, [formik, testimonials]);

  const render = async (data) => {
    const document = iframe.current.contentDocument;
    let head = document.getElementsByTagName("head")[0];
    head.innerHTML = "";
    let style = document.createElement("link");
    style.rel = "stylesheet";
    style.type = "text/css";
    style.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    head.appendChild(style);
    let style2 = document.createElement("link");
    style2.rel = "stylesheet";
    style2.type = "text/css";
    style2.href =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.6/swiper-bundle.min.css";
    head.appendChild(style2);

    let style3 = document.createElement("link");
    style3.rel = "stylesheet";
    style3.type = "text/css";
    style3.href = "https://testimonial-dev.simesy.com/testimonial-slider-preview.css";
    head.appendChild(style3);
    let html = await engine.parseAndRender(template, data);
    document.body.innerHTML = `
      <body>${html}</body>
    `;
    let jquery = document.createElement("script");
    jquery.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js";
    document.body.appendChild(jquery);
    let swiper = document.createElement("script");
    swiper.src =
      "https://cdnjs.cloudflare.com/ajax/libs/Swiper/8.0.6/swiper-bundle.min.js";
    document.body.appendChild(swiper);

    let masonry = document.createElement("script");
    masonry.src =
      "https://cdnjs.cloudflare.com/ajax/libs/masonry/4.2.2/masonry.pkgd.min.js";
    document.body.appendChild(masonry);
    let script = document.createElement("script");
    script.src = "https://testimonial-dev.simesy.com/testimonial-slider-preview.js";
    document.body.appendChild(script);
  };

  return <iframe className="iframe-preview" id="iframe" ref={iframe}></iframe>;
}
