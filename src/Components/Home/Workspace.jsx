"use client";

import { useState, useEffect, useRef } from "react";
import {
    SiClickhouse,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiSnowflake,
    SiGooglebigquery,
} from "react-icons/si";
import { FaMicrosoft, FaFileExcel } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";

const QUERIES = [
    "Why did pipeline drop 18% week-over-week? Break down by segment, stage, and rep.",
    "Show revenue by region for last quarter, grouped by product line.",
    "Which reps have the highest deal velocity this month?",
];

const LEFT_CARDS = [
    {
        title: "Structured Data",
        icon: "db",
        items: [
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Snowflake", icon: SiSnowflake },
            { name: "BigQuery", icon: SiGooglebigquery },
            { name: "MySQL", icon: SiMysql },
        ],
    },
    {
        title: "Unstructured Data",
        icon: "doc",
        items: [
            { name: "MongoDB", icon: SiMongodb },
            { name: "SQL Server", icon: FaMicrosoft },
            { name: "Oracle", icon: GrOracle },
            { name: "Excel Sheets", icon: FaFileExcel },
        ],
    },
];

const RIGHT_CARDS = [
    { title: "Insights & Analysis", subtitle: "Automated investigation", icon: "chart" },
    { title: "Missions", subtitle: "Runs your analysis 24/7", icon: "target" },
    { title: "Finished Outputs", subtitle: "Ready to present, no cleanup", icon: "doc" },
    { title: "Agentic Apps", subtitle: "Self-service tools", icon: "bolt" },
];

