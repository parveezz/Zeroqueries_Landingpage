"use client";

import React from 'react';

export default function PostQuote({ quote }) {
    if (!quote) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="bg-gray-50 rounded-xl p-5 sm:p-6 relative">
                <div className="relative z-10 flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-purple-100 text-[#6434F5] flex items-center justify-center font-normal text-sm shrink-0">
                        ZQ
                    </div>
                    <div>
                        <blockquote className="text-sm sm:text-base text-black/75 italic font-light leading-relaxed mb-3">
                            &ldquo;{quote.text}&rdquo;
                        </blockquote>
                        <div>
                            <h4 className="font-normal text-black text-sm">{quote.author}</h4>
                            <p className="text-xs text-black/55 font-light">{quote.role}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}