import React from "react";
import fetchapplication from "../hooks/fetchapplication.js";
import axios from "axios"

const Applicationdata = () => {
    const { data: fetchapplications, setdata } = fetchapplication(
        "http://localhost:3000/api4/applications"
    );

    console.log("Fetched applications:", fetchapplications);




    const changestatus = async (id, status) => {
        try {
            const res = await axios.put(
                `http://localhost:3000/api4/updatestatus/${id}`,
                { status }
            );

            setdata((prevdata) =>
                prevdata.map((item) =>
                    item._id === id
                        ? { ...item, status: res.data.application.status }
                        : item
                )
            );

            console.log(res.data.message);

        } catch (error) {
            console.log(
                error.response?.data?.message || error.message
            );
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold text-blue-900 mb-2">
                    Job Applications
                </h1>

                <p className="text-gray-500 mb-6">
                    Review applicants and manage their application status.
                </p>

                <div className="bg-white rounded-xl shadow-md overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-blue-50 text-blue-900">
                            <tr>
                                <th className="p-4">Applicant</th>
                                <th className="p-4">Job</th>
                                <th className="p-4">Applied Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {fetchapplications
                                .filter(
                                    (item) => item.applicant && item.job
                                )
                                .map((item) => (
                                    <tr
                                        key={item._id}
                                        className="border-t hover:bg-gray-50"
                                    >
                                        <td className="p-4">
                                            <p className="font-semibold">
                                                {item.applicant.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.applicant.email}
                                            </p>
                                        </td>

                                        <td className="p-4">
                                            <p className="font-semibold">
                                                {item.job.title}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {item.job.company}
                                            </p>
                                        </td>

                                        <td className="p-4">
                                            {new Date(
                                                item.createdAt
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${item.status === "Shortlisted"
                                                    ? "bg-green-100 text-green-700"
                                                    : item.status === "Rejected"
                                                        ? "bg-red-100 text-red-700"
                                                        : "bg-yellow-100 text-yellow-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() =>
                                                        changestatus(
                                                            item._id,
                                                            "Pending"
                                                        )
                                                    }
                                                    className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-sm"
                                                >
                                                    Pending
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        changestatus(
                                                            item._id,
                                                            "Shortlisted"
                                                        )
                                                    }
                                                    className="bg-green-100 text-green-800 px-3 py-2 rounded-lg text-sm"
                                                >
                                                    Shortlist
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        changestatus(
                                                            item._id,
                                                            "Rejected"
                                                        )
                                                    }
                                                    className="bg-red-100 text-red-800 px-3 py-2 rounded-lg text-sm"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>

                    {fetchapplications.filter(
                        (item) => item.applicant && item.job
                    ).length === 0 && (
                            <p className="text-center text-gray-500 p-8">
                                No applications found.
                            </p>
                        )}
                </div>
            </div>
        </div>
    );
};

export default Applicationdata;
