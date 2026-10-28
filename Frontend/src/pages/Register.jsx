
import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const nav = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api3/reguser",
        {
          name,
          email,
          password,
        }
      );

      setMessage(
        res.data.message || "Registration successful!"
      );

      setTimeout(() => {
        nav("/login");
      }, 1000);
    } catch (error) {

      console.log("Error:", error);
      console.log("Response:", error.response?.data);
      console.log("Status:", error.response?.status);
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">


        <div className="hidden md:flex bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 text-white p-12 flex-col justify-center">
          <p className="text-blue-200 font-semibold uppercase tracking-wider text-sm">
            Join JobPortal
          </p>

          <h1 className="text-4xl font-bold mt-3 leading-tight">
            Start Your
            <br />
            Career Journey
          </h1>

          <p className="text-blue-100 mt-6 leading-7">
            Create your account to explore job opportunities,
            connect with companies, and take the next step
            toward your dream career.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                ✓
              </div>
              <span>Discover jobs that match your skills</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                ✓
              </div>
              <span>Connect with top companies</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                ✓
              </div>
              <span>Apply for jobs with your account</span>
            </div>
          </div>
        </div>


        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto">
              JP
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-5">
              Create Account
            </h2>

            <p className="text-gray-500 mt-2">
              Register to get started with JobPortal
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>


            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
              />
            </div>


            {error && (
              <p className="text-red-500 text-sm">
                {error}
              </p>
            )}


            {message && (
              <p className="text-green-600 text-sm">
                {message}
              </p>
            )}


            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 active:scale-[0.98] transition-all duration-200"
            >
              Create Account
            </button>
          </form>


          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?

            <button
              type="button"
              onClick={() => nav("/login")}
              className="text-blue-600 font-semibold ml-1 hover:text-blue-700"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
