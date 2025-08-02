import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import productRouter from "./routers/productRouter.js";
//app config
const app = express();
const port = process.env.PORT || 8000;

// middleware
app.use(express.json());
app.use(cors());

//api end points

app.use("/api/products", productRouter);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
