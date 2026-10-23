import express from "express"
import { createCompany, deleteCompany, getAllcompany, updateCompany } from "../controller/companycontroller.js"

const comproute=express.Router()

comproute.post("/create" ,createCompany)
comproute.delete("/delete/:id" ,deleteCompany)
comproute.put("/update/:id" ,updateCompany)
comproute.get("/allcompany" ,getAllcompany)

export default comproute