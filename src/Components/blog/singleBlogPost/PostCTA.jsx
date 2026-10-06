"use client";

import React from 'react';
import Link from 'next/link';

export default function PostCTA({ isAr }) {
    return (
        <section aria-label="Article CTA" className="w-full bg-gray-50 py-8 sm:py-10">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                <h2 className="text-lg sm:text-xl font-normal text-black mb-2">
                    {isAr ? "جاهز لتغيير طريقة تعاملك مع البيانات؟" : "Ready to transform your enterprise analytics?"}
                </h2>
                <p className="text-black/60 mb-6 text-xs sm:text-sm font-light max-w-2xl">
                    {isAr
                        ? "اكتشف كيف يساعد ZeroQueries فريقك في الحصول على إجابات موثوقة من البيانات في ثوانٍ."
                        : "See how ZeroQueries enables your entire team to get verified answers from complex data in seconds."}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
                    <Link
                        href="/demo"
                        className="px-5 py-2.5 bg-black hover:bg-gray-800 text-white font-normal rounded-lg transition-colors w-full sm:w-auto text-xs sm:text-sm"
                    >
                        {isAr ? "احجز عرضاً توضيحياً" : "Schedule an Enterprise Demo"}
                    </Link>
                    <Link
                        href="/resources"
                        className="px-5 py-2.5 bg-white hover:bg-gray-100 text-black font-normal rounded-lg transition-colors w-full sm:w-auto text-xs sm:text-sm shadow-xs"
                    >
                        {isAr ? "استكشاف المزيد من المقالات" : "View More Resources"}
                    </Link>
                </div>
            </div>
        </section>
    );
}