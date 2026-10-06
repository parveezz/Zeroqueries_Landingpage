"use client";

import React from 'react';
import Link from 'next/link';

export default function PostHeader({ post, isAr }) {
    return (
        <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
            {/* Top Nav Back Link */}
            <div className="flex items-center gap-4 mb-4 text-xs sm:text-sm">
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-1.5 text-black/60 hover:text-black font-normal transition-colors"
                >
                    <span>{isAr ? "→" : "←"}</span>
                    <span>{isAr ? "العودة للموارد والمدونة" : "Back to Resources"}</span>
                </Link>
                <span className="text-gray-300">•</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-[#6434F5] rounded-full text-[11px] font-medium">
                    {isAr ? post.categoryAr : post.categoryEn}
                </span>
            </div>

            {/* Title & Subtitle */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-black leading-[1.2] mb-3 tracking-tight">
                {isAr ? post.titleAr : post.titleEn}
            </h1>
            <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed mb-4">
                {isAr ? post.subtitleAr : post.subtitleEn}
            </p>

            {/* Read Time Meta */}
            <div className="flex items-center text-xs text-black/50 font-light gap-2">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{isAr ? post.readTimeAr : post.readTimeEn}</span>
            </div>
        </header>
    );
}