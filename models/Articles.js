const { Schema, model } = require("mongoose")

const ArticleSchema = Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    default: "default.webp"
  },
  hidden: {
    type: Boolean,
    default: false
  }
})

module.exports = model("Article", ArticleSchema, "articles")