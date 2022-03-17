const { parsed: localEnv } = require("dotenv").config();

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const nodeEnv = JSON.stringify(process.env.NODE_ENV);
const telemetryDisabled = JSON.stringify(process.env.NEXT_TELEMETRY_DISABLED);
const withImages = require("next-images");

module.exports = withImages({
  fileExtensions: ["jpg", "jpeg", "png", "gif"],
  webpack: (config) => {
    const env = {
      API_KEY: apiKey,
      NODE_ENV: nodeEnv,
      NEXT_TELEMETRY_DISABLED: telemetryDisabled,
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

    return config;
  },
});
