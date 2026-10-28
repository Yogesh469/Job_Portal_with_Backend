import React from 'react'
import { NavLink } from 'react-router'

const Header = () => {
    return (
        <div className="flex justify-around items-center bg-blue-400 h-11 text-white font-bold text-[18px]">
            <p className="mr-100">LOGO</p>

            <nav>
                <ul className="flex gap-20 ml-100">

                    <li>
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            Home
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/jobs"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            Jobs
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/companies"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            Companies
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            About
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            Login
                        </NavLink>
                    </li>


                    <li>
                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "text-blue-600" : "text-white"
                            }
                        >
                            Profile
                        </NavLink>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Header