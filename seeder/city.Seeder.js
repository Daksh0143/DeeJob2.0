
const { City } = require("../models/city.models");
const { mockGujaratCities } = require("./mockData/cityMock");


const seedCity = async () => {
    try {
        await City.deleteMany()
        await City.insertMany(mockGujaratCities);
        console.log("✅ Gujarat cities seeded successfully");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
}

module.exports = { seedCity }