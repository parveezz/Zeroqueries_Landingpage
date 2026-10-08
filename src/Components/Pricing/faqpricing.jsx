"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPlus, FiMinus, FiArrowUpRight } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const PRICING_FAQS_EN = [
    {
        q: "How does the 14-day free trial work?",
        a: "You get unrestricted access to all Growth tier features for 14 days, with unlimited queries and database connectors. No credit card is required to get started. At the end of the trial, you can choose a plan or your workspace will safely pause with no charges.",
    },
    {
        q: "Can I change, upgrade, or cancel my plan at any time?",
        a: "Yes. You can upgrade, downgrade, or cancel your subscription at any time directly inside your account billing settings. Plan upgrades take effect immediately with prorated billing, while cancellations remain active until the end of the current billing cycle.",
    },
    {
        q: "What payment methods do you support?",
        a: "We accept all major credit and debit cards (Visa, Mastercard, American Express) via Stripe secure checkout. For Enterprise annual agreements, we also support bank wire transfers (ACH/SEPA/SWIFT) and customized purchase orders with Net-30 payment terms.",
    },
    {
        q: "Are there limits on database connections or query volume?",
        a: "Starter includes up to 3 database connectors. Growth supports up to 10 connectors with prioritized execution and automated caching. Enterprise provides unlimited database connections, dedicated execution workers, and SLA guarantees.",
    },
    {
        q: "Do you offer discounts for annual billing or early-stage startups?",
        a: "Yes! Choosing annual billing provides a 20% discount across all tiers compared to monthly billing. We also offer dedicated founder credits and discount tiers for qualified early-stage startups and non-profit organizations.",
    },
    {
        q: "How is my company's data protected?",
        a: "ZeroQueries is SOC 2 Type II certified and GDPR compliant. All connections are read-only and encrypted end-to-end (TLS 1.3 and AES-256). Your underlying data is never used to train global AI models and never stored on third-party servers.",
    },
];

const PRICING_FAQS_AR = [
    {
        q: "كيف تعمل الفترة التجريبية المجانية لمدة 14 يوماً؟",
        a: "تحصل على وصول كامل غير مقيد لجميع ميزات خطة النمو (Growth) لمدة 14 يوماً، مع استعلامات وموصلات بيانات غير محدودة. لا يلزم إدخال بطاقة ائتمان للبدء. عند انتهاء الفترة، يمكنك اختيار الخطة المناسبة دون أي خصم تلقائي.",
    },
    {
        q: "هل يمكنني ترقية أو تغيير أو إلغاء خطتي في أي وقت؟",
        a: "نعم. يمكنك الترقية أو تغيير الخطة أو الإلغاء في أي وقت من خلال لوحة إعدادات الفوترة. تُطبق الترقيات فوراً مع احتساب نسبي للاستخدام، وفي حالة الإلغاء يظل حسابك نشطاً حتى نهاية فترة الفوترة المدفوعة.",
    },
    {
        q: "ما هي طرق الدفع المقبولة؟",
        a: "نقبل جميع بطاقات الائتمان والخصم الرئيسية (Visa و Mastercard و American Express) من خلال بوابة Stripe الآمنة. بالنسبة لعقود الشركات السنوية، ندعم أيضاً التحويلات البنكية المباشرة وأوامر الشراء الرسمية مع تسهيلات سداد حتى 30 يوماً.",
    },
    {
        q: "هل توجد قيود على عدد قواعد البيانات المتصلة أو حجم الاستعلامات؟",
        a: "تتضمن باقة البداية ما يصل إلى 3 موصلات لقواعد البيانات. بينما تدعم باقة النمو حتى 10 موصلات مع أولوية وسرعة أعلى في المعالجة. وتوفر باقة المؤسسات موصلات غير محدودة وعمال استعلام مخصصين مع اتفاقية مستوى خدمة (SLA).",
    },
    {
        q: "هل تقدمون خصومات على الدفع السنوي أو للشركات الناشئة؟",
        a: "نعم! يوفر اختيار الفوترة السنوية خصماً بنسبة 20% مقارنة بالدفع الشهري. كما نوفر باقات دعم مخفضة ومزايا مخصصة للشركات الناشئة المؤهلة والمنظمات غير الربحية.",
    },
    {
        q: "كيف يتم حماية وتأمين بيانات شركتنا؟",
        a: "منصة ZeroQueries حاصلة على شهادة SOC 2 Type II ومتوافقة مع معايير GDPR. جميع اتصالات القراءة مشفرة بالكامل عبر TLS 1.3 و AES-256. لا يتم أبداً تخزين بياناتك أو استخدامها لتدريب نماذج الذكاء الاصطناعي العامة.",
    },
];

