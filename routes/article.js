const express = require("express")
const router = express.Router()

const ArticleController = require("../controllers/article")

router.post("/create", ArticleController.create)
router.get("/articles/:quantity?", ArticleController.get)
router.get("/article/:id", ArticleController.getById)
router.delete("/article/:id", ArticleController.deleteById)


module.exports = router