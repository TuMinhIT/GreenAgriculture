const Brand = require("../models/brand.model");

exports.createBrand = async (data) => {
  const brand = new Brand(data);
  return await brand.save();
};

exports.getBrandByName = async (name) => {
  return await Brand.findOne({ name });
};

exports.getAllBrands = async () => {
  return await Brand.find();
};

exports.getBrandById = async (id) => {
  return await Brand.findById(id);
};

exports.updateBrand = async (id, data) => {
  return await Brand.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};
