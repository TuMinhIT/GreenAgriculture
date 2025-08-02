import express from "express";

// get all products
const getListProducts = async (req, res) => {
  try {
    // const products = await Product.find();
    res.send({
      success: true,
      message: "Products fetched successfully",
      //   data: products,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
};
//get a product

// create a product

// delete a product

// update a product

export { getListProducts };
