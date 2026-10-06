"use client";

import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function TabStory({ formData, setFormData, setActiveTab }) {
    return (
        <div className="space-y-6">
            {/* Sub-Section 1: About the Company */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#6434F5]" />
                        <h4 className="text-sm font-semibold text-black">Section 1: About the Company (عن المؤسسة)</h4>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* English About */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-black">🇬🇧 Heading (English)</label>
                            <span className="text-[10px] text-black/40">LTR</span>
                        </div>
                        <input
                            type="text"
                            value={formData.contentEn?.aboutTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: { ...formData.contentEn, aboutTitle: e.target.value },
                                })
                            }
                            placeholder="About the Company"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black block pt-1">About Copy Paragraph</label>
                        <textarea
                            rows={3}
                            value={formData.contentEn?.about || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: { ...formData.contentEn, about: e.target.value },
                                })
                            }
                            placeholder="Describe company background, operations, and scale..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>

                    {/* Arabic About */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] text-black/40">RTL</span>
                            <label className="text-xs font-semibold text-black text-right">🇸🇦 عنوان القسم (بالعربية)</label>
                        </div>
                        <input
                            type="text"
                            dir="rtl"
                            value={formData.contentAr?.aboutTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: { ...formData.contentAr, aboutTitle: e.target.value },
                                })
                            }
                            placeholder="عن المؤسسة"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black text-right block pt-1">فقرة الشرح بالعربية</label>
                        <textarea
                            rows={3}
                            dir="rtl"
                            value={formData.contentAr?.about || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: { ...formData.contentAr, about: e.target.value },
                                })
                            }
                            placeholder="اشرح طبيعة عمل المؤسسة، والأسواق التي تعمل بها..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Sub-Section 2: The Challenge */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500" />
                        <h4 className="text-sm font-semibold text-black">Section 2: The Core Challenge (التحدي)</h4>
                    </div>
                    <span className="text-xs text-black/40">Separate multiple paragraphs with a blank line</span>
                </div>

                <div className="flex flex-col gap-5">
                    {/* English Challenge */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black block">🇬🇧 Challenge Heading (English)</label>
                        <input
                            type="text"
                            value={formData.contentEn?.challengeTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: { ...formData.contentEn, challengeTitle: e.target.value },
                                })
                            }
                            placeholder="The Challenge: Static Dashboards and Reporting Delays"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black block pt-1">
                            Challenge Paragraphs (Press Enter twice for next paragraph)
                        </label>
                        <textarea
                            rows={4}
                            value={(formData.contentEn?.challenges || []).join('\n\n')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: {
                                        ...formData.contentEn,
                                        challenges: e.target.value.split('\n\n').filter(Boolean),
                                    },
                                })
                            }
                            placeholder="Enter challenge paragraphs separated by blank lines..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>

                    {/* Arabic Challenge */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black text-right block">🇸🇦 عنوان التحدي (بالعربية)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={formData.contentAr?.challengeTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: { ...formData.contentAr, challengeTitle: e.target.value },
                                })
                            }
                            placeholder="التحدي: لوحات التحكم الثابتة وتأخر التقارير"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black text-right block pt-1">
                            فقرات التحدي (اضغط سطر فارغ للفصل بين الفقرات)
                        </label>
                        <textarea
                            rows={4}
                            dir="rtl"
                            value={(formData.contentAr?.challenges || []).join('\n\n')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: {
                                        ...formData.contentAr,
                                        challenges: e.target.value.split('\n\n').filter(Boolean),
                                    },
                                })
                            }
                            placeholder="اكتب فقرات التحدي مع سطر فارغ بين كل فقرة..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Sub-Section 3: The Solution */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="text-sm font-semibold text-black">Section 3: The Solution with ZeroQueries (الحل)</h4>
                    </div>
                    <span className="text-xs text-black/40">Separate multiple paragraphs with a blank line</span>
                </div>

                <div className="flex flex-col gap-5">
                    {/* English Solution */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black block">🇬🇧 Solution Heading (English)</label>
                        <input
                            type="text"
                            value={formData.contentEn?.solutionTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: { ...formData.contentEn, solutionTitle: e.target.value },
                                })
                            }
                            placeholder="The Solution with ZeroQueries"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black block pt-1">Solution Paragraphs</label>
                        <textarea
                            rows={4}
                            value={(formData.contentEn?.solutions || []).join('\n\n')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentEn: {
                                        ...formData.contentEn,
                                        solutions: e.target.value.split('\n\n').filter(Boolean),
                                    },
                                })
                            }
                            placeholder="Enter solution paragraphs separated by blank lines..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>

                    {/* Arabic Solution */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black text-right block">🇸🇦 عنوان الحل (بالعربية)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={formData.contentAr?.solutionTitle || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: { ...formData.contentAr, solutionTitle: e.target.value },
                                })
                            }
                            placeholder="الحل مع ZeroQueries"
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <label className="text-xs font-semibold text-black text-right block pt-1">فقرات الحل بالعربية</label>
                        <textarea
                            rows={4}
                            dir="rtl"
                            value={(formData.contentAr?.solutions || []).join('\n\n')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contentAr: {
                                        ...formData.contentAr,
                                        solutions: e.target.value.split('\n\n').filter(Boolean),
                                    },
                                })
                            }
                            placeholder="اكتب فقرات الحل مع سطر فارغ بين كل فقرة..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Tab 2 Navigation */}
            <div className="flex items-center justify-between pt-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('basic')}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                    <FiArrowLeft className="w-4 h-4 text-black" />
                    <span>Back: 1. Overview</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('sidebar')}
                    className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                    <span>Next: 3. Sidebar Specs</span>
                    <FiArrowRight className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}