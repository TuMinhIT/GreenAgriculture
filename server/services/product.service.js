const Product = require('../models/products.model');
const { cloudinary } = require('../utils/upload');

const createProduct = async (data, files) => {
  const images = files.map(file => ({
    url: file.path,
    public_id: file.filename
  }));

  const product = new Product({
    ...data,
    images
  });

  return await product.save();
};

const getAllProducts = async () => {
  return await Product.find().populate('categoryId');
};

const getProductById = async (id) => {
  return await Product.findById(id).populate('categoryId');
};

const updateProduct = async (id, data, files) => {
  const product = await Product.findById(id);
  if (!product) return null;

  // Nếu có ảnh mới -> xoá ảnh cũ
  if (files && files.length > 0) {
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }
    data.images = files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
  }

  return await Product.findByIdAndUpdate(id, data, { new: true });
};

const deleteProduct = async (id) => {
  const product = await Product.findById(id);
  if (!product) return null;

  // Xoá ảnh trên Cloudinary
  for (const img of product.images) {
    await cloudinary.uploader.destroy(img.public_id);
  }

  return await product.deleteOne();
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};