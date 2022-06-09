require("./Util/mongo");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./Router/router");
const diaryRoutes = require("./Router/diaryRoutes");
require("dotenv").config();
const port = process.env.PORT || 1110;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", diaryRoutes);

app.get("/", (req, res) => {
  res.send("Welcome...");
});

app.listen(port, () => {
  console.log("Server running...");
});
