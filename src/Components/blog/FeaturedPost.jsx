"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturedPost({ post }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    if (!post) return null;

    return (
        <section aria-label="Featured Article" className="w-full bg-white py-6 sm:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href={`/resources/${post.slug}`} className="block group">
                    {/* Changed to 12 columns to allow finer control over image size */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">

                    {/* Image Side - Now takes up 5/12 columns and has a max height */}
                    <div className="lg:col-span-5 relative w-full max-h-[250px] sm:max-h-[300px] aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                        <img
                            src={post.image}
                            alt={isAr ? post.titleAr : post.titleEn}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>

                    {/* Content Side - Now takes up 7/12 columns */}
                    <div className="lg:col-span-7 flex flex-col justify-center">
                        <span className="text-[#6434F5] font-medium text-[11px] sm:text-xs tracking-wide uppercase mb-2">
                            {isAr ? post.categoryAr : post.categoryEn}
                        </span>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-black tracking-tight leading-snug mb-3">
                            {isAr ? post.titleAr : post.titleEn}
                        </h2>
                        <p className="text-black/65 text-xs sm:text-sm font-light mb-4 leading-relaxed line-clamp-3">
                            {isAr ? post.excerptAr : post.excerptEn}
                        </p>
                        <div className="flex items-center text-[11px] sm:text-xs text-black/50 font-light gap-3">
                            <span>{isAr ? post.dateAr : post.dateEn}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </section>
    );
}