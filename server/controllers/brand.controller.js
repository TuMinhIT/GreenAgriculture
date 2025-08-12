// server/controllers/category.controller.js
const brandService = require("../services/brand.service");

exports.createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const existingBrand = await brandService.getBrandByName(name);
    if (existingBrand) {
      return res
        .status(400)
        .send({ success: false, message: "Brand already exists" });
    }
    const saved = await brandService.createBrand({ name, description });
    if (!saved)
      return res.send({ success: false, message: "cannot create brand!" });
    res.send({ success: true, data: saved });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await brandService.getAllBrands();
    res.send({ success: true, data: brands });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const brand = await brandService.getBrandById(req.params.id);
    if (!brand) return res.send({ success: false, message: "Brand not found" });
    res.send({ success: true, data: brand });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const updated = await brandService.updateBrand(req.params.id, req.body);
    if (!updated)
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    res.send({
      success: true,
      data: updated,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const deleted = await brandService.deleteBrand(req.params.id);
    if (!deleted)
      return res.send({ success: false, message: "Brand not found" });
    res.send({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
