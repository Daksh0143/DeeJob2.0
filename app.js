const express=require("express")
const dbConnect=require("./db/db")

const app=express()

app.listen(3000,()=>{
    console.log(`Server is listening on 3000 port`)
})