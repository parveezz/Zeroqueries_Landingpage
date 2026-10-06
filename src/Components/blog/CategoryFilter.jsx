"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryFilter({
    categories = [],
    activeCategory = 'all',
    onSelectCategory = () => { },
}) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    return (
        <nav aria-label="Blog categories" className="w-full border-b border-gray-200/90 bg-white py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-center gap-2">
                    {categories.map((cat) => {
                        const isSelected = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => onSelectCategory(cat.id)}
                                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all ${isSelected
                                        ? 'bg-black text-white shadow-xs'
                                        : 'bg-gray-100/80 text-black/70 hover:bg-gray-200 hover:text-black'
                                    }`}
                            >
                                {isAr ? cat.nameAr : cat.nameEn}
                            </button>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}