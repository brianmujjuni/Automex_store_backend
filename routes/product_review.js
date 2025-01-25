const express = require("express");
const ProductReview = require("../models/producct_review");

const productReviewRouter = express.Router();
productReviewRouter.post("/api/product-review", async (req, res) => {
  try {
    const { buyerId, email, fullName, productId, rating, review } = req.body;
    const productReview = new ProductReview({
      buyerId,
      email,
      fullName,
      productId,
      rating,
      review,
    });
    await productReview.save();
    return res
      .status(201)
      .json({ msg: "Review created successfully", productReview });
  } catch (err) {
    res.status(400).json({ "error": err.message });
  }
});


module.exports = productReviewRouter