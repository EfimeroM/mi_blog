const validator = require("validator")

const validateArticle = (params, res) => {
  try {
    let validate_title = !validator.isEmpty(params.title) && validator.isLength(params.title, { min: 5, max: undefined })
    let validate_content = !validator.isEmpty(params.content)
    if (!validate_title || !validate_content) {
      throw new Error("Error to validate")
    }
  } catch (error) {
    return res.status(400).json({ status: "error", message: error.message })
  }
}

module.exports = {
  validateArticle
}