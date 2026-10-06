"use client";

import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

// --- Testimonial data ---
const TESTIMONIALS_EN = [
    {
        id: 1,
        quote:
            "ZeroQueries replaced our entire BI backlog. Our revenue team asks questions in plain English and gets answers before the meeting starts — no SQL, no waiting on analysts. It's the first time data has actually kept pace with our decision-making.",
        name: "Adrian Reyes",
        role: "VP of Revenue Operations, Meridian Logistics",
        avatar: "/avatars/adrian.jpg",
        logo: "/logos/meridian.svg",
        logoAlt: "Meridian Logistics",
        layout: "wide", // spans full width
        bgTint: "bg-[#fdf2f8]", // soft pink bg behind avatar
    },
    {
        id: 2,
        quote:
            "We needed flexibility that a standard dashboard can't offer. Now our team asks questions we'd never have thought to ask before, directly against the warehouse. ZeroQueries feels like an analyst on demand.",
        name: "Monika Zander",
        role: "Managing Director, Food Service Switzerland",
        avatar: "/avatars/monika.jpg",
        logo: "/logos/valora.svg",
        logoAlt: "Valora",
        layout: "half",
        bgTint: "bg-[#f5f3ff]", // soft violet bg
    },
    {
        id: 3,
        quote:
            "Our sales partners finally get answers without filing tickets. They ask, ZeroQueries retrieves — across contracts, calls, and the warehouse in one shot. It's transformed how we serve customers.",
        name: "Martin Studer",
        role: "Head of Distribution Transformation, Global Insurance",
        avatar: "/avatars/martin.jpg",
        logo: "/logos/axa.svg",
        logoAlt: "Global Insurance",
        layout: "half",
        bgTint: "bg-[#f0f9ff]", // soft blue bg
    },
];

const TESTIMONIALS_AR = [
    {
        id: 1,
        quote:
            "لقد استبدل ZeroQueries كل تراكم طلبات ذكاء الأعمال (BI) لدينا. يطرح فريق الإيرادات أسئلته بلغة مباشرة ويحصل على الإجابات قبل بدء الاجتماع — بدون SQL وبدون انتظار المحللين. إنها المرة الأولى التي تواكب فيها البيانات سرعة اتخاذ قراراتنا حقاً.",
        name: "أدريان رييس",
        role: "نائب رئيس عمليات الإيرادات، Meridian Logistics",
        avatar: "/avatars/adrian.jpg",
        logo: "/logos/meridian.svg",
        logoAlt: "Meridian Logistics",
        layout: "wide",
        bgTint: "bg-[#fdf2f8]",
    },
    {
        id: 2,
        quote:
            "كنا بحاجة إلى مرونة لا يمكن للوحات التحكم التقليدية توفيرها. الآن يطرح فريقنا أسئلة لم نكن نتخيل طرحها من قبل، مباشرة على مستودع البيانات. ZeroQueries كأنه محلل بيانات متفرغ تحت الطلب.",
        name: "مونيكا زاندر",
        role: "المدير التنفيذي، Food Service Switzerland",
        avatar: "/avatars/monika.jpg",
        logo: "/logos/valora.svg",
        logoAlt: "Valora",
        layout: "half",
        bgTint: "bg-[#f5f3ff]",
    },
    {
        id: 3,
        quote:
            "أخيراً يحصل شركاء المبيعات لدينا على إجابات فورية دون الحاجة لفتح تذاكر دعم. يسألون فيجلب ZeroQueries النتائج — من العقود وسجلات المكالمات ومستودع البيانات في آن واحد. لقد أحدث ذلك تحولاً جذرياً في طريقة خدمة عملائنا.",
        name: "مارتن ستودر",
        role: "رئيس تحول التوزيع، Global Insurance",
        avatar: "/avatars/martin.jpg",
        logo: "/logos/axa.svg",
        logoAlt: "Global Insurance",
        layout: "half",
        bgTint: "bg-[#f0f9ff]",
    },
];

export default function Testimonials() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_EN;

    const wideCard = testimonials.find((t) => t.layout === "wide");
    const halfCards = testimonials.filter((t) => t.layout === "half");

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-14 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
                    <span className="text-[10.5px] sm:text-xs font-medium tracking-[0.2em] text-black/60 uppercase">
                        {isAr ? "قصص النجاح والعملاء" : "Customer Stories"}
                    </span>
                    <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-4xl lg:text-[40px] font-light tracking-tight text-black leading-[1.15]">
                        {isAr ? (
                            <>
                                فرق حقيقية. قرارات حقيقية.{" "}
                                <span className="text-black/50">سرعة فائقة.</span>
                            </>
                        ) : (
                            <>
                                Real teams. Real decisions.{" "}
                                <span className="text-black/50">Real speed.</span>
                            </>
                        )}
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {/* Wide card — spans both columns */}
                    {wideCard && <TestimonialCard testimonial={wideCard} wide />}

                    {/* Two half cards */}
                    {halfCards.map((t) => (
                        <TestimonialCard key={t.id} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Card component ---
function TestimonialCard({ testimonial, wide = false }) {
    const { quote, name, role, logoAlt, bgTint } = testimonial;

    return (
        <div
            className={`group relative bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-gray-300
        hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.15)]
        ${wide ? "lg:col-span-2" : ""}
      `}
        >
            {/* Avatar block — compact banner on mobile, column on sm+ */}
            <div
                className={`${bgTint} flex items-center justify-center shrink-0 overflow-hidden w-full
          ${wide ? "h-32 sm:h-auto sm:w-[260px] lg:w-[320px]" : "h-28 sm:h-auto sm:w-[190px] lg:w-[220px]"}
        `}
            >
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white/70 border border-white flex items-center justify-center text-black/35 text-xs font-medium shadow-xs transition-transform duration-500 group-hover:scale-105">
                        Avatar
                    </div>
                </div>
            </div>

            {/* Content block */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 lg:p-8">
                <div>
                    {/* Quote icon */}
                    <FaQuoteRight className="text-gray-200 w-4 h-4 sm:w-5 sm:h-5 mb-3 sm:mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:text-gray-300" />

                    {/* Quote */}
                    <p
                        className={`text-black font-light leading-relaxed ${wide
                                ? "text-[14.5px] sm:text-[17px] leading-[1.65]"
                                : "text-[13.5px] sm:text-base leading-[1.6]"
                            }`}
                    >
                        {quote}
                    </p>
                </div>

                {/* Bottom: name + role + logo */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100">
                    <div className="font-medium text-black text-sm sm:text-[15px]">
                        {name}
                    </div>
                    <div className="text-black/60 text-xs sm:text-sm font-light mt-0.5">
                        {role}
                    </div>

                    {/* Company logo text */}
                    <div className="mt-3 sm:mt-4 h-5 sm:h-6 flex items-center">
                        <span className="text-black/70 font-medium text-xs sm:text-sm tracking-tight transition-colors duration-300 group-hover:text-black">
                            {logoAlt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}