export default function FaqPricing() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const faqs = isAr ? PRICING_FAQS_AR : PRICING_FAQS_EN;

    const [openIndex, setOpenIndex] = useState(0);

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? -1 : i));
    };

    return (
        <section
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full bg-white font-sans text-black py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden border-t border-gray-100"
        >
            {/* Dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* Ambient teal glow — top right */}
            <div
                className="pointer-events-none absolute -top-32 -right-32 w-[400px] sm:w-[600px] lg:w-[700px] h-[400px] sm:h-[600px] lg:h-[700px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(19, 78, 74, 0.18) 0%, rgba(15, 23, 42, 0.08) 45%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            {/* Ambient teal glow — bottom left */}
            <div
                className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] sm:w-[600px] lg:w-[700px] h-[400px] sm:h-[600px] lg:h-[700px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(19, 78, 74, 0.15) 0%, rgba(15, 23, 42, 0.06) 45%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= SPLIT HEADER ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-end mb-10 sm:mb-14 lg:mb-16">
                    <div className="lg:col-span-7">
                        <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#134e4a]" />
                            {isAr ? "الأسئلة الشائعة حول الأسعار" : "Pricing FAQ"}
                        </span>

                        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[42px] font-light tracking-tight text-black leading-[1.15]">
                            {isAr ? (
                                <>
                                    أسئلة شائعة،
                                    <br />
                                    <span className="text-black/40 italic font-serif">إجابات شفافة.</span>
                                </>
                            ) : (
                                <>
                                    Frequently asked,
                                    <br />
                                    <span className="text-black/40 italic font-serif">clearly answered.</span>
                                </>
                            )}
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
                        <p className="text-sm sm:text-base text-black/60 leading-relaxed font-light">
                            {isAr
                                ? "كل ما تحتاج لمعرفته حول الفوترة، والتراخيص، وتجارب الاستخدام، وخيارات الترقية في ZeroQueries."
                                : "Everything you need to know about billing, licensing, trials, and contract flexibility at ZeroQueries."}
                        </p>
                    </div>
                </div>

                {/* ================= ACCORDION LIST ================= */}
                <div className="max-w-4xl mx-auto flex flex-col gap-3">
                    {faqs.map((item, i) => {
                        const isOpen = openIndex === i;
                        return (
                            <div
                                key={i}
                                className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                        ? "bg-white border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                                        : "bg-white/60 border-gray-100 hover:bg-white hover:border-gray-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => toggle(i)}
                                    aria-expanded={isOpen}
                                    className={`w-full flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer focus-visible:outline-none ${isAr ? "text-right" : "text-left"
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5 sm:gap-5 flex-1 min-w-0">
                                        <span
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold tracking-wider shrink-0 transition-colors ${isOpen
                                                    ? "bg-[#134e4a] text-white"
                                                    : "bg-gray-100 text-black/50 group-hover:bg-[#134e4a]/10 group-hover:text-[#134e4a]"
                                                }`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <h3
                                            className={`text-[15px] sm:text-[17px] font-normal tracking-tight leading-snug transition-colors ${isOpen ? "text-black" : "text-black/85 group-hover:text-black"
                                                }`}
                                        >
                                            {item.q}
                                        </h3>
                                    </div>

                                    <span
                                        className={`shrink-0 flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen
                                                ? "bg-black border-black text-white rotate-180"
                                                : "bg-white border-gray-200 text-black/60 group-hover:border-black group-hover:text-black"
                                            }`}
                                    >
                                        {isOpen ? (
                                            <FiMinus className="w-3.5 h-3.5" />
                                        ) : (
                                            <FiPlus className="w-3.5 h-3.5" />
                                        )}
                                    </span>
                                </button>

                                <div
                                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div
                                            className={`px-5 sm:px-6 pb-5 sm:pb-6 ${isAr ? "sm:pr-[68px] text-right" : "sm:pl-[68px] text-left"
                                                }`}
                                        >
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

                {/* ================= BOTTOM CONTACT ROW ================= */}
                <div className="mt-10 sm:mt-14 text-center">
                    <p className="text-xs sm:text-sm text-black/50 font-light">
                        {isAr ? (
                            <>
                                هل لديك متطلبات تسعير خاصة بمؤسستك؟{" "}
                                <Link
                                    href="/contact"
                                    className="text-[#134e4a] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>تحدث مع فريق مبيعاتنا</span>
                                    <FiArrowUpRight className="w-3.5 h-3.5 -scale-x-100" />
                                </Link>
                            </>
                        ) : (
                            <>
                                Have custom procurement or compliance requirements?{" "}
                                <Link
                                    href="/contact"
                                    className="text-[#134e4a] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                    <span>Talk to our sales engineers</span>
                                    <FiArrowUpRight className="w-3.5 h-3.5" />
                                </Link>
                            </>
                        )}
                    </p>
                </div>
            </div>
        </section>
    );
}