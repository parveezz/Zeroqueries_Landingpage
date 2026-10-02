"use client";

import Link from "next/link";
import {
    FiDollarSign,
    FiActivity,
    FiBookOpen,
    FiDroplet,
    FiShoppingCart,
    FiTool,
    FiHeadphones,
    FiRadio,
    FiChevronRight
} from "react-icons/fi";

const INDUSTRIES = [
    {
        name: "Finance",
        description:
            "Make smarter financial decisions by uncovering patterns across transactions, accounts, and market activity with faster access to data.",
        icon: FiDollarSign,
        iconBg: "bg-[#F4A8A8]",
        cardBg: "bg-[#FDF3F3]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#E11D48]",
    },
    {
        name: "Healthcare",
        description:
            "Bring patient, provider, and claims information together to improve care delivery and streamline healthcare operations.",
        icon: FiActivity,
        iconBg: "bg-[#F5C542]",
        cardBg: "bg-[#FEF9E7]",
        cardBorder: "border-[#F5DE8B]",
        linkColor: "text-[#D97706]",
    },
    {
        name: "Education",
        description:
            "Use real-time insights to understand learning performance, track student progress, and support better educational outcomes.",
        icon: FiBookOpen,
        iconBg: "bg-[#7DD3FC]",
        cardBg: "bg-[#EDF6FD]",
        cardBorder: "border-[#A5D8F3]",
        linkColor: "text-[#0284C7]",
    },
    {
        name: "Oil and Gas",
        description:
            "Gain timely visibility into operations, improve efficiency, and use data-driven insights to anticipate changing demand.",
        icon: FiDroplet,
        iconBg: "bg-[#86EFAC]",
        cardBg: "bg-[#EFFAF0]",
        cardBorder: "border-[#A8E5B8]",
        linkColor: "text-[#16A34A]",
    },
    {
        name: "Retail",
        description:
            "Understand customer behavior, spot emerging trends, and respond to changing market demands with actionable retail data.",
        icon: FiShoppingCart,
        iconBg: "bg-[#93B4F5]",
        cardBg: "bg-[#EEF2FD]",
        cardBorder: "border-[#B8CBF0]",
        linkColor: "text-[#2563EB]",
    },
    {
        name: "Manufacturing",
        description:
            "Bring supply chain and operational information together to monitor performance and gain a complete view of your business.",
        icon: FiTool,
        iconBg: "bg-[#C4B5FD]",
        cardBg: "bg-[#F3F0FE]",
        cardBorder: "border-[#D4C7FC]",
        linkColor: "text-[#7C3AED]",
    },
    {
        name: "Customer Care",
        description:
            "Turn customer interactions into useful insights that help teams resolve issues efficiently and deliver better experiences.",
        icon: FiHeadphones,
        iconBg: "bg-[#FCA5A5]",
        cardBg: "bg-[#FDF0F0]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#DC2626]",
    },
    {
        name: "Telecom",
        description:
            "Connect subscriber, network, and service information to understand performance and make faster decisions across your operations.",
        icon: FiRadio,
        iconBg: "bg-[#D8B4FE]",
        cardBg: "bg-[#F7F1FE]",
        cardBorder: "border-[#E0CFFC]",
        linkColor: "text-[#9333EA]",
    },
];

export default function IndustriesGrid() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        Solutions by Industry
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        Built for how your industry works
                    </h2>
                    <p className="mt-4 text-base text-black/60 leading-relaxed font-light">
                        Access a pre-built library of industry-focused assets and tap into
                        dashboards and AI-powered analytics tailored for your industry.
                    </p>
                </div>

                {/* Grid — 4 cols on desktop, matching reference proportions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {INDUSTRIES.map((industry) => (
                        <IndustryCard key={industry.name} industry={industry} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============== INDUSTRY CARD ==============
function IndustryCard({ industry }) {
    const Icon = industry.icon;

    return (
        <Link
            href={`/solutions/${industry.name.toLowerCase().replace(/\s+/g, "-")}`}
            className={`group relative flex flex-col rounded-xl border ${industry.cardBorder} ${industry.cardBg} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 min-h-[300px]`}
        >
            {/* Icon — solid colored circle with white icon inside */}
            <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${industry.iconBg} mb-5 transition-transform duration-300 group-hover:scale-105`}
            >
                <Icon className="h-6 w-6 text-white" strokeWidth={2} />
            </div>

            {/* Name */}
            <h3 className="text-[22px] font-normal tracking-tight text-black leading-tight">
                {industry.name}
            </h3>

            {/* Description */}
            <p className="mt-3 text-[15px] text-black/75 leading-[1.55] font-light flex-1">
                {industry.description}
            </p>
        </Link>
    );
}