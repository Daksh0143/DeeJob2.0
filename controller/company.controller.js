const { successResponse, failureResponse } = require("../common/response")
const Company = require("../models/company.models")
const cloudinary = require("cloudinary")

const createCompany = async (req, res) => {
    try {
        const { role, _id: userId } = req.user;

        if (role === "job seeker") {
            return failureResponse(res, "This role not accessed to create company", 401);
        }

        if (!req.files || !req.files.companyLogo) {
            return failureResponse(res, "Company logo is required", 400);
        }

        const { companyLogo } = req.files;





        const allowedFormats = ["image/png", "image/jpg", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(companyLogo.mimetype)) {
            return failureResponse(res, "Please upload image in JPG, JPEG, PNG or WEBP format", 400);
        }

        const { name, email, address, billingYear, candidate, websiteUrl } = req.body;

        if (!name || !email || !address || !billingYear || !websiteUrl) {
            return failureResponse(res, "Please provide all the required fields", 401);
        }

        const cloudinaryResponse = await cloudinary.v2.uploader.upload(
            companyLogo.tempFilePath,
            { folder: "companies" }
        );

        const data = await Company.create({
            address,
            billingYear,
            candidate,
            companyLogo: cloudinaryResponse.secure_url,
            email,
            employer: userId,
            name,
            websiteUrl
        });

        return successResponse(res, "Company created successfully", data);

    } catch (error) {
        console.log("ERROR", error);
        return failureResponse(res, "Internal Server Error", 501);
    }
};


const getAllCompany = async (req, res) => {
    try {
        // 📌 Extract query params with defaults
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search || "";
        const searchField = req.query.searchField || "name";
        const skip = (page - 1) * limit;

        // 📌 Build dynamic $match for search
        let matchStage = {};
        if (search) {
            matchStage = {
                $match: {
                    [searchField]: { $regex: search, $options: "i" }
                }
            };
        }

        // 📌 Pipeline
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "employer",
                    foreignField: "_id",
                    as: "employer",
                    pipeline: [
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$employer",
                    preserveNullAndEmptyArrays: true,
                },
            },

            ...(search
                ? [
                    {
                        $match: {
                            $or: [
                                { [searchField]: { $regex: search, $options: "i" } },
                                { "employer.name": { $regex: search, $options: "i" } }
                            ]
                        }
                    }
                ]
                : []
            ),

            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $sort: { createdAt: -1 } },
                        { $skip: skip },
                        { $limit: limit },
                    ],
                },
            },
            {
                $addFields: {
                    total: {
                        $ifNull: [
                            { $arrayElemAt: ["$metadata.total", 0] },
                            0,
                        ],
                    },
                    page: page,
                    limit: limit,
                },
            },
            {
                $project: {
                    metadata: 0,
                },
            },
        ];

        // 📌 Run aggregation
        const result = await Company.aggregate(pipeline);

        // 📌 Return clean response
        return successResponse(res, "Company get successfully", result[0]);
    } catch (error) {
        console.log("ERROR", error);
        return failureResponse(res, "Internal Server Error", 501);
    }
};

const findLoggedInUserCompany = async (req, res) => {
    try {
        const user = req.user
        const response = await Company.find({ employer: user._id })
        if (!response) {
            return failureResponse(res, "Company not Found", 401)
        }
        return successResponse(res, "Company get successfully", response, 201)
    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}


const editCompany = async (req, res) => {
    try {
        const { id } = req.params
        const existingCompany = await Company.findById(id)

        if (!existingCompany) {
            return failureResponse(res, "Company not Found", 401)
        }

        const response = await Company.findByIdAndUpdate(
            id, req.body, { new: true }
        )

        if (!response) {
            return failureResponse(res, "Fail to Update Company", 401)
        }

        return successResponse(res, "Company update successfully", response, 201)

    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}

const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params

        const existingCompany = await Company.findById(id)

        if (!existingCompany) {
            return failureResponse(res, "Company not Found", 401)
        }

        const response = await Company.findByIdAndDelete(id)

        if (!response) {
            return failureResponse(res, "Fail to delete Company", 401)
        }
        return successResponse(res, "Delete company successfully", response, 201)

    } catch (error) {
        return failureResponse(res, "Internal Server Error", 501)
    }
}

module.exports = {
    createCompany,
    getAllCompany,
    findLoggedInUserCompany,
    editCompany,
    deleteCompany
}