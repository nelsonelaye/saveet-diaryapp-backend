const mongoose = require("mongoose");
require("dotenv").config();
// const url = "mongodb://localhost/DiaryDb";
const url = process.env.ATLAS;

mongoose
  .connect(url)
  .then(() => {
    console.log("Database 101 is ready");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
