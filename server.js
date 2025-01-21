const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const bannerRouter = require("./routes/banner");
const categoryRouter = require("./routes/category");
const subCategoryRouter = require("./routes/sub_category");

const app = express();
const PORT = 3000;

//db connection url
const DB = "mongodb+srv://brianmujjuni:domain017@storeapp.8nkmz.mongodb.net/";

app.use(express.json());
//middleware to mount routes
app.use(authRouter);
app.use(bannerRouter)
app.use(categoryRouter)
app.use(subCategoryRouter)
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
