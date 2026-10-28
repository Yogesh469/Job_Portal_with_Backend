
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import axios from "axios"
import userfetch from "../hooks/userfetch.js";

const AddJob = () => {
    const { id } = useParams()
    console.log(id)
    const isEditmode = Boolean(id)
    const {data:data}=userfetch("http://localhost:3000/api/user")
    
    const nav = useNavigate()
    

    const existingJob = data.find((item) => item._id === id)


    const validationSchema = Yup.object({
        title: Yup.string()
            .required("Job title is required"),

        company: Yup.string()
            .required("Company name is required"),

        location: Yup.string()
            .required("Location is required"),

        salary: Yup.string()
            .required("Salary is required"),

        jobType: Yup.string()
            .required("Please select job type"),

        category: Yup.string()
            .required("Please select category"),

        description: Yup.string()
            .required("Job description is required"),

        requirements: Yup.string()
            .required("Job requirements are required"),

        deadline: Yup.date()
            .required("Application deadline is required"),
    });








    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">

            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-gray-800">
                        Add New Job
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add a new job opportunity to your job portal.
                    </p>

                </div>


                <Formik
                    enableReinitialize
                    initialValues={{
                        title: existingJob?.title || "",
                        company: existingJob?.company || "",
                        location: existingJob?.location || "",
                        salary: existingJob?.salary || "",
                        jobType: existingJob?.jobType || "",
                        category: existingJob?.category || "",
                        description: existingJob?.description || "",
                        requirements: existingJob?.requirements || "",
                        deadline: existingJob?.deadline?.slice(0, 10) || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {

                        if (isEditmode) {
                            try {
                                const res = await axios.put(`http://localhost:3000/api/update/${id}` ,values)
                                console.log(res.data)
                                
                            } catch (error) {
                                console.log(error)
                                
                            }

                        }

                        else {
                            const res = await axios.post("http://localhost:3000/api/create", values)

                            console.log(res.data.user)

                            alert("The Job added Sucessfully ")

                        }



                        nav("/admin-login")




                    }}

                >

                    {({ errors, touched }) => (

                        <Form className="space-y-6">



                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Job Title
                                </label>

                                <Field
                                    name="title"
                                    type="text"
                                    placeholder="e.g. Frontend Developer"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                {errors.title && touched.title && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.title}
                                    </p>
                                )}

                            </div>



                            <div className="grid md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Company Name
                                    </label>

                                    <Field
                                        name="company"
                                        type="text"
                                        placeholder="e.g. TechSoft Nepal"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.company && touched.company && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.company}
                                        </p>
                                    )}

                                </div>


                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Location
                                    </label>

                                    <Field
                                        name="location"
                                        type="text"
                                        placeholder="e.g. Kathmandu"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.location && touched.location && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.location}
                                        </p>
                                    )}

                                </div>

                            </div>



                            <div className="grid md:grid-cols-2 gap-5">

                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Salary
                                    </label>

                                    <Field
                                        name="salary"
                                        type="text"
                                        placeholder="e.g. Rs. 40,000 - 60,000"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {errors.salary && touched.salary && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.salary}
                                        </p>
                                    )}

                                </div>


                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Job Type
                                    </label>

                                    <Field
                                        as="select"
                                        name="jobType"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    >

                                        <option value="">
                                            Select Job Type
                                        </option>

                                        <option value="Full Time">
                                            Full Time
                                        </option>

                                        <option value="Part Time">
                                            Part Time
                                        </option>

                                        <option value="Internship">
                                            Internship
                                        </option>

                                        <option value="Remote">
                                            Remote
                                        </option>

                                    </Field>

                                    {errors.jobType && touched.jobType && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.jobType}
                                        </p>
                                    )}

                                </div>

                            </div>



                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Category
                                </label>

                                <Field
                                    as="select"
                                    name="category"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    <option value="Frontend Development">
                                        Frontend Development
                                    </option>

                                    <option value="Backend Development">
                                        Backend Development
                                    </option>

                                    <option value="Full Stack Development">
                                        Full Stack Development
                                    </option>

                                    <option value="UI/UX Design">
                                        UI/UX Design
                                    </option>

                                    <option value="Data Science">
                                        Data Science
                                    </option>

                                    <option value="Marketing">
                                        Marketing
                                    </option>

                                </Field>

                                {errors.category && touched.category && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.category}
                                    </p>
                                )}

                            </div>



                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Job Description
                                </label>

                                <Field
                                    as="textarea"
                                    name="description"
                                    rows="5"
                                    placeholder="Describe the job..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                {errors.description && touched.description && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.description}
                                    </p>
                                )}

                            </div>



                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Job Requirements
                                </label>

                                <Field
                                    as="textarea"
                                    name="requirements"
                                    rows="5"
                                    placeholder="e.g. React, JavaScript, HTML, CSS..."
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                {errors.requirements && touched.requirements && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.requirements}
                                    </p>
                                )}

                            </div>



                            <div>

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Application Deadline
                                </label>

                                <Field
                                    name="deadline"
                                    type="date"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />

                                {errors.deadline && touched.deadline && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.deadline}
                                    </p>
                                )}

                            </div>


                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
                            >
                                {isEditmode ? "Update Job" : "Add Job"}
                            </button>

                        </Form>

                    )}

                </Formik>

            </div>

        </div >
    );
};

export default AddJob;


