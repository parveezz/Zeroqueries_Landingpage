"use client";

import React from 'react';

export default function PostResults({ results, isAr }) {
    if (!results || results.length === 0) return null;

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-lg sm:text-xl font-normal text-black mb-5 text-center sm:text-left">
                {isAr ? "النتائج المحققة" : "Measurable Results"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {results.map((result, idx) => (
                    <div
                        key={idx}
                        className="bg-gray-50/80 rounded-xl p-4 flex flex-col items-center text-center"
                    >
                        <div className="w-9 h-9 rounded-lg bg-purple-50 text-[#6434F5] flex items-center justify-center mb-2 text-base font-normal">
                            {result.icon}
                        </div>
                        <h3 className="font-normal text-black text-sm mb-1">{result.title}</h3>
                        <p className="text-xs text-black/60 font-light leading-relaxed">{result.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}