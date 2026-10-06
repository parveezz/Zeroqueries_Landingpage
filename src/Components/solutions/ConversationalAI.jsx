"use client";

import { useState, useEffect } from "react";
import { FiMessageSquare, FiZap, FiShield, FiBarChart2, FiCheck } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const STEPS_EN = [
    {
        icon: FiMessageSquare,
        title: "Understands your question",
        description: "Plain English in, intent understood — no query syntax required.",
    },
    {
        icon: FiZap,
        title: "Builds the correct query",
        description: "Translates your intent into accurate SQL across every connected source.",
    },
    {
        icon: FiShield,
        title: "Retrieves data securely",
        description: "Read-only, encrypted access to live data — nothing is copied or stored.",
    },
    {
        icon: FiBarChart2,
        title: "Returns answers you can use",
        description: "Charts, tables, and summaries — ready to share with your team.",
    },
];

const STEPS_AR = [
    {
        icon: FiMessageSquare,
        title: "يفهم سؤالك بدقة",
        description: "اطرح سؤالك بلغة طبيعية، ويفهم القصد فوراً — دون الحاجة لأي صيغ استعلام.",
    },
    {
        icon: FiZap,
        title: "يبني الاستعلام الصحيح",
        description: "يحول هدفك إلى استعلام SQL دقيق عبر جميع مصادر بياناتك المتصلة.",
    },
    {
        icon: FiShield,
        title: "يسترجع البيانات بأمان",
        description: "وصول مشفر للقراءة فقط للبيانات الحية — لا يتم نسخ أو تخزين أي شيء.",
    },
    {
        icon: FiBarChart2,
        title: "يقدم إجابات جاهزة للاستخدام",
        description: "رسوم بيانية وجداول وملخصات — جاهزة للمشاركة المباشرة مع فريقك.",
    },
];

