const asyncHandler = require("express-async-handler");
const Article = require("../models/articleModel");
///GET ALL ARTICLES
const getArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find({});
  res.status(200).render("articles/index", { articles });
});
///GET SINGLE ARTICLE
const getArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.status(200).render("articles/show", { article });
});

/// Form to add an Article
const articleForm = asyncHandler(async (req, res) => {
  res.render("articles/new");
});

//Add a new Article
const createArticle = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.author ||
    !req.body.address
  ) {
    res.status(400);
    throw new Error("Please fill out all fields");
  }
  // const article = await Article.create({
  //   title: req.body.title,
  //   description: req.body.description,
  //   author: req.body.author,
  //   address: req.body.address,
  // });
  const newArticle = new Article(req.body);
  await newArticle.save();

  res.redirect(`/api/articles/${newArticle.id}`);
});

/// Delete an Article

const deleteArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleteArticle = await Article.findByIdAndDelete(id);
  res.redirect("/api/articles");
});

//form to update an article
const articleFormUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  res.render("articles/edit", { article });
});

// Update an article
const updateArticle = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/api/articles/${article.id}`);
});

module.exports = {
  getArticles,
  getArticle,
  createArticle,
  articleForm,
  articleFormUpdate,
  deleteArticle,
  updateArticle,
};
