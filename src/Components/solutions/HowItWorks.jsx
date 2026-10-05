"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiCode, FiShield, FiBarChart2, FiCheck } from "react-icons/fi";

const STEPS = [
    {
        number: "01",
        icon: FiSearch,
        title: "Interpret",
        label: "Interprets the question using AI",
        tape: "rgba(124, 58, 237, 0.4)",   // violet
        rotate: "-3deg",
        offset: "translate-y-2",
    },
    {
        number: "02",
        icon: FiCode,
        title: "Generate",
        label: "Generates the correct query",
        tape: "rgba(37, 99, 235, 0.4)",    // blue
        rotate: "2deg",
        offset: "-translate-y-1",
    },
    {
        number: "03",
        icon: FiShield,
        title: "Retrieve",
        label: "Retrieves data securely",
        tape: "rgba(6, 182, 212, 0.4)",    // cyan
        rotate: "-1.5deg",
        offset: "translate-y-3",
    },
    {
        number: "04",
        icon: FiBarChart2,
        title: "Answer",
        label: "Returns charts and insights",
        tape: "rgba(236, 72, 153, 0.4)",   // pink
        rotate: "3deg",
        offset: "-translate-y-2",
    },
];

export default function HowItWorks() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeStep, setActiveStep] = useState(-1);

    // Reveal on scroll
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        obs.observe(node);
        return () => obs.disconnect();
    }, []);

    // Cycle active step
    useEffect(() => {
        if (!isVisible) return;
        let i = -1;
        const tick = () => {
            i = (i + 1) % (STEPS.length + 1);
            setActiveStep(i);
            setTimeout(tick, i === STEPS.length ? 1400 : 900);
        };
        const t = setTimeout(tick, 600);
        return () => clearTimeout(t);
    }, [isVisible]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gray-50 font-sans text-black py-20 sm:py-24 lg:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden"
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            {/* Purple glow — top left */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.22) 0%, rgba(167, 139, 250, 0.10) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Blue glow — bottom right */}
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(96, 165, 250, 0.22) 0%, rgba(147, 197, 253, 0.10) 40%, rgba(191, 219, 254, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= HEADING ================= */}
                <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        How It Works
                    </span>

                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        Pinned to your data.
                    </h2>

                    <p className="mt-4 text-base text-black/60 leading-relaxed font-light">
                        User asks:{" "}
                        <span className="text-[#7C3AED] font-normal">
                            &quot;Show revenue by region last quarter&quot;
                        </span>
                    </p>
                </div>

                {/* ============================================================
            CORK BOARD
        ============================================================ */}
                <div className="relative rounded-3xl overflow-hidden">
                    {/* Warm wall base */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, #f5ede2 0%, #ebe0d1 40%, #e3d6c4 100%)",
                        }}
                    />

                    {/* Wood grain / cork texture */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-multiply"
                        style={{
                            backgroundImage: `
                radial-gradient(circle at 30% 20%, #b8a68c 0%, transparent 25%),
                radial-gradient(circle at 70% 60%, #c9b69a 0%, transparent 20%),
                radial-gradient(circle at 15% 75%, #b8a68c 0%, transparent 22%),
                radial-gradient(circle at 85% 30%, #c9b69a 0%, transparent 18%),
                radial-gradient(circle at 50% 90%, #b8a68c 0%, transparent 25%),
                radial-gradient(circle at 25% 45%, #d4c3aa 0%, transparent 20%)
              `,
                            backgroundSize:
                                "400px 400px, 500px 500px, 450px 450px, 380px 380px, 520px 520px, 480px 480px",
                        }}
                    />

                    {/* Fine grain dots */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.15]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #8b7355 0.8px, transparent 1.2px)",
                            backgroundSize: "6px 6px",
                        }}
                    />

                    {/* Purple glows */}
                    <div
                        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(167, 139, 250, 0.12) 40%, rgba(196, 181, 253, 0) 70%)",
                            filter: "blur(90px)",
                        }}
                    />
                    <div
                        className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(167, 139, 250, 0.12) 40%, rgba(196, 181, 253, 0) 70%)",
                            filter: "blur(90px)",
                        }}
                    />

                    {/* Vignette */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 40%, rgba(90, 70, 50, 0.10) 100%)",
                        }}
                    />

                    {/* Inner shadow */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-3xl"
                        style={{
                            boxShadow:
                                "inset 0 0 60px rgba(90, 70, 50, 0.08), inset 0 0 12px rgba(90, 70, 50, 0.05)",
                        }}
                    />

                    {/* ============ WAVY DASHED FLOW LINES (behind the notes) ============ */}
                    <svg
                        className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-[1]"
                        viewBox="0 0 1400 500"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        {/* Line 1 → 2 */}
                        <path
                            d="M 280 240 Q 380 200 480 240 T 680 240"
                            fill="none"
                            stroke="rgba(124, 58, 237, 0.35)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                        />
                        {/* Line 2 → 3 */}
                        <path
                            d="M 720 240 Q 820 280 920 240 T 1120 240"
                            fill="none"
                            stroke="rgba(37, 99, 235, 0.35)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                        />
                        {/* Line 3 → 4 */}
                        <path
                            d="M 1160 240 Q 1260 200 1360 240"
                            fill="none"
                            stroke="rgba(236, 72, 153, 0.35)"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                        />
                    </svg>

                    {/* ============ STICKY NOTES ============ */}
                    <div className="relative z-10 overflow-x-auto lg:overflow-visible py-16 sm:py-20 px-6 sm:px-10 lg:px-14 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex flex-nowrap lg:flex-wrap items-start justify-start lg:justify-center gap-5 lg:gap-6 min-w-max lg:min-w-0">
                            {STEPS.map((step, i) => (
                                <StickyStep
                                    key={step.number}
                                    step={step}
                                    index={i}
                                    isActive={activeStep === i}
                                    isVisible={isVisible}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ================= FOOTER PILL ================= */}
                {/* ================= FOOTER BADGE — redesigned ================= */}
                <div className="mt-14 sm:mt-16 flex justify-center">
                    <div className="relative group">
                        {/* Outer soft halo */}
                        <div className="absolute -inset-2 rounded-full bg-black/5 blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Inner pill */}
                        <div className="relative inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 border border-black/10 shadow-xs backdrop-blur-sm transition-all duration-300 group-hover:border-black/20">
                            {/* Icon circle */}
                            <span className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black text-white shrink-0">
                                <FiCheck className="h-3 w-3" strokeWidth={3} />

                                {/* Ping halo on the icon */}
                                <span className="absolute inset-0 rounded-full bg-black opacity-25 animate-ping" />
                            </span>

                            {/* Text */}
                            <span className="text-xs sm:text-sm font-light text-black/70">
                                From question to{" "}
                                <span className="font-medium text-black">insight.</span>
                            </span>

                            {/* Tiny shimmer dot on the right */}
                            <span className="flex items-center justify-center w-1.5 h-1.5 rounded-full bg-black/20 ml-1" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============== STICKY STEP NOTE ==============
function StickyStep({ step, index, isActive, isVisible }) {
    const Icon = step.icon;

    return (
        <div
            className={`group relative shrink-0 ${step.offset} transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            style={{
                transform: isActive ? "rotate(0deg) translateY(-8px)" : `rotate(${step.rotate})`,
                transitionDelay: `${index * 120}ms`,
                transitionProperty: "transform, opacity",
                transitionDuration: "0.5s, 0.7s",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1), ease-out",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) translateY(-8px)";
            }}
            onMouseLeave={(e) => {
                if (!isActive) {
                    e.currentTarget.style.transform = `rotate(${step.rotate})`;
                }
            }}
        >
            <div
                className="block relative w-[160px] h-[200px] sm:w-[175px] sm:h-[215px]"
                style={{
                    transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transform: isActive ? "scale(1.05)" : "scale(1)",
                }}
            >
                {/* ============ THE PAPER ============ */}
                <div
                    className="absolute inset-0 rounded-[3px]"
                    style={{
                        background:
                            "linear-gradient(180deg, #ffffff 0%, #fdfdfd 50%, #fafafa 100%)",
                        boxShadow: isActive
                            ? `
                0 4px 8px rgba(0, 0, 0, 0.08),
                0 12px 28px -4px rgba(0, 0, 0, 0.14),
                0 24px 56px -8px rgba(0, 0, 0, 0.16),
                0 0 0 2px ${step.tape}
              `
                            : `
                0 2px 4px rgba(0, 0, 0, 0.06),
                0 8px 20px -4px rgba(0, 0, 0, 0.10),
                0 16px 40px -8px rgba(0, 0, 0, 0.12)
              `,
                    }}
                />

                {/* Soft depth-of-field blur */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        background: "transparent",
                        boxShadow: "0 0 20px 6px rgba(0, 0, 0, 0.03)",
                        filter: "blur(6px)",
                    }}
                />

                {/* Top tape */}
                <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 z-20 rounded-sm"
                    style={{
                        backgroundColor: step.tape,
                        boxShadow:
                            "inset 0 0 8px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(2px)",
                        transform: "translateX(-50%) rotate(-1.5deg)",
                    }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3.5 px-4">
                    {/* Icon with step number badge */}
                    <div className="relative">
                        {/* Colored halo */}
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500"
                            style={{
                                background: step.tape,
                                opacity: isActive ? 0.4 : 0.15,
                                filter: "blur(14px)",
                            }}
                        />

                        {/* Icon container */}
                        <div
                            className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 border border-gray-100/80 transition-transform duration-300 group-hover:scale-110"
                            style={{
                                borderColor: isActive ? step.tape : "rgba(0, 0, 0, 0.05)",
                            }}
                        >
                            <Icon
                                className="w-7 h-7 transition-colors duration-300"
                                style={{ color: isActive ? "black" : "rgba(0,0,0,0.7)" }}
                            />
                        </div>

                        {/* Step number badge */}
                        <div
                            className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-medium border-2 bg-white transition-all duration-500"
                            style={{
                                borderColor: isActive ? "transparent" : "rgba(0,0,0,0.08)",
                                color: isActive ? "#fff" : "rgba(0,0,0,0.5)",
                                background: isActive ? step.tape.replace("0.4", "1") : "#fff",
                            }}
                        >
                            {step.number}
                        </div>
                    </div>

                    {/* Title */}
                    <span className="text-sm font-medium text-black text-center leading-tight tracking-tight">
                        {step.title}
                    </span>

                    {/* Label */}
                    <span className="text-[11px] text-black/50 text-center leading-snug font-light max-w-[120px]">
                        {step.label}
                    </span>
                </div>

                {/* Soft corner peel */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(315deg, rgba(0,0,0,0.05) 0%, transparent 50%)",
                        borderTopLeftRadius: "100%",
                        filter: "blur(1px)",
                    }}
                />

                {/* Edge soften */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.03)",
                    }}
                />
            </div>
        </div>
    );
}