export default function ConversationalAI() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    const steps = isAr ? STEPS_AR : STEPS_EN;
    const sampleQuestion = isAr ? "اعرض الإيرادات حسب المنطقة للربع الأخير." : "Show revenue by region last quarter.";
    const sampleAnswer = isAr ? "نمت الإيرادات بنسبة 18٪ في منطقة الشرق الأوسط وأوروبا." : "Revenue grew by 18% in the EMEA region.";

    const [typed, setTyped] = useState("");
    const [phase, setPhase] = useState("typing"); // typing | thinking | answering

    // Typing animation loop
    useEffect(() => {
        let i = 0;
        setTyped("");
        setPhase("typing");

        const typer = setInterval(() => {
            i++;
            setTyped(sampleQuestion.slice(0, i));
            if (i >= sampleQuestion.length) {
                clearInterval(typer);
                setTimeout(() => setPhase("thinking"), 400);
                setTimeout(() => setPhase("answering"), 1600);
                setTimeout(() => {
                    i = 0;
                    setTyped("");
                    setPhase("typing");
                }, 5200);
            }
        }, 45);

        return () => clearInterval(typer);
    }, [sampleQuestion, phase === "typing" ? typed.length === 0 : false]);

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black pt-14 sm:pt-20 lg:pt-10 pb-14 sm:pb-20 lg:pb-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-center">
                    {/* ================= LEFT: COPY + STEPS ================= */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            {isAr ? "كيف يعمل" : "How It Works"}
                        </span>

                        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                            {isAr ? "بياناتك، بلغة بسيطة ومباشرة." : "Your data, in plain English."}
                        </h2>

                        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-black/70 leading-relaxed font-light max-w-lg">
                            {isAr
                                ? "يمكن لأي شخص في فريقك طرح سؤال على البيانات والحصول على إجابة موثوقة خلال ثوانٍ. بدون استعلامات SQL معقدة، وبدون لوحات تحكم بطيئة، وبدون انتظار فريق هندسة البيانات."
                                : "Anyone on your team can ask their data a question — and get a real answer in seconds. No SQL, no dashboards, no waiting on the data team."}
                        </p>

                        {/* Steps list */}
                        <div className="mt-6 sm:mt-10 space-y-2.5 sm:space-y-3">
                            {steps.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.title}
                                        className="group flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border border-gray-200 bg-white p-3.5 sm:p-4 transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5"
                                    >
                                        <div className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-100 text-black shrink-0 transition-transform duration-300 group-hover:scale-105">
                                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] sm:text-[11px] font-medium text-black/40 tracking-[0.15em]">
                                                    0{i + 1}
                                                </span>
                                                <h3 className="text-sm sm:text-[15px] font-medium tracking-tight text-black">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="mt-0.5 sm:mt-1 text-[13px] sm:text-sm text-black/60 leading-relaxed font-light">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer line */}
                        <p className="mt-6 sm:mt-8 inline-flex items-center gap-2 text-xs sm:text-sm font-normal text-black">
                            <span className="flex items-center justify-center w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-black text-white">
                                <FiCheck className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />
                            </span>
                            {isAr ? "لا حاجة لمعرفة SQL إطلاقاً." : "No SQL required."}
                        </p>
                    </div>

                    {/* ================= RIGHT: LIVE CHAT PANEL ================= */}
                    <div className="relative">
                        <div className="relative mx-auto w-full max-w-[520px] rounded-2xl sm:rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                            <div className="relative p-4 sm:p-6 lg:p-7">
                                {/* -------- Header: AI status -------- */}
                                <div className="flex items-center gap-2.5 sm:gap-3 pb-4 sm:pb-5 border-b border-gray-100">
                                    <div className="relative">
                                        {/* Pulsing halo */}
                                        <span className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping" />
                                        {/* Icon circle */}
                                        <div className="relative flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black text-white">
                                            <FiZap className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.25} />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-[13px] sm:text-sm font-medium text-black tracking-tight">
                                            ZeroQueries AI
                                        </div>
                                        <div className="text-[11px] sm:text-xs text-black/50 font-light flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            {isAr ? "متصل · بيانات مباشرة" : "Connected · Live data"}
                                        </div>
                                    </div>
                                </div>

                                {/* -------- User question bubble -------- */}
                                <div className="mt-5 sm:mt-6 flex justify-end">
                                    <div className="max-w-[90%] sm:max-w-[85%] rounded-2xl rounded-tr-sm bg-gray-100 px-3.5 py-2.5 sm:px-4 sm:py-3">
                                        <p className="text-[13px] sm:text-sm text-black font-light leading-relaxed">
                                            {typed}
                                            {phase === "typing" && (
                                                <span className="inline-block w-[2px] h-[1.1em] align-middle bg-black ml-0.5 animate-pulse" />
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* -------- AI response -------- */}
                                {(phase === "thinking" || phase === "answering") && (
                                    <div className="mt-3.5 sm:mt-4 flex items-start gap-2.5 sm:gap-3">
                                        {/* Small AI icon */}
                                        <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-black text-white shrink-0 mt-1">
                                            <FiZap className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />
                                        </div>

                                        <div className="flex-1 min-w-0 rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                                            {phase === "thinking" ? (
                                                <div className="flex items-center gap-1.5 py-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-[13px] sm:text-sm text-black font-normal leading-relaxed">
                                                        {sampleAnswer}
                                                    </p>

                                                    {/* Mini bar chart — monochrome */}
                                                    <div className="mt-3.5 sm:mt-4 flex items-end gap-1.5 sm:gap-2 h-14 sm:h-16">
                                                        <div className="flex-1 rounded-sm sm:rounded-md bg-black" style={{ height: "40%" }} />
                                                        <div className="flex-1 rounded-sm sm:rounded-md bg-black/70" style={{ height: "68%" }} />
                                                        <div className="flex-1 rounded-sm sm:rounded-md bg-black/50" style={{ height: "52%" }} />
                                                        <div className="flex-1 rounded-sm sm:rounded-md bg-black/30" style={{ height: "88%" }} />
                                                        <div className="flex-1 rounded-sm sm:rounded-md bg-black/20" style={{ height: "34%" }} />
                                                    </div>

                                                    <div className="mt-2 flex justify-between text-[9px] sm:text-[10px] text-black/40 font-light tracking-wide">
                                                        <span>NA</span>
                                                        <span>EMEA</span>
                                                        <span>APAC</span>
                                                        <span>LATAM</span>
                                                        <span>MEA</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* -------- Footer: next question bar -------- */}
                                <div className="mt-5 sm:mt-6 flex items-center gap-2.5 sm:gap-3 rounded-xl sm:rounded-2xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 sm:px-4 sm:py-3">
                                    <FiMessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-black/40 shrink-0" />
                                    <span className="text-xs sm:text-sm text-black/40 font-light italic flex-1">
                                        {isAr ? "طرح استعلام آخر…" : "Asking another question…"}
                                    </span>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        aria-label="Ask"
                                    >
                                        <FiZap className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={2.25} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Caption below panel */}
                        <p className="mt-4 sm:mt-6 text-center text-[11px] sm:text-xs text-black/50 font-light">
                            {isAr ? "استعلامات حقيقية. بيانات مباشرة. في ثوانٍ معدودة." : "Real queries. Real data. In seconds."}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}