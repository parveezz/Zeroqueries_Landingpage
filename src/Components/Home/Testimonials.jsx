"use client";

import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

// --- Testimonial data (content unchanged, layout keys kept) ---
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
        layout: "wide",
        bgTint: "bg-[#f0fdfa]", // soft teal tint
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
        bgTint: "bg-[#f5f3ff]", // soft violet tint
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
        bgTint: "bg-[#f0f9ff]", // soft sky tint
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
        bgTint: "bg-[#f0fdfa]",
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
        <section
            dir={isAr ? "rtl" : "ltr"}
            className="relative w-full bg-white font-sans text-black py-16 sm:py-24 lg:py-28 px-4 sm:px-8 lg:px-14 overflow-hidden"
        >
            {/* Dot grid background */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

            {/* Ambient teal glow — top left */}
            <div
                className="pointer-events-none absolute -top-32 -left-32 w-[400px] sm:w-[600px] lg:w-[700px] h-[400px] sm:h-[600px] lg:h-[700px] rounded-full"
                style={{
                    background:
                        "radial-gradient(circle, rgba(19, 78, 74, 0.12) 0%, transparent 70%)",
                    filter: "blur(100px)",
                }}
            />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= SPLIT HEADER ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-end mb-10 sm:mb-14 lg:mb-16">
                    <div className="lg:col-span-7">
                        <span className="inline-flex items-center gap-2 text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#134e4a]" />
                            {isAr ? "قصص النجاح والعملاء" : "Customer Stories"}
                        </span>

                        <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl lg:text-[42px] font-light tracking-tight text-black leading-[1.15]">
                            {isAr ? (
                                <>
                                    فرق حقيقية. قرارات حقيقية.
                                    <br />
                                    <span className="text-black/40 italic font-serif">سرعة فائقة.</span>
                                </>
                            ) : (
                                <>
                                    Real teams. Real decisions.
                                    <br />
                                    <span className="text-black/40 italic font-serif">Real speed.</span>
                                </>
                            )}
                        </h2>
                    </div>

                    <div className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
                        <p className="text-sm sm:text-base text-black/60 leading-relaxed font-light">
                            {isAr
                                ? "من عمليات الإيرادات إلى التأمين والخدمات اللوجستية، تستخدم الفرق ZeroQueries لاتخاذ قرارات أسرع وأكثر ذكاءً."
                                : "From revenue ops to insurance and logistics — teams use ZeroQueries to make faster, sharper decisions."}
                        </p>
                    </div>
                </div>

                {/* ================= TESTIMONIAL GRID ================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                    {wideCard && (
                        <TestimonialCard testimonial={wideCard} wide isAr={isAr} />
                    )}
                    {halfCards.map((t) => (
                        <TestimonialCard key={t.id} testimonial={t} isAr={isAr} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Card component ---
function TestimonialCard({ testimonial, wide = false, isAr = false }) {
    const { quote, name, role, avatar, logoAlt, bgTint } = testimonial;

    return (
        <div
            className={`group relative bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 ease-out
                hover:-translate-y-1
                hover:border-gray-300
                hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.12)]
                ${wide ? "lg:col-span-2" : ""}
            `}
        >
            {/* Avatar panel */}
            <div
                className={`${bgTint} flex items-center justify-center shrink-0 overflow-hidden w-full relative
                    ${wide ? "h-32 sm:h-auto sm:w-[240px] lg:w-[280px]" : "h-28 sm:h-auto sm:w-[170px] lg:w-[190px]"}
                `}
            >
                <div className="w-full h-full flex items-center justify-center p-6">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden ring-4 ring-white/70 shadow-sm transition-transform duration-500 group-hover:scale-105">
                        {/* Fallback avatar with initials — replace with Image when files exist */}
                        <div className="absolute inset-0 bg-white/90 flex items-center justify-center text-[#134e4a] text-sm sm:text-base font-medium tracking-tight">
                            {name
                                .split(" ")
                                .map((n) => n[0])
                                .slice(0, 2)
                                .join("")}
                        </div>
                        {/* Uncomment when avatar files are available: */}
                        {/* <Image src={avatar} alt={name} fill className="object-cover" /> */}
                    </div>
                </div>
            </div>

            {/* Content panel */}
            <div className="flex-1 flex flex-col justify-between p-5 sm:p-7 lg:p-8">
                <div>
                    {/* Quote mark — subtle decorative element */}
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                        <span className="h-px w-6 bg-[#134e4a]/40" />
                        <span className="text-[#134e4a] text-xs font-medium tracking-[0.2em] uppercase">
                            {isAr ? "شهادة" : "Testimonial"}
                        </span>
                    </div>

                    {/* Quote */}
                    <p
                        className={`text-black font-light leading-relaxed ${wide
                            ? "text-[14.5px] sm:text-[16.5px] leading-[1.65]"
                            : "text-[13.5px] sm:text-[15.5px] leading-[1.6]"
                            }`}
                    >
                        {quote}
                    </p>
                </div>

                {/* Bottom: name + role + logo */}
                <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-100">
                    <div className="font-medium text-black text-sm sm:text-[15px] tracking-tight">
                        {name}
                    </div>
                    <div className="text-black/55 text-xs sm:text-sm font-light mt-0.5 leading-relaxed">
                        {role}
                    </div>

                    {/* Company mark */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#134e4a]" />
                        <span className="text-[#134e4a] font-medium text-[11px] sm:text-xs tracking-[0.15em] uppercase transition-colors duration-300">
                            {logoAlt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}