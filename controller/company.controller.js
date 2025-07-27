const { successResponse, failureResponse } = require("../common/response")
const Company = require("../models/company.models")

const createCompany = async (req, res) => {
    try {
        const { role, _id: userId } = req.user

        if (role === "job seeker") {
            return failureResponse(res, "This role not accessed to create company", 401)
        }
        const { name, email, address, billingYear, candidate, websiteUrl, companyLogo } = req.body
        if (!name || !email || !address || !billingYear || !websiteUrl || !companyLogo) {
            return failureResponse(res, "Please provide all the required fields", 401)
        }

        const data = await Company.create({
            address,
            billingYear,
            candidate,
            companyLogo,
            email,
            employer: userId,
            name,
            websiteUrl
        })
        return successResponse(res, "Company created successfully", data)
    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}

module.exports = {
    createCompany
}