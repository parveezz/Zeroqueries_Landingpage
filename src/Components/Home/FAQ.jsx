"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

// --- FAQ data ---
const FAQS_EN = [
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

const FAQS_AR = [
    {
        q: "كيف يتصل ZeroQueries ببياناتي الحالية؟",
        a: "يقرأ ZeroQueries مباشرة من مستودعات البيانات وقواعد البيانات ومخازن المستندات لديك عبر اتصالات مشفرة للقراءة فقط. لا يتم نسخ أي شيء أو استنساخه أو تخزينه خارج نطاق شبكتك — يتم تشغيل كل استعلام مباشرة على بياناتك الحية.",
    },
    {
        q: "هل أحتاج إلى كتابة SQL أو بناء لوحات معلومات؟",
        a: "لا. أنت تطرح أسئلتك بلغة طبيعية وتحصل على إجابات مهيكلة — مخططات بيانية وجداول وملخصات. يقوم ZeroQueries تلقائياً بترجمة سؤالك إلى استعلام SQL وتشغيله على المصدر المناسب وإرجاع النتيجة فوراً.",
    },
    {
        q: "ما هي قواعد ومستودعات البيانات المدعومة؟",
        a: "ندعم بشكل أصيل Snowflake و BigQuery و Databricks و PostgreSQL و MySQL و MongoDB و SQL Server و ClickHouse و Oracle وغيرها. كما يمكن دمج المصادر غير المهيكلة مثل ملفات PDF وسجلات المكالمات وجداول البيانات جنباً إلى جنب مع مستودع البيانات الخاص بك.",
    },
    {
        q: "هل بياناتي آمنة؟",
        a: "نعم. ZeroQueries حاصل على شهادة SOC 2 Type II ويتبع سياسة صارمة لعدم الاحتفاظ بالبيانات — لا تُستخدم بياناتك أبداً لتدريب النماذج ولا يتم حفظها بعد دورة حياة الاستعلام. كما ندعم تشفير AES-256 وتشفير TLS 1.3 وخيارات النشر داخل VPC خاص أو محلياً (On-Prem).",
    },
    {
        q: "كم يستغرق البدء في العمل؟",
        a: "تتمكن معظم الفرق من ربط أول مصدر بيانات وتشغيل أول استعلام بلغة طبيعية في غضون 15 دقيقة. لا توجد خطوط أنابيب لبنائها، ولا مخططات يدوية لتجهيزها، ولا بنية تحتية معقدة.",
    },
    {
        q: "هل يمكن تشغيل ZeroQueries في بيئة عمل محلية (On-Premise)؟",
        a: "نعم. يمكن نشر ZeroQueries داخل سحابتك الخاصة VPC أو محلياً بالكامل للمؤسسات ذات المتطلبات التنظيمية الصارمة. يحتفظ فريقك بالتحكم الكامل في مكان تواجد البيانات وإمكانية الوصول إليها وسجلات التدقيق.",
    },
];

export default function FAQ() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const faqs = isAr ? FAQS_AR : FAQS_EN;

    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? -1 : i));
    };

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-14 sm:py-20 lg:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            {/* ============== PURPLE GLOW — TOP LEFT ============== */}
            <div
                className="pointer-events-none absolute -top-24 sm:-top-40 -left-24 sm:-left-40 w-[350px] sm:w-[600px] lg:w-[750px] h-[350px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(167, 139, 250, 0.14) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(80px)",
                }}
            />

            {/* ============== PURPLE GLOW — BOTTOM RIGHT ============== */}
            <div
                className="pointer-events-none absolute -bottom-24 sm:-bottom-40 -right-24 sm:-right-40 w-[350px] sm:w-[600px] lg:w-[750px] h-[350px] sm:h-[600px] lg:h-[750px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, rgba(167, 139, 250, 0.14) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(80px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* ============== SPLIT HEADER ============== */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-end mb-8 sm:mb-12 lg:mb-16">
                    <div className="lg:col-span-7">
                        <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                            {isAr ? "الأسئلة الشائعة" : "Frequently Asked"}
                        </span>

                        <h2 className="mt-2.5 sm:mt-4 text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                            {isAr ? (
                                <>
                                    كل ما يدور في ذهنك.
                                    <br />
                                    <span className="text-black/50">تمت الإجابة عنه.</span>
                                </>
                            ) : (
                                <>
                                    Everything you were about to ask.
                                    <br />
                                    <span className="text-black/50">Answered.</span>
                                </>
                            )}
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
                        <p className="text-sm sm:text-base text-black/60 leading-relaxed font-light">
                            {isAr
                                ? "جولة سريعة حول ما يقدمه ZeroQueries، وكيفية التعامل مع بياناتك بأمان، وما يلزم للبدء. ألم تجد إجابتك؟ فريقنا جاهز لمساعدتك دائماً."
                                : "A quick tour of what ZeroQueries does, how it handles your data, and what it takes to get started. Can't find your answer? Our team is one message away."}
                        </p>
                    </div>
                </div>

                {/* ============== FAQ LIST ============== */}
                <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden divide-y divide-gray-100 shadow-sm">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div key={i} className="group">
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                    className="w-full flex items-start justify-between gap-4 sm:gap-6 text-left px-4 sm:px-8 py-4 sm:py-6 transition-colors hover:bg-gray-50/60 focus-visible:outline-none focus-visible:bg-gray-50"
                                >
                                    {/* Question */}
                                    <div className="flex items-start gap-3 sm:gap-5 flex-1 min-w-0">
                                        <span className="hidden sm:inline-block text-[11px] font-medium tracking-[0.15em] text-black/40 mt-1.5 shrink-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span
                                            className={`text-[15px] sm:text-[17px] font-normal tracking-tight leading-snug transition-colors ${isOpen ? "text-black" : "text-black/80 group-hover:text-black"
                                                }`}
                                        >
                                            {item.q}
                                        </span>
                                    </div>

                                    {/* Toggle icon */}
                                    <span
                                        className={`shrink-0 mt-0.5 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border transition-all duration-300 ${isOpen
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
                                        <div className="px-4 pb-4 sm:px-8 sm:pb-7 sm:pl-[68px]">
                                            <p className="text-[13.5px] sm:text-[15px] text-black/70 font-light leading-relaxed max-w-3xl">
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
                <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-sm p-5 sm:px-8 sm:py-6">
                    <div>
                        <h3 className="text-base sm:text-lg font-medium text-black tracking-tight">
                            {isAr ? "هل لا يزال لديك استفسار؟" : "Still have questions?"}
                        </h3>
                        <p className="text-xs sm:text-sm text-black/60 font-light mt-1">
                            {isAr
                                ? "فريق الحلول الهندسية لدينا يجيبك خلال 24 ساعة."
                                : "Our solutions engineering team responds within 24 hours."}
                        </p>
                    </div>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-black text-white w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-normal hover:bg-gray-800 transition-colors group"
                    >
                        <span>{isAr ? "تحدث مع فريقنا" : "Talk to our team"}</span>
                        <FiArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}