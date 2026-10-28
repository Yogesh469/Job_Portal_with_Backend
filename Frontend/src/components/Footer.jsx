
import React from 'react'
import { NavLink } from 'react-router'

const Footer = () => {
    return (
        <footer className="bg-blue-600 text-white mt-10">

            <div className="max-w-7xl mx-auto px-10 py-10">

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                
                    <div>
                        <h2 className="text-2xl font-bold mb-3">
                            JobPortal
                        </h2>

                        <p className="text-blue-100 leading-6">
                            Find your dream job and connect with the right
                            opportunities. Build your career with us.
                        </p>
                    </div>

                   
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Quick Links
                        </h3>

                        <ul className="space-y-2 text-blue-100">
                            <li>
                                <NavLink to="/" className="hover:text-white">
                                    Home
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/jobs" className="hover:text-white">
                                    Jobs
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/companies" className="hover:text-white">
                                    Companies
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/about" className="hover:text-white">
                                    About
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Job Seekers
                        </h3>

                        <ul className="space-y-2 text-blue-100">
                            <li className="hover:text-white cursor-pointer">
                                Find Jobs
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                My Applications
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Saved Jobs
                            </li>

                            <li className="hover:text-white cursor-pointer">
                                Create Profile
                            </li>
                        </ul>
                    </div>

                    
                    <div>
                        <h3 className="text-lg font-semibold mb-3">
                            Contact Us
                        </h3>

                        <p className="text-blue-100 mb-2">
                            Email: support@jobportal.com
                        </p>

                        <p className="text-blue-100 mb-2">
                            Phone: +977 9800000000
                        </p>

                        <p className="text-blue-100">
                            Kathmandu, Nepal
                        </p>
                    </div>

                </div>

                <div className="border-t border-blue-400 mt-8 pt-5 text-center text-blue-100">
                    <p>
                        © 2026 JobPortal. All rights reserved.
                    </p>
                </div>

            </div>

        </footer>
    )
}

export default Footer

