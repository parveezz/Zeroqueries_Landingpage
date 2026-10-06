"use client";

import Link from "next/link";
import {
    FiDollarSign,
    FiActivity,
    FiBookOpen,
    FiDroplet,
    FiShoppingCart,
    FiTool,
    FiHeadphones,
    FiRadio,
    FiChevronRight,
} from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const INDUSTRIES_EN = [
    {
        name: "Finance",
        slug: "finance",
        description:
            "Make smarter financial decisions by uncovering patterns across transactions, accounts, and market activity with faster access to data.",
        icon: FiDollarSign,
        iconBg: "bg-[#F4A8A8]",
        cardBg: "bg-[#FDF3F3]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#E11D48]",
    },
    {
        name: "Healthcare",
        slug: "healthcare",
        description:
            "Bring patient, provider, and claims information together to improve care delivery and streamline healthcare operations.",
        icon: FiActivity,
        iconBg: "bg-[#F5C542]",
        cardBg: "bg-[#FEF9E7]",
        cardBorder: "border-[#F5DE8B]",
        linkColor: "text-[#D97706]",
    },
    {
        name: "Education",
        slug: "education",
        description:
            "Use real-time insights to understand learning performance, track student progress, and support better educational outcomes.",
        icon: FiBookOpen,
        iconBg: "bg-[#7DD3FC]",
        cardBg: "bg-[#EDF6FD]",
        cardBorder: "border-[#A5D8F3]",
        linkColor: "text-[#0284C7]",
    },
    {
        name: "Oil and Gas",
        slug: "oil-and-gas",
        description:
            "Gain timely visibility into operations, improve efficiency, and use data-driven insights to anticipate changing demand.",
        icon: FiDroplet,
        iconBg: "bg-[#86EFAC]",
        cardBg: "bg-[#EFFAF0]",
        cardBorder: "border-[#A8E5B8]",
        linkColor: "text-[#16A34A]",
    },
    {
        name: "Retail",
        slug: "retail",
        description:
            "Understand customer behavior, spot emerging trends, and respond to changing market demands with actionable retail data.",
        icon: FiShoppingCart,
        iconBg: "bg-[#93B4F5]",
        cardBg: "bg-[#EEF2FD]",
        cardBorder: "border-[#B8CBF0]",
        linkColor: "text-[#2563EB]",
    },
    {
        name: "Manufacturing",
        slug: "manufacturing",
        description:
            "Bring supply chain and operational information together to monitor performance and gain a complete view of your business.",
        icon: FiTool,
        iconBg: "bg-[#C4B5FD]",
        cardBg: "bg-[#F3F0FE]",
        cardBorder: "border-[#D4C7FC]",
        linkColor: "text-[#7C3AED]",
    },
    {
        name: "Customer Care",
        slug: "customer-care",
        description:
            "Turn customer interactions into useful insights that help teams resolve issues efficiently and deliver better experiences.",
        icon: FiHeadphones,
        iconBg: "bg-[#FCA5A5]",
        cardBg: "bg-[#FDF0F0]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#DC2626]",
    },
    {
        name: "Telecom",
        slug: "telecom",
        description:
            "Connect subscriber, network, and service information to understand performance and make faster decisions across your operations.",
        icon: FiRadio,
        iconBg: "bg-[#D8B4FE]",
        cardBg: "bg-[#F7F1FE]",
        cardBorder: "border-[#E0CFFC]",
        linkColor: "text-[#9333EA]",
    },
];

