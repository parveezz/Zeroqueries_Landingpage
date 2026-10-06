"use client";

import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";
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
        color: "#13AA52",
        bg: "rgba(19, 170, 82, 0.08)",
        rotate: "-3deg",
        offset: "translate-y-2",
    },
    {
        name: "PostgreSQL",
        icon: SiPostgresql,
        color: "#336791",
        bg: "rgba(51, 103, 145, 0.08)",
        rotate: "2deg",
        offset: "-translate-y-1",
    },
    {
        name: "Oracle",
        icon: GrOracle,
        color: "#EA1B22",
        bg: "rgba(234, 27, 34, 0.08)",
        rotate: "-1.5deg",
        offset: "translate-y-3",
    },
    {
        name: "MySQL",
        icon: SiMysql,
        color: "#00758F",
        bg: "rgba(0, 117, 143, 0.08)",
        rotate: "3deg",
        offset: "translate-y-0",
    },
    {
        name: "SQL Server",
        icon: FaMicrosoft,
        color: "#CC292B",
        bg: "rgba(204, 41, 43, 0.08)",
        rotate: "-2.5deg",
        offset: "-translate-y-2",
    },
    {
        name: "ClickHouse",
        icon: SiClickhouse,
        color: "#F9AB00",
        bg: "rgba(249, 171, 0, 0.10)",
        rotate: "1.5deg",
        offset: "translate-y-2",
    },
    {
        name: "Snowflake",
        icon: SiSnowflake,
        color: "#29B5E8",
        bg: "rgba(41, 181, 232, 0.08)",
        rotate: "-2deg",
        offset: "translate-y-1",
    },
    {
        name: "BigQuery",
        icon: SiGooglebigquery,
        color: "#4285F4",
        bg: "rgba(66, 133, 244, 0.08)",
        rotate: "2.5deg",
        offset: "-translate-y-1",
    },
    {
        name: "Excel Sheets",
        icon: FaFileExcel,
        color: "#107C41",
        bg: "rgba(16, 124, 65, 0.08)",
        rotate: "-1.8deg",
        offset: "translate-y-2",
    },
];

export default function SupportedDatabases() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    return (
        <section className="relative w-full bg-transparent font-sans text-black py-14 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ============== HEADING ============== */}
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
                    <span className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        {isAr ? "اربط منظومة أدواتك" : "Connect Your Stack"}
                    </span>

                    <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        {isAr ? "كل مصدر، في مكان واحد." : "Every source, one place."}
                    </h2>

                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black/60 leading-relaxed font-light">
                        {isAr
                            ? "يتكامل ZeroQueries بشكل أصيل ومباشر مع قواعد البيانات، ومستودعات البيانات، وجداول البيانات التي يعتمد عليها فريقك. الربط يتم في دقائق معدودة."
                            : "ZeroQueries speaks natively to the databases, warehouses, and spreadsheets your team already runs. Connect in minutes."}
                    </p>
                </div>

                {/* ============================================================
            CORK BOARD
        ============================================================ */}
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm">
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
                        className="pointer-events-none absolute inset-0 rounded-2xl sm:rounded-3xl"
                        style={{
                            boxShadow:
                                "inset 0 0 60px rgba(90, 70, 50, 0.08), inset 0 0 12px rgba(90, 70, 50, 0.05)",
                        }}
                    />

                    {/* ============ THE STICKY NOTES ============ */}
                    <div className="relative z-10 overflow-x-auto lg:overflow-visible py-10 sm:py-16 lg:py-20 px-4 sm:px-10 lg:px-14 no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                        <div className="flex flex-nowrap lg:flex-wrap items-start justify-start lg:justify-center gap-4 sm:gap-5 lg:gap-6 min-w-max lg:min-w-0">
                            {DATABASES.map((db) => (
                                <StickyNote key={db.name} db={db} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ============== BOTTOM LINE ============== */}
                <div className="mt-8 sm:mt-12 lg:mt-14 text-center">
                    <p className="text-xs sm:text-sm text-black/60 font-light">
                        {isAr ? (
                            <>
                                ألا تجد نظامك هنا؟{" "}
                                <Link
                                    href="/contact"
                                    className="text-black font-normal hover:underline underline-offset-4"
                                >
                                    على الأرجح نحن ندعمه
                                </Link>{" "}
                                — فقط تواصل معنا.
                            </>
                        ) : (
                            <>
                                Don&apos;t see yours?{" "}
                                <Link
                                    href="/contact"
                                    className="text-black font-normal hover:underline underline-offset-4"
                                >
                                    We probably support it
                                </Link>{" "}
                                — just ask.
                            </>
                        )}
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
                className="block relative w-[135px] h-[165px] sm:w-[165px] sm:h-[195px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
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
                                background: db.color || "#000",
                                opacity: 0.15,
                                filter: "blur(12px)",
                            }}
                        />

                        {/* Icon container */}
                        <div
                            className="relative flex items-center justify-center w-14 h-14 rounded-full border transition-all duration-300 group-hover:scale-110"
                            style={{
                                backgroundColor: db.bg || "#f9fafb",
                                borderColor: `${db.color}30`,
                            }}
                        >
                            <Icon
                                className="w-7 h-7 transition-transform duration-300"
                                style={{ color: db.color }}
                            />
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