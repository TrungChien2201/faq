const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
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

module.exports = mongoose.model("faq", faqSchema);
