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
    SiGooglesheets,
} from "react-icons/si";
import { FaMicrosoft, FaFileExcel } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";

const DATABASES = [
    {
        name: "MongoDB",
        icon: SiMongodb,
        rotate: "-3deg",
        offset: "translate-y-2",
    },
    {
        name: "PostgreSQL",
        icon: SiPostgresql,
        rotate: "2deg",
        offset: "-translate-y-1",
    },
    {
        name: "Oracle",
        icon: GrOracle,
        rotate: "-1.5deg",
        offset: "translate-y-3",
    },
    {
        name: "MySQL",
        icon: SiMysql,
        rotate: "3deg",
        offset: "translate-y-0",
    },
    {
        name: "SQL Server",
        icon: FaMicrosoft,
        rotate: "-2.5deg",
        offset: "-translate-y-2",
    },
    {
        name: "ClickHouse",
        icon: SiClickhouse,
        rotate: "1.5deg",
        offset: "translate-y-2",
    },
    {
        name: "Snowflake",
        icon: SiSnowflake,
        rotate: "-2deg",
        offset: "translate-y-1",
    },
    {
        name: "BigQuery",
        icon: SiGooglebigquery,
        rotate: "2.5deg",
        offset: "-translate-y-1",
    },
    {
        name: "Excel Sheets",
        icon: FaFileExcel,
        rotate: "-1.8deg",
        offset: "translate-y-2",
    },
];

export default function SupportedDatabases() {
    return (
        <section className="relative w-full bg-transparent font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ============== HEADING ============== */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        Connect Your Stack
                    </span>

                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        Every source, one place.
                    </h2>

                    <p className="mt-4 text-base text-black/60 leading-relaxed font-light">
                        ZeroQueries speaks natively to the databases, warehouses, and
                        spreadsheets your team already runs. Connect in minutes.
                    </p>
                </div>

                {/* ============================================================
            CORK BOARD
        ============================================================ */}
                <div className="relative rounded-3xl overflow-hidden">
                    {/* ============ WARM WALL BASE ============ */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(180deg, #f5ede2 0%, #ebe0d1 40%, #e3d6c4 100%)",
                        }}
                    />

                    {/* ============ WOOD GRAIN / CORK TEXTURE ============ */}
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

                    {/* ============ FINE GRAIN DOTS ============ */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.15]"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle, #8b7355 0.8px, transparent 1.2px)",
                            backgroundSize: "6px 6px",
                        }}
                    />

                    {/* ============ SOFT VIGNETTE ============ */}
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 40%, rgba(90, 70, 50, 0.10) 100%)",
                        }}
                    />

                    {/* ============ INNER SHADOW ============ */}
                    <div
                        className="pointer-events-none absolute inset-0 rounded-3xl"
                        style={{
                            boxShadow:
                                "inset 0 0 60px rgba(90, 70, 50, 0.08), inset 0 0 12px rgba(90, 70, 50, 0.05)",
                        }}
                    />

                    {/* ============ THE STICKY NOTES ============ */}
                    <div className="relative z-10 overflow-x-auto lg:overflow-visible py-16 sm:py-20 px-6 sm:px-10 lg:px-14">
                        <div className="flex flex-nowrap lg:flex-wrap items-start justify-start lg:justify-center gap-5 lg:gap-6 min-w-max lg:min-w-0">
                            {DATABASES.map((db) => (
                                <StickyNote key={db.name} db={db} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ============== BOTTOM LINE ============== */}
                <div className="mt-14 text-center">
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
                e.currentTarget.style.transform = "rotate(0deg) translateY(-8px)";
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
              0 2px 4px rgba(0, 0, 0, 0.06),
              0 8px 20px -4px rgba(0, 0, 0, 0.10),
              0 16px 40px -8px rgba(0, 0, 0, 0.12)
            `,
                    }}
                />

                {/* ============ SOFT DEPTH-OF-FIELD BLUR ============ */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        background: "transparent",
                        boxShadow: "0 0 20px 6px rgba(0, 0, 0, 0.03)",
                        filter: "blur(6px)",
                    }}
                />

                {/* ============ TOP TAPE — monochrome ============ */}
                <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-5 z-20 rounded-sm"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                        boxShadow:
                            "inset 0 0 8px rgba(255, 255, 255, 0.6), 0 1px 3px rgba(0, 0, 0, 0.08)",
                        backdropFilter: "blur(2px)",
                        transform: "translateX(-50%) rotate(-1.5deg)",
                    }}
                />

                {/* ============ CONTENT ============ */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-4 px-4">
                    <div className="relative">
                        {/* Soft icon halo */}
                        <div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            style={{
                                background: "#000",
                                opacity: 0.06,
                                filter: "blur(12px)",
                            }}
                        />

                        {/* Icon container */}
                        <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 border border-gray-100/80 transition-transform duration-300 group-hover:scale-110">
                            <Icon className="w-7 h-7 text-black/70" />
                        </div>
                    </div>

                    <span className="text-sm font-medium text-black text-center leading-tight tracking-tight">
                        {db.name}
                    </span>

                    <FiArrowUpRight className="absolute bottom-3 right-3 w-3.5 h-3.5 text-black/30 group-hover:text-black transition-colors" />
                </div>

                {/* ============ SOFT CORNER PEEL ============ */}
                <div
                    className="absolute bottom-0 right-0 w-6 h-6 pointer-events-none"
                    style={{
                        background:
                            "linear-gradient(315deg, rgba(0,0,0,0.05) 0%, transparent 50%)",
                        borderTopLeftRadius: "100%",
                        filter: "blur(1px)",
                    }}
                />

                {/* ============ EDGE SOFTEN ============ */}
                <div
                    className="absolute inset-0 rounded-[3px] pointer-events-none"
                    style={{
                        boxShadow: "inset 0 0 4px rgba(0, 0, 0, 0.03)",
                    }}
                />
            </Link>
        </div>
    );
}