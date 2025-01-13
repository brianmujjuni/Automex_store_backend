const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      //generate salt with a cost factor of 10
      const salt = await bcrypt.genSalt(10);
      //hash the password using the salt generated above
      const hashedPassword = await bcrypt.hash(password, salt);

      let user = new User({ fullname, email, password: hashedPassword });
      await user.save();
      return res
        .status(201)
        .json({ message: "User created successfully", data: user });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

authRouter.post('/api/signin',async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"Invalid email or password"});
        }
        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({msg:"Invalid email or password"});
        }
        //generate token
        const token = jwt.sign({id:user._id},"passwordKey");
        //remove password on user document
        const {password: pwd ,...data} = user._doc;
        return res.status(200).json({msg:"Login successful",data,token});


    } catch (error) {
        res.status(500).json({error:error.message});
    }
})

module.exports = authRouter;
