import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RegUser",
        required: true
    },

    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["Pending", "Shortlisted", "Rejected"],
        default: "Pending"
    }
},

    { timestamps: true });

const Application = mongoose.model("Application", ApplicationSchema);

export default Application;