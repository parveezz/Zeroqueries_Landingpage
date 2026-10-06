"use client";

import React from 'react';
import Link from 'next/link';

export default function RelatedPosts({ posts, isAr }) {
    if (!posts || posts.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg sm:text-xl font-normal text-black">
                    {isAr ? "مقالات ذات صلة" : "Related Articles"}
                </h2>
                <Link
                    href="/resources"
                    className="text-xs sm:text-sm font-light text-[#6434F5] hover:text-[#5228d9] transition-colors"
                >
                    {isAr ? "عرض الكل" : "View All"}
                </Link>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post, idx) => (
                    <Link
                        key={idx}
                        href={`/resources/${post.slug}`}
                        className="group flex flex-col bg-white cursor-pointer"
                    >
                        {/* Image Container */}
                        <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-gray-100">
                            <img
                                src={post.image}
                                alt={isAr ? post.titleAr : post.titleEn}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-grow">
                            <span className="text-[#6434F5] font-normal text-xs mb-1">
                                {isAr ? post.categoryAr : post.categoryEn}
                            </span>
                            <h3 className="text-sm sm:text-base font-normal text-black leading-snug mb-1.5 group-hover:text-[#6434F5] transition-colors line-clamp-2">
                                {isAr ? post.titleAr : post.titleEn}
                            </h3>
                            <p className="text-black/65 text-xs font-light mb-2 line-clamp-2 leading-relaxed flex-grow">
                                {isAr ? post.excerptAr : post.excerptEn}
                            </p>

                            {/* Meta */}
                            <div className="flex items-center text-[11px] text-black/50 font-light gap-2 pt-2 border-t border-gray-100 mt-auto">
                                <span>{isAr ? post.dateAr : post.dateEn}</span>
                                <span className="w-1 h-1 rounded-full bg-gray-300" />
                                <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}