// server/services/category.service.js
const Category = require("../models/categories.model");

exports.createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

exports.getAllCategories = async () => {
  return await Category.find();
};

exports.getCategoryById = async (id) => {
  return await Category.findById(id);
};

exports.updateCategory = async (id, data) => {
  return await Category.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteCategory = async (id) => {
  return await Category.findByIdAndDelete(id);
};

exports.getCategoryByName = async (name) => {
  return await Category.findOne({ name });
};
