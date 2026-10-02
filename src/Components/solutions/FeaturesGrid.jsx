"use client";

import { useState, useEffect, useRef } from "react";
import {
    FiMessageSquare,
    FiShield,
    FiBarChart2,
    FiTerminal,
    FiZap,
} from "react-icons/fi";

const FEATURES = [
    {
        number: "01",
        icon: FiTerminal,
        title: "Natural Language Queries",
        description:
            "Ask questions in plain English and instantly retrieve insights from your databases.",
    },
    {
        number: "02",
        icon: FiShield,
        title: "Automatic Query Generation",
        description:
            "An AI SQL query generator that converts natural language into optimized database queries instantly.",
    },
    {
        number: "03",
        icon: FiBarChart2,
        title: "Interactive Charts",
        description:
            "Results are presented through intuitive charts and visualizations.",
    },
    {
        number: "04",
        icon: FiMessageSquare,
        title: "Conversational Interface",
        description:
            "A conversational database query interface that makes data accessible to everyone in the organization.",
    },
];

export default function FeaturesGrid() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        let current = -1;
        const tick = () => {
            current = (current + 1) % (FEATURES.length + 1);
            setActiveIndex(current);
            setTimeout(tick, current === FEATURES.length ? 1500 : 1000);
        };
        const start = setTimeout(tick, 600);
        return () => clearTimeout(start);
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gray-50 font-sans text-black lg:h-[calc(100vh-70px)] lg:min-h-[calc(100vh-70px)] lg:flex lg:flex-col lg:justify-center py-12 sm:py-16 lg:py-0 px-6 sm:px-10 lg:px-14 overflow-hidden"
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl w-full">
                {/* ================= HEADING ================= */}
                <div className="max-w-4xl mb-6 sm:mb-8 lg:mb-10">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Features
                    </span>

                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[46px] font-light tracking-tight text-black leading-[1.1]">
                        Everything you need.
                        <br />
                        <span className="text-black/40">Nothing you don&apos;t.</span>
                    </h2>
                </div>

                {/* ================= DESKTOP: RISING STAIRCASE ================= */}
                <div className="hidden lg:block relative">
                    {/* Diagonal dashed threads */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1400 400"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M 320 280 Q 380 240 440 240 Q 500 240 520 200"
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.15)"
                            strokeWidth="1.5"
                            strokeDasharray="5 5"
                        />
                        <path
                            d="M 700 200 Q 760 160 820 160 Q 880 160 900 120"
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.15)"
                            strokeWidth="1.5"
                            strokeDasharray="5 5"
                        />
                        <path
                            d="M 1080 120 Q 1140 80 1200 80 L 1280 80"
                            fill="none"
                            stroke="rgba(0, 0, 0, 0.15)"
                            strokeWidth="1.5"
                            strokeDasharray="5 5"
                        />
                    </svg>

                    <div className="grid grid-cols-4 gap-6 relative">
                        {FEATURES.map((feature, i) => (
                            <div
                                key={feature.title}
                                className="relative transition-all duration-500 opacity-100 translate-y-0"
                                style={{
                                    marginTop: i === 0 ? 90 : i === 1 ? 60 : i === 2 ? 30 : 0,
                                }}
                            >
                                <StaircaseCard
                                    feature={feature}
                                    isActive={activeIndex === i}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= MOBILE + TABLET ================= */}
                <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {FEATURES.map((feature) => (
                        <div
                            key={feature.title}
                            className="transition-all duration-300 opacity-100 translate-y-0"
                        >
                            <MobileCard feature={feature} />
                        </div>
                    ))}
                </div>

                {/* ================= NOTE BELOW ================= */}
                <div className="mt-8 sm:mt-10 lg:mt-10 flex justify-center">
                    <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-2.5">
                        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-black">
                            <FiZap className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
                            <span className="absolute inset-0 rounded-full bg-black opacity-30 animate-ping" />
                        </div>
                        <p className="text-sm font-light text-black/70">
                            <span className="font-normal text-black">
                                One flow, one product.
                            </span>{" "}
                            From question to insight.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============== STAIRCASE CARD ==============
function StaircaseCard({ feature, isActive }) {
    const Icon = feature.icon;
    const { number } = feature;

    return (
        <div
            className={`group relative flex flex-col rounded-3xl border bg-white p-5 xl:p-6 transition-all duration-500 min-h-[200px] xl:min-h-[220px] overflow-hidden ${isActive
                ? "border-black scale-[1.02]"
                : "border-gray-200 hover:border-gray-400"
                }`}
            style={
                isActive
                    ? {
                        boxShadow: "0 24px 50px -20px rgba(0, 0, 0, 0.25)",
                    }
                    : undefined
            }
        >
            {/* Giant ghost number */}
            <span
                className={`absolute -top-3 right-3 text-[120px] font-light leading-none tracking-tighter select-none pointer-events-none transition-colors duration-500 ${isActive ? "text-black/10" : "text-black/[0.04]"
                    }`}
                aria-hidden="true"
            >
                {number}
            </span>

            {/* Top accent bar */}
            <div
                className={`absolute top-0 left-6 right-6 h-[3px] rounded-full bg-black transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
            />

            {/* Icon */}
            <div
                className={`relative flex items-center justify-center w-11 h-11 rounded-2xl mb-4 xl:mb-5 transition-all duration-500 ${isActive
                    ? "bg-black text-white scale-105 rotate-3"
                    : "bg-gray-100 text-black/80"
                    }`}
            >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
            </div>

            {/* Title */}
            <h3 className="relative text-base xl:text-lg font-medium tracking-tight text-black leading-snug">
                {feature.title}
            </h3>

            {/* Description */}
            <p className="relative mt-3 text-[13px] xl:text-sm text-black/60 leading-relaxed font-light flex-1">
                {feature.description}
            </p>

            {/* Footer */}
            <div className="relative mt-6 flex items-center justify-between">
                <span
                    className={`text-[10px] font-medium tracking-[0.15em] uppercase transition-colors duration-500 ${isActive ? "text-black" : "text-black/35"
                        }`}
                >
                    Step {number}
                </span>

                <div
                    className={`h-[2px] rounded-full bg-black transition-all duration-700 ${isActive ? "w-12 opacity-100" : "w-6 opacity-30"
                        }`}
                />
            </div>
        </div>
    );
}

// ============== MOBILE CARD ==============
function MobileCard({ feature }) {
    const Icon = feature.icon;
    const { number } = feature;

    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:border-gray-400 overflow-hidden min-h-[220px]">
            <span
                className="absolute -top-2 right-2 text-[72px] font-light leading-none tracking-tighter select-none pointer-events-none text-black/[0.05]"
                aria-hidden="true"
            >
                {number}
            </span>

            <div className="absolute top-0 left-4 right-4 h-[2px] rounded-full bg-black opacity-40" />

            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl mb-4 bg-gray-100 text-black/80">
                <Icon className="h-4 w-4" strokeWidth={1.75} />
            </div>

            <h3 className="relative text-[15px] font-medium tracking-tight text-black leading-snug">
                {feature.title}
            </h3>

            <p className="relative mt-2 text-[13px] text-black/60 leading-relaxed font-light flex-1">
                {feature.description}
            </p>

            <div className="relative mt-4 flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                    Step {number}
                </span>
                <div className="w-6 h-[2px] rounded-full bg-black opacity-40" />
            </div>
        </div>
    );
}