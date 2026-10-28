import React from "react"
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
const JobCard = ({ job }) => {
    const nav = useNavigate()

    const handleApply = (e) => {
        e.stopPropagation();

        const user = localStorage.getItem("loggedInUser");

        if (!user) {
            nav("/login");
        } else {
            nav(`/jobdetail2/${job._id}`);
        }
    };






    return (
        <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition"
            onClick={() => nav(`/jobdetail2/${job._id}`)}

        >


            <div className="flex justify-between">

                <div className="flex gap-4">

                    <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 font-bold text-xl">
                        {job.company.charAt(0)}
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-900">
                            {job.company}
                        </h3>

                        <p className="text-slate-500 mt-1">
                            {job.title}
                        </p>
                    </div>

                </div>


                <button className="text-2xl text-slate-400 hover:text-blue-600">
                    <FontAwesomeIcon icon={faHeart} />
                </button>

            </div>


            <div className="flex flex-wrap gap-2 mt-5">

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">
                    {job.jobType}
                </span>

                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                    {job.location}
                </span>

                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                    {job.requirements}
                </span>

            </div>


            <p className="text-slate-500 mt-5 leading-6">
                {job.description}
            </p>


            <div className="border-t border-slate-200 mt-5 pt-5 flex justify-between items-center">

                <div>
                    <p className="font-semibold text-slate-800">
                        {job.salary}
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        Salary
                    </p>

                    <p className="text-sm text-slate-400 mt-1">
                        {`Deadline:${job.deadline}`}
                    </p>
                </div>

                <button
                onClick={handleApply}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition">
                    Apply Now
                </button>

            </div>

        </div>
    );
};

export default JobCard;