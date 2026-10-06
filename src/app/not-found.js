"use client";

import Link from "next/link";
import { FiArrowRight, FiHome, FiSearch } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function NotFound() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    return (
        <section className="relative w-full min-h-screen bg-gray-50 font-sans text-black overflow-hidden flex items-center justify-center py-16 px-6 sm:px-10 lg:px-14">
            {/* Soft neutral glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-gray-200/50 via-gray-100/30 to-transparent blur-[110px] rounded-full" />

            {/* Dot Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="relative z-10 mx-auto max-w-3xl w-full text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-black text-xs font-medium tracking-[0.2em] uppercase mb-8">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    {isAr ? "خطأ 404" : "Error 404"}
                </div>

                {/* Giant 404 */}
                <h1 className="text-[120px] sm:text-[160px] lg:text-[200px] font-light leading-none tracking-tighter text-black">
                    404
                </h1>

                {/* Heading */}
                <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                    {isAr ? "لم نتمكن من العثور على هذه الصفحة" : "This page couldn't be found"}
                </h2>

                {/* Description */}
                <p className="mt-5 text-base sm:text-lg text-black leading-relaxed font-light max-w-xl mx-auto">
                    {isAr
                        ? "الصفحة التي تبحث عنها غير موجودة، أو تم نقلها، أو غير متاحة مؤقتاً. دعنا نساعدك في العودة للمسار الصحيح."
                        : "The page you're looking for doesn't exist, was moved, or is temporarily unavailable. Let's get you back on track."}
                </p>

                {/* Action buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl bg-black text-white px-6 py-3.5 text-sm sm:text-base font-normal hover:bg-gray-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <FiHome className="h-4 w-4" />
                        <span>{isAr ? "العودة للرئيسية" : "Back to Home"}</span>
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-xl border border-gray-300 bg-white text-black px-6 py-3.5 text-sm sm:text-base font-normal hover:bg-gray-100 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        <span>{isAr ? "تواصل مع الدعم" : "Contact Support"}</span>
                        <FiArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Helpful links */}
                <div className="mt-14 pt-10 border-t border-gray-200">
                    <p className="text-xs font-medium tracking-[0.2em] text-black uppercase mb-5">
                        {isAr ? "وجهات شائعة" : "Popular Destinations"}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm font-light text-black">
                        <Link href="/platform" className="hover:underline">
                            {isAr ? "المنصة" : "Platform"}
                        </Link>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <Link href="/solutions" className="hover:underline">
                            {isAr ? "الحلول" : "Solutions"}
                        </Link>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <Link href="/pricing" className="hover:underline">
                            {isAr ? "الأسعار" : "Pricing"}
                        </Link>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <Link href="/demo" className="hover:underline">
                            {isAr ? "عرض تجريبي" : "Book a Demo"}
                        </Link>
                        <span className="text-gray-300 hidden sm:inline">•</span>
                        <Link href="/resources" className="hover:underline">
                            {isAr ? "الموارد" : "Resources"}
                        </Link>
                    </div>
                </div>

                {/* Search hint */}
                <div className="mt-12 inline-flex items-center gap-2 text-xs text-black font-light">
                    <FiSearch className="h-3.5 w-3.5" />
                    <span>
                        {isAr
                            ? "هل تبحث عن شيء محدد؟ يمكنك استكشاف القائمة في الأعلى."
                            : "Looking for something specific? Try exploring the navigation menu."}
                    </span>
                </div>
            </div>
        </section>
    );
}