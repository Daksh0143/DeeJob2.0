const express = require("express")
const { getAllCategories } = require("../controller/categories.conroller")
const authMiddleware = require("../middlewares/auth.middlewares")
const router = express.Router()

router.get("/getCategories", authMiddleware, getAllCategories)

module.exports = router