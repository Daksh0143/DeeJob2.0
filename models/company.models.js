const mongoose = require("mongoose")
const User = require("./job.models")
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

    // 📅 Billing Year (or could be founded year)
    billingYear: {
        type: Number,
        required: false,
    },

    // 👥 Number of Candidates / Employees
    candidate: {
        type: Number,
        default: 0,
    },

    // 🌐 Website URL
    websiteUrl: {
        type: String,
    },

    // 🖼️ Company Logo URL
    companyLogo: {
        type: String,
    },

    // ✅ Verification status
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