const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createCompany, getAllCompany } = require("../controller/company.controller")

const router = express.Router()

router.post("/create", authMiddleware, createCompany)
router.get("/get", authMiddleware, getAllCompany)

module.exports = router