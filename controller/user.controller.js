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

const loginUser = async (req, res) => {
    const { email, password, role } = req.body

    if (!email || !password || !role) {
        return failureResponse(res, "Please provide all the details")
    }

    const existingUser = await User.findOne({ email })

    if (!existingUser) {
        return failureResponse(res, "User not found")
    }
    const isPasswordMatched = await existingUser.comparePassword(password)
    if (!isPasswordMatched) {
        return failureResponse(res, "Incorrect Password")
    }

    if (existingUser.role !== role) {
        return failureResponse(res, "User with this role is not registered")
    }

    const token = await existingUser.generateJWTTOken()

    return successResponse(res, "User Loggedin successfully", {
        existingUser, token
    })

}

const getUserProfile = async (req, res) => {
    try {
        return successResponse(res, "User details get successfully", req.user)
    } catch (error) {
        return failureResponse(res, "Internal server error")
    }
}

module.exports = { registerUser, loginUser ,getUserProfile }