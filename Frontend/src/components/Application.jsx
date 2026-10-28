
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const Application = () => {
    const nav = useNavigate();
    const { id } = useParams()

    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")

    );

    console.log("Logged-in user:", loggedInUser);
    console.log("User ID:", loggedInUser?._id);

    const validationSchema = Yup.object({
        name: Yup.string()
            .max(25, "The Name should have maximum characters to 25")
            .min(4, "The Name should not be less than 4 characters")
            .required("The Name is required"),

        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
            .required("The Number is required"),

        education: Yup.string()
            .required("The Education is required"),

        skills: Yup.string()
            .required("The skills are required"),

        experience: Yup.string()
            .required("Experience is required"),

        resume: Yup.string()
            .url("Enter a valid resume URL")
    });

    if (!loggedInUser) {
        nav("/login");
        return null;
    }

    return (
        <div className="min-h-screen bg-blue-50 px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-lg">
                <h1 className="mb-2 text-3xl font-bold text-blue-700">
                    Your Profile
                </h1>

                <p className="mb-6 text-gray-500">
                    Complete your profile before applying for jobs.
                </p>

                <Formik
                    initialValues={{
                        name: loggedInUser.name || "",
                        phone: "",
                        education: "",
                        skills: "",
                        experience: "",
                        resume: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                            const res = await axios.put(
                                `http://localhost:3000/api3/updateprofile/${loggedInUser._id}`,
                                {
                                    ...values,
                                    skills: values.skills
                                        .split(",")
                                        .map((skill) => skill.trim())
                                        .filter(Boolean)
                                }
                            );

                            console.log(res.data);


                            const applicationRes = await axios.post(
                                "http://localhost:3000/api4/application",
                                {
                                    applicant: loggedInUser._id,
                                    job: id
                                }
                            );

                            console.log(applicationRes.data);
                            alert("Profile updated and job application submitted successfully!");
                        } catch (error) {
                            console.log(error);
                            alert(
                                error.response?.data?.message ||
                                "Profile update or application submission failed"
                            );
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form className="space-y-5">
                            {[
                                { name: "name", label: "Full Name", placeholder: "Enter your name" },
                                { name: "phone", label: "Phone Number", placeholder: "Enter your phone number" },
                                { name: "education", label: "Education", placeholder: "e.g. BCA" },
                                { name: "skills", label: "Skills", placeholder: "React, JavaScript, Node.js" },
                                { name: "experience", label: "Experience", placeholder: "e.g. Fresher or 1 year" },
                                { name: "resume", label: "Resume URL", placeholder: "https://example.com/resume.pdf" }
                            ].map((field) => (
                                <div key={field.name}>
                                    <label className="mb-1 block font-medium text-gray-700">
                                        {field.label}
                                    </label>

                                    <Field
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {touched[field.name] && errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : "Save Profile"}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Application;
