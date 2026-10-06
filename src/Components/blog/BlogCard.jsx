"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function BlogCard({ post }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    if (!post) return null;

    return (
        <Link href={`/resources/${post.slug}`} className="block group">
            <article className="group flex flex-col bg-white cursor-pointer h-full">
                {/* Image Container */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-gray-100">
                    <img
                        src={post.image}
                        alt={isAr ? post.titleAr : post.titleEn}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                    <span className="text-[#6434F5] font-medium text-xs mb-1">
                        {isAr ? post.categoryAr : post.categoryEn}
                    </span>
                    <h3 className="text-lg font-medium text-black leading-snug mb-1.5 group-hover:text-[#6434F5] transition-colors">
                        {isAr ? post.titleAr : post.titleEn}
                    </h3>
                    <p className="text-black/65 text-xs sm:text-sm font-light mb-3 line-clamp-2 leading-relaxed flex-grow">
                        {isAr ? post.excerptAr : post.excerptEn}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center text-xs text-black/50 font-light gap-2 pt-2 border-t border-gray-100 mt-auto">
                        <span>{isAr ? post.dateAr : post.dateEn}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
}