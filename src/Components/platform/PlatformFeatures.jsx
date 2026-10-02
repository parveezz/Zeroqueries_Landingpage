"use client";

import {
    FiTerminal,
    FiZap,
    FiShield,
    FiBarChart2,
} from "react-icons/fi";

const FEATURES = [
    {
        number: "01",
        icon: FiTerminal,
        title: "Natural Language Queries",
        description:
            "Ask questions in plain English and get answers in seconds — no SQL, no dashboard, no data-team ticket.",
    },
    {
        number: "02",
        icon: FiZap,
        title: "Automatic Query Generation",
        description:
            "ZeroQueries translates your intent into optimized SQL against every connected source, in real time.",
    },
    {
        number: "03",
        icon: FiShield,
        title: "Enterprise Security",
        description:
            "Read-only connections, AES-256 at rest, TLS 1.3 in transit, SOC 2 Type II, HIPAA-ready, and full audit logs.",
    },
    {
        number: "04",
        icon: FiBarChart2,
        title: "Answers You Can Share",
        description:
            "Charts, tables, and summaries rendered instantly — send them to your team from WhatsApp, Slack, or the web app.",
    },
];

export default function PlatformFeatures() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-20 sm:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= HEADING ================= */}
                <div className="max-w-3xl mb-14 sm:mb-16">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Platform
                    </span>

                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]">
                        Built to move at the
                        <br />
                        <span className="text-black/40">speed of your decisions.</span>
                    </h2>

                    <p className="mt-5 text-base text-black/60 leading-relaxed font-light max-w-xl">
                        Every piece of ZeroQueries exists to shorten the distance between a
                        question and an answer — without compromising security or accuracy.
                    </p>
                </div>

                {/* ================= FEATURES GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {FEATURES.map((feature, i) => (
                        <FeatureCard key={feature.title} feature={feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============== FEATURE CARD ==============
function FeatureCard({ feature }) {
    const Icon = feature.icon;

    return (
        <div className="group relative flex flex-col rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gray-400 overflow-hidden min-h-[260px]">
            {/* Ghost number */}
            <span
                className="absolute -top-3 right-3 text-[100px] font-light leading-none tracking-tighter select-none pointer-events-none text-black/[0.04]"
                aria-hidden="true"
            >
                {feature.number}
            </span>

            {/* Top accent bar */}
            <div className="absolute top-0 left-6 right-6 h-[3px] rounded-full bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Icon */}
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gray-100 text-black mb-6 transition-all duration-500 group-hover:bg-black group-hover:text-white group-hover:rotate-3">
                <Icon className="w-5 h-5" strokeWidth={1.75} />
            </div>

            {/* Title */}
            <h3 className="relative text-base sm:text-[17px] font-medium tracking-tight text-black leading-snug">
                {feature.title}
            </h3>

            {/* Description */}
            <p className="relative mt-3 text-[13px] text-black/60 leading-relaxed font-light flex-1">
                {feature.description}
            </p>

            {/* Footer */}
            <div className="relative mt-6 flex items-center justify-between">
                <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/35 transition-colors group-hover:text-black">
                    Step {feature.number}
                </span>
                <div className="w-6 h-[2px] rounded-full bg-black opacity-30 group-hover:opacity-100 group-hover:w-12 transition-all duration-500" />
            </div>
        </div>
    );
}