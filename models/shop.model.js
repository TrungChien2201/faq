const mongoose = require("mongoose");

const shopSchema = mongoose.Schema(
  {
    shop: {
      type: "String",
      required: true,
    },
    token: {
      type: "String",
    },
    plan: {
      type: "String",
      default: "FREE",
    },
    charge_id: {
      type: "String",
      default: "",
    },
    installed: {
      type: "Boolean",
      default: false,
    },
    testimonial_order: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shop", shopSchema);
