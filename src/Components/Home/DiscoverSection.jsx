"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// --- Bilingual Mock Data for the Cards ---
const resourcesData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=500',
        titleEn: 'How Market Access Teams Verify Contracted Access Across...',
        titleAr: 'كيف تتحقق فرق الوصول إلى السوق من العقود المبرمة عبر الخطط...',
        descriptionEn: "Contracted access doesn't guarantee that every eligible payer plan implements the agreed terms. This guide shows how to audit compliance across systems.",
        descriptionAr: 'العقود المبرمة لا تضمن تنفيذ كل خطة تأمينية للشروط المتفق عليها تلقائياً. يوضح هذا الدليل كيفية تدقيق الامتثال عبر الأنظمة المختلفة.',
        link: '/resources',
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=500',
        titleEn: 'Why Invoices Get Blocked in Three-Way Matching, and How...',
        titleAr: 'لماذا تُعلّق الفواتير في المطابقة الثلاثية، وكيفية معالجتها...',
        descriptionEn: 'Blocked invoices often persist because the evidence needed to resolve them is scattered across invoices, POs, and receipts. Discover the automated fix.',
        descriptionAr: 'تستمر الفواتير العالقة غالباً لأن الأدلة المطلوبة لحلها مشتتة بين الفواتير وأوامر الشراء وإيصالات الاستلام. اكتشف الحل التلقائي الفعّال.',
        link: '/resources',
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=800&h=500',
        titleEn: 'Budget vs. Actual: How to Verify a Favorable Variance Before...',
        titleAr: 'الميزانية مقابل الفعلي: كيفية التحقق من الفروقات الإيجابية قبل...',
        descriptionEn: "A favorable budget variance isn't automatically a saving. This guide shows FP&A teams how to verify true financial performance in real time.",
        descriptionAr: 'الفروقات الإيجابية في الميزانية لا تعني تلقائياً توفيراً حقيقياً. يوضح هذا الدليل لفرق التخطيط والتحليل المالي كيفية التحقق الفعلي في الوقت الحقيقي.',
        link: '/resources',
    },
];

// --- Arrow Icon Component (RTL mirrored) ---
const ArrowUpRight = ({ isAr }) => (
    <svg
        className={`w-5 h-5 shrink-0 text-gray-900 transition-transform duration-200 ${
            isAr 
                ? 'group-hover:-translate-x-1 group-hover:-translate-y-1 -scale-x-100' 
                : 'group-hover:translate-x-1 group-hover:-translate-y-1'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
);

// --- Main Component ---
const DiscoverSection = () => {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const [activeTab, setActiveTab] = useState('Read');

    const tabs = [
        { key: 'Read', labelEn: 'Read', labelAr: 'قراءة' },
        { key: 'Watch', labelEn: 'Watch', labelAr: 'مشاهدة' },
        { key: 'Learn', labelEn: 'Learn', labelAr: 'تعلّم' },
    ];

    return (
        <section 
            dir={isAr ? 'rtl' : 'ltr'}
            className="font-sans bg-white py-16 sm:py-20 w-full"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* --- Header Section --- */}
                <div className={`mb-10 ${isAr ? 'text-right' : 'text-left'}`}>
                    <span className="text-[#7c3aed] text-xs font-bold uppercase tracking-wider mb-3 block">
                        {isAr ? 'اكتشف المزيد' : 'Discover More'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-[3.25rem] font-bold text-gray-900 leading-[1.15] sm:leading-[1.1] tracking-tight mb-4 sm:mb-5 max-w-2xl">
                        {isAr ? (
                            <>
                                أفكار رائدة، <br className="hidden sm:block" /> في متناول يدك دائماً
                            </>
                        ) : (
                            <>
                                Breakthrough Ideas, <br className="hidden sm:block" /> Right at Your Fingertips
                            </>
                        )}
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
                        {isAr
                            ? 'استكشف أحدث أدلتنا، وندواتنا التفاعلية، ودراسات الحالة، وأفضل الممارسات التي تساعدك في استثمار بياناتك لتحقيق نتائج ملموسة وقابلة للتطوير.'
                            : 'Dig into our latest guides, webinars, whitepapers, and best practices that help you leverage data for tangible, scalable results.'}
                    </p>
                </div>

                {/* --- Controls Section (Tabs & Button) --- */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">

                    {/* Tabs */}
                    <div className="bg-gray-100/90 p-1.5 rounded-full inline-flex items-center self-start sm:self-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                    activeTab === tab.key
                                        ? 'bg-[#7c3aed] text-white shadow-sm'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                }`}
                            >
                                {isAr ? tab.labelAr : tab.labelEn}
                            </button>
                        ))}
                    </div>

                    {/* Action Button */}
                    <Link
                        href="/resources"
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors shadow-sm self-start sm:self-auto inline-flex items-center justify-center text-center"
                    >
                        {isAr ? 'عرض كافة الموارد' : 'View All Resources'}
                    </Link>
                </div>

                {/* --- Cards Grid --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {resourcesData.map((item) => {
                        const title = isAr ? item.titleAr : item.titleEn;
                        const description = isAr ? item.descriptionAr : item.descriptionEn;

                        return (
                            <Link
                                key={item.id}
                                href={item.link}
                                className="group flex flex-col text-inherit no-underline"
                            >
                                {/* Image Container */}
                                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#f4f4f5] mb-6 border border-gray-200/60 shadow-2xs">
                                    <img
                                        src={item.image}
                                        alt={title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Title */}
                                <div className="flex justify-between items-start gap-4 mb-3">
                                    <h3 className={`text-lg sm:text-xl font-bold text-gray-900 leading-snug line-clamp-2 ${isAr ? 'text-right' : 'text-left'}`}>
                                        {title}
                                    </h3>
                                    <ArrowUpRight isAr={isAr} />
                                </div>

                                {/* Description */}
                                <p className={`text-gray-500 text-sm sm:text-[15px] leading-relaxed line-clamp-2 ${isAr ? 'text-right' : 'text-left'}`}>
                                    {description}
                                </p>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default DiscoverSection;