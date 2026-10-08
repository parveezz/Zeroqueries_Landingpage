"use client";

import Link from "next/link";
import { FiLock, FiGlobe } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function FinalCTA() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    return (
        <section
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full bg-white font-sans text-black overflow-hidden py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14"
        >
            {/* ============== BACKGROUND LAYERED GRADIENTS ============== */}

            {/* Dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* Teal glow — top left */}
            <div
                className="pointer-events-none absolute -top-32 -left-32 w-[400px] sm:w-[600px] lg:w-[750px] h-[400px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(19, 78, 74, 0.18) 0%, rgba(19, 78, 74, 0.08) 40%, transparent 70%)",
                    filter: "blur(90px)",
                }}
            />

            {/* Midnight + soft slate glow — bottom right */}
            <div
                className="pointer-events-none absolute -bottom-32 -right-32 w-[450px] sm:w-[700px] lg:w-[850px] h-[450px] sm:h-[700px] lg:h-[850px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(15, 23, 42, 0.15) 0%, rgba(19, 78, 74, 0.08) 40%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Subtle teal hint — mid right */}
            <div
                className="pointer-events-none absolute top-1/2 -right-20 sm:-right-32 -translate-y-1/2 w-[280px] sm:w-[400px] lg:w-[500px] h-[280px] sm:h-[400px] lg:h-[500px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(19, 78, 74, 0.10) 0%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* ============== CONTENT ============== */}
            <div className="relative z-10 mx-auto max-w-3xl text-center">

                {/* Eyebrow */}
                <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#134e4a]" />
                    {isAr ? "ابدأ الآن" : "Get Started"}
                </span>

                {/* Heading */}
                <h2 className="mt-4 text-[28px] xs:text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.12]">
                    {isAr ? (
                        <>
                            ابدأ العمل مع{" "}
                            <span className="text-[#134e4a] italic font-serif">
                                منصة التحليلات الأولى بالذكاء الاصطناعي
                            </span>
                        </>
                    ) : (
                        <>
                            Start building with the{" "}
                            <span className="text-[#134e4a] italic font-serif">
                                #1 AI-native analytics platform
                            </span>
                        </>
                    )}
                </h2>

                {/* Description */}
                <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-black/60 leading-relaxed font-light max-w-xl mx-auto">
                    {isAr
                        ? "احجز جلسة حية لاستكشاف ZeroQueries على بياناتك الخاصة — بدون خطوط بيانات، بدون إعداد، وبدون أي مخاطرة."
                        : "Book a live session to explore ZeroQueries on your own data — no pipelines, no setup, no risk."}
                </p>

                {/* Action buttons */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center w-full max-w-xs sm:max-w-none sm:w-auto rounded-full bg-black text-white px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-normal hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm"
                    >
                        {isAr ? "احجز مكالمة" : "Book a Call"}
                    </Link>

                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center w-full max-w-xs sm:max-w-none sm:w-auto rounded-full bg-white text-black px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-normal border border-gray-200 hover:border-[#134e4a]/40 hover:text-[#134e4a] active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        {isAr ? "جرّب مجاناً" : "Try for Free"}
                    </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-x-5 sm:gap-x-7 gap-y-3 text-xs sm:text-sm text-black/55 font-light">
                    <div className="inline-flex items-center gap-2">
                        <FiLock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#134e4a]" />
                        <span>SOC 2 Type II</span>
                    </div>
                    <span className="hidden sm:inline-block w-px h-4 bg-gray-200" />
                    <div className="inline-flex items-center gap-2">
                        <FiGlobe className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#134e4a]" />
                        <span>{isAr ? "انتشار عالمي" : "Globally Deployed"}</span>
                    </div>
                </div>

            </div>
        </section>
    );
}