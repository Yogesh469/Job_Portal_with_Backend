
import React, { useEffect, useState } from "react"
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faRocket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import axios from "axios"

const About = () => {
  // const [data, setdata] = useState([])

  // const fetchdata = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:3000/api/user")
  //     console.log(res.data.user)
  //     setdata(res.data.user)

  //   } catch (error) {
  //     console.log(error)

  //   }

  // }


  // useEffect(() => {
  //   fetchdata()
  // }, [])



  return (
    <div className="min-h-screen bg-gray-50">


      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 text-white py-20">


        <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full"></div>

        <div className="absolute -bottom-24 -right-20 w-72 h-72 bg-white/10 rounded-full"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6">

          <p className="text-blue-200 font-semibold uppercase tracking-wider text-sm">
            About Our Platform
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Connecting Talent With Opportunity
          </h1>

          <p className="mt-5 text-blue-100 text-lg max-w-3xl mx-auto">
            Our job portal helps job seekers discover the right opportunities
            and connects companies with talented professionals.
          </p>

        </div>

      </section>

      {/* <div>

        {
          data.map((item ,index)=> <div  key={index}>
            
            {item.title}
            {item.location}
            {item.salary}

          </div>)
        }
      </div> */}



      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">


          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              Who We Are
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Making Job Searching Simple
            </h2>

            <p className="text-gray-600 mt-5 leading-7">
              Our platform is designed to make the job searching and hiring
              process easier, faster, and more convenient. Job seekers can
              explore job opportunities, discover companies, and find positions
              that match their skills and career goals.
            </p>

            <p className="text-gray-600 mt-4 leading-7">
              Companies can showcase their organization and connect with
              qualified candidates looking for new career opportunities.
            </p>

          </div>



          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

            <div className="grid grid-cols-2 gap-5">

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  100+
                </div>

                <p className="text-gray-600 mt-2">
                  Jobs
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  50+
                </div>

                <p className="text-gray-600 mt-2">
                  Companies
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  500+
                </div>

                <p className="text-gray-600 mt-2">
                  Candidates
                </p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">
                  24/7
                </div>

                <p className="text-gray-600 mt-2">
                  Access
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>



      <section className="bg-white py-16">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-12">

            <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
              Why Choose Us
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
              Everything You Need To Find Your Next Job
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              We provide useful tools and features to make your job search
              easier and more effective.
            </p>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">


            <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-6">
                Find Jobs Easily
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Search and explore job opportunities based on your skills,
                location, and career interests.
              </p>

            </div>



            <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FontAwesomeIcon icon={faBuilding} />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-6">
                Discover Companies
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Explore different companies, learn about their opportunities,
                and find organizations that match your career goals.
              </p>

            </div>



            <div className="group bg-gray-50 border border-gray-100 rounded-2xl p-7 hover:-translate-y-2 hover:shadow-xl hover:border-blue-200 transition-all duration-300">

              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <FontAwesomeIcon icon={faRocket} />
              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-6">
                Grow Your Career
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Find opportunities that help you develop your skills and
                take the next step in your professional career.
              </p>

            </div>

          </div>

        </div>

      </section>



      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-10 md:p-14 text-white text-center shadow-xl">

          <h2 className="text-3xl md:text-4xl font-bold">
            Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-5 text-blue-100 text-lg leading-8">
            Our mission is to create a simple and reliable platform where
            talented people can discover meaningful career opportunities
            while companies can find the right talent for their teams.


          </p>





        </div>

      </section>

    </div>
  );
};

export default About;

