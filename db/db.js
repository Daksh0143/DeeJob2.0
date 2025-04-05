const mongoose = require("mongoose")
require("dotenv").config()


const dbConnect = mongoose.connect(process.env.MONGO_URI, {
    dbName: "E-Commerce",
}).then(() => {
    console.log("DB Connected successfully")
}).catch((error) => {
    console.log("Someting went wrong on DB Connection", error)
})

module.exports = { dbConnect }