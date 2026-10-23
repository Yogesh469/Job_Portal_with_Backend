import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    salary: {
        type: String,
        required: true
    },

    jobType: {
        type: String,
        enum: ["Full Time", "Part Time", "Internship", "Remote"],
        required: true
    },

    category: {
        type: String,
        enum: ["Frontend Development", "Backend Development", "Full Stack Development", "UI/UX Design", "Data Science", "Marketing"],
        required: true
    },

    description: {
        type: String,
        required: true
    },

    requirements: {
        type: String,
        required: true
    },
    deadline: {
        type: String,
        required: true
    }

})

const User = mongoose.model("User", userSchema)

export default User
