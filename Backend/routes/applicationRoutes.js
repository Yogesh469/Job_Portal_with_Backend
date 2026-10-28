import express from "express";
import { getApplications, getUserApplications, submitApplication, updateApplicationStatus } from "../controller/applicationcontroller.js";

const appRoute = express.Router();

appRoute.post("/application", submitApplication);
appRoute.get("/applications" ,getApplications)
appRoute.put("/updatestatus/:id" ,updateApplicationStatus)
appRoute.get("/myapplications/:id" ,getUserApplications)

export default appRoute;