const express = require("express");
const Product = require("../models/product");
const productRouter = express.Router();

productRouter.post("/api/add-product", async (requestAnimationFrame, res) => {
  try {
    const {
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
    } = req.body;
    const product = new Product({
      productName,
      productPrice,
      quantity,
      description,
      category,
      subCategory,
      images,
    });
    await product.save();
    return res
      .status(201)
      .json({ msg: "Product successfully created", product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
