"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import {
    SiClickhouse,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiSnowflake,
    SiGooglebigquery,
} from "react-icons/si";
import { FaMicrosoft } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";

const DATABASES = [
    {
        name: "ClickHouse",
        icon: SiClickhouse,
        color: "#FFCC01",
        tape: "rgba(255, 204, 1, 0.35)",
        rotate: "-3deg",
        offset: "translate-y-2",
    },
    {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#4169E1",
        tape: "rgba(65, 105, 225, 0.35)",
        rotate: "2deg",
        offset: "-translate-y-1",
    },
    {
        name: "MySQL",
        icon: SiMysql,
        color: "#4479A1",
        tape: "rgba(68, 121, 161, 0.35)",
        rotate: "-1.5deg",
        offset: "translate-y-3",
    },
    {
        name: "SQL Server",
        icon: FaMicrosoft,
        color: "#CC2927",
        tape: "rgba(204, 41, 39, 0.3)",
        rotate: "3deg",
        offset: "translate-y-0",
    },
    {
        name: "Oracle",
        icon: GrOracle,
        color: "#F80000",
        tape: "rgba(248, 0, 0, 0.25)",
        rotate: "-2.5deg",
        offset: "-translate-y-2",
    },
    {
        name: "MongoDB",
        icon: SiMongodb,
        color: "#47A248",
        tape: "rgba(71, 162, 72, 0.35)",
        rotate: "1.5deg",
        offset: "translate-y-2",
    },
    {
        name: "Snowflake",
        icon: SiSnowflake,
        color: "#29B5E8",
        tape: "rgba(41, 181, 232, 0.35)",
        rotate: "-2deg",
        offset: "translate-y-1",
    },
    {
        name: "BigQuery",
        icon: SiGooglebigquery,
        color: "#4285F4",
        tape: "rgba(66, 133, 244, 0.35)",
        rotate: "2.5deg",
        offset: "-translate-y-1",
    },
];

export default function SupportedDatabases() {
    return (
        // bg-transparent — inherits whatever is behind it
        <section className="relative w-full bg-transparent font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ============== HEADING ============== */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        Connect Your Stack
                    </span>

                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        Sticks with your databases
                    </h2>

                    <p className="mt-4 text-base text-black/60 leading-relaxed font-light">
                        These are just a few of the warehouses and databases ZeroQueries
                        speaks natively. Pick yours and connect in minutes.
                    </p>
                </div>

                {/* ============== STICKY NOTE ROW ============== */}
                <div className="overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 -mx-6 sm:-mx-10 lg:mx-0">
                    <div className="flex flex-nowrap lg:flex-wrap items-start justify-start lg:justify-center gap-5 lg:gap-6 px-6 sm:px-10 lg:px-0 min-w-max lg:min-w-0">
                        {DATABASES.map((db) => (
                            <StickyNote key={db.name} db={db} />
                        ))}
                    </div>
                </div>

                {/* ============== BOTTOM LINE ============== */}
                <div className="mt-16 text-center">
                    <p className="text-sm text-black/60 font-light">
                        Don&apos;t see yours?{" "}
                        <Link
                            href="/contact"
                            className="text-black font-normal hover:underline underline-offset-4"
                        >
                            We probably support it
                        </Link>{" "}
                        — just ask.
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============== STICKY NOTE ==============
function StickyNote({ db }) {
    const Icon = db.icon;

    return (
        <div
            className={`group relative shrink-0 ${db.offset}`}
            style={{
                transform: `rotate(${db.rotate})`,
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "rotate(0deg) translateY(-6px)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = `rotate(${db.rotate})`;
            }}
        >
            <Link
                href={`/integrations/${db.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="block relative w-[150px] h-[180px] sm:w-[165px] sm:h-[195px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
            >
                {/* ============ THE PAPER ============ */}
                <div
                    className="absolute inset-0 rounded-[3px]"
                    style={{
                        background:
                            "linear-gradient(180deg, #ffffff 0%, #fdfdfd 50%, #fafafa 100%)",
                        boxShadow: `
              0 1px 2px rgba(0, 0, 0, 0.04),
              0 6px 16px -4px rgba(0, 0, 0, 0.08),
              0 12px 32px -8px rgba(0, 0, 0, 0.10)
            `,
                    }}
                />

                {/* ============ SOFT DEPTH-OF-FIELD BLUR ============ */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        background: "transparent",
                        boxShadow: "0 0 20px 6px rgba(0, 0, 0, 0.02)",
                        filter: "blur(6px)",
                    }}
                />

                {/* ============ TOP TAPE ============ */}
                <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 z-20 rounded-sm"
                    style={{
                        backgroundColor: db.tape,
                        boxShadow:
                            "inset 0 0 8px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.05)",
                        backdropFilter: "blur(2px)",
                        transform: "translateX(-50%) rotate(-1.5deg)",
                    }}
                />

                {/* ============ CONTENT ============ */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4">
                    <div className="relative">
                        {/* Soft blur halo behind icon */}
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                background: db.color,
                                opacity: 0.1,
                                filter: "blur(12px)",
                            }}
                        />

                        {/* Icon container */}
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 border border-gray-100/80 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="w-7 h-7" style={{ color: db.color }} />
                        </div>
                    </div>

                    {/* Name */}
                    <span className="text-sm font-medium text-black text-center leading-tight tracking-tight">
                        {db.name}
                    </span>

                    {/* Bottom-right corner arrow */}
                    <FiArrowUpRight className="absolute bottom-3 right-3 w-3.5 h-3.5 text-black/30 group-hover:text-black transition-colors" />
                </div>

                {/* ============ SOFT CORNER PEEL ============ */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(315deg, rgba(0,0,0,0.04) 0%, transparent 50%)",
                        borderTopLeftRadius: "100%",
                        filter: "blur(1px)",
                    }}
                />

                {/* ============ EDGE SOFTEN ============ */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.02)",
                    }}
                />
            </Link>
        </div>
    );
}