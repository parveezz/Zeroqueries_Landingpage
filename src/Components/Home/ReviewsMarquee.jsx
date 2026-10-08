"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

// --- Data for Top Row (English & Arabic) ---
const topRowData = [
    {
        id: 1,
        quoteEn: '"Outstanding BI Solution with Robust Features"',
        quoteAr: '"حل ذكاء أعمال استثنائي بميزات قوية ومتقدمة"',
        nameEn: 'Amar N.',
        nameAr: 'عمار ن.',
        roleEn: 'Cloud System Administrator',
        roleAr: 'مدير أنظمة سحابية',
        avatar: 'https://i.pravatar.cc/150?img=11',
        platform: 'g2',
        rating: '5/5',
    },
    {
        id: 2,
        quoteEn: '"An incredible BI tool for deep insights"',
        quoteAr: '"أداة ذكاء أعمال مذهلة لاستخراج رؤى عميقة"',
        nameEn: 'Renato M.',
        nameAr: 'ريناتو م.',
        roleEn: 'BI Analyst',
        roleAr: 'محلل ذكاء أعمال',
        avatar: 'https://i.pravatar.cc/150?img=13',
        platform: 'capterra',
        rating: '5/5',
    },
    {
        id: 3,
        quoteEn: '"BI Analytics and Advanced Real-Time Reporting"',
        quoteAr: '"تحليلات فورية متقدمة وإعداد تقارير فائقة الدقة"',
        nameEn: 'Carlo B.',
        nameAr: 'كارلو ب.',
        roleEn: 'Product Owner & Data Manager',
        roleAr: 'مسؤول منتج ومدير تحليلات بيانات',
        avatar: 'https://i.pravatar.cc/150?img=15',
        platform: 'g2',
        rating: '5/5',
    },
];

// --- Data for Bottom Row (English & Arabic) ---
const bottomRowData = [
    {
        id: 4,
        quoteEn: '"Flexibility to run seamlessly with multiple client organizations."',
        quoteAr: '"مرونة استثنائية للعمل بسلاسة عبر مؤسسات متعددة لعملائنا."',
        nameEn: 'Akash B.',
        nameAr: 'أكاش ب.',
        roleEn: 'Software Engineer',
        roleAr: 'مهندس برمجيات',
        avatar: 'https://i.pravatar.cc/150?img=33',
        platform: 'g2',
        rating: '5/5',
    },
    {
        id: 5,
        quoteEn: '"ZeroQueries is integrated with predictive and Big Data processing tools."',
        quoteAr: '"يتكامل ZeroQueries بسلاسة مع أدوات التنبؤ ومعالجة البيانات الضخمة."',
        nameEn: 'Oliver Elijah L.',
        nameAr: 'أوليفر إيليا ل.',
        roleEn: 'Senior Operations Manager',
        roleAr: 'مدير عمليات أول',
        avatar: 'https://i.pravatar.cc/150?img=60',
        platform: 'capterra',
        rating: '5/5',
    },
    {
        id: 6,
        quoteEn: '“ZeroQueries is the best platform to manage and analyze our data.”',
        quoteAr: '“ZeroQueries هي المنصة الأفضل لإدارة وتحليل بياناتنا بكل كفاءة.”',
        nameEn: 'Luis Alcalá',
        nameAr: 'لويس ألكالا',
        roleEn: 'Senior Manager, HR Planning & Talent',
        roleAr: 'مدير أول لتخطيط الموارد البشرية والمواهب',
        avatar: 'https://i.pravatar.cc/150?img=68',
        platform: 'g2',
        rating: '4.5/5',
    },
];

