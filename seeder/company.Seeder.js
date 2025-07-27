const Company = require("../models/company.models");
const { mockCompanies } = require("./mockData/companyMock");

const seedCompanies = async () => {
    try {
        await Company.deleteMany();
        await Company.insertMany(mockCompanies);
        console.log("✅ Company seeded.");
    } catch (error) {
        console.error("❌ Company seeding failed:", error.message);
        console.error(error);   
    }
};

module.exports = { seedCompanies };
