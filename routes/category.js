const express = require('express')
const Category = require('../models/category')
const categoryRouter = express.Router();

categoryRouter.post('/api/categories',async(req,res)=>{
    try {
        const {name,image,banner} = req.body
        const category = new Category({name,image,banner});
        await category.save();
        return res.status(201).json({
            "msg": "Category created successfully",
            category
        })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

module.exports = categoryRouter
