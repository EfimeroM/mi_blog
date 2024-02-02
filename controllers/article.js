const fs = require("fs")
const path = require("path")
const Article = require("../models/Article")
const { validateArticle } = require("../helpers/validate")

const create = async (req, res) => {
  let data = req.body

  try {
    validateArticle(data)
  } catch (error) {
    return res.status(400).json({ status: "error", message: `Error creating article: ${error.message}` })
  }

  const article = new Article(data)
  try {
    const savedArticle = await article.save()
    return res.status(201).json({ status: "success", message: "Article added", article: savedArticle })
  } catch (error) {
    return res.status(400).json({ status: "error", message: `Failed to save article: ${error.message}` })
  }
}

const get = async (req, res) => {
  let { quantity } = req.query

  try {
    let query = await Article.find().limit(quantity ? quantity : null).sort({ date: -1 }).exec()
    if (!query) {
      return res.status(404).json({ status: "error", message: "Articles not found" })
    }
    return res.status(200).json({ status: "success", message: "Get all articles", articles: query, count: query.length })
  } catch (error) {
    return res.status(500).json({ status: "error", message: `Internal Server Error: ${error.message}` })
  }
}

const getById = async (req, res) => {
  let { id } = req.params

  try {
    let query = await Article.findById(id)
    if (!query) {
      return res.status(404).json({ status: "error", message: "Article not found" })
    }
    return res.status(200).json({ status: "success", message: "Get article by id", article: query, count: query.length })
  } catch (error) {
    return res.status(500).json({ status: "error", message: `Internal Server Error: ${error.message}` })
  }
}

const deleteById = async (req, res) => {
  let { id } = req.params

  try {
    let query = await Article.findOneAndDelete({ _id: id }).exec()
    if (!query) {
      return res.status(404).json({ status: "error", message: "Error deleting article" })
    }
    return res.status(200).json({ status: "success", message: "Deleted article", article: query, count: query.length })
  } catch (error) {
    return res.status(500).json({ status: "error", message: `Internal Server Error: ${error.message}` })
  }
}

const updateById = async (req, res) => {
  let { id } = req.params
  let data = req.body
  console.log(data)
  try {
    validateArticle(data)
    let query = await Article.findOneAndUpdate({ _id: id }, data, { new: true })
    if (!query) {
      return res.status(404).json({ status: "error", message: "Error updating article" })
    }
    return res.status(200).json({ status: "success", message: "Updated article", article: query, count: query.length })
  } catch (error) {
    return res.status(400).json({ status: "error", message: `Error updating article: ${error.message}` })
  }
}

const uploadImage = async (req, res) => {
  if (!req.file && !req.files) {
    return res.status(400).json({
      status: "error",
      message: "Invalid Query"
    })
  }

  let fileName = req.file.originalname
  let split_file = fileName.split(".")
  let file_extension = split_file[1]

  if (!["png", "jpg", "jpeg", "gif"].includes(file_extension)) {
    fs.unlink(req.file.path, () => {
      return res.status(400).json({
        status: "error",
        message: "Invalid File"
      })
    })
  } else {
    let { id } = req.params

    try {
      let query = await Article.findOneAndUpdate({ _id: id }, { image: req.file.filename }, { new: true })
      if (!query) {
        return res.status(404).json({ status: "error", message: "Error updating article image" })
      }
      return res.status(200).json({ status: "success", message: "Updated article", article: query, count: query.length, file: req.file })
    } catch (error) {
      return res.status(500).json({ status: "error", message: `Internal Server Error: ${error.message}` })
    }
  }
}

const getArticleImage = (req, res) => {
  let file = req.params.file
  let path_file = `./images/articles/${file}`

  fs.stat(path_file, (error, exist) => {
    if (exist) {
      return res.sendFile(path.resolve(path_file))
    } else {
      return res.status(404).json({ status: "error", message: "Image not found", exist, file, path_file })
    }
  })
}

const searchArticle = async (req, res) => {
  let { search } = req.params

  try {
    let query = await Article.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } }
      ]
    }).sort({ date: -1 }).exec()

    if (!query || query.length === 0) {
      return res.status(404).json({ status: "error", message: "Not Found Articles" })
    }
    return res.status(200).json({ status: "success", message: "Get articles", articles: query, count: query.length })
  } catch (error) {
    return res.status(500).json({ status: "error", message: `Internal Server Error: ${error.message}` })
  }
}

module.exports = {
  create,
  get,
  getById,
  deleteById,
  updateById,
  uploadImage,
  getArticleImage,
  searchArticle
}