const Article = require("../models/Article")
const { validateArticle } = require("../helpers/validate")

const create = async (req, res) => {
  let params = req.body

  validateArticle(params, res)

  const article = new Article(params)
  const savedArticle = await article.save()
  if (!savedArticle) {
    return res.status(400).json({ status: "error", message: "article don't saved" })
  }
  return res.status(201).json({ status: "success", message: "Article created!", article: savedArticle })
}

module.exports = {
  create
}