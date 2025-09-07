const { failureResponse, successResponse } = require("../common/response")
const { City } = require("../models/city.models")


const createCity = async (req, res) => {
    try {
        const { role } = req.user;

        if (role === "job seeker") {
            return failureResponse(res, "This role is not allowed to create city", 401);
        }

        const country = "India";
        const state = "Gujarat";

        // 🔹 Call external API
        const response = await fetch("https://countriesnow.space/api/v0.1/countries/state/cities", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state, country }),
        });

        const result = await response.json();

        if (result.error || !result.data) {
            return failureResponse(res, "Could not fetch cities from external API", 502);
        }

        // 🔹 Prepare city documents
        const cities = result.data.map((cityName) => ({
            name: cityName,
            state,
            country,
        }));

        // 🔹 Save all in DB
        const savedCities = await City.insertMany(cities);

        return successResponse(res, "Cities created successfully", savedCities);
    } catch (error) {
        console.error("createCity error:", error);
        return failureResponse(res, "Internal Server Error", 500);
    }
};

const getAllCity = async (req, res) => {
    try {
        const response = await City.find();
        return successResponse(res, "City Get successfully", response, 201)
    } catch (error) {
        return failureResponse(res, "Failed to get city", 501)
    }
}

module.exports = { createCity, getAllCity }