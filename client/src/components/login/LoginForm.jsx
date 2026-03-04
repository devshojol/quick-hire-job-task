"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineEnvelope,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import logo from "@/src/assets/images/Logo.png";

const CREDENTIALS = { email: "admin", password: "12345678" };

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("admin");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
        router.push("/admin");
      } else {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#F8F8FD]">
      {/* Mobile logo */}
      <div className="lg:hidden mb-8">
        <Link href="/">
          <Image src={logo} alt="QuickHire" width={140} height={33} />
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#25324B] mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to your admin account to continue.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white border border-[#D6DDEB] p-7 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Email / Username
              </label>
              <div className="relative">
                <HiOutlineEnvelope
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your email"
                  autoComplete="username"
                  className={`w-full border pl-10 pr-4 py-3 text-sm text-[#25324B] focus:outline-none focus:border-primary placeholder-gray-400 transition-colors ${
                    error ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
                  }`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#515B6F] mb-1.5">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={`w-full border pl-10 pr-11 py-3 text-sm text-[#25324B] focus:outline-none focus:border-primary placeholder-gray-400 transition-colors ${
                    error ? "border-red-400 bg-red-50" : "border-[#D6DDEB]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <HiOutlineEyeSlash size={18} />
                  ) : (
                    <HiOutlineEye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 inline-block" />
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 font-bold hover:bg-indigo-700 transition-colors disabled:opacity-60 text-sm mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>

        {/* Credential hint */}
        <div className="mt-4 border border-dashed border-primary/30 bg-primary/5 px-4 py-3 text-xs text-gray-500 text-center">
          Demo credentials:{" "}
          <span className="font-semibold text-primary">admin</span>
          {" / "}
          <span className="font-semibold text-primary">12345678</span>
        </div>

        {/* Back link */}
        <p className="text-center mt-5">
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-primary font-medium transition-colors"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
