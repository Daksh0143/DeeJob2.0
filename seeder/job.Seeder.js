const Job = require("../models/job.models");
const { mockJobs } = require("./mockData/jobsMock");



const seedJobs = async () => {
    try {
        await Job.deleteMany()
        await Job.insertMany(mockJobs);
        console.log("🎉 Jobs seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Job seeding failed:", error);
        process.exit(1);
    }
};

module.exports = { seedJobs }
