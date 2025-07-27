const { mongoose } = require("mongoose");

const mockCompanies = [
    {
        employer: "67f20f979c5dc7eda923224e",
        name: "TechNova Solutions",
        email: "contact@technova.com",
        address: "123 Silicon Street, Bengaluru, KA",
        billingYear: 2023,
        candidate: 15,
        websiteUrl: "https://technova.com",
        companyLogo: "https://example.com/logos/technova.png",
        isVerified: true,
    },
    {
        employer: new mongoose.Types.ObjectId("67f20f979c5dc7eda923224e"),
        name: "GreenByte Technologies",
        email: "info@greenbyte.io",
        address: "45 Park Avenue, Pune, MH",
        billingYear: 2022,
        candidate: 8,
        websiteUrl: "https://greenbyte.io",
        companyLogo: "https://example.com/logos/greenbyte.png",
        isVerified: false,
    },
    {
        employer: new mongoose.Types.ObjectId("67f20f979c5dc7eda923224e"),
        name: "FinCrest Analytics",
        email: "hello@fincrest.com",
        address: "77 Market Road, Mumbai, MH",
        billingYear: 2024,
        candidate: 12,
        websiteUrl: "https://fincrest.com",
        companyLogo: "https://example.com/logos/fincrest.png",
        isVerified: true,
    },
    {
        employer: new mongoose.Types.ObjectId("67f20f979c5dc7eda923224e"),
        name: "EduSpark Innovations",
        email: "team@eduspark.in",
        address: "18 Knowledge Lane, Hyderabad, TS",
        billingYear: 2021,
        candidate: 5,
        websiteUrl: "https://eduspark.in",
        companyLogo: "https://example.com/logos/eduspark.png",
        isVerified: false,
    },
    {
        employer: new mongoose.Types.ObjectId("67f20f979c5dc7eda923224e"),
        name: "HealthBridge Pvt Ltd",
        email: "support@healthbridge.com",
        address: "9 Wellness Blvd, Chennai, TN",
        billingYear: 2020,
        candidate: 20,
        websiteUrl: "https://healthbridge.com",
        companyLogo: "https://example.com/logos/healthbridge.png",
        isVerified: true,
    }
];

module.exports = { mockCompanies }