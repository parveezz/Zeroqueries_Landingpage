"use client";

import Image from "next/image";
import { FiArrowUpRight, FiMessageCircle, FiHash, FiGlobe, FiCode } from "react-icons/fi";
import { FaWhatsapp, FaSlack } from "react-icons/fa6";

const CHANNELS = [
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        description:
            "Ask ZeroQueries right inside WhatsApp — get answers, charts, and summaries as if you were chatting with a colleague.",
        status: "Available now",
        color: "#25D366",
        href: "/integrations/whatsapp",
    },
    {
        name: "Slack",
        icon: FaSlack,
        description:
            "Summon ZeroQueries in any channel with /ask. Answers appear where your team already works — no context switching.",
        status: "Available now",
        color: "#611f69",
        href: "/integrations/slack",
    },
    {
        name: "Web App",
        icon: FiGlobe,
        description:
            "The full ZeroQueries canvas — dashboards, saved questions, and deeper drill-downs for teams who live in the browser.",
        status: "Included on all plans",
        color: "#111827",
        href: "/app",
    },
    {
        name: "REST API",
        icon: FiCode,
        description:
            "Build ZeroQueries into your own product. Ask questions programmatically and stream answers into any internal tool.",
        status: "Enterprise",
        color: "#2563EB",
        href: "/docs/api",
    },
];

export default function PlatformChannels() {
    return (
        <section className="relative w-full bg-white font-sans text-black py-20 sm:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= HEADING ================= */}
                <div className="max-w-3xl mb-14 sm:mb-16">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Where You Can Use It
                    </span>

                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]">
                        Ask from anywhere.
                        <br />
                        <span className="text-black/40">Answers follow you.</span>
                    </h2>

                    <p className="mt-5 text-base text-black/60 leading-relaxed font-light max-w-xl">
                        ZeroQueries lives inside the tools your team already uses. Same
                        questions, same answers — whether you&apos;re on WhatsApp, in Slack,
                        on the web, or building with the API.
                    </p>
                </div>

                {/* ================= CHANNELS GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {CHANNELS.map((channel) => (
                        <ChannelCard key={channel.name} channel={channel} />
                    ))}
                </div>

                {/* ================= FOOTNOTE ================= */}
                <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-8 border-t border-gray-200">
                    <p className="text-xs text-black/50 font-light">
                        More channels rolling out — including Microsoft Teams and Email.
                    </p>
                    <a
                        href="/integrations"
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-black hover:underline underline-offset-4"
                    >
                        View all integrations
                        <FiArrowUpRight className="w-3 h-3" />
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============== CHANNEL CARD ==============
function ChannelCard({ channel }) {
    const Icon = channel.icon;

    return (
        <a
            href={channel.href}
            className="group relative flex flex-col rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-400"
        >
            {/* Icon header */}
            <div className="flex items-start justify-between mb-6">
                <div
                    className="flex items-center justify-center w-12 h-12 rounded-2xl text-white"
                    style={{ backgroundColor: channel.color }}
                >
                    <Icon className="w-5 h-5" />
                </div>

                <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-black/40 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-medium tracking-tight text-black">
                {channel.name}
            </h3>

            {/* Description */}
            <p className="mt-3 text-sm text-black/60 leading-relaxed font-light flex-1">
                {channel.description}
            </p>

            {/* Status */}
            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-[11px] font-medium tracking-[0.15em] uppercase text-black/50">
                    {channel.status}
                </span>
            </div>
        </a>
    );
}