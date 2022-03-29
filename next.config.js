const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const nodeEnv = JSON.stringify(process.env.NODE_ENV);
const host = JSON.stringify(process.env.HOST);
const telemetryDisabled = JSON.stringify(process.env.NEXT_TELEMETRY_DISABLED);
const withImages = require("next-images");

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif", "svg"],
  webpack: (config) => {
    const env = {
      API_KEY: apiKey,
      NODE_ENV: nodeEnv,
      NEXT_TELEMETRY_DISABLED: telemetryDisabled,
      HOST: host
    };
    config.plugins.push(new webpack.DefinePlugin(env));

    // Add ESM support for .mjs files in webpack 4
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    config.module.rules.push({
      test: /\.liquid$/i,
      use: "raw-loader",
    });

    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
          loader: 'url-loader',
          options: {
              limit: 100000
          }
      }
  });

    return config;
  },
});
