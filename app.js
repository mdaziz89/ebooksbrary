if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

const mongoose = require("mongoose");
const connection = mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("database is connected");
  })
  .catch((error) => console.log(error));

const indexRouter = require("./routes/index");
const { error } = require("console");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log("server is running...");
});
