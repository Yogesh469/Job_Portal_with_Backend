import express from "express";
import { getApplications, submitApplication } from "../controller/applicationcontroller.js";

const appRoute = express.Router();

appRoute.post("/application", submitApplication);
appRoute.get("/applications" ,getApplications)

export default appRoute;