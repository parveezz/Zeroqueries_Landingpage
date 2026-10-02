"use client";

import { FiAlertCircle, FiTrendingDown, FiClock, FiCheckCircle } from "react-icons/fi";

const STATS = [
    {
        icon: FiAlertCircle,
        iconBg: "bg-[#FEE2E2]",
        iconColor: "text-[#DC2626]",
        value: "87%",
        label: "of spreadsheets",
        sublabel: "contain critical errors when manually compiled.",
    },
    {
        icon: FiTrendingDown,
        iconBg: "bg-[#FEF3C7]",
        iconColor: "text-[#D97706]",
        value: "$15M",
        label: "per year",
        sublabel: "lost to poor data quality in a typical enterprise.",
    },
    {
        icon: FiClock,
        iconBg: "bg-[#E0E7FF]",
        iconColor: "text-[#4F46E5]",
        value: "6 hrs",
        label: "every week",
        sublabel: "spent by each knowledge worker just searching for data.",
    },
];

export default function CostOfDelay() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* ================= LEFT: COPY + STATS ================= */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                            Why Teams Switch
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                            The real cost of{" "}
                            <span className="text-black/50">slow data access.</span>
                        </h2>

                        <p className="mt-6 text-base text-black/70 leading-relaxed font-light max-w-xl">
                            Every day your team waits on analysts, refreshes dashboards, or
                            hand-tunes spreadsheets, they&apos;re making decisions blind. The
                            numbers below are the cost of that delay — and the exact problem
                            ZeroQueries was built to eliminate.
                        </p>

                        {/* Stats grid */}
                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {STATS.map((stat) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={stat.value}
                                        className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-400"
                                    >
                                        <div
                                            className={`flex items-center justify-center w-9 h-9 rounded-lg ${stat.iconBg} ${stat.iconColor} mb-4`}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div className="text-2xl sm:text-[28px] font-light tracking-tight text-black leading-none">
                                            {stat.value}
                                        </div>

                                        <div className="mt-2 text-[11px] font-medium text-black/60 uppercase tracking-[0.1em]">
                                            {stat.label}
                                        </div>

                                        <div className="mt-2 text-xs text-black/60 leading-relaxed font-light">
                                            {stat.sublabel}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ================= RIGHT: ANIMATED VISUAL ================= */}
                    <div className="relative">
                        <div className="relative aspect-square max-w-[520px] mx-auto overflow-hidden">
                            {/* Soft radial glow behind the rings — blue/violet */}
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background:
                                        "radial-gradient(circle at center, rgba(96, 165, 250, 0.20) 0%, rgba(139, 92, 246, 0.10) 35%, transparent 70%)",
                                }}
                            />

                            {/* Concentric dashed rings + center badge — now animated */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative flex items-center justify-center">

                                    {/* Outer ring — slowest rotation, counter-clockwise */}
                                    <div
                                        className="absolute rounded-full border-2 border-dashed animate-[spin_28s_linear_infinite_reverse]"
                                        style={{
                                            width: "420px",
                                            height: "420px",
                                            borderColor: "rgba(139, 92, 246, 0.28)",
                                        }}
                                    />

                                    {/* Middle ring — medium speed, clockwise */}
                                    <div
                                        className="absolute rounded-full border-2 border-dashed animate-[spin_18s_linear_infinite]"
                                        style={{
                                            width: "300px",
                                            height: "300px",
                                            borderColor: "rgba(96, 165, 250, 0.35)",
                                        }}
                                    />

                                    {/* Inner ring — fastest, counter-clockwise */}
                                    <div
                                        className="absolute rounded-full border-2 border-dashed animate-[spin_12s_linear_infinite_reverse]"
                                        style={{
                                            width: "190px",
                                            height: "190px",
                                            borderColor: "rgba(59, 130, 246, 0.45)",
                                        }}
                                    />

                                    {/* Center badge — soft pulsing glow */}
                                    <div className="relative flex items-center justify-center w-20 h-20">
                                        {/* Pulse halo */}
                                        <span className="absolute inline-flex h-full w-full rounded-full bg-[#3B82F6] opacity-30 animate-ping" />

                                        {/* Badge */}
                                        <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white border-2 border-[#3B82F6] shadow-[0_0_40px_-8px_rgba(59,130,246,0.6)]">
                                            <FiCheckCircle
                                                className="h-9 w-9 text-[#3B82F6]"
                                                strokeWidth={1.75}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating pulse dots — now slowly orbiting */}
                            <OrbitingDots />
                        </div>

                        {/* Caption below the visual */}
                        <p className="mt-6 text-center text-xs text-black/50 font-light">
                            ZeroQueries eliminates the delay — every answer, one question away.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ============== ORBITING DOTS ==============
// Four small colored dots that orbit around the center badge at different radii/speeds.
function OrbitingDots() {
    return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-0 h-0">
                {/* Dot 1 — orbit radius 90px, clockwise 8s */}
                <div
                    className="absolute animate-[spin_8s_linear_infinite]"
                    style={{ width: 0, height: 0 }}
                >
                    <span
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#3B82F6]/60"
                        style={{ top: -90, left: 0, transform: "translate(-50%, -50%)" }}
                    />
                </div>

                {/* Dot 2 — orbit radius 130px, counter-clockwise 14s */}
                <div
                    className="absolute animate-[spin_14s_linear_infinite_reverse]"
                    style={{ width: 0, height: 0 }}
                >
                    <span
                        className="absolute w-1 h-1 rounded-full bg-[#8B5CF6]/60"
                        style={{ top: -130, left: 0, transform: "translate(-50%, -50%)" }}
                    />
                </div>

                {/* Dot 3 — orbit radius 170px, clockwise 20s */}
                <div
                    className="absolute animate-[spin_20s_linear_infinite]"
                    style={{ width: 0, height: 0 }}
                >
                    <span
                        className="absolute w-1 h-1 rounded-full bg-[#3B82F6]/40"
                        style={{ top: 170, left: 0, transform: "translate(-50%, -50%)" }}
                    />
                </div>

                {/* Dot 4 — orbit radius 200px, counter-clockwise 26s */}
                <div
                    className="absolute animate-[spin_26s_linear_infinite_reverse]"
                    style={{ width: 0, height: 0 }}
                >
                    <span
                        className="absolute w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/40"
                        style={{ top: 200, left: 0, transform: "translate(-50%, -50%)" }}
                    />
                </div>
            </div>
        </div>
    );
}