import { failureResponse } from "../common/response"

const {User} =require("../models/user.models")

export const registerUser=(req,res)=>{
    const {name,email,phone,role ,password} =req.body
    if(!name || !email || !phone || !role || !password){
        return failureResponse(res,"Please provide all the details")
    }
    
}