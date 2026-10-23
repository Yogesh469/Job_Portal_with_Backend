
import express from "express"
import { createUser, Deleteuser, getAlluser, Updateuser } from "../controller/userController.js"

const route = express.Router()
route.post("/create" ,createUser)
route.delete("/delete/:id" ,Deleteuser)
route.put("/update/:id" ,Updateuser)
route.get("/user" ,getAlluser)

export default route