"use client";

import React, { useState } from 'react';

export default function PostFAQ({ faqs, isAr }) {
    const [openIndex, setOpenIndex] = useState(null);

    if (!faqs || faqs.length === 0) return null;

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-lg sm:text-xl font-normal text-black mb-5 text-center sm:text-left">
                {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
            </h2>

            <div className="space-y-2">
                {faqs.map((faq, idx) => {
                    const isOpen = openIndex === idx;
                    return (
                        <div
                            key={idx}
                            className="border border-gray-100 rounded-xl bg-gray-50/50 overflow-hidden"
                        >
                            <button
                                onClick={() => toggleFAQ(idx)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-100/50 transition-colors"
                            >
                                <span className="text-sm font-normal text-black pr-4">
                                    {isAr ? faq.questionAr : faq.questionEn}
                                </span>
                                <span className={`text-[#6434F5] transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-0">
                                    <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
                                        {isAr ? faq.answerAr : faq.answerEn}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}