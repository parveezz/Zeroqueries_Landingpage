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

    const getVisiblePages = () => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }
        if (currentPage <= 4) {
            return [1, 2, 3, 4, 5, '...', totalPages];
        }
        if (currentPage >= totalPages - 3) {
            return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        }
        return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    };

    const pages = getVisiblePages();

    return (
        <nav aria-label="Blog Pagination" className="w-full py-8 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Previous Button */}
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="text-black/70 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 font-medium text-xs sm:text-sm transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100"
                    >
                        <span>{isAr ? "→" : "←"}</span>
                        <span>{isAr ? "السابق" : "Previous"}</span>
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center gap-1 sm:gap-1.5">
                        {pages.map((page, idx) => {
                            if (page === '...') {
                                return (
                                    <span key={`ellipsis-${idx}`} className="w-7 h-7 flex items-center justify-center text-xs text-black/40">
                                        ...
                                    </span>
                                );
                            }
                            return (
                                <button
                                    key={page}
                                    onClick={() => onPageChange(page)}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs sm:text-sm font-medium transition-colors ${currentPage === page
                                            ? 'bg-[#6434F5] text-white shadow-sm'
                                            : 'text-black/70 hover:bg-gray-100 hover:text-black'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}
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