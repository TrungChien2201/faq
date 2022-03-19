const mongoose = require("mongoose");

const widgetSchema = mongoose.Schema(
  {
    shop: {
      type: "String",
      required: true,
    },
    config: {
      type: "Object",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Widget", widgetSchema);
