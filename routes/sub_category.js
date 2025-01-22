const express = require("express");
const SubCategory = require("../models/sub_category");
const subCategoryRouter = express.Router();

subCategoryRouter.post("/api/subCategories", async (req, res) => {
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

subCategoryRouter.get("/api/subCategories", async (req, res) => { 
    try {
        const subCategories = await SubCategory.find();
        return res.status(200).json(subCategories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
  });

  subCategoryRouter.get("/api/category/:categoryName/subCategories", async (req, res) => {
    try {
      const subCategory = await SubCategory.find({categoryName: req.params.categoryName});
      if (!subCategory || subCategory.length === 0) {
        return res.status(404).json({ msg: "Sub Category not found" });
      }
      return res.status(200).json(subCategory);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


module.exports = subCategoryRouter;