// seeders/index.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const seedCategories = require("./category.Seeder");
const { seedCompanies } = require("./company.seeder");
const { seedCity } = require("./city.Seeder");
const { seedJobs } = require("./job.Seeder");

const runAllSeeders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("🚀 Connected to MongoDB");

        Promise.all([
            await seedJobs(),
            await seedCategories(),
            await seedCompanies(),
            await seedCity(),
        ]);
        console.log("✅ All seeders run successfully.");
        process.exit();
    } catch (err) {
        console.error("❌ Seeder Error:", err);
        process.exit(1);
    }
};

module.exports = runAllSeeders;
