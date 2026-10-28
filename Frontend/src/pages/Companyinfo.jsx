
import React from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationPin, faEnvelope, faPhone, faGlobe, faCalendar, faUsers, faBuilding, faBriefcase, faArrowLeft, faCheckCircle} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import fetchCompany from "../hooks/companyfetch.js";

const Companyinfo = () => {
  const { id } = useParams();
  const nav = useNavigate();

  const {data:companies} = fetchCompany("http://localhost:3000/api2/allcompany")

  const company = companies.find((item) => item._id === id);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 px-4">
        <FontAwesomeIcon
          icon={faBuilding}
          className="text-6xl text-blue-300 mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">
          Company Not Found
        </h2>
        <p className="text-gray-500 mt-2">
          The company you are looking for does not exist.
        </p>
        <button
          onClick={() => nav("/companies")}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Back to Companies
        </button>
      </div>
    );
  }

  const details = [
    { icon: faEnvelope, label: "Email", value: company.email },
    { icon: faPhone, label: "Phone", value: company.phone },
    { icon: faGlobe, label: "Website", value: company.website },
    { icon: faCalendar, label: "Founded Year", value: company.foundedYear },
    { icon: faUsers, label: "Company Size", value: company.companySize },
  ];

  return (
    <div className="min-h-screen bg-blue-50/60">
     
      <div className="bg-white border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <button
            onClick={() => nav("/companies")}
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Companies
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
     
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-3xl p-8 md:p-10 text-white shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-28 h-28 bg-white rounded-2xl p-2 flex items-center justify-center shadow-md shrink-0">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faBuilding}
                  className="text-5xl text-blue-500"
                />
              )}
            </div>

            <div className="flex-1">
              <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm mb-3">
                {company.industry || "Industry not specified"}
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold">
                {company.name}
              </h1>

              <p className="flex items-center gap-2 mt-3 text-blue-100">
                <FontAwesomeIcon icon={faLocationPin} />
                {company.location || "Location not specified"}
              </p>
            </div>

            {company.website && (
              <a
                href={
                  /^https?:\/\//i.test(company.website)
                    ? company.website
                    : `https://${company.website}`
                }
                target="_blank"
                rel="noreferrer"
                className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold text-center hover:bg-blue-50 transition"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>

        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 mt-8">
          
          <div className="lg:col-span-2 space-y-7">
            
            <section className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-5">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faBuilding} />
                </span>
                About the Company
              </h2>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {company.description || "No company description available."}
              </p>
            </section>

            
            <section className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3 mb-5">
                <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                  <FontAwesomeIcon icon={faBriefcase} />
                </span>
                Work Culture
              </h2>

              <p className="text-gray-600 leading-8 whitespace-pre-line">
                {company.workCulture || "Work culture information is not available yet."}
              </p>
            </section>

            
            <section className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100">
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Benefits & Perks
              </h2>

              {company.benefits ? (
                <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-blue-600 mt-1"
                  />
                  <p className="text-gray-700 leading-7 whitespace-pre-line">
                    {company.benefits}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">
                  No benefits information available yet.
                </p>
              )}
            </section>
          </div>

          
          <aside className="bg-white rounded-2xl p-7 shadow-sm border border-blue-100 h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Company Overview
            </h2>

            <div className="space-y-6">
              {details.map((detail) => (
                <div key={detail.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <FontAwesomeIcon icon={detail.icon} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm text-gray-500 mb-1">
                      {detail.label}
                    </p>

                    {detail.value ? (
                      detail.label === "Email" ? (
                        <a
                          href={`mailto:${detail.value}`}
                          className="font-semibold text-gray-800 break-words hover:text-blue-600"
                        >
                          {detail.value}
                        </a>
                      ) : detail.label === "Phone" ? (
                        <a
                          href={`tel:${detail.value}`}
                          className="font-semibold text-gray-800 break-words hover:text-blue-600"
                        >
                          {detail.value}
                        </a>
                      ) : detail.label === "Website" ? (
                        <a
                          href={
                            /^https?:\/\//i.test(detail.value)
                              ? detail.value
                              : `https://${detail.value}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="font-semibold text-blue-600 break-words hover:underline"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="font-semibold text-gray-800 break-words">
                          {detail.value}
                        </p>
                      )
                    ) : (
                      <p className="text-gray-400">Not provided</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

          
            {company.linkedIn && (
              <a
                href={
                  /^https?:\/\//i.test(company.linkedIn)
                    ? company.linkedIn
                    : `https://${company.linkedIn}`
                }
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                Connect on LinkedIn
              </a>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Companyinfo;
