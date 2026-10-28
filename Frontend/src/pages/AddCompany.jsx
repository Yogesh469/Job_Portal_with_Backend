
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import fetchCompany from "../hooks/companyfetch.js";

const AddCompany = () => {
    const { id } = useParams()
    const isEditMode = Boolean(id)
    const {data:data} = fetchCompany("http://localhost:3000/api2/allcompany")

    console.log(data)

    const existingpost = data.find((item) => item._id == id)

    
    const nav = useNavigate()



    const validationSchema = Yup.object({
        name: Yup.string()
            .min(5, "The name character must be aleast 5")
            .max(25, "The name must be less than ")
            .required("Company name is required"),


        logo: Yup.string()
            .required("Company logo URL is required"),


        industry: Yup.string()
            .required("Industry is required"),

        location: Yup.string()
            .required("Location is required"),

        email: Yup.string()
            .email("Enter a valid email")
            .required("Company email is required"),

        phone: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must contain exactly 10 digits")
            .required("Phone number is required")
        ,

        website: Yup.string()
            .url("Enter a valid website URL")
            .required("Company website is required"),

        foundedYear: Yup.number()
            .integer("Enter a valid year")
            .min(1800, "Enter a valid founded year")
            .max(new Date().getFullYear(), "Year cannot be in the future")
            .nullable()
            .transform((value, originalValue) =>
                originalValue === "" ? null : value
            ),

        companySize: Yup.string()
            .required("Company size is required"),

        description: Yup.string()
            .required("Company description is required"),

        workCulture: Yup.string(),

        benefits: Yup.string(),

        linkedIn: Yup.string()
            .url("Enter a valid LinkedIn URL"),
    });

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">

            <div className="max-w-4xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-blue-700">
                        Add New Company
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add company information to your job portal.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-6 md:p-8">

                    <Formik
                        enableReinitialize
                        initialValues={{
                            name: existingpost?.name || "",
                            logo: existingpost?.logo || "",
                            industry: existingpost?.industry || "",
                            location: existingpost?.location || "",
                            email: existingpost?.email || "",
                            phone: existingpost?.phone || "",
                            website: existingpost?.website || "",
                            foundedYear: existingpost?.foundedYear || "",
                            companySize: existingpost?.companySize || "",
                            description: existingpost?.description || "",
                            workCulture: existingpost?.workCulture || "",
                            benefits: existingpost?.benefits || "",
                            linkedIn: existingpost?.linkedIn || "",
                        }}

                        validationSchema={validationSchema}

                        onSubmit={async(values) => {
                            if (isEditMode) {
                               try {
                                  const res =await axios.put(`http://localhost:3000/api2/update/${id}` ,values)
                                  console.log(res.data)
                                
                               } catch (error) {
                                 console.log(`error:${error}`)
                               }


                            }
                            else {
                                try {
                                    const res = await axios.post("http://localhost:3000/api2/create" ,values)
                                    console.log(res.data.Company)
                                    
                                } catch (error) {
                                    console.log(error)
                                    
                                }



                            }




                            nav("/companies-details")
                        }}
                    >
                        {({ errors, touched, values, setFieldValue }) => (
                            <Form className="space-y-6">

                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
                                    Basic Information
                                </h2>

                                <div className="grid md:grid-cols-2 gap-5">

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Company Name *
                                        </label>

                                        <Field
                                            name="name"
                                            placeholder="Enter company name"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.name && touched.name && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block mb-2 font-medium">
                                            Company Logo
                                        </label>

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];

                                                if (file) {
                                                    const reader = new FileReader();

                                                    reader.onloadend = () => {
                                                        setFieldValue("logo", reader.result);
                                                    };

                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="w-full rounded-lg border border-gray-300 p-3"
                                        />
                                        {errors.logo && touched.logo && (
                                            <div className="text-red-500 text-sm mt-1">{errors.logo}</div>
                                        )}


                                        {values.logo && (
                                            <div className="mt-4">
                                                <p className="mb-2 text-sm text-gray-600">
                                                    Logo Preview
                                                </p>

                                                <img
                                                    src={values.logo}
                                                    alt="Company Logo Preview"
                                                    className="h-28 w-28 rounded-lg border border-gray-200 bg-white object-contain p-2"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Industry *
                                        </label>

                                        <Field
                                            as="select"
                                            name="industry"
                                            className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Industry</option>
                                            <option value="Information Technology">Information Technology</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Healthcare">Healthcare</option>
                                            <option value="Education">Education</option>
                                            <option value="Marketing">Marketing</option>
                                            <option value="Manufacturing">Manufacturing</option>
                                            <option value="Other">Other</option>
                                        </Field>

                                        {errors.industry && touched.industry && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.industry}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Location *
                                        </label>

                                        <Field
                                            name="location"
                                            placeholder="e.g. Kathmandu, Nepal"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.location && touched.location && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.location}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Company Email *
                                        </label>

                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="hr@company.com"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.email && touched.email && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Phone Number
                                        </label>

                                        <Field
                                            name="phone"
                                            placeholder="Enter phone number"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.phone && touched.phone && (
                                            <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Company Website *
                                        </label>

                                        <Field
                                            name="website"
                                            placeholder="https://example.com"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.website && touched.website && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.website}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Founded Year
                                        </label>

                                        <Field
                                            type="number"
                                            name="foundedYear"
                                            placeholder="e.g. 2018"
                                            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                        />

                                        {errors.foundedYear && touched.foundedYear && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.foundedYear}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">
                                            Company Size *
                                        </label>

                                        <Field
                                            as="select"
                                            name="companySize"
                                            className="w-full border rounded-lg px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select Company Size</option>
                                            <option value="1-10">1-10 Employees</option>
                                            <option value="11-50">11-50 Employees</option>
                                            <option value="51-100">51-100 Employees</option>
                                            <option value="101-500">101-500 Employees</option>
                                            <option value="500+">500+ Employees</option>
                                        </Field>

                                        {errors.companySize && touched.companySize && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {errors.companySize}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 pt-2">
                                    About the Company
                                </h2>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Company Description *
                                    </label>

                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows="4"
                                        placeholder="Describe your company..."
                                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {errors.description && touched.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Work Culture
                                    </label>

                                    <Field
                                        as="textarea"
                                        name="workCulture"
                                        rows="3"
                                        placeholder="Describe the working environment..."
                                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Employee Benefits
                                    </label>

                                    <Field
                                        as="textarea"
                                        name="benefits"
                                        rows="3"
                                        placeholder="e.g. Training, paid leave, flexible hours..."
                                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        LinkedIn URL
                                    </label>

                                    <Field
                                        name="linkedIn"
                                        placeholder="https://www.linkedin.com/company/..."
                                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    {errors.linkedIn && touched.linkedIn && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.linkedIn}
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-end pt-4 border-t">
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"

                                    >
                                       {isEditMode ?"Update Company" :"Add Company"

                                       }
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>

                </div>
            </div>
        </div>
    );
};

export default AddCompany;
