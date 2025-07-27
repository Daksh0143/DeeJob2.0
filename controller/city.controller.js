const { failureResponse, successResponse } = require("../common/response")
const { City } = require("../models/city.models")


const createCity = async (req, res) => {
    try {
        const { role } = req.user

        if (role === "job seeker") {
            return failureResponse(res, "This role not accessed to create company", 401)
        }
        const { name, state, country } = req.body
        if (!name || !state || !country) {
            return failureResponse(res, "Please provide the all required field", 400)
        }

        const data = await City.create({
            country,
            name,
            state
        })
        return successResponse(res, "Company created successfully", data)
    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}
module.exports = { createCity }