// --- Icons ---
const DbIcon = () => (
    <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
    </svg>
);
const DocIcon = ({ className = "w-4 h-4 text-black" }) => (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);
const ChartIcon = () => (
    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
);
const TargetIcon = () => (
    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const BoltIcon = () => (
    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);

export default function Workspace() {
    const [queryIndex, setQueryIndex] = useState(0);
    const [typed, setTyped] = useState("");
    const [phase, setPhase] = useState("typing");
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const current = QUERIES[queryIndex];
        let i = 0;
        setTyped("");
        setPhase("typing");

        const typer = setInterval(() => {
            i++;
            setTyped(current.slice(0, i));
            if (i >= current.length) {
                clearInterval(typer);
                setTimeout(() => setPhase("sending"), 700);
                setTimeout(() => setQueryIndex((p) => (p + 1) % QUERIES.length), 2400);
            }
        }, 26);

        return () => clearInterval(typer);
    }, [queryIndex]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gray-50 font-sans text-black pt-8 sm:pt-10 pb-16 px-6 md:px-10 lg:px-16 overflow-hidden"
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            <div className="relative z-10 mx-auto max-w-[1400px] w-full">
                {/* ================= HEADING ================= */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-3 sm:mb-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
                    <span className="text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        How It Works
                    </span>

                    <h2 className="mt-2 text-3xl sm:text-4xl lg:text-[40px] font-light tracking-tight text-black leading-[1.15]">
                        Connect every data source.{" "}
                        <span className="text-black/50">Ask anything.</span>
                    </h2>

                    <p className="mt-2.5 text-base text-black/70 leading-relaxed font-light max-w-2xl mx-auto">
                        ZeroQueries listens to your question, queries your warehouses and
                        documents in real time, and returns structured insights — no
                        pipelines, no SQL, no waiting.
                    </p>
                </div>

                {/* ================= DIAGRAM ================= */}
                <div
                    className={`relative transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {/* ============== CONNECTION LINES ============== */}
                    <svg
                        className="hidden xl:block absolute inset-0 w-full h-full pointer-events-none"
                        preserveAspectRatio="none"
                        viewBox="0 0 1400 620"
                    >
                        <defs>
                            <marker
                                id="arrow-gray"
                                viewBox="0 0 10 10"
                                refX="8"
                                refY="5"
                                markerWidth="6"
                                markerHeight="6"
                                orient="auto-start-reverse"
                            >
                                <path d="M 0 0 L 10 5 L 0 10 z" fill="#9ca3af" />
                            </marker>
                        </defs>

                        {/* Left side — 8 curved lines directly from each database pill */}
                        {[
                            { startX: 130, y: 175 },
                            { startX: 126, y: 217 },
                            { startX: 120, y: 259 },
                            { startX: 144, y: 301 },
                            { startX: 122, y: 397 },
                            { startX: 134, y: 439 },
                            { startX: 108, y: 481 },
                            { startX: 178, y: 523 },
                        ].map(({ startX, y }, idx) => (
                            <g key={idx}>
                                <path
                                    d={`M ${startX} ${y} C ${startX + 120} ${y}, 340 310, 420 310`}
                                    fill="none"
                                    stroke="#d1d5db"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                                <circle cx={startX} cy={y} r="3" fill="#9ca3af" />
                                <circle r="2.5" fill="#111827">
                                    <animateMotion
                                        dur={`${2.4 + (idx % 4) * 0.3}s`}
                                        repeatCount="indefinite"
                                        path={`M ${startX} ${y} C ${startX + 120} ${y}, 340 310, 420 310`}
                                    />
                                </circle>
                            </g>
                        ))}

                        {/* Left junction dot */}
                        <circle cx="420" cy="310" r="4.5" fill="#111827" />

                        {/* Junction → Input */}
                        <path
                            d="M 420 310 L 560 310"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                            markerEnd="url(#arrow-gray)"
                        />
                        <circle cx="560" cy="310" r="3.5" fill="#111827" />

                        {/* Input → Right junction */}
                        <circle cx="840" cy="310" r="3.5" fill="#111827" />
                        <path
                            d="M 840 310 L 980 310"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeDasharray="6 6"
                        />

                        {/* Right junction dot */}
                        <circle cx="980" cy="310" r="4.5" fill="#111827" />

                        {/* Right junction → 4 output cards */}
                        <path d="M 980 310 Q 1030 310 1080 170" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />
                        <path d="M 980 310 Q 1030 310 1080 250" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />
                        <path d="M 980 310 Q 1030 310 1080 330" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />
                        <path d="M 980 310 Q 1030 310 1080 410" fill="none" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#arrow-gray)" />

                        {/* Right connection dots */}
                        <circle cx="1080" cy="170" r="3.5" fill="#9ca3af" />
                        <circle cx="1080" cy="250" r="3.5" fill="#9ca3af" />
                        <circle cx="1080" cy="330" r="3.5" fill="#9ca3af" />
                        <circle cx="1080" cy="410" r="3.5" fill="#9ca3af" />
                    </svg>

                    {/* ============== 3-COLUMN GRID ============== */}
                    <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_340px] gap-8 xl:gap-14 items-center relative">
                        {/* ============ LEFT PANEL ============ */}
                        <div className="flex flex-col gap-6 w-[240px]">
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-black uppercase">
                                All of your data
                            </h3>

                            {LEFT_CARDS.map((card, ci) => (
                                <div
                                    key={ci}
                                    className="flex flex-col"
                                >
                                    <div className="flex items-center gap-2.5 mb-3">
                                        <div className="bg-gray-100 p-1.5 rounded-md">
                                            {card.icon === "db" ? (
                                                <DbIcon />
                                            ) : (
                                                <DocIcon className="w-3.5 h-3.5 text-black" />
                                            )}
                                        </div>
                                        <span className="font-medium text-sm text-black">
                                            {card.title}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        {card.items.map((item, ii) => {
                                            const ItemIcon = item.icon;
                                            return (
                                                <div key={ii} className="h-[34px] flex items-center">
                                                    <button className="flex items-center gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-xs px-2.5 py-1.5 rounded-md text-black transition-colors shrink-0 shadow-sm">
                                                        {ItemIcon ? (
                                                            <ItemIcon className="w-3.5 h-3.5 text-black shrink-0" />
                                                        ) : (
                                                            <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                                        )}
                                                        <span>{item.name}</span>
                                                    </button>
                                                    {ii === card.items.length - 1 && (
                                                        <button className="ml-1.5 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 text-xs w-7 h-7 rounded-md text-black transition-colors shrink-0 shadow-sm">
                                                            ++
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* ============ CENTER: INPUT ============ */}
                        <div className="relative max-w-2xl w-full mx-auto">
                            <div className="bg-white border border-gray-200 rounded-xl p-6 min-h-[140px] flex flex-col justify-between">
                                <p className="text-base font-light leading-relaxed text-black min-h-[52px]">
                                    {typed}
                                    {phase === "typing" && (
                                        <span className="inline-block w-[2px] h-[1.1em] align-middle bg-black ml-0.5 animate-pulse" />
                                    )}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
                                    <div className="flex gap-1.5">
                                        <button className="flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full text-[11px] font-normal">
                                            <BoltIcon className="w-3 h-3 text-white" />
                                            Insight
                                        </button>
                                        <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-full text-[11px] font-normal transition-colors">
                                            <TargetIcon />
                                            Mission
                                        </button>
                                        <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-full text-[11px] font-normal transition-colors">
                                            <DocIcon />
                                            Work Product
                                        </button>
                                    </div>

                                    <button
                                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-normal transition-all ${phase === "sending"
                                            ? "bg-gray-300 text-gray-600 cursor-wait"
                                            : "bg-black hover:bg-gray-800 text-white"
                                            }`}
                                    >
                                        {phase === "sending" ? "Sending…" : "Send"}
                                        {phase !== "sending" && (
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex justify-center gap-2 mt-3">
                                {["RevOps", "Pharma", "CPG", "FP&A"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-white text-black text-[11px] px-3 py-1 rounded-full border border-gray-200"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* ============ RIGHT PANEL ============ */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-black uppercase text-right">
                                Outputs
                            </h3>

                            {RIGHT_CARDS.map((card, i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 bg-white rounded-xl p-3.5 flex items-center gap-3 relative hover:border-gray-400 transition-colors"
                                >
                                    <div className="bg-gray-100 p-2 rounded-lg">
                                        {card.icon === "chart" && <ChartIcon />}
                                        {card.icon === "target" && <TargetIcon />}
                                        {card.icon === "doc" && <DocIcon />}
                                        {card.icon === "bolt" && <BoltIcon />}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-xs text-black">{card.title}</h4>
                                        <p className="text-[10px] text-black font-light">{card.subtitle}</p>
                                    </div>
                                    {i === 0 && (
                                        <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-black" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}