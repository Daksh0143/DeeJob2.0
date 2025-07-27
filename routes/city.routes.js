const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createCity } = require("../controller/city.controller")

const router = express.Router()

router.post("/create", authMiddleware, createCity)

module.exports = router