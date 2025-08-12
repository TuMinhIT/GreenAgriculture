// server/controllers/category.controller.js
const categoryService = require("../services/category.service");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // tìm trong database đã có tên categori hay chưa
    //  nếu có return err Category already exists
    const existingCategory = await categoryService.getCategoryByName(name);
    if (existingCategory) {
      return res.send({ success: false, message: "Category already exists" });
    }
    const saved = await categoryService.createCategory({ name, description });
    if (!saved)
      return res.send({ success: false, message: "Cannot create category!" });
    res.send({ success: true, data: saved });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.send({ success: true, data: categories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category)
      return res.send({ success: false, message: "Category not found" });
    res.send({ success: true, data: category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const updated = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (!updated) return res.status(404).json({ error: "Category not found" });
    res.send({ success: true, data: updated });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await categoryService.deleteCategory(req.params.id);
    if (!deleted)
      return res.send({ success: false, message: "Category not found" });
    res.send({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
