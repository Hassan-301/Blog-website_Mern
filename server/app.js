const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
};

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

module.exports = app;
