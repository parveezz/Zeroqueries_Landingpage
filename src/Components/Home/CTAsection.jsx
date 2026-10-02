"use client";

import Link from "next/link";
import { FiLock, FiGlobe } from "react-icons/fi";

export default function FinalCTA() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black overflow-hidden py-14 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14">
            {/* ============== BACKGROUND LAYERED GRADIENTS ============== */}

            {/* Blue glow — top left */}
            <div
                className="pointer-events-none absolute -top-24 sm:-top-40 -left-24 sm:-left-40 w-[350px] sm:w-[600px] lg:w-[750px] h-[350px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(96, 165, 250, 0.45) 0%, rgba(147, 197, 253, 0.2) 40%, rgba(191, 219, 254, 0) 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* Violet + pink glow — bottom right */}
            <div
                className="pointer-events-none absolute -bottom-24 sm:-bottom-40 -right-24 sm:-right-40 w-[400px] sm:w-[700px] lg:w-[850px] h-[400px] sm:h-[700px] lg:h-[850px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(196, 181, 253, 0.2) 35%, rgba(251, 207, 232, 0.15) 55%, rgba(253, 242, 248, 0) 75%)",
                    filter: "blur(90px)",
                }}
            />

            {/* Subtle violet hint — mid right */}
            <div
                className="pointer-events-none absolute top-1/2 -right-20 sm:-right-32 -translate-y-1/2 w-[280px] sm:w-[400px] lg:w-[500px] h-[280px] sm:h-[400px] lg:h-[500px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(196, 181, 253, 0.08) 50%, rgba(237, 233, 254, 0) 75%)",
                    filter: "blur(70px)",
                }}
            />

            {/* ============== CONTENT ============== */}
            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Heading */}
                <h2 className="text-[28px] xs:text-3xl sm:text-5xl lg:text-[56px] font-light tracking-tight text-black leading-[1.15]">
                    Start building with the{" "}
                    <span className="text-[#2563EB]">
                        #1 AI-native analytics platform
                    </span>
                </h2>

                {/* Description */}
                <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed font-light max-w-xl mx-auto">
                    Book a live session to explore ZeroQueries on your own data — no
                    pipelines, no setup, no risk.
                </p>

                {/* Action buttons */}
                <div className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center w-full max-w-xs sm:max-w-none sm:w-auto rounded-full bg-black text-white px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-normal hover:bg-gray-800 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm"
                    >
                        Book a Call
                    </Link>

                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center w-full max-w-xs sm:max-w-none sm:w-auto rounded-full bg-white text-black px-7 sm:px-8 py-3 sm:py-3.5 text-sm sm:text-base font-normal border border-gray-200 hover:border-gray-400 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Try for Free
                    </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-8 gap-y-2.5 text-xs sm:text-sm text-black/60 font-light">
                    <div className="inline-flex items-center gap-1.5 sm:gap-2">
                        <FiLock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>SOC 2 Type II</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 sm:gap-2">
                        <FiGlobe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        <span>Globally Deployed</span>
                    </div>
                </div>
            </div>
        </section>
    );
}