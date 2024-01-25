const express = require("express")
const multer = require("multer")

const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, res, cb) => cb(null, './images/articles'),
  filename: (req, file, cb) => cb(null, `article${Date.now()}${file.originalname}`)
})

const uploads = multer({ storage })

const ArticleController = require("../controllers/article")

router.post("/create", ArticleController.create)
router.get("/articles/:quantity?", ArticleController.get)
router.get("/article/:id", ArticleController.getById)
router.delete("/article/:id", ArticleController.deleteById)
router.put("/article/:id", ArticleController.updateById)
router.post("/upload-image/:id", [uploads.single("file0")], ArticleController.uploadImage)
router.get("/image/:file", ArticleController.getArticleImage)


module.exports = router