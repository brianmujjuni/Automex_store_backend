const express = require("express");
const SubCategory = require("../models/sub_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/sub_categories", async (req, res) => {
  try {
    const { categoryId, categoryName, image, subCategoryName } = req.body;
    const subCategory = new SubCategory({
      categoryId,
      categoryName,
      image,
      subCategoryName,
    });
    await subCategory.save();
    return res.status(201).json({
      msg: "Sub Category created successfully",
      subCategory,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = subCategoryRouter;