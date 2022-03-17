const mongoose = require("mongoose");

const testimonialFormSchema = new mongoose.Schema(
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

module.exports = mongoose.model("TestimonialForm", testimonialFormSchema);