// --- Reusable Card Component with RTL/LTR Support ---
const ReviewCard = ({ data, isAr }) => {
    const quote = isAr ? data.quoteAr : data.quoteEn;
    const name = isAr ? data.nameAr : data.nameEn;
    const role = isAr ? data.roleAr : data.roleEn;

    return (
        <div
            dir={isAr ? 'rtl' : 'ltr'}
            className="bg-white rounded-xl p-5 sm:p-6 w-[300px] sm:w-[350px] shrink-0 shadow-sm border border-gray-200/80 hover:shadow-md transition-shadow flex flex-col justify-between select-none"
        >
            <div className={`text-sm sm:text-base font-medium text-gray-800 mb-4 sm:mb-5 leading-relaxed min-h-[48px] ${isAr ? 'text-right font-sans' : 'text-left'}`}>
                {quote}
            </div>

            <div className="flex justify-between items-center mt-auto pt-3 border-t border-gray-100">
                {/* User Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={data.avatar}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover bg-gray-100 ring-2 ring-gray-100 shrink-0"
                    />
                    <div className={`flex flex-col ${isAr ? 'text-right' : 'text-left'}`}>
                        <span className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">{name}</span>
                        <span className="text-[11px] sm:text-xs text-gray-500 leading-normal line-clamp-1">{role}</span>
                    </div>
                </div>

                {/* Rating & Source Box */}
                <div className="flex flex-col items-center gap-0.5 shrink-0 pl-2">
                    <span
                        className={`text-xs font-black px-1.5 py-0.5 rounded uppercase tracking-wider ${data.platform === 'g2' ? 'bg-orange-50 text-[#ff492c]' : 'bg-blue-50 text-[#044d80]'
                            }`}
                    >
                        {data.platform === 'g2' ? 'G2' : 'Capterra'}
                    </span>
                    <span className="text-xs font-semibold text-[#f59e0b] flex items-center gap-0.5">
                        <span>★</span> {data.rating}
                    </span>
                </div>
            </div>
        </div>
    );
};

// --- Main Marquee Component ---
const ReviewsMarquee = () => {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    return (
        <section
            className="font-sans bg-[#f7f8f9] py-6 sm:py-8 flex flex-col items-center overflow-x-hidden w-full relative"
            dir={isAr ? 'rtl' : 'ltr'}
        >
            {/* Custom Infinite Marquee Styles */}
            <style>{`
                @keyframes scroll-left-to-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0); }
                }
                @keyframes scroll-right-to-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-track-top {
                    animation: scroll-left-to-right 22.5s linear infinite;
                }
                .animate-track-bottom {
                    animation: scroll-right-to-left 22.5s linear infinite;
                }
                /* Pause on hover */
                .marquee-track:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Header Section */}
            <div className="text-center px-4 mb-6 sm:mb-8 max-w-2xl mx-auto">
                <div className="border border-amber-400/60 text-amber-700 bg-amber-50/70 px-3.5 py-1 rounded-full text-xs font-semibold inline-block mb-3.5 shadow-2xs">
                    {isAr ? 'موثوق من قِبل أكثر من 1M مستخدم' : 'Trusted by 1M+ users'}
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight m-0">
                    {isAr ? 'الريادة في تحليلات البيانات المدمجة' : 'Leader in Embedded Analytics'}
                </h2>
            </div>

            {/* Marquee Wrapper with soft edge gradient fades */}
            <div
                className="flex flex-col gap-4 sm:gap-6 w-full overflow-hidden relative py-2"
                style={{
                    maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)'
                }}
            >
                {/* TOP ROW: Moves Left to Right */}
                <div className="marquee-track animate-track-top flex gap-4 sm:gap-5 w-max">
                    {topRowData.map((review) => (
                        <ReviewCard key={`top-1-${review.id}`} data={review} isAr={isAr} />
                    ))}
                    {/* Duplicate for infinite loop */}
                    {topRowData.map((review) => (
                        <ReviewCard key={`top-2-${review.id}`} data={review} isAr={isAr} />
                    ))}
                </div>

                {/* BOTTOM ROW: Moves Right to Left */}
                <div className="marquee-track animate-track-bottom flex gap-4 sm:gap-5 w-max">
                    {bottomRowData.map((review) => (
                        <ReviewCard key={`bot-1-${review.id}`} data={review} isAr={isAr} />
                    ))}
                    {/* Duplicate for infinite loop */}
                    {bottomRowData.map((review) => (
                        <ReviewCard key={`bot-2-${review.id}`} data={review} isAr={isAr} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ReviewsMarquee;