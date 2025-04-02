const express = require("express")
const { registerUser, loginUser, getUserProfile } = require("../controller/user.controller")
const authMiddleware = require("../middlewares/auth.middlewares")

const router = express.Router()

router.post("/registerUser", registerUser)
router.post("/loginUser", loginUser)
router.get("/profile", authMiddleware, getUserProfile)

module.exports = router