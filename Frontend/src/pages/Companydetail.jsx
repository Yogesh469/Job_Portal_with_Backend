
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCompany } from "../redux/jobSlice.js";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import fetchcompanydata from "../hooks/companyfetch.js";
import axios from "axios";

const CompanyDetail = () => {
    const nav = useNavigate()
    

    
    const  {data:companies ,setdata:setcompanies} = fetchcompanydata("http://localhost:3000/api2/allcompany")





    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-7xl mx-auto">


                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-blue-700">
                            Company Details
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Manage all registered companies.
                        </p>
                    </div>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                        Total Companies: {companies.length}
                    </span>
                </div>


                <div className="bg-white rounded-xl shadow-md border border-blue-100 overflow-hidden">

                    <div className="flex items-center justify-between p-5 border-b">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Companies
                        </h2>

                        <button
                            onClick={() => window.history.back()}
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Back
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-blue-50 text-gray-700">
                                <tr>
                                    <th className="px-5 py-4">S.N.</th>
                                    <th className="px-5 py-4">Company</th>
                                    <th className="px-5 py-4">Industry</th>
                                    <th className="px-5 py-4">Location</th>
                                    <th className="px-5 py-4">Email</th>
                                    <th className="px-5 py-4">Status</th>
                                    <th className="px-5 py-4">Action</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {companies.length > 0 ? (
                                    companies.map((company, index) => (
                                        <tr
                                            key={company.id}
                                            className="hover:bg-blue-50/50 transition"
                                        >
                                            <td className="px-5 py-4 text-gray-600">
                                                {`${index + 1}.`}
                                            </td>


                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3 min-w-48">
                                                    {company.logo ? (
                                                        <img
                                                            src={company.logo}
                                                            alt={company.name}
                                                            className="w-10 h-10 rounded-lg object-contain border p-1"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                                                            {company.name?.charAt(0)}
                                                        </div>
                                                    )}

                                                    <span className="font-semibold text-gray-800">
                                                        {company.name}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {company.industry}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {company.location}
                                            </td>

                                            <td className="px-5 py-4 text-gray-600">
                                                {company.email}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                        onClick={() => nav(`/add-company/${company._id}`)}
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        className="text-red-500 hover:text-red-700 font-medium"
                                                        onClick={async () => {
                                                            try {

                                                                const confirmDelete = window.confirm("Are you sure to delete the Company")

                                                                if (confirmDelete) {
                                                                    const res = await axios.delete(`http://localhost:3000/api2/delete/${company._id}`)
                                                                    setcompanies((prevdata)=> prevdata.filter((item)=>item._id !== company._id))

                                                                }

                                                            } catch (error) {
                                                                console.log(`The Company can not be deleted`)

                                                            }

                                                        }}


                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="text-center py-12"
                                        >
                                            <div className="text-gray-400 text-4xl mb-3">
                                                <FontAwesomeIcon icon={faBuilding} />
                                            </div>

                                            <p className="text-gray-700 font-semibold">
                                                No companies found
                                            </p>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Add a company to see it listed here.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-5 py-4 border-t text-sm text-gray-500">
                        Showing {companies.length} companies
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetail;