const INDUSTRIES_AR = [
    {
        name: "المالية والمصارف",
        slug: "finance",
        description:
            "اتخذ قرارات مالية أكثر ذكاءً من خلال اكتشاف الأنماط عبر المعاملات والحسابات وحركة السوق مع وصول فوري للبيانات.",
        icon: FiDollarSign,
        iconBg: "bg-[#F4A8A8]",
        cardBg: "bg-[#FDF3F3]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#E11D48]",
    },
    {
        name: "الرعاية الصحية",
        slug: "healthcare",
        description:
            "اجمع بيانات المرضى ومقدمي الخدمة والمطالبات لتحسين جودة الرعاية وتبسيط العمليات الصحية اليومية.",
        icon: FiActivity,
        iconBg: "bg-[#F5C542]",
        cardBg: "bg-[#FEF9E7]",
        cardBorder: "border-[#F5DE8B]",
        linkColor: "text-[#D97706]",
    },
    {
        name: "التعليم",
        slug: "education",
        description:
            "استفد من الرؤى الفورية لفهم أداء التعلم وتتبع تقدم الطلاب ودعم أفضل المخرجات والنتائج التعليمية.",
        icon: FiBookOpen,
        iconBg: "bg-[#7DD3FC]",
        cardBg: "bg-[#EDF6FD]",
        cardBorder: "border-[#A5D8F3]",
        linkColor: "text-[#0284C7]",
    },
    {
        name: "النفط والغاز",
        slug: "oil-and-gas",
        description:
            "احصل على رؤية فورية للعمليات الميدانية، وعزز الكفاءة وتوقع تغيرات الطلب عبر تحليلات دقيقة ومتجددة.",
        icon: FiDroplet,
        iconBg: "bg-[#86EFAC]",
        cardBg: "bg-[#EFFAF0]",
        cardBorder: "border-[#A8E5B8]",
        linkColor: "text-[#16A34A]",
    },
    {
        name: "التجزئة والتجارة",
        slug: "retail",
        description:
            "افهم سلوك العملاء وتعرّف على الاتجاهات الصاعدة واستجب لمتطلبات السوق المتغيرة برؤى بيانات قابلة للتنفيذ.",
        icon: FiShoppingCart,
        iconBg: "bg-[#93B4F5]",
        cardBg: "bg-[#EEF2FD]",
        cardBorder: "border-[#B8CBF0]",
        linkColor: "text-[#2563EB]",
    },
    {
        name: "التصنيع وسلاسل الإمداد",
        slug: "manufacturing",
        description:
            "وحّد معلومات سلاسل الإمداد والعمليات لمراقبة الأداء واكتساب رؤية شاملة لأعمالك الإنتاجية.",
        icon: FiTool,
        iconBg: "bg-[#C4B5FD]",
        cardBg: "bg-[#F3F0FE]",
        cardBorder: "border-[#D4C7FC]",
        linkColor: "text-[#7C3AED]",
    },
    {
        name: "خدمة العملاء",
        slug: "customer-care",
        description:
            "حوّل تفاعلات العملاء إلى رؤى قيّمة تساعد الفرق على حل المشكلات بسرعة وتقديم تجارب استثنائية.",
        icon: FiHeadphones,
        iconBg: "bg-[#FCA5A5]",
        cardBg: "bg-[#FDF0F0]",
        cardBorder: "border-[#F5C2C2]",
        linkColor: "text-[#DC2626]",
    },
    {
        name: "الاتصالات",
        slug: "telecom",
        description:
            "اربط بين بيانات المشتركين والشبكة والخدمات لفهم الأداء واتخاذ قرارات تشغيلية أسرع وأكثر ثقة.",
        icon: FiRadio,
        iconBg: "bg-[#D8B4FE]",
        cardBg: "bg-[#F7F1FE]",
        cardBorder: "border-[#E0CFFC]",
        linkColor: "text-[#9333EA]",
    },
];

export default function IndustriesGrid() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const industries = isAr ? INDUSTRIES_AR : INDUSTRIES_EN;
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black pt-4 sm:pt-6 lg:pt-6 pb-14 sm:pb-20 lg:pb-28 px-4 sm:px-8 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* Heading */}
                <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-14">
                    <span className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        {isAr ? "حلول مخصصة للقطاعات" : "Solutions by Industry"}
                    </span>
                    <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl lg:text-[44px] font-light tracking-tight text-black leading-[1.15]">
                        {isAr ? "مصممة لتناسب طريقة عمل قطاعك" : "Built for how your industry works"}
                    </h2>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-black/60 leading-relaxed font-light max-w-xl mx-auto">
                        {isAr
                            ? "تمتع بمكتبة جاهزة ومصممة لكل قطاع مع تحليلات ذكية ولوحات تحكم مخصصة لاحتياجات مجال عملك بدقة."
                            : "Access a pre-built library of industry-focused assets and tap into dashboards and AI-powered analytics tailored for your industry."}
                    </p>
                </div>

                {/* Grid — 1 col on mobile, 2 cols on tablet, 4 cols on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {industries.map((industry) => (
                        <IndustryCard key={industry.name} industry={industry} isAr={isAr} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============== INDUSTRY CARD ==============
function IndustryCard({ industry, isAr }) {
    const Icon = industry.icon;

    return (
        <Link
            href={`/solutions/${industry.slug}`}
            className={`group relative flex flex-col rounded-2xl sm:rounded-xl border ${industry.cardBorder} ${industry.cardBg} p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 min-h-0 sm:min-h-[280px] lg:min-h-[300px]`}
        >
            {/* Icon + Title row */}
            <div className="flex items-center gap-3 sm:gap-4 mb-3.5 sm:mb-5">
                {/* Icon */}
                <div
                    className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full ${industry.iconBg} shrink-0 transition-transform duration-300 group-hover:scale-105`}
                >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" strokeWidth={2} />
                </div>

                {/* Name — sits beside the icon */}
                <h3 className="text-lg sm:text-[22px] font-normal tracking-tight text-black leading-snug">
                    {industry.name}
                </h3>
            </div>

            {/* Description */}
            <p className="text-[13.5px] sm:text-[15px] text-black/75 leading-[1.55] font-light flex-1">
                {industry.description}
            </p>

            {/* Link Action */}
            <div
                className={`mt-3.5 sm:mt-4 inline-flex items-center gap-1 text-[13px] sm:text-sm font-medium ${industry.linkColor}`}
            >
                <span>{isAr ? `استكشف قطاع ${industry.name}` : `Explore ${industry.name}`}</span>
                <FiChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
        </Link>
    );
}