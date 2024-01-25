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
  return res.status(201).json({ status: "success", message: "Article added", article: savedArticle })
}

const get = async (req, res) => {
  let quantity = req.params.quantity

  let query = await Article.find().limit(quantity ? quantity : null).sort({ date: -1 }).exec()
  if (!query) {
    return res.status(404).json({ status: "error", message: "articles not found" })
  }
  return res.status(200).json({ status: "success", message: "Get all articles", articles: query, count: query.length })
}

const getById = async (req, res) => {
  let id = req.params.id
  let query = await Article.findById(id)
  if (!query) {
    return res.status(404).json({ status: "error", message: "article not found" })
  }
  return res.status(200).json({ status: "success", message: "Get article by id", article: query, count: query.length })
}

const deleteById = async(req, res) =>{
  let id = req.params.id
  let query = await Article.findOneAndDelete({ _id: id}).exec()
  
  if (!query) {
    return res.status(500).json({ status: "error", message: "Error to delete article" })
  }
  return res.status(200).json({ status: "success", message: "Deleted article", article: query })
}

module.exports = {
  create,
  get,
  getById,
  deleteById
}