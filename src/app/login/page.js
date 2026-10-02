"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      setIsSuccess(true);
      // Real redirect: setTimeout(() => router.push("/dashboard"), 1200);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-70px)] w-full bg-gray-50 font-sans text-black py-12 sm:py-16 px-6 sm:px-10 lg:px-14 flex items-center justify-center overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-[440px]">

        {/* Card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-7 sm:p-9">
          {/* Brand header */}
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 rounded-md"
            >
              <Image
                src="/zerologo.png"
                alt="ZeroQueries"
                width={48}
                height={32}
                className="h-auto w-auto"
                priority
              />
            </Link>
            <h1 className="text-2xl sm:text-[26px] font-normal tracking-tight text-black">
              Welcome back
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-black/60 font-light">
              Log in to access your ZeroQueries workspace
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-8">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-black mb-4">
                <FiCheck className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-medium text-black">
                You&apos;re signed in
              </h2>
              <p className="mt-1 text-xs text-black/60 font-light">
                Logged in as{" "}
                <span className="font-normal text-black">{email}</span>
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                Continue to dashboard
              </Link>
            </div>
          ) : (
            <>
              {/* ================= FORM (primary) ================= */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-black/80 mb-1.5"
                  >
                    Work Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      htmlFor="password"
                      className="block text-xs font-medium text-black/80"
                    >
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-normal text-black hover:underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-black/40 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-4 h-4" />
                      ) : (
                        <FiEye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 accent-black"
                    />
                    <span className="text-xs text-black/70">
                      Remember this device
                    </span>
                  </label>
                </div>

                {/* Error banner */}
                {error && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5">
                    <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-red-700 font-normal leading-relaxed">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 rounded-xl bg-black py-2.5 px-4 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  {isLoading ? "Signing in…" : "Sign In"}
                </button>
              </form>

              {/* ================= DIVIDER ================= */}
              <div className="relative flex items-center justify-center my-6">
                <div className="w-full border-t border-gray-200" />
                <span className="absolute bg-white px-3 text-[11px] font-medium tracking-wider text-black/40 uppercase">
                  or continue with
                </span>
              </div>

              {/* ================= SSO BUTTONS (moved below) ================= */}
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    // window.location.href = "/api/auth/google";
                  }}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs sm:text-sm font-medium text-black hover:bg-gray-50 hover:border-gray-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <FcGoogle className="w-4 h-4 shrink-0" />
                  <span>Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // window.location.href = "/api/auth/microsoft";
                  }}
                  className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-2.5 px-4 text-xs sm:text-sm font-medium text-black hover:bg-gray-50 hover:border-gray-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                >
                  <FaMicrosoft className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>Continue with Microsoft</span>
                </button>
              </div>

              {/* Sign up prompt */}
              <div className="mt-6 text-center text-xs text-black/60 font-light">
                Don&apos;t have an account?{" "}
                <Link
                  href="/demo"
                  className="font-medium text-black hover:underline underline-offset-4"
                >
                  Book a demo
                </Link>{" "}
                or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-black hover:underline underline-offset-4"
                >
                  Contact sales
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Security badge */}
        <p className="mt-6 text-center text-[11px] text-black/40 font-light flex items-center justify-center gap-1.5">
          <FiLock className="w-3 h-3 text-black/40" />
          <span>SOC 2 Type II Certified · 256-bit SSL Encrypted</span>
        </p>
      </div>
    </main>
  );
}