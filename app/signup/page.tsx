"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import Link from "next/link";
import {
  FaRegEnvelope,
  FaUserAlt,
  FaArrowRight,
  FaRegLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

export default function SignupPage() {
  const { signup, error } = useAuthContext();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string): number => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    return strength;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password);
    } catch {
      // error from context
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 1: return "Weak";
      case 2: return "Medium";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1: return "bg-red-500";
      case 2: return "bg-yellow-500";
      case 3: return "bg-blue-500";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-gray-50">
      {/* Animated background elements */}
      <div className="fixed w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 py-6 sm:py-12 relative z-10">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden border border-white/50">
          {/* Sign Up Form Section */}
          <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-12 relative z-10 transition-all duration-500">
            <div className="text-left font-bold text-xl sm:text-2xl mb-6 sm:mb-8 flex items-center">
              <div className="mr-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2 sm:p-2.5 rounded-xl shadow-md">
                <FaUserAlt className="text-xs sm:text-sm" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold">Nova</span>
              <span className="text-gray-800 font-bold">Auth</span>
            </div>

            <div className="py-3 sm:py-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2 tracking-tight">Create Account</h2>
              <p className="text-gray-600 mb-6 sm:mb-10 text-base sm:text-lg font-light">Join our growing community today</p>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-2xl mb-6 sm:mb-8 border border-red-100 flex items-center animate-fadeIn">
                  <div className="bg-red-100 p-2 rounded-lg mr-3 text-red-500">⚠️</div>
                  <span className="font-medium text-sm sm:text-base">{error}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 sm:space-y-6">
                {/* Name */}
                <div className="bg-white/70 w-full max-w-sm p-3 sm:p-4 flex items-center rounded-2xl border border-gray-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300 group hover:shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2 sm:p-2.5 mr-3 sm:mr-4 text-white shadow-md">
                    <FaUserAlt className="text-xs sm:text-sm" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 font-medium text-sm sm:text-base"
                  />
                </div>

                {/* Email */}
                <div className="bg-white/70 w-full max-w-sm p-3 sm:p-4 flex items-center rounded-2xl border border-gray-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300 group hover:shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2 sm:p-2.5 mr-3 sm:mr-4 text-white shadow-md">
                    <FaRegEnvelope className="text-xs sm:text-sm" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 font-medium text-sm sm:text-base"
                  />
                </div>

                {/* Password */}
                <div className="w-full max-w-sm">
                  <div className="bg-white/70 p-3 sm:p-4 flex items-center rounded-2xl border border-gray-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300 group hover:shadow-lg">
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2 sm:p-2.5 mr-3 sm:mr-4 text-white shadow-md">
                      <MdLockOutline className="text-xs sm:text-sm" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 font-medium text-sm sm:text-base"
                    />
                  </div>

                  {form.password && (
                    <div className="mt-3 px-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="text-xs text-gray-500 font-medium">Password strength:</div>
                        <div className={`text-xs font-semibold ${
                          passwordStrength === 1 ? "text-red-500" :
                          passwordStrength === 2 ? "text-yellow-500" :
                          passwordStrength === 3 ? "text-blue-500" :
                          passwordStrength === 4 ? "text-green-500" : ""
                        }`}>
                          {getPasswordStrengthText()}
                        </div>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                          style={{ width: `${passwordStrength * 25}%` }}
                        ></div>
                      </div>
                      
                      {/* Password requirements hints */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mt-3">
                        <div className={`flex items-center text-xs ${form.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`}>
                          <div className={`mr-1.5 ${form.password.length >= 8 ? 'text-green-500' : 'text-gray-300'}`}>
                            <FaCheckCircle className="text-xs" />
                          </div>
                          At least 8 characters
                        </div>
                        <div className={`flex items-center text-xs ${/[A-Z]/.test(form.password) ? 'text-green-500' : 'text-gray-400'}`}>
                          <div className={`mr-1.5 ${/[A-Z]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`}>
                            <FaCheckCircle className="text-xs" />
                          </div>
                          Uppercase letter
                        </div>
                        <div className={`flex items-center text-xs ${/[0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-400'}`}>
                          <div className={`mr-1.5 ${/[0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`}>
                            <FaCheckCircle className="text-xs" />
                          </div>
                          Number
                        </div>
                        <div className={`flex items-center text-xs ${/[^A-Za-z0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-400'}`}>
                          <div className={`mr-1.5 ${/[^A-Za-z0-9]/.test(form.password) ? 'text-green-500' : 'text-gray-300'}`}>
                            <FaCheckCircle className="text-xs" />
                          </div>
                          Special character
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start w-full max-w-sm mb-1 sm:mb-2">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-indigo-300 text-indigo-600"
                    />
                  </div>
                  <label htmlFor="terms" className="ml-2 text-xs sm:text-sm text-gray-600">
                    I agree to the{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium">
                      Terms of Service
                    </Link> and{" "}
                    <Link href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold w-full max-w-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:from-indigo-700 hover:to-purple-700 overflow-hidden mt-2 sm:mt-4"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2 text-sm sm:text-base">{loading ? "Creating Account..." : "Create Account"}</span>
                    <FaArrowRight className={`text-xs sm:text-sm transform transition-all duration-500 ${isHovering ? "translate-x-1" : ""}`} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                </button>

                <p className="text-center text-xs sm:text-sm text-gray-600 mt-2 w-full">
                  Already have an account?{" "}
                  <Link href="/" className="text-indigo-600 hover:text-indigo-800 hover:underline font-medium transition-colors">
                    Sign in
                  </Link>
                </p>
              </form>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-2/5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-6 sm:p-8 lg:p-12 relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 transform translate-x-16 -translate-y-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500 opacity-10 transform -translate-x-20 translate-y-20 blur-2xl"></div>
            
            {/* Animated glowing dots */}
            <div className="absolute top-1/4 right-1/4 animate-pulse-slow">
              <HiSparkles className="text-2xl sm:text-3xl text-white opacity-20" />
            </div>
            <div className="absolute bottom-1/3 left-1/3 animate-pulse-slow animation-delay-1000">
              <HiSparkles className="text-xl sm:text-2xl text-white opacity-30" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="p-3 sm:p-4 bg-white/20 rounded-2xl inline-flex w-16 sm:w-20 h-16 sm:h-20 items-center justify-center mb-6 sm:mb-10 backdrop-blur-sm shadow-lg border border-white/30 group transition-all duration-300 hover:bg-white/30">
                <FaRegLightbulb className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-purple-200">
                Why Join Us?
              </h2>

              <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
                {[
                  "Access exclusive content and features",
                  "Connect with like-minded people",
                  "Stay updated with latest trends",
                  "Join our growing community"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="mt-0.5 mr-3 bg-white/20 p-1.5 rounded-lg text-white group-hover:bg-white/30 transition-all duration-300">
                      <FaCheckCircle className="text-xs sm:text-sm" />
                    </div>
                    <p className="text-white/90 text-sm sm:text-base group-hover:text-white transition-colors duration-300">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-center mb-2">
                  <div className="text-indigo-200">
                    <HiSparkles className="text-base sm:text-lg mr-2" />
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base">Join over 10,000+ users</p>
                </div>
                <p className="text-white/80 text-xs sm:text-sm">
                  Be part of our fast-growing network of professionals and enthusiasts from around the world.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full text-center mt-6 sm:mt-10">
          <p className="text-gray-600 text-xs sm:text-sm">
            © 2025 NovaAuth. All rights reserved.
          </p>
        </div>
      </main>

      {/* Global styles for custom animations */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: scale(1) translate(0px, 0px); }
          33% { transform: scale(1.1) translate(30px, -50px); }
          66% { transform: scale(0.9) translate(-20px, 20px); }
          100% { transform: scale(1) translate(0px, 0px); }
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-blob {
          animation: blob 10s infinite alternate;
        }
        .animate-shine {
          animation: shine 1.2s forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .hover\:shadow-glow:hover {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}