const Category = require("../models/categories.models");
const { categoriesMock } = require("./mockData/categoryMock");

const seedCategories = async () => {
    await Category.deleteMany();
    await Category.insertMany(categoriesMock);
    console.log("✅ Categories seeded.");
};

module.exports = seedCategories