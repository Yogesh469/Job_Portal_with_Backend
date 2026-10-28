import React, { useState } from "react";
import JobCard from "../components/Jobcard";
import { useSelector } from "react-redux";
import userfetch from "../hooks/userfetch.js";
const Jobs = () => {

    const [search, setSearch] = useState("");
    const [location, setLocation] = useState("");
    const [jobType, setJobType] = useState("All");

    const { data:jobs} =userfetch("http://localhost:3000/api/user")
    console.log(jobs)

    const filteredJobs = jobs.filter((job) => {

        const searchMatch =
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase());

        const locationMatch =
            job.location.toLowerCase().includes(location.toLowerCase());

        const typeMatch =
            jobType === "All" || job.jobType === jobType;

        return searchMatch && locationMatch && typeMatch;
    });

    return (
        <div className="min-h-screen bg-slate-50">

            
            <section className="bg-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold">
                        Find Your Next Job
                    </h1>

                    <p className="mt-3 text-blue-100">
                        Explore job opportunities and find the perfect
                        position for your career.
                    </p>
                </div>
            </section>

            
            <section className="max-w-7xl mx-auto px-6 -mt-6">

                <div className="bg-white rounded-xl shadow-lg p-5">

                    <div className="grid md:grid-cols-3 gap-4">

                        <input
                            type="text"
                            placeholder="Search job title or company"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="text"
                            placeholder="Search location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <select
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                            className="border border-slate-200 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        >
                            <option value="All">All Job Types</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Remote">Remote</option>
                        </select>

                    </div>

                </div>

            </section>

            
            <section className="max-w-7xl mx-auto px-6 py-12">

                <h2 className="text-2xl font-bold text-slate-900">
                    Available Jobs
                </h2>

                <p className="text-slate-500 mt-1 mb-6">
                    {filteredJobs.length} jobs found
                </p>

              
                <div className="grid lg:grid-cols-2 gap-6">

                    {filteredJobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={job}
                        />
                    ))}

                </div>

               
                {filteredJobs.length === 0 && (
                    <div className="bg-white rounded-xl p-12 text-center">
                        <h3 className="text-xl font-semibold text-slate-800">
                            No jobs found
                        </h3>

                        <p className="text-slate-500 mt-2">
                            Try changing your search or filters.
                        </p>
                    </div>
                )}

            </section>

        </div>
    );
};

export default Jobs;