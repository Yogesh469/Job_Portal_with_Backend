
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ProfileSchema = Yup.object({
    name: Yup.string()
        .trim()
        .required("Full name is required")
        .min(3, "Name must be at least 3 characters"),

    phone: Yup.string()
        .matches(/^[0-9]{10}$/, {
            message: "Phone number must be exactly 10 digits",
            excludeEmptyString: true
        }),

    education: Yup.string(),

    skills: Yup.string(),

    experience: Yup.string(),

    resume: Yup.string()
        .trim()
        .transform((value) => value === "" ? undefined : value)
        .url("Please enter a valid resume URL")
        .notRequired()
});

const Profile = () => {
    const nav = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const [isEditing, setIsEditing] = useState(false);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (!user?._id)
            return;

        const fetchApplications = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:3000/api4/myapplications/${user._id}`
                );

                if (res.data.success) {
                    setApplications(res.data.applications);
                }
            } catch (error) {
                console.log(
                    error.response?.data?.message || error.message
                );
            }
        };

        fetchApplications();

        const interval = setInterval(fetchApplications, 10000);

        return () => clearInterval(interval);
    }, [user?._id]);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        nav("/login");
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-6">
                <div className="bg-white p-10 rounded-3xl shadow-xl border border-blue-100 text-center max-w-md w-full">
                    <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold mb-5">
                        JP
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800">
                        Please login to view your profile
                    </h2>

                    <p className="text-gray-500 mt-3">
                        Sign in to manage your profile and career journey.
                    </p>

                    <button
                        onClick={() => nav("/login")}
                        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    const inputClass =
        "w-full border border-blue-100 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition";

    const errorClass = "text-red-500 text-sm mt-2";

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 py-14 px-6">
            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-100/70 border border-blue-100 overflow-hidden">


                <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-8 py-10 text-white">
                    <div className="flex justify-between items-center gap-4">
                        <div>
                            <p className="text-blue-100 text-sm font-medium tracking-widest uppercase">
                                JobPortal
                            </p>

                            <h1 className="text-3xl md:text-4xl font-bold mt-2">
                                My Profile
                            </h1>

                            <p className="text-blue-100 mt-2">
                                Manage your professional account
                            </p>
                        </div>

                        <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center text-2xl font-bold shrink-0">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-10">


                    <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Personal Information
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Your account details
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setIsEditing(!isEditing)}
                                className="bg-blue-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                {isEditing ? "Cancel" : "Edit Profile"}
                            </button>

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="bg-white text-red-500 border border-red-200 px-4 py-2.5 rounded-xl font-semibold hover:bg-red-50 transition"
                            >
                                Logout
                            </button>
                        </div>
                    </div>


                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: user.name || "",
                            phone: user.phone || "",
                            education: user.education || "",
                            skills: user.skills?.join(", ") || "",
                            experience: user.experience || "",
                            resume: user.resume || ""
                        }}
                        validationSchema={ProfileSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                const res = await axios.put(
                                    `http://localhost:3000/api3/updateprofile/${user._id}`,
                                    {
                                        ...values,
                                        skills: values.skills
                                            .split(",")
                                            .map((skill) => skill.trim())
                                            .filter(Boolean)
                                    }
                                );

                                if (res.data.success) {
                                    const updatedUser = {
                                        ...user,
                                        ...res.data.user
                                    };

                                    localStorage.setItem(
                                        "loggedInUser",
                                        JSON.stringify(updatedUser)
                                    );

                                    setIsEditing(false);
                                    window.location.reload();
                                }
                            } catch (error) {
                                alert(
                                    error.response?.data?.message ||
                                    "Profile update failed. Please try again."
                                );
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-5">


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Full Name
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                name="name"
                                                className={inputClass}
                                                placeholder="Enter your full name"
                                            />

                                            {touched.name && errors.name && (
                                                <p className={errorClass}>
                                                    {errors.name}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-lg font-semibold text-gray-800">
                                            {user.name}
                                        </p>
                                    )}
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <p className="text-sm font-medium text-blue-600 mb-1">
                                        Email Address
                                    </p>

                                    <p className="text-lg font-semibold text-gray-800 break-all">
                                        {user.email}
                                    </p>
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Phone
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                name="phone"
                                                className={inputClass}
                                                placeholder="Enter your phone number"
                                            />

                                            {touched.phone && errors.phone && (
                                                <p className={errorClass}>
                                                    {errors.phone}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-lg font-semibold text-gray-800">
                                            {user.phone || "Not provided"}
                                        </p>
                                    )}
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Education
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                name="education"
                                                className={inputClass}
                                                placeholder="Enter your education"
                                            />

                                            {touched.education && errors.education && (
                                                <p className={errorClass}>
                                                    {errors.education}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-lg font-semibold text-gray-800">
                                            {user.education || "Not provided"}
                                        </p>
                                    )}
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Skills
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                name="skills"
                                                className={inputClass}
                                                placeholder="React, JavaScript, Node.js"
                                            />

                                            <p className="text-xs text-gray-500 mt-2">
                                                Separate skills with commas.
                                            </p>

                                            {touched.skills && errors.skills && (
                                                <p className={errorClass}>
                                                    {errors.skills}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {user.skills?.length > 0 ? (
                                                user.skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))
                                            ) : (
                                                <p className="text-gray-500">
                                                    No skills added yet
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Experience
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                as="textarea"
                                                name="experience"
                                                className={inputClass}
                                                rows="3"
                                                placeholder="Describe your experience"
                                            />

                                            {touched.experience && errors.experience && (
                                                <p className={errorClass}>
                                                    {errors.experience}
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className="text-gray-800 whitespace-pre-wrap">
                                            {user.experience || "Not provided"}
                                        </p>
                                    )}
                                </div>


                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <label className="block text-sm font-medium text-blue-600 mb-2">
                                        Resume URL
                                    </label>

                                    {isEditing ? (
                                        <>
                                            <Field
                                                name="resume"
                                                className={inputClass}
                                                placeholder="https://example.com/resume.pdf"
                                            />

                                            {touched.resume && errors.resume && (
                                                <p className={errorClass}>
                                                    {errors.resume}
                                                </p>
                                            )}
                                        </>
                                    ) : user.resume ? (
                                        <a
                                            href={user.resume}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-blue-600 font-semibold hover:underline break-all"
                                        >
                                            View Resume
                                        </a>
                                    ) : (
                                        <p className="text-gray-500">
                                            No resume added yet
                                        </p>
                                    )}
                                </div>

                               
                                <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5">
                                    <p className="text-sm font-medium text-blue-600 mb-1">
                                        Role
                                    </p>

                                    <p className="text-lg font-semibold text-gray-800 capitalize">
                                        {user.role || "user"}
                                    </p>
                                </div>

                                
                                {isEditing && (
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-60"
                                    >
                                        {isSubmitting
                                            ? "Saving..."
                                            : "Save Changes"}
                                    </button>
                                )}
                            </Form>
                        )}
                    </Formik>

                    
                    <div className="mt-10 pt-8 border-t border-blue-100">
                        <div className="mb-5">
                            <h2 className="text-xl font-bold text-gray-800">
                                My Job Applications
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Track the status of your applications
                            </p>
                        </div>

                        {applications.length === 0 ? (
                            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center">
                                <p className="text-gray-600">
                                    You haven't applied for any jobs yet.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {applications.map((application) => (
                                    <div
                                        key={application._id}
                                        className="bg-blue-50/70 border border-blue-100 rounded-2xl p-5"
                                    >
                                        <div className="flex flex-wrap justify-between gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-gray-800">
                                                    {application.job?.title || "Job title unavailable"}
                                                </h3>

                                                <p className="text-gray-600 mt-1">
                                                    {application.job?.company || "Company unavailable"}
                                                </p>

                                                <p className="text-sm text-gray-500 mt-2">
                                                    Applied on:{" "}
                                                    {application.createdAt
                                                        ? new Date(application.createdAt).toLocaleDateString()
                                                        : "Date unavailable"}
                                                </p>
                                            </div>

                                            <div>
                                                <span
                                                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${application.status === "Shortlisted"
                                                            ? "bg-green-100 text-green-700"
                                                            : application.status === "Rejected"
                                                                ? "bg-red-100 text-red-700"
                                                                : "bg-yellow-100 text-yellow-700"
                                                        }`}
                                                >
                                                    {application.status || "Pending"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="mt-8 pt-6 border-t border-blue-100 text-center">
                        <p className="text-sm text-gray-500">
                            Your next career opportunity starts here.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Profile;
