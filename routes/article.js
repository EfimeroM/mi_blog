const express = require("express")
const router = express.Router()

const ArticleController = require("../controllers/article")

router.post("/create", ArticleController.create)


module.exports = router