const express = require("express")
const authMiddleware = require("../middlewares/auth.middlewares")
const { createJob, getAllJob, getMyJobs, updateJobs, deleteJobs, findOneJobs } = require("../controller/job.controller")

const router = express.Router()

router.post("/create", authMiddleware, createJob)
router.get("/getAll", authMiddleware, getAllJob)
router.get("/myJobs", authMiddleware, getMyJobs)
router.delete("/findOne/:id", authMiddleware, findOneJobs)
router.put("/updateJobs/:id", authMiddleware, updateJobs)
router.delete("/deleteJobs/:id", authMiddleware, deleteJobs)


module.exports = router