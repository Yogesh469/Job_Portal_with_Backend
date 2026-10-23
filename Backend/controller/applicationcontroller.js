
import Application from "../model/ApplicationSchema.js";

export const submitApplication = async (req, res) => {
    try {
        const { applicant, job } = req.body;

        const existingApplication = await Application.findOne({
            applicant,
            job
        });

        if (existingApplication) {
            res.status(400).json({
                success: false,
                message: "You have already applied for this job"
            });
        } else {
            const application = new Application({
                applicant,
                job
            });

            await application.save();

            res.status(201).json({
                success: true,
                message: "Job application submitted successfully",
                application
            });
        }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to submit job application"
        });
    }
};


export const getApplications = async (req, res) => {
    try {
        const applications = await Application.find()
            .populate("applicant")
            .populate("job");

        res.status(200).json({
            success: true,
            applications
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch applications"
        });
    }
};
