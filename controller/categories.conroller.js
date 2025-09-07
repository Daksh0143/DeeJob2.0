const { default: mongoose } = require("mongoose")
const { successResponse, failureResponse } = require("../common/response")
const Category = require("../models/categories.models")

const getAllCategories = async (req, res) => {
    try {
        const user = req.user

        const response = await Category.find({
            createdBy: new mongoose.Types.ObjectId(String(user._id))
        });
        console.log("response==>", response)
        return successResponse(res, "Categories get successfully", response, 201)
    } catch (error) {
        console.log("ERROR", error)
        return failureResponse(res, "Failed to get categories", 501)

    }
}

module.exports = { getAllCategories }