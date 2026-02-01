"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      setMessage(data.message || "Logged in!");
    } catch (err) {
      setMessage("Error connecting to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1EB53A] via-[#00A3DD] to-[#FCD116] px-4 py-8 relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#00A3DD] rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-[#1EB53A] rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 sm:p-10 border border-gray-100">
        {/* NEAS Heading */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-wide">
            NEAS
          </h1>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#1EB53A] via-[#FCD116] to-[#00A3DD] rounded-xl shadow-lg flex items-center justify-center">
            <span className="text-white text-xl sm:text-2xl font-bold">NE</span>
          </div>
        </div>

        {/* Welcome text */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Sign in to continue
          </p>
        </div>

        {/* Error message */}
        {message && (
          <div className="mb-6 p-3 sm:p-4 rounded-lg bg-red-50 border border-red-200">
            <p className="text-center text-red-600 text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400 group-focus-within:text-[#00A3DD] transition-colors" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 sm:pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3DD] focus:border-transparent focus:bg-white transition-all duration-200 text-sm sm:text-base"
                required
              />
            </div>
          </div>

          {/* Password field */}
          <div className="space-y-2">
            <label className="block text-gray-700 font-medium text-sm">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#00A3DD] transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-11 sm:pl-12 pr-11 sm:pr-12 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A3DD] focus:border-transparent focus:bg-white transition-all duration-200 text-sm sm:text-base"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center text-gray-600 cursor-pointer group">
              <input
                type="checkbox"
                className="mr-2 rounded border-gray-300 text-[#00A3DD] focus:ring-[#00A3DD] focus:ring-offset-0"
              />
              <span className="group-hover:text-gray-800 transition-colors text-xs sm:text-sm">
                Remember me
              </span>
            </label>
            <a
              href="/reset-password"
              className="text-[#00A3DD] hover:text-[#1EB53A] transition-colors font-medium text-xs sm:text-sm"
            >
              Forgot password?
            </a>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#1EB53A] to-[#00A3DD] text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-8 text-center text-xs sm:text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#1EB53A] hover:text-[#00A3DD] font-semibold transition-colors"
          >
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}