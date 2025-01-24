const express = require("express");
const Product = require("../models/product");
const productRouter = express.Router();

productRouter.post("/api/add-product", async (req, res) => {
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

productRouter.get("/api/popular-products", async (req, res) => {
  try {
    const product = await Product.find({ popular: true });
    if (!product || product.length == 0) {
      return res.status(404).json({ msg: "Products not found" });
    }
    return res.status(200).json({ product });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

productRouter.get("/api/recommended-products", async (req, res) => {
  try {
    const products = await Product.find({ recommend: true });
    if (!products || products.length == 0) {
      return res.status(404).json({ msg: "Products not found" });
    }
    return res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = productRouter;
