"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

// --- FAQ data (UNCHANGED) ---
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
        <section 
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full bg-white font-sans text-black py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-14 overflow-hidden"
        >
            {/* Dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* Ambient purple glow — top right */}
            <div
                className="pointer-events-none absolute -top-32 -right-32 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.20) 0%, rgba(167, 139, 250, 0.08) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Ambient purple glow — bottom left */}
            <div
                className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] sm:w-[600px] lg:w-[800px] h-[400px] sm:h-[600px] lg:h-[800px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(139, 92, 246, 0.20) 0%, rgba(167, 139, 250, 0.08) 40%, rgba(196, 181, 253, 0) 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                    {/* ============== LEFT/RIGHT: HEADER (STICKY) ============== */}
                    <div className="lg:col-span-5">
                        <div className={`lg:sticky lg:top-16 ${isAr ? 'text-right' : 'text-left'}`}>
                            <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]" />
                                {isAr ? "الأسئلة الشائعة" : "Frequently Asked"}
                            </span>

                            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black leading-[1.1]">
                                {isAr ? (
                                    <>
                                        كل ما يدور في ذهنك.
                                        <br />
                                        <span className="text-black/40 italic font-serif">تمت الإجابة عنه.</span>
                                    </>
                                ) : (
                                    <>
                                        Everything you were about to ask.
                                        <br />
                                        <span className="text-black/40 italic font-serif">Answered.</span>
                                    </>
                                )}
                            </h2>

                            <p className="mt-6 text-sm sm:text-base text-black/60 leading-relaxed font-light max-w-md">
                                {isAr
                                    ? "جولة سريعة حول ما يقدمه ZeroQueries، وكيفية التعامل مع بياناتك بأمان، وما يلزم للبدء. ألم تجد إجابتك؟ فريقنا جاهز لمساعدتك دائماً."
                                    : "A quick tour of what ZeroQueries does, how it handles your data, and what it takes to get started. Can't find your answer? Our team is one message away."}
                            </p>

                            <div className="mt-8 hidden lg:flex items-center gap-3">
                                <div className="h-px flex-1 bg-gray-200 max-w-[80px]" />
                                <span className="text-xs text-black/40 tracking-widest uppercase">
                                    {isAr ? "الأسئلة" : "Questions"}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ============== FAQ LIST ============== */}
                    <div className="lg:col-span-7 flex flex-col gap-3">
                        {faqs.map((item, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <div
                                    key={i}
                                    className={`group relative rounded-2xl border transition-all duration-300 ${isOpen
                                            ? "bg-white border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                                            : "bg-white/60 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-[0_4px_20px_rgb(0,0,0,0.04)]"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggle(i)}
                                        aria-expanded={isOpen}
                                        className={`w-full flex items-start justify-between gap-4 sm:gap-6 px-5 sm:px-7 py-5 sm:py-6 focus-visible:outline-none ${isAr ? 'text-right' : 'text-left'}`}
                                    >
                                        {/* Number + Question */}
                                        <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
                                            <span
                                                className={`hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full text-[11px] font-semibold tracking-wider shrink-0 transition-colors ${isOpen
                                                        ? "bg-[#7C3AED] text-white"
                                                        : "bg-purple-50 text-[#7C3AED] group-hover:bg-purple-100"
                                                    }`}
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span
                                                className={`text-[15px] sm:text-[17px] font-normal tracking-tight leading-snug transition-colors mt-1 sm:mt-1.5 ${isOpen ? "text-black" : "text-black/85 group-hover:text-black"
                                                    }`}
                                            >
                                                {item.q}
                                            </span>
                                        </div>

                                        {/* Toggle icon */}
                                        <span
                                            className={`shrink-0 mt-0.5 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen
                                                    ? "bg-black border-black text-white rotate-180"
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
                                        className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className={`px-5 pb-5 sm:px-7 sm:pb-7 ${isAr ? 'sm:pr-[72px] text-right' : 'sm:pl-[72px] text-left'}`}>
                                                <div className="h-px w-full bg-gray-100 mb-4" />
                                                <p className="text-[13.5px] sm:text-[15px] text-black/65 font-light leading-relaxed max-w-2xl">
                                                    {item.a}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ============== BOTTOM CTA ============== */}
                <div className="mt-16 sm:mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 p-8 sm:p-10 lg:p-12">
                    {/* Decorative glow inside CTA */}
                    <div
                        className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
                        style={{
                            background:
                                "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(139, 92, 246, 0) 70%)",
                            filter: "blur(60px)",
                        }}
                    />

                    <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8">
                        <div className={`max-w-md ${isAr ? 'text-right' : 'text-left'}`}>
                            <h3 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                                {isAr ? "هل لا يزال لديك استفسار؟" : "Still have questions?"}
                            </h3>
                            <p className="text-sm sm:text-base text-white/60 font-light mt-2 leading-relaxed">
                                {isAr
                                    ? "فريق الحلول الهندسية لدينا يجيبك خلال 24 ساعة."
                                    : "Our solutions engineering team responds within 24 hours."}
                            </p>
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 text-sm font-medium hover:bg-gray-100 transition-colors group shrink-0"
                        >
                            <span>{isAr ? "تحدث مع فريقنا" : "Talk to our team"}</span>
                            <FiArrowUpRight className={`h-4 w-4 transition-transform ${isAr ? '-scale-x-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
}