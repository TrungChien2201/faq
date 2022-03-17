const mongoose = require("mongoose");

const shortCodeSchema = mongoose.Schema(
  {
    shop: {
      type: "String",
      required: true,
    },
    config: {
      type: "Object",
      required: true,
    },
    view: {
      type: "Number",
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shortcode", shortCodeSchema);
