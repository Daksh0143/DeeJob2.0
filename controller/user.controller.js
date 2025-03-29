const { failureResponse, successResponse } = require("../common/response")

const User = require("../models/user.models")

const registerUser = async (req, res) => {
    try {
        const { name, email, phone, role, password } = req.body
        if (!name || !email || !phone || !role || !password) {
            return failureResponse(res, "Please provide all the details")
        }
        const existingUser = await User.findOne({ email: email })
        if (existingUser) {
            return failureResponse(res, "User is already registered")
        }
        const createUser = await User.create({
            name, email, phone, role, password
        })

        console.log("CREATE USER", createUser)

        return await successResponse(res, "User registered successfully", createUser)
    } catch (error) {
        console.log("ERROR", error)
        return failureResponse(res, "Internal server error", 500)
    }
}

module.exports = { registerUser }