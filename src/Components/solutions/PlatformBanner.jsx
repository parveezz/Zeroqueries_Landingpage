"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight, FiPlay } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformBanner() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

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
                            {isAr ? "منصة ZeroQueries" : "The ZeroQueries Platform"}
                        </span>

                        {/* H1 — SEO. The whole page's main heading. */}
                        <h1
                            id="platform-banner-heading"
                            className="mt-3 sm:mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]"
                        >
                            {isAr ? (
                                <>
                                    منصة واحدة.
                                    <br />
                                    <span className="text-black/50">
                                        لكل الإجابات التي تحتاجها.
                                    </span>
                                </>
                            ) : (
                                <>
                                    One platform.
                                    <br />
                                    <span className="text-black/50">
                                        Every answer you need.
                                    </span>
                                </>
                            )}
                        </h1>

                        {/* Supporting paragraph */}
                        <p className="mt-5 sm:mt-6 text-sm sm:text-base lg:text-[17px] text-black/70 leading-relaxed font-light max-w-xl">
                            {isAr
                                ? "ZeroQueries هي منصة تحليلات معيارية باللغة الطبيعية تتصل بقواعد بياناتك ومستودعاتك ومستنداتك — لتحويل الأسئلة البسيطة إلى إجابات أعمال حية وموثوقة."
                                : "ZeroQueries is a modular natural language analytics platform that connects to your databases, warehouses, and documents - turning plain questions into live, verified business answers."}
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
                                <span>{isAr ? "شاهد عرضاً سريعاً" : "Watch a 2-minute demo"}</span>
                            </Link>

                            {/* Secondary — Talk to expert */}
                            <Link
                                href="/contact"
                                className="group inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 bg-white text-black px-6 py-3.5 text-sm font-normal hover:border-gray-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                aria-label="Contact a ZeroQueries product specialist"
                            >
                                <span>{isAr ? "تحدث مع مختص" : "Talk to a specialist"}</span>
                                <FiArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>

                        {/* Trust line */}
                        <p className="mt-6 text-[11px] sm:text-xs text-black/50 font-light">
                            {isAr
                                ? "معتمد SOC 2 Type II · جاهز للتوافق مع HIPAA · متاح سحابياً أو في VPC أو محلياً"
                                : "SOC 2 Type II certified · HIPAA-ready · Available in cloud, VPC, or on-premise"}
                        </p>
                    </div>

                    {/* ================= RIGHT: VISUAL ================= */}
                    <div className="lg:col-span-6">
                        <div className="relative mx-auto w-full max-w-[440px] sm:max-w-[500px] lg:max-w-[560px]">
                            {/* Composition container */}
                            <div className="relative aspect-[7/6] w-full">
                                {/* Soft circular backdrop */}
                                <div
                                    className="absolute inset-x-4 top-0 bottom-8 rounded-full opacity-60 pointer-events-none"
                                    style={{
                                        background:
                                            "radial-gradient(circle at 50% 40%, rgba(100, 52, 245, 0.12) 0%, rgba(100, 52, 245, 0.03) 45%, transparent 75%)",
                                    }}
                                />

                                {/* Card 1 — The User Portrait Frame */}
                                <div className="absolute left-[10%] right-[18%] sm:left-[12%] sm:right-[20%] top-[6%] bottom-[8%] sm:top-[8%] sm:bottom-[10%] rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white overflow-hidden shadow-[0_20px_50px_-20px_rgba(0,0,0,0.14)]">
                                    <Image
                                        src="/avatars/monika.jpg"
                                        alt="Business analyst using ZeroQueries platform"
                                        fill
                                        sizes="(max-width: 640px) 70vw, 420px"
                                        priority
                                        className="object-cover object-top"
                                    />
                                    {/* Subtle bottom gradient & overlay badge */}
                                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/50 via-black/20 to-transparent pointer-events-none" />
                                    <div className="absolute bottom-2.5 left-3 right-3 sm:bottom-3.5 sm:left-4 sm:right-4 flex items-center justify-between text-white text-[10px] sm:text-[11.5px] font-medium pointer-events-none">
                                        <span className="truncate drop-shadow-sm">
                                            {isAr ? "ذكاء الأعمال للمؤسسات" : "Enterprise Intelligence"}
                                        </span>
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    </div>
                                </div>

                                {/* Card 2 — Floating Live Query / AI Insight (top-right) */}
                                <div className="absolute right-0 sm:-right-2 top-0 sm:-top-2 w-[54%] sm:w-[50%] rounded-xl sm:rounded-2xl border border-gray-200 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 z-10">
                                    <div className="flex items-center justify-between gap-1 mb-1 sm:mb-1.5">
                                        <div className="flex items-center gap-1.5 min-w-0">
                                            <span className="text-[9px] sm:text-[11px] font-medium text-black/60 uppercase tracking-wider truncate">
                                                {isAr ? "تحليل ذكي" : "AI Insight"}
                                            </span>
                                        </div>

                                        <span className="text-[9px] sm:text-[10px] font-medium text-black bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded-full shrink-0">
                                            +28%
                                        </span>
                                    </div>

                                    <div className="text-[11px] sm:text-[13px] font-medium text-black leading-tight truncate">
                                        {isAr ? "معدل تحويل الإيرادات" : "Revenue conversion"}
                                    </div>

                                    <div className="mt-1.5 sm:mt-2 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#6434F5] rounded-full w-[82%]" />
                                    </div>
                                </div>

                                {/* Card 3 — Floating Metrics Tile (bottom-left) */}
                                <div className="absolute left-0 sm:-left-2 bottom-[2%] sm:bottom-[4%] w-[44%] sm:w-[40%] rounded-xl sm:rounded-2xl border border-gray-200/90 bg-white/95 backdrop-blur-md p-2.5 sm:p-3.5 shadow-[0_14px_35px_-15px_rgba(0,0,0,0.16)] z-10">
                                    <div className="text-[9px] sm:text-[10px] font-medium tracking-[0.15em] text-black/40 uppercase mb-1">
                                        {isAr ? "ربعي" : "Quarterly"}
                                    </div>
                                    <div className="text-xs sm:text-base font-semibold text-black mb-1.5">
                                        $248,500
                                    </div>
                                    <div className="flex items-end gap-1 sm:gap-1.5 h-6 sm:h-8">
                                        <div className="flex-1 rounded-sm bg-black/20" style={{ height: "45%" }} />
                                        <div className="flex-1 rounded-sm bg-black/40" style={{ height: "65%" }} />
                                        <div className="flex-1 rounded-sm bg-[#6434F5]/70" style={{ height: "85%" }} />
                                        <div className="flex-1 rounded-sm bg-[#6434F5]" style={{ height: "100%" }} />
                                    </div>
                                </div>

                                {/* Decorative plus signs — safely positioned inside container */}
                                <div className="absolute top-2 right-1 sm:right-2 flex flex-col gap-1 text-black/20 pointer-events-none">
                                    {[0, 1].map((i) => (
                                        <div key={i} className="flex gap-1">
                                            {[0, 1].map((j) => (
                                                <span key={j} className="w-1.5 h-1.5">
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
                                <div className="absolute left-[4%] bottom-[42%] text-black/20 pointer-events-none hidden xs:block">
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