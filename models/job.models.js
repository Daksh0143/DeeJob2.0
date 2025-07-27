const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories"
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company"
    },
    jobRole: {
        type: String,
        required: true, // 👈 Added this
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City"
    },
    fixedSalary: {
        type: Number
    },
    salaryFrom: {
        type: Number
    },
    salaryTo: {
        type: Number
    },
    jobType: {
        type: String,
        enum: ["Full-Time", "Part-Time", "Contract", "Internship", "Remote"],
        default: "Full-Time",
    },
    expired: {
        type: Boolean,
        default: false
    },
    experience: {
        type: String,
    },
    jobPostedOn: {
        type: Date,
        default: Date.now()
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const Job = mongoose.model("Job", jobSchema)

module.exports = Job