const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createCompany } = require("../controller/company.controller")

const router = express.Router()

router.post("/create", authMiddleware, createCompany)

module.exports = router