const mongoose = require("mongoose");

const FaqSettingSchema = mongoose.Schema(
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

module.exports = mongoose.model("faq-setting", FaqSettingSchema);
