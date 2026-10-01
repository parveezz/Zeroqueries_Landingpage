"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";

// --- FAQ data ---
const FAQS = [
    {
        q: "How does ZeroQueries connect to my existing data?",
        a: "ZeroQueries reads directly from your warehouses, databases, and document stores using read-only, encrypted connections. Nothing is copied, replicated, or stored outside your perimeter — every query runs against your live data.",
    },
    {
        q: "Do I need to write SQL or build dashboards?",
        a: "No. You ask questions in plain English and get back structured answers — charts, tables, and summaries. Under the hood ZeroQueries translates your question into SQL, runs it against the right source, and returns the result instantly.",
    },
    {
        q: "Which databases and warehouses are supported?",
        a: "We natively support Snowflake, BigQuery, Databricks, PostgreSQL, MySQL, MongoDB, SQL Server, ClickHouse, Oracle, and more. Unstructured sources like PDFs, Gong call transcripts, and spreadsheets can be layered in alongside your warehouse.",
    },
    {
        q: "Is my data secure?",
        a: "Yes. ZeroQueries is SOC 2 Type II certified and follows a strict zero-retention policy — your data is never used to train models and is never persisted beyond the query lifecycle. We support AES-256 encryption at rest, TLS 1.3 in transit, and private VPC or on-prem deployment.",
    },
    {
        q: "How long does it take to get started?",
        a: "Most teams connect their first data source and run their first natural-language query within 15 minutes. There's no pipeline to build, no schema to model manually, and no infrastructure to provision.",
    },
    {
        q: "Can ZeroQueries run on-premise?",
        a: "Yes. ZeroQueries can be deployed inside your VPC or fully on-premise for regulated industries. Your team keeps total control over data residency, network access, and audit logs.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? -1 : i));
    };

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-24 sm:py-28 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            {/* ============== PURPLE GLOW — TOP LEFT ============== */}
            <div
                className="pointer-events-none absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(167, 139, 250, 0.14) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* ============== PURPLE GLOW — BOTTOM RIGHT ============== */}
            <div
                className="pointer-events-none absolute -bottom-40 -right-40 w-[750px] h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(167, 139, 250, 0.14) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* ============== SPLIT HEADER ============== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16">
                    <div className="lg:col-span-7">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                            Frequently Asked
                        </span>

                        <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                            Everything you were about to ask.
                            <br />
                            <span className="text-black/50">Answered.</span>
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
                        <p className="text-base text-black/60 leading-relaxed font-light">
                            A quick tour of what ZeroQueries does, how it handles your data,
                            and what it takes to get started. Can&apos;t find your answer?
                            Our team is one message away.
                        </p>
                    </div>
                </div>

                {/* ============== FAQ LIST ============== */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100">
                    {FAQS.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className="group">
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-start justify-between gap-6 text-left px-6 sm:px-8 py-6 transition-colors hover:bg-gray-50/60 focus-visible:outline-none focus-visible:bg-gray-50"
                                >
                                    {/* Question */}
                                    <div className="flex items-start gap-5 flex-1">
                                        <span className="hidden sm:inline-block text-[11px] font-medium tracking-[0.15em] text-black/40 mt-1.5 shrink-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={`text-base sm:text-[17px] font-normal tracking-tight leading-snug transition-colors ${isOpen ? "text-black" : "text-black/80 group-hover:text-black"
                                                }`}
                                        >
                                            {item.q}
                                        </span>
                                    </div>

                                    {/* Toggle icon */}
                                    <span
                                        className={`shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen
                                                ? "bg-black border-black text-white"
                                                : "bg-white border-gray-200 text-black/60 group-hover:border-black group-hover:text-black"
                                            }`}
                                    >
                                        {isOpen ? (
                                            <FiMinus className="h-3.5 w-3.5" />
                                        ) : (
                                            <FiPlus className="h-3.5 w-3.5" />
                                        )}
                                    </span>
                                </button>

                                {/* Answer — animated collapse */}
                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 sm:px-8 pb-6 sm:pb-7 pl-6 sm:pl-[68px]">
                                            <p className="text-[15px] text-black/70 font-light leading-relaxed max-w-3xl">
                                                {item.a}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ============== STILL HAVE QUESTIONS CTA ============== */}
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white/60 backdrop-blur-sm px-6 sm:px-8 py-6">
                    <div>
                        <h3 className="text-lg font-medium text-black tracking-tight">
                            Still have questions?
                        </h3>
                        <p className="text-sm text-black/60 font-light mt-1">
                            Our solutions engineering team responds within 24 hours.
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-sm font-normal hover:bg-gray-800 transition-colors group"
                    >
                        <span>Talk to our team</span>
                        <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}