// git init --y
// npm i express

const express = require("express");
const mongoose = require("mongoose"); // mongoose
const dotenv = require("dotenv"); // npm i dotenv
const app = express();
const cors = require("cors");
const port = 5000;

// routes
const categoryRoute = require("./routes/categories.js");
const productRoute = require("./routes/products.js");

dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

// middlewares
app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => res.send("hello world")); // client tarafına bir şey gönderme

app.listen(port, () => {
  connect();
  console.log(`Example app listening on port ${port}`);
});