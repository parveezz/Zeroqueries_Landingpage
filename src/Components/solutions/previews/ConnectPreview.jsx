"use client";

import { FiDatabase, FiUsers, FiCode, FiServer } from "react-icons/fi";
import {
    SiSnowflake,
    SiPostgresql,
    SiMongodb,
    SiGooglebigquery,
} from "react-icons/si";

const SOURCES = [
    { name: "Snowflake", icon: SiSnowflake },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "BigQuery", icon: SiGooglebigquery },
    { name: "MongoDB", icon: SiMongodb },
];

export function ConnectPreview() {
    return (
        <div className="w-full h-full flex flex-col bg-white px-5 py-5">
            {/* Header */}
            <div className="mb-4">
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                    Connected Sources
                </div>
            </div>

            {/* Diagram */}
            <div className="flex-1 flex items-center justify-between gap-4 min-h-0">
                {/* Left — sources */}
                <div className="flex flex-col gap-2.5 w-[38%]">
                    {SOURCES.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div
                                key={s.name}
                                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5"
                            >
                                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 text-black shrink-0">
                                    <Icon className="w-3.5 h-3.5" />
                                </div>
                                <span className="text-[11.5px] font-medium text-black truncate">
                                    {s.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* Middle — connectors */}
                <svg
                    className="w-[16%] h-full"
                    viewBox="0 0 60 200"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    {[30, 80, 130, 170].map((y, i) => (
                        <path
                            key={i}
                            d={`M 0 ${y} Q 30 ${y}, 30 100 Q 30 ${100}, 60 100`}
                            fill="none"
                            stroke="rgba(124, 58, 237, 0.3)"
                            strokeWidth="1.25"
                            strokeDasharray="3 3"
                        />
                    ))}
                </svg>

                {/* Right — platform */}
                <div className="flex items-center justify-center w-[38%]">
                    <div className="w-full rounded-2xl border border-[#7C3AED]/30 bg-[#7C3AED]/[0.04] p-5 text-center">
                        <div className="mx-auto flex items-center justify-center w-10 h-10 rounded-xl bg-[#7C3AED] text-white mb-2.5">
                            <FiServer className="w-4 h-4" />
                        </div>
                        <div className="text-[12.5px] font-medium text-black">
                            ZeroQueries
                        </div>
                        <div className="mt-0.5 text-[10.5px] text-black/50 font-light">
                            One semantic layer
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center gap-3 text-[10.5px] text-black/50 font-light">
                <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    4 sources connected
                </span>
                <span className="text-black/20">·</span>
                <span>Sync: real-time</span>
            </div>
        </div>
    );
}

export default ConnectPreview;