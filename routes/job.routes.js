const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createJob } = require("../controller/job.controller")

const router = express.Router()

router.post("/create", authMiddleware, createJob)


module.exports = router