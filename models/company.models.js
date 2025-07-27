const mongoose = require("mongoose")
const companySchema = new mongoose.Schema({
    employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },

    // 🧾 Address
    address: {
        type: String,
        required: true,
    },

    billingYear: {
        type: Number,
        required: false,
    },

    candidate: {
        type: Number,
        default: 0,
    },

    websiteUrl: {
        type: String,
    },

    companyLogo: {
        type: String,
    },

    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
}
);

const Company = mongoose.model("Company", companySchema);
module.exports = Company