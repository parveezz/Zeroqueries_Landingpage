"use client";

import { useState, useEffect } from "react";
import { FiMessageSquare, FiZap, FiShield, FiBarChart2, FiCheck } from "react-icons/fi";

const STEPS = [
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

const SAMPLE_QUESTION = "Show revenue by region last quarter.";
const SAMPLE_ANSWER = "Revenue grew by 18% in the EMEA region.";

export default function ConversationalAI() {
    const [typed, setTyped] = useState("");
    const [phase, setPhase] = useState("typing"); // typing | thinking | answering

    // Typing animation loop
    useEffect(() => {
        let i = 0;
        setTyped("");
        setPhase("typing");

        const typer = setInterval(() => {
            i++;
            setTyped(SAMPLE_QUESTION.slice(0, i));
            if (i >= SAMPLE_QUESTION.length) {
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
    }, [phase === "typing" ? typed.length === 0 : false]);

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
                    {/* ================= LEFT: COPY + STEPS ================= */}
                    <div>
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            How It Works
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                            Your data, in plain English.
                        </h2>

                        <p className="mt-6 text-base text-black/70 leading-relaxed font-light max-w-lg">
                            Anyone on your team can ask their data a question — and get a
                            real answer in seconds. No SQL, no dashboards, no waiting on the
                            data team.
                        </p>

                        {/* Steps list */}
                        <div className="mt-10 space-y-3">
                            {STEPS.map((step, i) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.title}
                                        className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:border-gray-400 hover:-translate-y-0.5"
                                    >
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 text-black shrink-0 transition-transform duration-300 group-hover:scale-105">
                                            <Icon className="h-4 w-4" strokeWidth={1.75} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-medium text-black/40 tracking-[0.15em]">
                                                    0{i + 1}
                                                </span>
                                                <h3 className="text-[15px] font-medium tracking-tight text-black">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="mt-1 text-sm text-black/60 leading-relaxed font-light">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Footer line */}
                        <p className="mt-8 inline-flex items-center gap-2 text-sm font-normal text-black">
                            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-black text-white">
                                <FiCheck className="h-3 w-3" strokeWidth={3} />
                            </span>
                            No SQL required.
                        </p>
                    </div>

                    {/* ================= RIGHT: LIVE CHAT PANEL ================= */}
                    <div className="relative">
                        <div className="relative mx-auto w-full max-w-[520px] rounded-3xl border border-gray-200 bg-white overflow-hidden">
                            <div className="relative p-6 sm:p-7">
                                {/* -------- Header: AI status -------- */}
                                <div className="flex items-center gap-3 pb-5 border-b border-gray-100">
                                    <div className="relative">
                                        {/* Pulsing halo */}
                                        <span className="absolute inset-0 rounded-full bg-black opacity-20 animate-ping" />
                                        {/* Icon circle */}
                                        <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-black text-white">
                                            <FiZap className="h-5 w-5" strokeWidth={2.25} />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="text-sm font-medium text-black tracking-tight">
                                            ZeroQueries AI
                                        </div>
                                        <div className="text-xs text-black/50 font-light flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                            Connected · Live data
                                        </div>
                                    </div>
                                </div>

                                {/* -------- User question bubble -------- */}
                                <div className="mt-6 flex justify-end">
                                    <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-gray-100 px-4 py-3">
                                        <p className="text-sm text-black font-light leading-relaxed">
                                            {typed}
                                            {phase === "typing" && (
                                                <span className="inline-block w-[2px] h-[1.1em] align-middle bg-black ml-0.5 animate-pulse" />
                                            )}
                                        </p>
                                    </div>
                                </div>

                                {/* -------- AI response -------- */}
                                {(phase === "thinking" || phase === "answering") && (
                                    <div className="mt-4 flex items-start gap-3">
                                        {/* Small AI icon */}
                                        <div className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white shrink-0 mt-1">
                                            <FiZap className="h-3.5 w-3.5" strokeWidth={2.5} />
                                        </div>

                                        <div className="flex-1 min-w-0 rounded-2xl rounded-tl-md border border-gray-200 bg-white px-4 py-3 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]">
                                            {phase === "thinking" ? (
                                                <div className="flex items-center gap-1.5 py-1">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "0ms" }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "150ms" }} />
                                                    <span className="w-1.5 h-1.5 rounded-full bg-black/30 animate-bounce" style={{ animationDelay: "300ms" }} />
                                                </div>
                                            ) : (
                                                <>
                                                    <p className="text-sm text-black font-normal leading-relaxed">
                                                        {SAMPLE_ANSWER}
                                                    </p>

                                                    {/* Mini bar chart — monochrome */}
                                                    <div className="mt-4 flex items-end gap-2 h-16">
                                                        <div className="flex-1 rounded-md bg-black" style={{ height: "40%" }} />
                                                        <div className="flex-1 rounded-md bg-black/70" style={{ height: "68%" }} />
                                                        <div className="flex-1 rounded-md bg-black/50" style={{ height: "52%" }} />
                                                        <div className="flex-1 rounded-md bg-black/30" style={{ height: "88%" }} />
                                                        <div className="flex-1 rounded-md bg-black/20" style={{ height: "34%" }} />
                                                    </div>

                                                    <div className="mt-2 flex justify-between text-[10px] text-black/40 font-light tracking-wide">
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
                                <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <FiMessageSquare className="h-4 w-4 text-black/40 shrink-0" />
                                    <span className="text-sm text-black/40 font-light italic flex-1">
                                        Asking another question…
                                    </span>
                                    <button
                                        type="button"
                                        className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white hover:bg-black/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                        aria-label="Ask"
                                    >
                                        <FiZap className="h-3.5 w-3.5" strokeWidth={2.25} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Caption below panel */}
                        <p className="mt-6 text-center text-xs text-black/50 font-light">
                            Real queries. Real data. In seconds.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}