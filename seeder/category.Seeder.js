const { mongoose } = require("mongoose")
const dotenv = require("dotenv");
const Category = require("../models/categories.models");
const { categoriesMock } = require("./mockData/categoryMock");
dotenv.config();

const seedCategories = async () => {
    await Category.deleteMany();
    await Category.insertMany(categoriesMock);
    console.log("✅ Categories seeded.");
};

module.exports = seedCategories