"use client";

import { useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

const reviews = [
    {
        id: 1,
        name: "Reem Al-Farsi",
        nameAr: "ريم الفارسي",
        role: "Director of Analytics, National Digital Authority",
        roleAr: "مديرة التحليلات، الهيئة الرقمية الوطنية",
        initials: "RA",
        color: "bg-[#0EA5E9]",
        primary:
            "What stood out instantly was how ZeroQueries translates plain business language into reliable SQL on its own. Our analysts no longer burn hours drafting queries — they simply ask and receive.",
        primaryAr:
            "ما لفت انتباهنا على الفور هو كيفية ترجمة ZeroQueries للغة الأعمال العادية إلى استعلامات SQL موثوقة تلقائياً. لم يعد محللونا يقضون ساعات في كتابة الاستعلامات — بل يسألون ويحصلون على النتائج فوراً.",
        secondary:
            "Within the first quarter, our team cut reporting turnaround time nearly in half and uncovered regional trends we had been overlooking for years.",
        secondaryAr:
            "خلال الربع الأول، قلص فريقنا وقت إنجاز التقارير إلى النصف تقريباً واكتشف اتجاهات إقليمية كنا نغفل عنها لسنوات.",
    },
    {
        id: 2,
        name: "Daniel Okafor",
        nameAr: "دانيال أوكافور",
        role: "Founder & CTO, Helix Data Labs",
        roleAr: "المؤسس والرئيس التنفيذي للتكنولوجيا، Helix Data Labs",
        initials: "DO",
        color: "bg-[#14B8A6]",
        primary:
            "We evaluated six natural-language BI tools before choosing ZeroQueries. It was the only one that handled both our warehouse tables and unstructured contract PDFs in a single workflow.",
        primaryAr:
            "قمنا بتقييم ست أدوات ذكاء أعمال باللغة الطبيعية قبل اختيار ZeroQueries. كانت الأداة الوحيدة التي تعاملت مع جداول مستودع بياناتنا وعقود PDF غير المنظمة ضمن مسار عمل موحد.",
        secondary:
            "The onboarding team was sharp, the API is clean, and every release has shipped features we actually use. That combination is genuinely rare.",
        secondaryAr:
            "كان فريق التهيئة رائعاً، وواجهة برمجة التطبيقات نظيفة للغاية، وكل إصدار جديد يضيف ميزات نستخدمها بالفعل.",
    },
    {
        id: 3,
        name: "Priya Venkatesan",
        nameAr: "بريا فينكاتيسان",
        role: "VP of Operations Strategy, Northwind Logistics",
        roleAr: "نائبة رئيس استراتيجية العمليات، Northwind Logistics",
        initials: "PV",
        color: "bg-[#8B5CF6]",
        primary:
            "Rolling out ZeroQueries across our operations group was remarkably smooth. Executives finally have self-service answers without waiting on the data team for every question.",
        primaryAr:
            "كان إطلاق ZeroQueries في مجموعة العمليات سلساً للغاية. أصبح لدى المديرين التنفيذيين أخيراً إجابات ذاتية الخدمة دون انتظار فريق البيانات لكل سؤال.",
        secondary:
            "It strikes the perfect balance — approachable for leadership, yet deep enough for our senior analysts to trust the underlying queries.",
        secondaryAr:
            "إنه يحقق التوازن المثالي — سهل الاستخدام للقيادة، وفي الوقت ذاته عميق بما يكفي ليثق كبار المحللين في الاستعلامات التأسيسية.",
    },
];

export default function TestimonialsSection() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    const [current, setCurrent] = useState(0);
    const review = reviews[current];

    const goNext = () => setCurrent((i) => (i + 1) % reviews.length);
    const goPrev = () => setCurrent((i) => (i - 1 + reviews.length) % reviews.length);

    return (
        <section className="w-full bg-gray-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-8 lg:px-14 relative overflow-hidden">
            {/* Dot grid background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.15]"
                style={{
                    backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
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

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Heading */}
                <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-light text-center text-black mb-10 sm:mb-14 lg:mb-16 tracking-tight leading-[1.15]">
                    {isAr ? "ماذا تقول فرق العمل عن " : "What Teams Say About "}
                    <span className="text-black/50">ZeroQueries</span>
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-start lg:items-center">
                    {/* LEFT: Selectable reviewer cards */}
                    <div className="flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full max-w-xl mx-auto lg:max-w-none relative">
                        {reviews.map((person, index) => {
                            const isActive = index === current;
                            return (
                                <button
                                    key={person.id}
                                    onClick={() => setCurrent(index)}
                                    className={`relative text-left w-full rounded-xl sm:rounded-r-xl p-3.5 sm:p-4 transition-all duration-200 flex items-center gap-3 sm:gap-4
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 active:scale-[0.99]
                    ${isActive
                                            ? "bg-white sm:bg-gray-100 border-l-4 border-l-black shadow-sm"
                                            : "bg-white/80 border border-gray-200 hover:border-gray-400"
                                        }
                  `}
                                >
                                    <div
                                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${person.color} flex items-center justify-center text-white font-medium text-xs sm:text-sm shrink-0 shadow-sm`}
                                    >
                                        {person.initials}
                                    </div>

                                    <div className="flex-1 min-w-0 pr-6">
                                        <h4 className="font-normal text-sm sm:text-base text-black truncate">
                                            {isAr ? person.nameAr : person.name}
                                        </h4>
                                        <p className="text-xs sm:text-sm leading-snug font-light text-black/60 truncate">
                                            {isAr ? person.roleAr : person.role}
                                        </p>
                                    </div>

                                    <FaQuoteRight className="absolute top-3.5 right-3.5 text-gray-400 opacity-40 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                            );
                        })}
                    </div>

                    {/* RIGHT: Quote panel with arrows on the right */}
                    <div className="flex flex-col justify-center relative bg-white sm:bg-transparent p-5 sm:p-0 rounded-2xl sm:rounded-none border border-gray-200/90 sm:border-0 shadow-sm sm:shadow-none w-full max-w-xl mx-auto lg:max-w-none">
                        {/* Big decorative quote — hidden on mobile */}
                        <FaQuoteRight className="hidden md:block absolute -top-12 -left-8 text-[#E5E7EB] opacity-60 pointer-events-none select-none w-44 h-44" />

                        {/* Quote text */}
                        <div className="relative z-10 space-y-4 sm:space-y-6 text-black/75 text-[15px] sm:text-[17px] leading-relaxed font-light">
                            <p>{isAr ? review.primaryAr : review.primary}</p>
                            <p className="text-black/60">{isAr ? review.secondaryAr : review.secondary}</p>
                        </div>

                        {/* Bottom row: stars on left, arrows on right */}
                        <div className="flex items-center justify-between mt-6 sm:mt-8 pt-4 sm:pt-0 border-t border-gray-100 sm:border-0">
                            {/* Star rating */}
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar key={i} className="text-amber-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                ))}
                            </div>

                            {/* Navigation arrows pushed to the right */}
                            <div className="flex gap-2.5 sm:gap-3 ml-auto">
                                <button
                                    onClick={goPrev}
                                    aria-label="Previous review"
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                >
                                    <FaChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                                <button
                                    onClick={goNext}
                                    aria-label="Next review"
                                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-black active:scale-95 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                >
                                    <FaChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}