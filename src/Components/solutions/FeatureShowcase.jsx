"use client";

import { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiPause, FiPlay } from "react-icons/fi";
import { FeatureNavigation } from "./FeatureNavigation";
import { FeaturePreview } from "./FeaturePreview";

// ============================================================================
// FEATURE DATA — swap this array to change all content
// ============================================================================
export const FEATURES = [
    {
        id: "conversational",
        title: "Conversational UI",
        description:
            "Ask questions in plain English. Get answers as charts, tables, or text — inside one conversation.",
        preview: "conversational",
    },
    {
        id: "insights",
        title: "AI Insights",
        description:
            "Automated analysis surfaces what changed, why, and what to do next — before you ask.",
        preview: "insights",
    },
    {
        id: "agentic",
        title: "Agentic Apps",
        description:
            "Ship self-service workflows that run automatically on a schedule or trigger.",
        preview: "agentic",
    },
    {
        id: "vizpads",
        title: "Vizpads & GenAI Narratives",
        description:
            "A flexible canvas where data, charts, and AI-generated narratives live side by side.",
        preview: "vizpads",
    },
    {
        id: "connect",
        title: "Connect",
        description:
            "Plug into every warehouse, CRM, and document store your team already runs.",
        preview: "connect",
    },
    {
        id: "automl",
        title: "AutoML",
        description:
            "Train, evaluate, and deploy models without leaving the ZeroQueries workspace.",
        preview: "automl",
    },
];

// ============================================================================
// FEATURE SHOWCASE
// ============================================================================
export default function FeatureShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const prefersReducedMotion = usePrefersReducedMotion();

    // Auto-advance features every 5 seconds unless paused or reduced motion requested
    useEffect(() => {
        if (isPaused || prefersReducedMotion) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % FEATURES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [isPaused, prefersReducedMotion]);

    const handleSelect = (index) => {
        setActiveIndex(index);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? FEATURES.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % FEATURES.length);
    };

    return (
        <section
            aria-labelledby="feature-showcase-heading"
            className="relative w-full bg-gray-50 font-sans text-black overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            {/* Orbit decoration */}
            <OrbitDecoration />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14 pt-14 sm:pt-18 lg:pt-20 pb-12 sm:pb-16 lg:pb-16">
                {/* ============ HEADING ================= */}
                <div className="max-w-3xl mb-12 sm:mb-16">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        The ZeroQueries Platform
                    </span>

                    <h2
                        id="feature-showcase-heading"
                        className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]"
                    >
                        Every capability,
                        <br />
                        <span className="text-black/40">in one product story.</span>
                    </h2>

                    <p className="mt-4 sm:mt-5 text-base text-black/60 leading-relaxed font-light max-w-xl">
                        Explore how ZeroQueries works end to end — from conversational data discovery to automated AI insights and machine learning.
                    </p>
                </div>

                {/* ============ DESKTOP: INTERACTIVE TWO-COLUMN ================= */}
                <div className="hidden lg:grid lg:grid-cols-12 lg:gap-14 lg:items-start">
                    {/* Left column — nav + controls */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <FeatureNavigation
                                features={FEATURES}
                                activeIndex={activeIndex}
                                onSelect={handleSelect}
                            />
                        </div>

                        {/* Controls & Progress bar */}
                        <div className="mt-8 pt-6 border-t border-gray-200/70">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-black/60 hover:text-black hover:border-black/40 transition-colors shadow-sm"
                                        aria-label="Previous capability"
                                    >
                                        <FiChevronLeft className="w-4 h-4" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-black/60 hover:text-black hover:border-black/40 transition-colors shadow-sm"
                                        aria-label="Next capability"
                                    >
                                        <FiChevronRight className="w-4 h-4" />
                                    </button>
                                    <span className="ml-2 text-xs font-mono text-black/50">
                                        0{activeIndex + 1} / 0{FEATURES.length}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setIsPaused((p) => !p)}
                                    className="inline-flex items-center gap-1.5 text-xs text-black/50 hover:text-black transition-colors"
                                >
                                    {isPaused ? <FiPlay className="w-3 h-3" /> : <FiPause className="w-3 h-3" />}
                                    <span>{isPaused ? "Play" : "Pause"}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right column — live preview */}
                    <div className="lg:col-span-7">
                        <FeaturePreview
                            features={FEATURES}
                            activeIndex={activeIndex}
                            reducedMotion={prefersReducedMotion}
                        />
                    </div>
                </div>

                {/* ============ MOBILE: TABS + SINGLE PREVIEW ================= */}
                <div className="lg:hidden">
                    {/* Tab pills */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-3 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {FEATURES.map((feature, i) => (
                            <button
                                key={feature.id}
                                type="button"
                                onClick={() => handleSelect(i)}
                                className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                                    i === activeIndex
                                        ? "bg-black text-white shadow-xs"
                                        : "bg-white border border-gray-200 text-black/70 hover:bg-gray-100"
                                }`}
                            >
                                <span className="mr-1.5 opacity-60">0{i + 1}</span>
                                {feature.title}
                            </button>
                        ))}
                    </div>

                    {/* Preview card */}
                    <FeaturePreview
                        features={FEATURES}
                        activeIndex={activeIndex}
                        reducedMotion={prefersReducedMotion}
                    />

                    {/* Mobile Prev / Next + Play / Pause Controls */}
                    <div className="mt-3.5 flex items-center justify-between px-1">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handlePrev}
                                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-black/70 hover:text-black active:scale-95 shadow-xs"
                                aria-label="Previous capability"
                            >
                                <FiChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center text-black/70 hover:text-black active:scale-95 shadow-xs"
                                aria-label="Next capability"
                            >
                                <FiChevronRight className="w-4 h-4" />
                            </button>
                            <span className="ml-1 text-xs font-mono text-black/50">
                                0{activeIndex + 1} / 0{FEATURES.length}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsPaused((p) => !p)}
                            className="inline-flex items-center gap-1.5 text-xs text-black/50 hover:text-black active:text-black"
                        >
                            {isPaused ? <FiPlay className="w-3 h-3" /> : <FiPause className="w-3 h-3" />}
                            <span>{isPaused ? "Play" : "Pause"}</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============================================================================
// ORBIT DECORATION
// A very thin, pale-purple curved line behind the left navigation.
// ============================================================================
function OrbitDecoration() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden lg:block"
        >
            <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1400 1200"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
            >
                {/* Wide orbital arc */}
                <path
                    d="M -100 500 C 200 150, 600 150, 800 400 C 1000 650, 1300 750, 1500 600"
                    stroke="rgba(124, 58, 237, 0.10)"
                    strokeWidth="1.25"
                    fill="none"
                />
                {/* Secondary arc, offset */}
                <path
                    d="M -100 580 C 200 230, 620 230, 830 480 C 1030 720, 1320 820, 1520 680"
                    stroke="rgba(124, 58, 237, 0.06)"
                    strokeWidth="1"
                    fill="none"
                />
                {/* Tiny nodes along the arc */}
                {[
                    { cx: 380, cy: 210 },
                    { cx: 640, cy: 265 },
                    { cx: 900, cy: 480 },
                    { cx: 1160, cy: 625 },
                ].map((dot, i) => (
                    <circle
                        key={i}
                        cx={dot.cx}
                        cy={dot.cy}
                        r="3"
                        fill="rgba(124, 58, 237, 0.18)"
                    />
                ))}
            </svg>
        </div>
    );
}

// ============================================================================
// HOOK — prefers-reduced-motion
// ============================================================================
function usePrefersReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReduced(mq.matches);

        const onChange = (e) => setPrefersReduced(e.matches);
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

    return prefersReduced;
}