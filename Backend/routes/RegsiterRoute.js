import express from "express"
import { loginUser, registerUser ,updateProfile } from "../controller/authController.js"
 
const regroute= express.Router()
regroute.post("/reguser",registerUser)
regroute.post("/loginuser" ,loginUser)
regroute.put("/updateprofile/:id", updateProfile);

export default regroute