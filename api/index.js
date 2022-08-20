const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const chalk = require("chalk");

require("dotenv").config();

const MONGO_URI = `mongodb+srv://amanzrx4:${process.env.MONGO_PASSWORD}@dineville.exocsnt.mongodb.net/?retryWrites=true&w=majority`;

const createError = require("http-errors");
const categoryRoutes = require("./routes/category");
const dishRoutes = require("./routes/dish");

const PORT = process.env.PORT || 5000;
const PREFIX = "/" + process.env.PREFIX;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));

app.use(PREFIX, categoryRoutes);
app.use(PREFIX, dishRoutes);

app.post("/create", (req, res, next) => {
  console.log("requestr obj", req.body);
});

app.get("/", (req, res) => {
  res.send({ message: Math.random() });
});

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status,
      message: err.message || "Internal server error",
    },
  });
});

app.listen(PORT, () => {
  console.log("🚀 ~ file: index.js ~ line 13 ~ app.listen  ~ PORT", PORT);

  mongoose.connect(MONGO_URI, (error) => {
    if (error) {
      return console.log("error connecting database", error);
    }
    console.log(chalk.white.bgBlue.bold("connected database"));
  });
});
