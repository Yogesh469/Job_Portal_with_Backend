
import React from "react";
import { useParams, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faLocationDot, faMoneyBillWave, faBriefcase, faLayerGroup, faCalendarDays, faArrowLeft, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import userfetch from "../hooks/userfetch.js";

const JobDetail2 = () => {
    const { id } = useParams();
    const nav = useNavigate();

    const { data: data } = userfetch("http://localhost:3000/api/user")

    const job = data.find((item) => (item._id) === id);

    if (!job) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
                <h2 className="text-3xl font-bold text-slate-800">
                    Job Not Found
                </h2>
                <button
                    onClick={() => nav("/jobs")}
                    className="mt-5 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
                >
                    Back to Jobs
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">


                <button
                    onClick={() => nav("/jobs")}
                    className="mb-6 flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Back to Jobs
                </button>


                <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
                    <div className="h-3 bg-blue-600"></div>

                    <div className="p-6 sm:p-10">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
                                <FontAwesomeIcon
                                    icon={faBuilding}
                                    className="text-4xl"
                                />
                            </div>

                            <div className="flex-1">
                                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
                                    Job Opportunity
                                </p>

                                <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                                    {job.title}
                                </h1>

                                <p className="mt-3 flex items-center gap-2 text-slate-500">
                                    <FontAwesomeIcon
                                        icon={faBuilding}
                                        className="text-blue-500"
                                    />
                                    {job.company}
                                </p>

                                <p className="mt-2 flex items-center gap-2 text-slate-500">
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className="text-blue-500"
                                    />
                                    {job.location}
                                </p>
                            </div>

                            <span className="w-fit rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                                {job.jobType}
                            </span>
                        </div>


                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                                <FontAwesomeIcon
                                    icon={faMoneyBillWave}
                                    className="text-xl text-blue-600"
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                    Salary
                                </p>
                                <h3 className="mt-1 font-bold text-slate-800">
                                    {job.salary || "Not specified"}
                                </h3>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                                <FontAwesomeIcon
                                    icon={faBriefcase}
                                    className="text-xl text-blue-600"
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                    Job Type
                                </p>
                                <h3 className="mt-1 font-bold text-slate-800">
                                    {job.jobType || "Not specified"}
                                </h3>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                                <FontAwesomeIcon
                                    icon={faLayerGroup}
                                    className="text-xl text-blue-600"
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                    Category
                                </p>
                                <h3 className="mt-1 font-bold text-slate-800">
                                    {job.category || "Not specified"}
                                </h3>
                            </div>

                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-5">
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    className="text-xl text-blue-600"
                                />
                                <p className="mt-3 text-sm text-slate-500">
                                    Application Deadline
                                </p>
                                <h3 className="mt-1 font-bold text-slate-800">
                                    {job.deadline
                                        ? job.deadline.slice(0, 10)
                                        : "Not specified"}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
                    <h2 className="border-b border-blue-100 pb-4 text-2xl font-bold text-slate-900">
                        About the Job
                    </h2>

                    <p className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                        {job.description || "No description available."}
                    </p>
                </div>


                <div className="mt-6 rounded-2xl bg-white p-6 shadow-md sm:p-8">
                    <h2 className="border-b border-blue-100 pb-4 text-2xl font-bold text-slate-900">
                        Requirements
                    </h2>

                    <div className="mt-5 whitespace-pre-line leading-8 text-slate-600">
                        {job.requirements
                            ? job.requirements.split("\n").map((requirement, index) => (
                                <p key={index} className="mb-3 flex items-start gap-3">
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="mt-2 text-blue-600"
                                    />
                                    <span>{requirement}</span>
                                </p>
                            ))
                            : "No requirements specified."}
                    </div>
                </div>


                <div className="mt-6 rounded-2xl bg-blue-600 p-6 text-center text-white shadow-lg sm:p-8">
                    <h2 className="text-2xl font-bold">
                        Interested in This Opportunity?
                    </h2>

                    <p className="mt-2 text-blue-100">
                        Review the job details and requirements before applying.
                    </p>

                    <button
                        onClick={() => {
                            const user = localStorage.getItem("loggedInUser");

                            if (!user) {
                                nav("/login");
                            } else {
                                nav(`/apply-job/${job._id}`);
                            }
                        }}
                        className="mt-5 mr-3 rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
                    >
                        Apply for This Job
                    </button>
                </div>

            </div>
        </div>
    );
};

export default JobDetail2;
