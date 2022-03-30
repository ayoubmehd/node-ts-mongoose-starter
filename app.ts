import "module-alias/register";

import createError from "http-errors";
import express from "express";
import type { ErrorRequestHandler } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import router from "./routes";
import db from "./config/db";

require("dotenv").config();

const app = express();

const env = process.env.NODE_ENV || "development";

// Session setup
const cookie = env === "development" ? {} : { secure: true };

db().then(() => console.log("db connected"));

app.set("trust proxy", 1); // trust first proxy

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use(router);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
  const message = err.message;
  const error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.json({ message, error });
};
app.use(errorRequestHandler);

// Start the app
const port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`App is runing on http://localhost:${port}`);
});
