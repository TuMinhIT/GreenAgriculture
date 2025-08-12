// models/categories.model.js
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tên danh mục là bắt buộc"],
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brands", brandSchema);

module.exports = Brand;
