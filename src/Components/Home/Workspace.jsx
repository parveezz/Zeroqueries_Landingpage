"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
    SiClickhouse,
    SiPostgresql,
    SiMysql,
    SiMongodb,
    SiSnowflake,
    SiGooglebigquery,
} from "react-icons/si";
import { FaMicrosoft, FaFileExcel, FaTelegramPlane } from "react-icons/fa";
import { GrOracle } from "react-icons/gr";
import { FiMessageSquare, FiFileText } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const CHAT_QUERIES_EN = [
    "Why did pipeline drop 18% week-over-week? Break down by segment, stage, and rep.",
    "Show revenue by region for last quarter, grouped by product line.",
    "Which reps have the highest deal velocity this month?",
];

const CHAT_QUERIES_AR = [
    "لماذا انخفض مسار المبيعات بنسبة 18% أسبوعياً؟ قم بالتقسيم حسب الشريحة والمرحلة والمندوب.",
    "اعرض الإيرادات حسب المنطقة للربع الأخير، مجمعة حسب خط الإنتاج.",
    "أي المندوبين حقق أعلى سرعة إغلاق صفقات هذا الشهر؟",
];

const REPORT_QUERIES_EN = [
    "Generate Q3 Executive Variance Report with revenue breakdowns by product & region.",
    "Create an automated weekly pipeline health report comparing SDR vs AE sourced deals.",
    "Draft an audit-ready compliance & data governance summary across warehouse connectors.",
];

const REPORT_QUERIES_AR = [
    "إنشاء تقرير انحرافات الربع الثالث التنفيذي مع تفصيل الإيرادات حسب المنتج والمنطقة.",
    "إنشاء تقرير أسبوعي آلي لصحة مسار المبيعات بمقارنة الصفقات الواردة من SDR مقابل AE.",
    "صياغة ملخص جاهز للتدقيق للامتثال وحوكمة البيانات عبر موصلات مستودعات البيانات.",
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
            { name: "SQL Server", icon: FaMicrosoft },
            { name: "Oracle", icon: GrOracle },
            { name: "Excel Sheets", icon: FaFileExcel },
        ],
    },
    {
        title: "Unstructured Data",
        icon: "doc",
        items: [
            { name: "MongoDB", icon: SiMongodb },
        ],
    },
];

const RIGHT_CARDS = [
    { title: "Insights & Analysis", subtitle: "Automated investigation", icon: "chart" },
    { title: "Missions", subtitle: "Runs your analysis 24/7", icon: "target" },
    { title: "Finished Outputs", subtitle: "Ready to present, no cleanup", icon: "doc" },
    { title: "Agentic Apps", subtitle: "Self-service tools", icon: "bolt" },
];

