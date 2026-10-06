"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function Pagination({
    currentPage = 1,
    totalPages = 3,
    onPageChange = () => { },
}) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Blog Pagination" className="w-full py-6 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="text-black/60 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-light text-xs transition-colors"
                    >
                        <span>{isAr ? "→" : "←"}</span>
                        <span>{isAr ? "السابق" : "Previous"}</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => onPageChange(page)}
                                className={`w-7 h-7 rounded-md flex items-center justify-center text-xs font-medium transition-colors ${currentPage === page
                                        ? 'bg-black text-white'
                                        : 'text-black/70 hover:bg-gray-100'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="text-black/60 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-light text-xs transition-colors"
                    >
                        <span>{isAr ? "التالي" : "Next"}</span>
                        <span>{isAr ? "←" : "→"}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}