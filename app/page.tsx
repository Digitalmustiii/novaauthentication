"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { useAuthContext } from "@/context/AuthProvider";
import {
  FaGithub,
  FaLinkedin,
  FaGoogle,
  FaRegEnvelope,
  FaArrowRight,
  FaRegLightbulb,
  FaUserAlt,
} from "react-icons/fa";
import { MdLockOutline } from "react-icons/md";
import { HiSparkles } from "react-icons/hi";

export default function Home() {
  const { signin, error } = useAuthContext();
  const [isHovering, setIsHovering] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [form, setForm] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await signin(form.email, form.password);
    } catch {
      // error set in context
    } finally {
      setSubmitting(false);
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

      <div className="flex flex-col items-center justify-center w-full py-12 relative z-10">
        <main className="w-full max-w-5xl mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl flex flex-col md:flex-row w-full overflow-hidden border border-white/50 mb-10">
          {/* Sign In Section */}
          <div className="w-full md:w-3/5 p-8 md:p-12 relative z-10 transition-all duration-500">
            <div className="text-left font-bold text-2xl mb-8 flex items-center">
              <div className="mr-3 bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-2.5 rounded-xl shadow-md">
                <FaUserAlt className="text-sm" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 font-extrabold">Nova</span>
              <span className="text-gray-800 font-bold">Auth</span>
            </div>

            <div className="py-4 md:py-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Welcome back</h2>
              <p className="text-gray-600 mb-10 text-lg font-light">Let's get you back into your account</p>

              {/* Error message */}
              {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 border border-red-100 flex items-center animate-fadeIn">
                  <div className="bg-red-100 p-2 rounded-lg mr-3 text-red-500">⚠️</div>
                  <span className="font-medium">{error}</span>
                </div>
              )}

              {/* Social Icons */}
              <div className="flex justify-center my-8 space-x-5">
                {["google", "github", "linkedin"].map((provider) => (
                  <button
                    key={provider}
                    className="transition-all duration-300 bg-white hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 text-gray-700 hover:text-white rounded-2xl p-4 shadow-lg flex items-center justify-center w-16 h-16 hover:scale-110 border border-gray-100 hover:border-transparent group relative"
                    onMouseEnter={() => setActiveIcon(provider)}
                    onMouseLeave={() => setActiveIcon(null)}
                  >
                    {provider === "google" && (
                      <FaGoogle className={`text-xl transition-colors duration-300 ${activeIcon === provider ? "text-white" : "text-gray-700"}`} />
                    )}
                    {provider === "github" && (
                      <FaGithub className={`text-xl transition-colors duration-300 ${activeIcon === provider ? "text-white" : "text-gray-700"}`} />
                    )}
                    {provider === "linkedin" && (
                      <FaLinkedin className={`text-xl transition-colors duration-300 ${activeIcon === provider ? "text-white" : "text-gray-700"}`} />
                    )}
                    <span className={`absolute -bottom-8 text-xs font-medium transition-all duration-300 ${
                      activeIcon === provider ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
                    } capitalize`}>
                      {provider}
                    </span>
                  </button>
                ))}
              </div>

              <div className="relative my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or continue with email</span>
                </div>
              </div>

              {/* Input Fields */}
              <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                {/* Email */}
                <div className="bg-white/70 w-full max-w-sm p-4 flex items-center rounded-2xl mb-2 border border-gray-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300 group hover:shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2.5 mr-4 text-white shadow-md">
                    <FaRegEnvelope className="text-sm" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Password */}
                <div className="bg-white/70 w-full max-w-sm p-4 flex items-center rounded-2xl mb-2 border border-gray-100 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all duration-300 group hover:shadow-lg">
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2.5 mr-4 text-white shadow-md">
                    <MdLockOutline className="text-sm" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400 font-medium"
                  />
                </div>

                {/* Remember & Forgot Password */}
                <div className="flex justify-between w-full max-w-sm mb-2 text-sm">
                  <label className="flex items-center text-gray-600 cursor-pointer group">
                    <div className="relative">
                      <input type="checkbox" className="hidden peer" />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-md flex items-center justify-center peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-all duration-300 group-hover:border-indigo-400"></div>
                      <div className="absolute inset-0 text-white flex items-center justify-center opacity-0 peer-checked:opacity-100 transition-opacity duration-300">✓</div>
                    </div>
                    <span className="ml-2 group-hover:text-indigo-600 transition-colors duration-300">Remember me</span>
                  </label>
                  <a href="/forgot-password" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors hover:underline">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold w-full max-w-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:from-indigo-700 hover:to-purple-700 overflow-hidden mt-4"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <span className="relative z-10 flex items-center">
                    <span className="mr-2">{submitting ? "Signing in..." : "Sign In"}</span>
                    <FaArrowRight className={`transform transition-all duration-500 ${isHovering ? "translate-x-1" : ""}`} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
                </button>
              </form>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white p-8 md:p-12 relative overflow-hidden">
            {/* Abstract shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white opacity-10 transform translate-x-16 -translate-y-16 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500 opacity-10 transform -translate-x-20 translate-y-20 blur-2xl"></div>
            
            {/* Animated glowing dots */}
            <div className="absolute top-1/4 right-1/4 animate-pulse-slow">
              <HiSparkles className="text-3xl text-white opacity-20" />
            </div>
            <div className="absolute bottom-1/3 left-1/3 animate-pulse-slow animation-delay-1000">
              <HiSparkles className="text-2xl text-white opacity-30" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-center">
              <div className="p-4 bg-white/20 rounded-2xl inline-flex w-20 h-20 items-center justify-center mb-10 backdrop-blur-sm shadow-lg border border-white/30 group transition-all duration-300 hover:bg-white/30">
                <FaRegLightbulb className="text-4xl group-hover:scale-110 transition-transform duration-300" />
              </div>

              <h2 className="text-5xl font-bold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-purple-200">
                New Here?
              </h2>
              <p className="mb-12 text-lg text-white/90 leading-relaxed font-light">
                Join our community and discover a world of opportunities and connections. It only takes a minute!
              </p>

              <button
                onClick={() => (window.location.href = "/signup")}
                className="relative group overflow-hidden bg-transparent backdrop-blur-sm border-2 border-white/70 rounded-2xl px-8 py-4 inline-block font-semibold hover:bg-white/10 transition-all duration-500 text-center w-full max-w-xs hover:shadow-glow hover:border-white"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <span>Create Account</span>
                  <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-3 group-hover:translate-x-0 transition-all duration-300" />
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </button>
            </div>
          </div>
          </div>
          
          <p className="text-gray-600 text-sm text-center mt-6">
            By signing in, you agree to our{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium">Terms of Service</a> and{" "}
            <a href="#" className="text-indigo-600 hover:text-indigo-800 hover:underline transition-colors font-medium">Privacy Policy</a>
          </p>
        </main>
      </div>

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
      `}</style>
    </div>
  );
}