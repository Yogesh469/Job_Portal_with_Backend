
import mongoose from "mongoose";

const RegUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address"
      ]
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
    },

    education: {
      type: String,
    },

    skills: {
      type: [String],
      default: [],
    },

    experience: {
      type: String,
    },

    resume: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const RegUser = mongoose.model("RegUser", RegUserSchema);

export default RegUser;
