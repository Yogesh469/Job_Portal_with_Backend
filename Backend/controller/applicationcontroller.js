
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



export const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params

        if (!["Pending", "Shortlisted", "Rejected"].includes(status)) {
            res.status(400).json({
                success: false,
                message: "Invalid application status"
            });
        } else {
            const application = await Application.findByIdAndUpdate(
                id,
                { status },
                { new: true, runValidators: true }
            );

            if (!application) {
                res.status(404).json({
                    success: false,
                    message: "Application not found"
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Application status updated successfully",
                    application
                });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to update application status"
        });
    }
};

export const getUserApplications = async (req, res) => {
    try {
        const { id } = req.params;

        const applications = await Application.find({
            applicant: id
        }).populate("job", "title company");

        res.status(200).json({
            success: true,
            applications
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch your applications"
        });
    }
};

