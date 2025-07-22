// seeders/index.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const seedCategories = require("./category.Seeder");

const runAllSeeders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Connected to MongoDB");

        await seedCategories();

        console.log("✅ All seeders run successfully.");
        process.exit();
    } catch (err) {
        console.error("❌ Seeder Error:", err);
        process.exit(1);
    }
};

module.exports = runAllSeeders;
