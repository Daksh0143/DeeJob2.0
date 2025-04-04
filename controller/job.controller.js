const { Types } = require("mongoose")
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

const getAllJob = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "", category, city, minSalary, maxSalary } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        minSalary = parseInt(minSalary) || 0;
        maxSalary = parseInt(maxSalary) || Number.MAX_SAFE_INTEGER;

        // Aggregation pipeline
        const pipeline = [];

        // Match filter (jobs that are not expired)
        pipeline.push({ $match: { expired: false } });

        // Search filter (searching in title, description, category)
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } },
                        { category: { $regex: search, $options: "i" } }
                    ]
                }
            });
        }

        // Category & City filters
        if (category) pipeline.push({ $match: { category } });
        if (city) pipeline.push({ $match: { city } });

        // Salary range filter
        pipeline.push({
            $match: {
                $or: [
                    { fixedSalary: { $gte: minSalary } },
                    {

                        $and: [
                            { salaryFrom: { $lte: maxSalary } },
                            { salaryTo: { $gte: minSalary } }
                        ]
                    }
                ]
            }
        });

        pipeline.push({
            $facet: {
                metadata: [{ $count: "totalJobs" }],
                jobs: [
                    { $skip: (page - 1) * limit },
                    { $limit: limit }
                ]
            }
        });

        // Execute aggregation pipeline
        const result = await Job.aggregate(pipeline);

        // Extract data
        const totalJobs = result[0]?.metadata[0]?.totalJobs || 0;
        const jobs = result[0]?.jobs || [];

        return successResponse(res, "Data retrieved successfully", {
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            jobs
        });

    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501);
    }
};

const getMyJobs = async (req, res) => {
    try {
        const { role, _id } = req.user;

        let {
            page = 1,
            limit = 10,
            search = "",
            category,
            city,
            minSalary,
            maxSalary
        } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);
        minSalary = parseInt(minSalary) || 0;
        maxSalary = parseInt(maxSalary) || Number.MAX_SAFE_INTEGER;

        if (role === "Job Seeker") {
            return failureResponse(res, "Job Seeker is not allowed to access this resource");
        }

        // Aggregation Pipeline
        const pipeline = [];

        // Match jobs posted by the user
        pipeline.push({ $match: { postedBy: _id } });

        // Search by title or description
        if (search) {
            pipeline.push({
                $match: {
                    $or: [
                        { title: { $regex: search, $options: "i" } },
                        { description: { $regex: search, $options: "i" } }
                    ]
                }
            });
        }

        // Apply category filter
        if (category) {
            pipeline.push({ $match: { category } });
        }

        // Apply city filter
        if (city) {
            pipeline.push({ $match: { city } });
        }

        // Apply salary range filter
        pipeline.push({
            $match: {
                $or: [
                    { fixedSalary: { $gte: minSalary, $lte: maxSalary } },
                    {
                        salaryFrom: { $lte: maxSalary },
                        salaryTo: { $gte: minSalary }
                    }
                ]
            }
        });

        // Count total jobs for pagination
        pipeline.push({
            $facet: {
                totalCount: [{ $count: "total" }],
                jobs: [
                    { $sort: { createdAt: -1 } }, // Sort by newest first
                    { $skip: (page - 1) * limit },
                    { $limit: limit }
                ]
            }
        });

        // Execute Aggregation
        const result = await Job.aggregate(pipeline);

        const totalJobs = result[0].totalCount[0]?.total || 0;
        const jobs = result[0].jobs;

        return successResponse(res, "Jobs retrieved successfully", {
            totalJobs,
            currentPage: page,
            totalPages: Math.ceil(totalJobs / limit),
            jobs
        });

    } catch (error) {
        console.error("ERROR:", error);
        return failureResponse(res, "Internal Server Error", 501);
    }
};

const updateJobs = async (req, res) => {
    try {
        const { role } = req.user

        const { id } = req.params
        if (role === "Job Seeker") {
            return failureResponse(res, "Job Seeker is not alloed to this resource")
        }

        let job = await Job.findById(id)
        if (!job) {
            return failureResponse(res, "No jobs found", 404)
        }

        job = await Job.findByIdAndUpdate(id, req.body, {
            new: true
        })
        return successResponse(res, "Job updated successfully", job)
    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}

const deleteJobs = async (req, res) => {
    try {
        const { role } = req.user
        const { id } = req.params
        if (role === "Job Seeker") {
            return failureResponse(res, "Job Seeker is not alloed to this resource")
        }
        const findJob = await Job.findOne({ id })
        if (!findJob) {
            return failureResponse(res, "No job found")
        }

        const deleteJob = await Job.findByIdAndDelete(id)

        return successResponse(res, "Job deleted successfully", deleteJob)

    } catch (error) {
        console.log("ERRRO", error)
        return failureResponse(res, "Internal Server Error", 501)
    }
}


module.exports = { createJob, getAllJob, getMyJobs, updateJobs, deleteJobs }