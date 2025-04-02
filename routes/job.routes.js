const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createJob, getAllJob, getMyJobs, updateJobs } = require("../controller/job.controller")

const router = express.Router()

router.post("/create", authMiddleware, createJob)
router.get("/getAll", authMiddleware, getAllJob)
router.get("/myJobs", authMiddleware, getMyJobs)
router.put("/updateJobs/:id", authMiddleware, updateJobs)


module.exports = router