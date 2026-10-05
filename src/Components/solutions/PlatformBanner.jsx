"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";

export default function PlatformBanner() {
    return (
        <section
            className="relative w-full bg-gray-50 font-sans text-black overflow-hidden"
            aria-labelledby="platform-banner-heading"
        >
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            {/* Soft radial glow behind the visual — right side */}
            <div
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-40 w-[700px] h-[700px] rounded-full hidden lg:block"
                style={{
                    background:
                        "radial-gradient(circle, rgba(100, 52, 245, 0.10) 0%, rgba(100, 52, 245, 0.04) 40%, transparent 70%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                    {/* ================= LEFT: COPY + CTAs ================= */}
                    <div className="lg:col-span-6">
                        <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            The ZeroQueries Platform
                        </span>

                        {/* H1 — SEO. The whole page's main heading. */}
                        <h1
                            id="platform-banner-heading"
                            className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]"
                        >
                            One platform.
                            <br />
                            <span className="text-black/50">
                                Every answer you need.
                            </span>
                        </h1>

                        {/* Supporting paragraph — includes target keywords naturally. */}
                        <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-black/70 leading-relaxed font-light max-w-xl">
                            ZeroQueries is a modular natural language analytics platform that
                            connects to your databases, warehouses, and documents — turning
                            plain questions into live, verified business answers.
                        </p>

                        {/* CTAs */}
                        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                            {/* Primary — Watch demo */}
                            <Link
                                href="/demo"
                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-black text-white px-6 py-3.5 text-sm font-normal hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                aria-label="Watch the ZeroQueries product demo"
                            >
                                <FiPlay className="w-3.5 h-3.5" />
                                <span>Watch a 2-minute demo</span>
                            </Link>

                            {/* Secondary — Talk to expert */}
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-black px-6 py-3.5 text-sm font-normal hover:border-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                aria-label="Contact a ZeroQueries product specialist"
                            >
                                <span>Talk to a specialist</span>
                                <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>

                        {/* Trust line — SEO-friendly, keyword-rich */}
                        <p className="mt-6 text-[11px] sm:text-xs text-black/50 font-light">
                            SOC 2 Type II certified · HIPAA-ready · Available in cloud, VPC, or on-premise
                        </p>
                    </div>

                    {/* ================= RIGHT: VISUAL ================= */}
                    <div className="lg:col-span-6">
                        <div className="relative mx-auto max-w-[560px]">
                            {/*
                The illustration area. Replace with your own composed image.

                When ready, drop in:
                <Image
                  src="/platform-hero.png"
                  alt="ZeroQueries platform showing natural language queries across connected data sources"
                  width={560}
                  height={480}
                  priority
                  className="w-full h-auto"
                />
              */}

                            {/* Placeholder composition — mirrors the reference layout */}
                            <div className="relative aspect-[7/6]">
                                {/* Soft circular backdrop */}
                                <div
                                    className="absolute inset-x-4 top-0 bottom-8 rounded-full opacity-60"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 50% 40%, rgba(100, 52, 245, 0.08) 0%, rgba(100, 52, 245, 0.02) 45%, transparent 75%)",
                                    }}
                                />

                                {/* Card 1 — the "person / product" frame */}
                                <div className="absolute left-[12%] right-[22%] top-[8%] bottom-[12%] rounded-3xl border border-gray-200 bg-white overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-[10px] font-medium tracking-[0.15em] text-black/25 uppercase">
                                            Product Preview
                                        </span>
                                    </div>
                                </div>

                                {/* Card 2 — floating dashboard mock (top-right) */}
                                <div className="absolute right-0 top-0 w-[60%] rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-[0_16px_40px_-20px_rgba(0,0,0,0.15)]">
                                    {/* Window chrome */}
                                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-gray-100">
                                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                                        <span className="w-2 h-2 rounded-full bg-gray-300" />
                                    </div>
                                    {/* Ghost chart grid */}
                                    <div className="p-4 grid grid-cols-2 gap-3">
                                        <div className="h-14 rounded bg-gray-50 border border-gray-100" />
                                        <div className="h-14 rounded bg-gray-50 border border-gray-100" />
                                        <div className="h-14 rounded bg-gray-50 border border-gray-100" />
                                        <div className="h-14 rounded bg-gray-50 border border-gray-100" />
                                    </div>
                                </div>

                                {/* Card 3 — small accent tile (bottom-left) */}
                                <div className="absolute left-0 bottom-[6%] w-[44%] rounded-xl border border-gray-200 bg-white p-3 shadow-[0_12px_30px_-16px_rgba(0,0,0,0.15)]">
                                    <div className="text-[9px] font-medium tracking-[0.15em] text-black/40 uppercase mb-2">
                                        Revenue
                                    </div>
                                    <div className="flex items-end gap-1 h-10">
                                        <div className="flex-1 rounded-sm bg-black/20" style={{ height: "40%" }} />
                                        <div className="flex-1 rounded-sm bg-black/40" style={{ height: "65%" }} />
                                        <div className="flex-1 rounded-sm bg-black/60" style={{ height: "85%" }} />
                                        <div className="flex-1 rounded-sm bg-black/80" style={{ height: "55%" }} />
                                    </div>
                                </div>

                                {/* Decorative plus signs — top-right */}
                                <div className="absolute top-0 right-[-4%] flex flex-col gap-1.5 text-black/20">
                                    {[0, 1, 2].map((i) => (
                                        <div key={i} className="flex gap-1.5">
                                            {[0, 1, 2].map((j) => (
                                                <span key={j} className="w-1 h-1">
                                                    <svg viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1">
                                                        <line x1="4" y1="0" x2="4" y2="8" />
                                                        <line x1="0" y1="4" x2="8" y2="4" />
                                                    </svg>
                                                </span>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Decorative small triangle — bottom-left */}
                                <div className="absolute left-[6%] bottom-[42%] text-black/20">
                                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none" stroke="currentColor" strokeWidth="1.25">
                                        <polygon points="7,1 13,11 1,11" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}