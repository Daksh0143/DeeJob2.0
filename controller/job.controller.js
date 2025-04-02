const { failureResponse, successResponse } = require("../common/response")
const Job = require("../models/job.models")

const createJob = async (req, res) => {
    try {
        const { role } = req.user

        if (role === "Job Seeker") {
            return failureResponse(res, "Job seeker is not allowed to access this resource")
        }

        const {
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo } = req.body

        if (!title || !description || !category || !country || !city || !location) {
            return failureResponse(res, "Please provide all the details")
        }

        if ((!salaryFrom || !salaryTo) && !fixedSalary) {
            return failureResponse(res, "Please provide the salary details")
        }

        if (salaryFrom && salaryTo && fixedSalary) {
            return failureResponse(res, "You can not enter both fix and range salary")
        }

        const postedBy = req.user._id;

        const job = await Job.create({
            title,
            description,
            category,
            country,
            city,
            location,
            fixedSalary,
            salaryFrom,
            salaryTo,
            postedBy
        })
        return successResponse(res, "Job Created Successfully", job)
    } catch (error) {
        return failureResponse(res, "Internal Server error", 404)
    }
}


module.exports = { createJob }