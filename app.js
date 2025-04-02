const express = require("express")
const dbConnect = require("./db/db")
const UserRoutes = require("./routes/user.routes")
const JobRoutes = require("./routes/job.routes")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/user", UserRoutes)
app.use("/api/v1/job", JobRoutes)

app.listen(3000, () => {
    console.log(`Server is listening on 3000 port`)
})