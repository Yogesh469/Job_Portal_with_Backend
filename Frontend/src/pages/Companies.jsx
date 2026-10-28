
import React from "react";
import CompanyCard from "../components/Companycard"
import fetchcompanydata from "../hooks/companyfetch.js";


const Companies = () => {
  const {data:companies} = fetchcompanydata("http://localhost:3000/api2/allcompany")

  console.log(companies)

  return (
    <div className="min-h-screen bg-gray-50">

      
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-20 text-center">

       
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full"></div>

        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>

        <div className="relative z-10">

          <p className="text-blue-200 font-semibold uppercase tracking-wider text-sm">
            Find Your Future
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-2">
            Explore Companies
          </h1>

          <p className="mt-4 text-blue-100 text-lg max-w-2xl mx-auto px-4">
            Discover great companies, explore opportunities,
            and find the right place to build your career.
          </p>

        </div>

      </div>

      
      <div className="max-w-6xl mx-auto px-6 py-14">

        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Top Companies
            </h2>

            <p className="text-gray-500 mt-2">
              Explore companies hiring talented people
            </p>
          </div>

          <div className="mt-4 md:mt-0 bg-blue-50 text-blue-600 px-5 py-2 rounded-full font-semibold">
            {companies.length} Companies
          </div>

        </div>

        
        <div className="grid grid-cols-10 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-300">

          {companies.map((company ,index) => (
            <CompanyCard
              key={index}
              company={company}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default Companies;

