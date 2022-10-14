const express = require("express");
const path = require("path");
const { errorHandler } = require("./middlewares/errorMiddleware");
const methodOverride = require("method-override");
const connectDB = require("./config/db");
const Article = require("./models/articleModel");

connectDB();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/api/articles", require("./routes/articleRoutes"));

app.use(errorHandler);

app.get("/", (req, res) => {
  res.render("articles/login");
});
app.post("/", async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    throw new Error("please input a valid user and password");
  }
  const articles = await Article.find({});
  res.render("articles/", { articles, login });
});
app.listen(PORT, () => {
  console.log(`Server is running port ${PORT}`);
});
