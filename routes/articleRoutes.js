const express = require("express");
const router = express.Router();

const {
  getArticles,
  getArticle,
  createArticle,
  articleForm,
  deleteArticle,
  articleFormUpdate,
  updateArticle,
} = require("../controllers/articleController");

router.route("/").get(getArticles).post(createArticle);
router.route("/new").get(articleForm);
router.route("/:id/edit").get(articleFormUpdate);
router.route("/:id").get(getArticle).delete(deleteArticle).put(updateArticle);
module.exports = router;
