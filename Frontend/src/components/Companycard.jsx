import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

const CompanyCard = ({ company }) => {
  const nav=useNavigate()
  return (
    <div className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm  hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ">

      <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-5 border border-blue-100 overflow-hidden">
        <img
          src={company.logo}
          alt={company.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
        {company.name}
      </h3>

      <div className="flex items-center gap-2 text-gray-500 mt-4">
        <FontAwesomeIcon icon={faLocationPin} className="text-2xl text-blue-400" />
        <span>{company.location}</span>
      </div>

      <div className="border-t border-gray-100 my-6"></div>

      <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition-all"
      onClick={()=>nav(`/company-info/${company._id}`)}
      
      >
        View Company
      </button>

    </div>
  );
};

export default CompanyCard;