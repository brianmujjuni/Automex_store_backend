const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/sub_category");
const productRouter = require('./routes/product')
const productReviewRouter = require("./routes/product_review")
const cors = require("cors");
require('dotenv').config();
const app = express();
const PORT = 3000;

//db connection url
const DB = process.env.DB_CONNECTION_STRING

app.use(express.json());
app.use(cors());
//middleware to mount routes
app.use(authRouter);
app.use(bannerRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
app.use(productRouter)
app.use(productReviewRouter)
//connect to db
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
