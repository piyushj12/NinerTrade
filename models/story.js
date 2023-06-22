const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const { v4: uuidv4 } = require("uuid");
const Schema = mongoose.Schema;
const storySchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Product name is required"],
    },
    tradeitemcategory: {
      type: String,
      required: [true, "Category of product is required"],
    },
    tradeitemsubcategory: {
      type: String,
      required: [true, "Sub Category of product is required"],
    },
    materialDescription: {
      type: String,
      required: [true, "Description of material is required"],
      minLength: [
        50,
        "Description of material should be greater than 50 characters",
      ],
    },
    productDescription: {
      type: String,
      required: [true, "Description of product is required"],
      minLength: [
        50,
        "Description of product should be greater than 50 characters",
      ],
    },
    image1: {
      type: String,
      required: [true, "Product image is required"],
      default: "icon.png",
    },
    image2: {
      type: String,
      required: [true, "Product image is required"],
      default: "icon.png",
    },
    size: {
      type: String,
      required: [true, "Size of product is required"],
    },
    author: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
module.exports = mongoose.model("stories", storySchema);
