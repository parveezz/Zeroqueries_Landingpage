"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const BlogHeader = () => {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    return (
        <section className="w-full bg-[#f8f9fc] border-b border-gray-200/80 py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Subtle background dot pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-[#6434F5] uppercase bg-purple-50 px-3 py-1 rounded-md border border-purple-100 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6434F5]" />
                    {isAr ? "الموارد والمدونة" : "Resources & Insights"}
                </span>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black tracking-tight mb-4">
                    {isAr ? "مدونة وموارد ZeroQueries" : "Blog & Resources"}
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-black/60 font-light max-w-2xl mx-auto leading-relaxed">
                    {isAr
                        ? "مقالات ورؤى حول التحليلات المتقدمة، وذكاء الأعمال باللغة الطبيعية، والذكاء الاصطناعي للمؤسسات."
                        : "Insights on conversational analytics, enterprise AI, and the future of decision intelligence without SQL complexity."}
                </p>
            </div>
        </section>
    );
};

export default BlogHeader;