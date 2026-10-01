"use client";

import Link from "next/link";
import { FiLock, FiGlobe } from "react-icons/fi";

export default function FinalCTA() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black overflow-hidden py-24 sm:py-32 px-6 sm:px-10 lg:px-14">
            {/* ============== BACKGROUND LAYERED GRADIENTS ============== */}

            {/* Blue glow — top left */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(96, 165, 250, 0.45) 0%, rgba(147, 197, 253, 0.2) 40%, rgba(191, 219, 254, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Violet + pink glow — bottom right */}
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 w-[850px] h-[850px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(167, 139, 250, 0.4) 0%, rgba(196, 181, 253, 0.2) 35%, rgba(251, 207, 232, 0.15) 55%, rgba(253, 242, 248, 0) 75%)",
                    filter: "blur(110px)",
                }}
            />

            {/* Subtle violet hint — mid right */}
            <div
                className="pointer-events-none absolute top-1/2 -right-32 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.18) 0%, rgba(196, 181, 253, 0.08) 50%, rgba(237, 233, 254, 0) 75%)",
                    filter: "blur(90px)",
                }}
            />

            {/* ============== CONTENT ============== */}
            <div className="relative z-10 mx-auto max-w-3xl text-center">
                {/* Heading */}
                <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-light tracking-tight text-black leading-[1.1]">
                    Start building with the{" "}
                    <span className="text-[#2563EB]">
                        #1 AI-native analytics platform
                    </span>
                </h2>

                {/* Description */}
                <p className="mt-6 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-xl mx-auto">
                    Book a live session to explore ZeroQueries on your own data — no
                    pipelines, no setup, no risk.
                </p>

                {/* Action buttons */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                    <Link
                        href="/demo"
                        className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-black text-white px-8 py-3.5 text-sm sm:text-base font-normal hover:bg-gray-800 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Book a Call
                    </Link>

                    <Link
                        href="/signup"
                        className="inline-flex items-center justify-center w-full sm:w-auto rounded-full bg-white text-black px-8 py-3.5 text-sm sm:text-base font-normal border border-gray-200 hover:border-gray-400 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    >
                        Try for Free
                    </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-black/60 font-light">
                    <div className="inline-flex items-center gap-2">
                        <FiLock className="h-4 w-4" />
                        <span>SOC 2 Type II</span>
                    </div>
                    <div className="inline-flex items-center gap-2">
                        <FiGlobe className="h-4 w-4" />
                        <span>Globally Deployed</span>
                    </div>
                </div>
            </div>
        </section>
    );
}