const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createCompany, getAllCompany, findCompanyById, editCompany, deleteCompany, findLoggedInUserCompany } = require("../controller/company.controller")

const router = express.Router()

router.post("/create", authMiddleware, createCompany)
router.get("/get", authMiddleware, getAllCompany)
router.get("/getCompany", authMiddleware, findLoggedInUserCompany)
router.put("/edit/:id", authMiddleware, editCompany)
router.delete("/delete/:id", authMiddleware, deleteCompany)

module.exports = router