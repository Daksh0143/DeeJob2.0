const mongoose = require("mongoose")


const dbConnect = mongoose.connect("mongodb://localhost:27017/", {
    dbName: "E-Commerce",
}).then(() => {
    console.log("DB Connected successfully")
}).catch((error) => {
    console.log("Someting went wrong on DB Connection", error)
})

module.exports = { dbConnect }