const TOTAL_LEFT_ITEMS = LEFT_CARDS.reduce((sum, c) => sum + c.items.length, 0);

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
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    const [queryIndex, setQueryIndex] = useState(0);
    const [typed, setTyped] = useState("");
    const [phase, setPhase] = useState("typing");
    const [inputMode, setInputMode] = useState("chat");
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const t = {
        howItWorks: isAr ? "كيف يعمل" : "How It Works",
        title1: isAr ? "اربط جميع مصادر بياناتك. " : "Connect every data source. ",
        title2: isAr ? "اسأل عن أي شيء." : "Ask anything.",
        desc: isAr
            ? "يستمع ZeroQueries إلى أسئلتك، ويبحث في مستودعات بياناتك ومستنداتك في الوقت الفعلي، ويعيد رؤى منظمة — دون خطوط أنابيب بيانات، ودون SQL، ودون انتظار."
            : "ZeroQueries listens to your question, queries your warehouses and documents in real time, and returns structured insights — no pipelines, no SQL, no waiting.",
        allData: isAr ? "جميع بياناتك" : "All of your data",
        structured: isAr ? "البيانات المنظمة" : "Structured Data",
        unstructured: isAr ? "البيانات غير المنظمة" : "Unstructured Data",
        chat: isAr ? "محادثة" : "Chat",
        report: isAr ? "تقرير" : "Report",
        outputs: isAr ? "المخرجات" : "Outputs",
        rightCards: [
            { title: isAr ? "الرؤى والتحليلات" : "Insights & Analysis", subtitle: isAr ? "تحقيق آلي متقدم" : "Automated investigation", icon: "chart" },
            { title: isAr ? "المهام" : "Missions", subtitle: isAr ? "تشغيل تحليلك 24/7" : "Runs your analysis 24/7", icon: "target" },
            { title: isAr ? "المخرجات الجاهزة" : "Finished Outputs", subtitle: isAr ? "جاهزة للعرض دون تعديل" : "Ready to present, no cleanup", icon: "doc" },
            { title: isAr ? "تطبيقات الوكلاء" : "Agentic Apps", subtitle: isAr ? "أدوات خدمة ذاتية" : "Self-service tools", icon: "bolt" },
        ],
    };

    const handleModeChange = (mode) => {
        if (mode === inputMode) return;
        setInputMode(mode);
        setQueryIndex(0);
        setTyped("");
        setPhase("typing");
    };

    // Refs for live coordinate measurement
    const diagramRef = useRef(null);
    const leftItemRefs = useRef([]);
    const centerInputRef = useRef(null);
    const rightCardRefs = useRef([]);
    const [coords, setCoords] = useState(null);

    const updateCoords = useCallback(() => {
        if (!diagramRef.current || !centerInputRef.current) return;
        const containerRect = diagramRef.current.getBoundingClientRect();
        if (containerRect.width === 0 || containerRect.height === 0) return;

        // Center input card
        const centerRect = centerInputRef.current.getBoundingClientRect();
        const centerLeftX = centerRect.left - containerRect.left;
        const centerRightX = centerRect.right - containerRect.left;
        const centerY = centerRect.top + centerRect.height / 2 - containerRect.top;

        // Left database pills
        const leftPoints = leftItemRefs.current
            .slice(0, TOTAL_LEFT_ITEMS)
            .filter(Boolean)
            .map((el) => {
                const rect = el.getBoundingClientRect();
                return {
                    startX: rect.right - containerRect.left,
                    startY: rect.top + rect.height / 2 - containerRect.top,
                };
            });

        const maxLeftX = leftPoints.length > 0 ? Math.max(...leftPoints.map((p) => p.startX)) : 240;
        const junctionLeftX = maxLeftX + (centerLeftX - maxLeftX) * 0.45;
        const junctionLeftY = centerY;

        // Right output cards
        const rightPoints = rightCardRefs.current
            .filter(Boolean)
            .map((el) => {
                const rect = el.getBoundingClientRect();
                return {
                    endX: rect.left - containerRect.left - 2,
                    endY: rect.top + rect.height / 2 - containerRect.top,
                };
            });

        const minRightX = rightPoints.length > 0 ? Math.min(...rightPoints.map((p) => p.endX)) : centerRightX + 180;
        const junctionRightX = centerRightX + (minRightX - centerRightX) * 0.45;
        const junctionRightY = centerY;

        setCoords({
            width: containerRect.width,
            height: containerRect.height,
            leftPoints,
            junctionLeftX,
            junctionLeftY,
            centerLeftX,
            centerRightX,
            centerY,
            junctionRightX,
            junctionRightY,
            rightPoints,
        });
    }, []);

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
        updateCoords();
        const raf = requestAnimationFrame(updateCoords);
        const timer1 = setTimeout(updateCoords, 100);
        const timer2 = setTimeout(updateCoords, 400);

        let ro = null;
        if (typeof ResizeObserver !== "undefined") {
            ro = new ResizeObserver(() => {
                updateCoords();
            });
            if (diagramRef.current) ro.observe(diagramRef.current);
            if (centerInputRef.current) ro.observe(centerInputRef.current);
        }

        window.addEventListener("resize", updateCoords);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer1);
            clearTimeout(timer2);
            if (ro) ro.disconnect();
            window.removeEventListener("resize", updateCoords);
        };
    }, [updateCoords, isVisible]);

    useEffect(() => {
        const queries = inputMode === "chat"
            ? (isAr ? CHAT_QUERIES_AR : CHAT_QUERIES_EN)
            : (isAr ? REPORT_QUERIES_AR : REPORT_QUERIES_EN);
        const current = queries[queryIndex % queries.length] || queries[0];
        let i = 0;
        setTyped("");
        setPhase("typing");

        let timerTimeout = null;
        let nextIndexTimeout = null;

        const typer = setInterval(() => {
            i++;
            setTyped(current.slice(0, i));
            if (i >= current.length) {
                clearInterval(typer);
                timerTimeout = setTimeout(() => setPhase("sending"), 700);
                nextIndexTimeout = setTimeout(() => {
                    setQueryIndex((p) => (p + 1) % queries.length);
                }, 2400);
            }
        }, 26);

        return () => {
            clearInterval(typer);
            if (timerTimeout) clearTimeout(timerTimeout);
            if (nextIndexTimeout) clearTimeout(nextIndexTimeout);
        };
    }, [queryIndex, inputMode, isAr]);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-gray-50 font-sans text-black pt-6 sm:pt-10 pb-12 sm:pb-16 px-4 sm:px-8 md:px-10 lg:px-16 overflow-hidden"
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* ============== VIOLET GLOW — TOP (BEHIND HEADING TEXT) ============== */}
            <div
                className="pointer-events-none absolute -top-24 sm:-top-40 left-1/2 -translate-x-1/2 w-[340px] sm:w-[650px] lg:w-[850px] h-[320px] sm:h-[500px] lg:h-[600px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(90px)",
                }}
            />

            {/* ============== VIOLET GLOW — TOP LEFT ============== */}
            <div
                className="pointer-events-none absolute -top-24 sm:-top-40 -left-24 sm:-left-40 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(90px)",
                }}
            />

            {/* ============== VIOLET GLOW — BOTTOM RIGHT ============== */}
            <div
                className="pointer-events-none absolute -bottom-24 sm:-bottom-40 -right-24 sm:-right-40 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(90px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-[1400px] w-full">
                {/* ================= HEADING ================= */}
                <div
                    className={`text-center max-w-3xl mx-auto mb-3 sm:mb-4 transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                >
                    <span className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/50 uppercase">
                        {t.howItWorks}
                    </span>

                    <h2 className="mt-2.5 sm:mt-3 text-[26px] sm:text-[34px] lg:text-[40px] font-normal tracking-[-0.02em] text-black leading-[1.15]">
                        {t.title1}
                        <span className="text-black/45 font-light">{t.title2}</span>
                    </h2>

                    <p className="mt-3 sm:mt-3.5 text-[13.5px] sm:text-[15px] text-black/65 leading-[1.65] font-normal max-w-xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                {/* ================= DIAGRAM ================= */}
                <div
                    ref={diagramRef}
                    className={`relative transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                        }`}
                >
                    {/* ============== CONNECTION LINES (DESKTOP ONLY) ============== */}
                    {coords && (
                        <svg
                            className="hidden xl:block absolute inset-0 w-full h-full pointer-events-none z-0"
                            viewBox={`0 0 ${coords.width} ${coords.height}`}
                            width={coords.width}
                            height={coords.height}
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

                            {/* Left side — curved lines directly from each database pill */}
                            {coords.leftPoints.map((p, idx) => {
                                const dx = Math.max(coords.junctionLeftX - p.startX, 20);
                                const pathD = `M ${p.startX} ${p.startY} C ${p.startX + dx * 0.45} ${p.startY}, ${coords.junctionLeftX - dx * 0.45} ${coords.junctionLeftY}, ${coords.junctionLeftX} ${coords.junctionLeftY}`;
                                return (
                                    <g key={idx}>
                                        <path
                                            d={pathD}
                                            fill="none"
                                            stroke="#d1d5db"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 4"
                                        />
                                        <circle cx={p.startX} cy={p.startY} r="3" fill="#9ca3af" />
                                        <circle r="2.5" fill="#111827">
                                            <animateMotion
                                                dur={`${2.2 + (idx % 4) * 0.3}s`}
                                                repeatCount="indefinite"
                                                path={pathD}
                                            />
                                        </circle>
                                    </g>
                                );
                            })}

                            {/* Left junction dot */}
                            <circle cx={coords.junctionLeftX} cy={coords.junctionLeftY} r="4.5" fill="#111827" />

                            {/* Junction → Input box */}
                            <path
                                d={`M ${coords.junctionLeftX} ${coords.junctionLeftY} L ${coords.centerLeftX} ${coords.centerY}`}
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                                markerEnd="url(#arrow-gray)"
                            />
                            <circle cx={coords.centerLeftX} cy={coords.centerY} r="3.5" fill="#111827" />
                            <circle r="2.5" fill="#111827">
                                <animateMotion
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    path={`M ${coords.junctionLeftX} ${coords.junctionLeftY} L ${coords.centerLeftX} ${coords.centerY}`}
                                />
                            </circle>

                            {/* Input box → Right junction */}
                            <circle cx={coords.centerRightX} cy={coords.centerY} r="3.5" fill="#111827" />
                            <path
                                d={`M ${coords.centerRightX} ${coords.centerY} L ${coords.junctionRightX} ${coords.junctionRightY}`}
                                fill="none"
                                stroke="#9ca3af"
                                strokeWidth="2"
                                strokeDasharray="6 6"
                            />
                            <circle cx={coords.junctionRightX} cy={coords.junctionRightY} r="4.5" fill="#111827" />
                            <circle r="2.5" fill="#111827">
                                <animateMotion
                                    dur="1.5s"
                                    repeatCount="indefinite"
                                    path={`M ${coords.centerRightX} ${coords.centerY} L ${coords.junctionRightX} ${coords.junctionRightY}`}
                                />
                            </circle>

                            {/* Right junction → 4 output cards */}
                            {coords.rightPoints.map((p, idx) => {
                                const dx = Math.max(p.endX - coords.junctionRightX, 20);
                                const pathD = `M ${coords.junctionRightX} ${coords.junctionRightY} C ${coords.junctionRightX + dx * 0.45} ${coords.junctionRightY}, ${p.endX - dx * 0.45} ${p.endY}, ${p.endX} ${p.endY}`;
                                return (
                                    <g key={idx}>
                                        <path
                                            d={pathD}
                                            fill="none"
                                            stroke="#d1d5db"
                                            strokeWidth="1.5"
                                            strokeDasharray="4 4"
                                        />
                                        <circle cx={p.endX} cy={p.endY} r="3.5" fill="#9ca3af" />
                                        <circle r="2.5" fill="#111827">
                                            <animateMotion
                                                dur={`${2.2 + (idx % 4) * 0.3}s`}
                                                repeatCount="indefinite"
                                                path={pathD}
                                            />
                                        </circle>
                                    </g>
                                );
                            })}
                        </svg>
                    )}

                    {/* ============== 3-COLUMN GRID ============== */}
                    <div className="grid grid-cols-1 xl:grid-cols-[240px_1fr_340px] gap-6 sm:gap-8 xl:gap-14 items-center relative">
                        {/* ============ LEFT PANEL ============ */}
                        <div className="flex flex-col gap-3.5 sm:gap-5 w-full max-w-2xl mx-auto xl:max-w-none xl:w-[240px]">
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-black uppercase text-left">
                                {t.allData}
                            </h3>

                            {LEFT_CARDS.map((card, ci) => {
                                const prevCount = LEFT_CARDS.slice(0, ci).reduce((acc, c) => acc + c.items.length, 0);
                                return (
                                    <div
                                        key={ci}
                                        className="flex flex-col"
                                    >
                                        <div className="flex items-center gap-2 mb-2 sm:mb-2.5">
                                            <div className="bg-gray-100 p-1.5 rounded-md">
                                                {card.icon === "db" ? (
                                                    <DbIcon />
                                                ) : (
                                                    <DocIcon className="w-3.5 h-3.5 text-black" />
                                                )}
                                            </div>
                                            <span className="font-medium text-xs sm:text-sm text-black">
                                                {ci === 0 ? t.structured : t.unstructured}
                                            </span>
                                        </div>

                                        <div className="flex flex-wrap xl:flex-col gap-1.5 sm:gap-2 items-start">
                                            {card.items.map((item, ii) => {
                                                const ItemIcon = item.icon;
                                                const isLast = ii === card.items.length - 1;
                                                const globalIndex = prevCount + ii;
                                                return (
                                                    <div
                                                        key={ii}
                                                        ref={(el) => { leftItemRefs.current[globalIndex] = el; }}
                                                        className="h-auto xl:h-[30px] flex items-center self-start"
                                                    >
                                                        <button
                                                            type="button"
                                                            className="flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-gray-100 border border-gray-200 text-[11.5px] sm:text-xs px-2.5 py-1 sm:py-1.5 rounded-md text-black transition-colors shrink-0 shadow-2xs hover:border-gray-300"
                                                        >
                                                            {ItemIcon ? (
                                                                <ItemIcon className="w-3.5 h-3.5 text-black shrink-0" />
                                                            ) : (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                                                            )}
                                                            <span>{item.name}</span>
                                                        </button>
                                                        {isLast && (
                                                            <button
                                                                type="button"
                                                                aria-label="Add data source"
                                                                className="ml-1.5 flex items-center justify-center bg-white hover:bg-gray-100 border border-gray-200 text-xs w-6 h-6 sm:w-7 sm:h-7 rounded-md text-black transition-colors shrink-0 shadow-2xs hover:border-gray-300"
                                                            >
                                                                ++
                                                            </button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* ============ CENTER: INPUT ============ */}
                        <div className="relative max-w-2xl w-full mx-auto order-first xl:order-none">
                            <div
                                ref={centerInputRef}
                                className="bg-white border border-gray-200 rounded-xl p-3 sm:p-6 min-h-[130px] sm:min-h-[140px] flex flex-col justify-between shadow-xs"
                            >
                                <p 
                                    dir={isAr ? "rtl" : "ltr"}
                                    className={`text-[14.5px] sm:text-base font-light leading-relaxed text-black min-h-[46px] sm:min-h-[52px] ${isAr ? 'text-right' : 'text-left'}`}
                                >
                                    {typed}
                                    {phase === "typing" && (
                                        <span className={`inline-block w-[2px] h-[1.1em] align-middle bg-black animate-pulse ${isAr ? 'mr-1' : 'ml-0.5'}`} />
                                    )}
                                </p>

                                <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mt-4 sm:mt-5">
                                    <div className="flex flex-wrap gap-1.5">
                                        <button
                                            type="button"
                                            onClick={() => handleModeChange("chat")}
                                            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-normal transition-all cursor-pointer ${inputMode === "chat"
                                                ? "bg-black text-white shadow-xs"
                                                : "bg-gray-100 hover:bg-gray-200 text-black"
                                                }`}
                                        >
                                            <FiMessageSquare className={`w-3 h-3 ${inputMode === "chat" ? "text-white" : "text-black"}`} />
                                            {t.chat}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleModeChange("report")}
                                            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[10.5px] sm:text-[11px] font-normal transition-all cursor-pointer ${inputMode === "report"
                                                ? "bg-black text-white shadow-xs"
                                                : "bg-gray-100 hover:bg-gray-200 text-black"
                                                }`}
                                        >
                                            <FiFileText className={`w-3 h-3 ${inputMode === "report" ? "text-white" : "text-black"}`} />
                                            {t.report}
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Send query"
                                        onClick={() => {
                                            if (phase === "typing") {
                                                const qList = inputMode === "chat"
                                                    ? (isAr ? CHAT_QUERIES_AR : CHAT_QUERIES_EN)
                                                    : (isAr ? REPORT_QUERIES_AR : REPORT_QUERIES_EN);
                                                setTyped(qList[queryIndex % qList.length] || qList[0]);
                                                setPhase("sending");
                                            }
                                        }}
                                        className={`w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full flex items-center justify-center transition-all shadow-xs ${phase === "sending"
                                            ? "bg-gray-200 text-gray-500 scale-95 cursor-wait"
                                            : "bg-black hover:bg-gray-800 text-white active:scale-95 cursor-pointer"
                                            }`}
                                    >
                                        <FaTelegramPlane
                                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 ${phase === "sending"
                                                ? "translate-x-0.5 -translate-y-0.5 opacity-60 scale-90"
                                                : "hover:translate-x-0.5 hover:-translate-y-0.5"
                                                }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ============ RIGHT PANEL ============ */}
                        <div className="flex flex-col gap-2.5 sm:gap-3 w-full max-w-2xl mx-auto xl:max-w-none xl:w-[280px] xl:translate-x-6">
                            <h3 className="text-[10px] font-medium tracking-[0.2em] text-black uppercase text-left xl:text-right xl:pr-1">
                                {t.outputs}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-2 sm:gap-2.5">
                                {t.rightCards.map((card, i) => (
                                    <div
                                        key={i}
                                        ref={(el) => {
                                            rightCardRefs.current[i] = el;
                                        }}
                                        className="border border-gray-200 bg-white rounded-lg pl-2.5 pr-2 py-2 sm:pl-3 sm:pr-2.5 sm:py-2.5 flex items-center gap-2 relative hover:border-gray-400 transition-colors"
                                    >
                                        <div className="bg-gray-100 p-1.5 rounded-md shrink-0">
                                            {card.icon === "chart" && <ChartIcon />}
                                            {card.icon === "target" && <TargetIcon />}
                                            {card.icon === "doc" && <DocIcon />}
                                            {card.icon === "bolt" && <BoltIcon />}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h4 className="font-medium text-[11px] sm:text-xs text-black truncate">
                                                {card.title}
                                            </h4>
                                            <p className="text-[9.5px] sm:text-[10px] text-black/60 font-light truncate">
                                                {card.subtitle}
                                            </p>
                                        </div>

                                        {i === 0 && (
                                            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-black" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}