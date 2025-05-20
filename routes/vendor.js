const express = require("express");
const Vendor = require("../models/vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const vendorRouter = express.Router();

vendorRouter.post("/api/vendor/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const userexist = await Vendor.findOne({ email });
    if (userexist) {
      return res.status(400).json({ msg: "Vendor already exists" });
    } else {
      //generate salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the salt generated above
      const hashedPassword = await bcrypt.hash(password, salt);

      let vendor = new Vendor({ fullName, email, password: hashedPassword });
      await vendor.save();
      return res.status(201).json({ msg: "User created successfully", vendor });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

vendorRouter.post("/api/vendor/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await Vendor.findOne({ email });
    
    if (!vendor) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, vendor.password);
    if (!passwordMatch) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
    //generate token
    const token = jwt.sign({ id: vendor._id }, "passwordKey");
    //remove password on user document
    const { password: pwd, ...data } = vendor._doc;
    return res
      .status(200)
      .json({ msg: "Login successful", vendor: data, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = vendorRouter;
