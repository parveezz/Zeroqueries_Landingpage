"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function LoginPage() {
  const router = useRouter();
  const { lang } = useLanguage();
  const isAr = lang === "ar";

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
      setError(err.message || (isAr ? "حدث خطأ ما. يرجى المحاولة مرة أخرى." : "Something went wrong. Try again."));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-70px)] w-full bg-gray-50 font-sans text-black py-8 sm:py-16 px-4 sm:px-8 lg:px-14 flex items-center justify-center overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 w-full max-w-[440px]">
        {/* Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white p-5 xs:p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          {/* Brand header */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-normal tracking-tight text-black">
              {isAr ? "مرحباً بعودتك" : "Welcome back"}
            </h1>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-black/60 font-light">
              {isAr
                ? "سجل الدخول للوصول إلى مساحة عمل ZeroQueries الخاصة بك"
                : "Log in to access your ZeroQueries workspace"}
            </p>
          </div>

          {isSuccess ? (
            <div className="text-center py-6 sm:py-8">
              <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 border border-gray-200 text-black mb-4">
                <FiCheck className="w-6 h-6" strokeWidth={2.5} />
              </div>
              <h2 className="text-lg font-medium text-black">
                {isAr ? "تم تسجيل الدخول بنجاح" : "You're signed in"}
              </h2>
              <p className="mt-1 text-xs text-black/60 font-light">
                {isAr ? "تم الدخول كـ " : "Logged in as "}
                <span className="font-normal text-black">{email}</span>
              </p>
              <Link
                href="/dashboard"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-black px-5 py-2.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
              >
                {isAr ? "المتابعة إلى لوحة التحكم" : "Continue to dashboard"}
              </Link>
            </div>
          ) : (
            <>
              {/* ================= FORM (primary) ================= */}
              <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-medium text-black/80 mb-1.5"
                  >
                    {isAr ? "البريد الإلكتروني للعمل" : "Work Email"}
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
                      className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
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
                      {isAr ? "كلمة المرور" : "Password"}
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-[11px] font-normal text-black hover:underline underline-offset-4"
                    >
                      {isAr ? "نسيت كلمة المرور؟" : "Forgot password?"}
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
                      className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-black/40 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                      aria-label={showPassword ? (isAr ? "إخفاء كلمة المرور" : "Hide password") : (isAr ? "إظهار كلمة المرور" : "Show password")}
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
                <div className="flex items-center justify-between pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 accent-black"
                    />
                    <span className="text-xs text-black/70">
                      {isAr ? "تذكر هذا الجهاز" : "Remember this device"}
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
                  className="w-full mt-2 h-11 sm:h-12 rounded-xl bg-black px-4 text-sm font-medium text-white hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-wait focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm"
                >
                  {isLoading
                    ? (isAr ? "جاري تسجيل الدخول…" : "Signing in…")
                    : (isAr ? "تسجيل الدخول" : "Sign In")}
                </button>
              </form>

              {/* Sign up prompt */}
              <div className="mt-5 sm:mt-6 text-center text-xs text-black/60 font-light leading-relaxed">
                {isAr ? "ليس لديك حساب؟ " : "Don't have an account? "}
                <Link
                  href="/demo"
                  className="font-medium text-black hover:underline underline-offset-4"
                >
                  {isAr ? "احجز عرضاً توضيحياً" : "Book a demo"}
                </Link>{" "}
                {isAr ? "أو " : "or "}
                <Link
                  href="/contact"
                  className="font-medium text-black hover:underline underline-offset-4"
                >
                  {isAr ? "تواصل مع المبيعات" : "Contact sales"}
                </Link>
              </div>
            </>
          )}
        </div>

        {/* Security badge */}
        <p className="mt-5 sm:mt-6 text-center text-[11px] text-black/40 font-light flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
          <FiLock className="w-3 h-3 text-black/40 shrink-0" />
          <span>{isAr ? "معتمد بمعيار SOC 2 Type II" : "SOC 2 Type II Certified"}</span>
          <span className="hidden xs:inline">·</span>
          <span>{isAr ? "تشفير SSL 256-bit" : "256-bit SSL Encrypted"}</span>
        </p>
      </div>
    </main>
  );
}