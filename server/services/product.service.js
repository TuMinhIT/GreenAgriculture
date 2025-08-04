// services/product.service.js
const Product = require('../models/products.model');

const createProduct = async (data) => {
  const product = new Product(data);
  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find().populate('categoryId');
};

const getProductById = async (id) => {
  return await Product.findById(id).populate('categoryId');
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};