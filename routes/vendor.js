const express = require("express");
const Vendor = require("../models/vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorRouter = express.Router();

vendorRouter.post("/api/vendor/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const userexist = await Vendor.findOne({ email });
    if (userexist) {
      return res.status(400).json({ msg: "Vendor already exists" });
    } else {
      //generate salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the salt generated above
      const hashedPassword = await bcrypt.hash(password, salt);

      let vendor = new Vendor({ fullname, email, password: hashedPassword });
      await vendor.save();
      return res.status(201).json({ msg: "User created successfully", vendor });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = vendorRouter;
