const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createCity, getAllCity } = require("../controller/city.controller")

const router = express.Router()

router.post("/create", authMiddleware, createCity)
router.get("/get", authMiddleware, getAllCity)

module.exports = router