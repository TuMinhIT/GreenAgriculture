import express from "express";
import { getListProducts } from "../controllers/productController.js";

const router = express.Router();

router.get("/list", getListProducts);
// router.get("/:id", getProduct);
// router.post("/", getProducts);
// router.post("/", getProducts);

export default router;
