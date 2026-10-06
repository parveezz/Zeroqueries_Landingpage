"use client";

import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

export default function TabQuoteMetrics({ formData, setFormData, setActiveTab }) {
    const handleAddMetric = () => {
        const en = [...(formData.resultsEn || []), { icon: '⚡', title: '', desc: '' }];
        const ar = [...(formData.resultsAr || []), { title: '', desc: '' }];
        setFormData({ ...formData, resultsEn: en, resultsAr: ar });
    };

    const handleRemoveMetric = (idx) => {
        const en = (formData.resultsEn || []).filter((_, i) => i !== idx);
        const ar = (formData.resultsAr || []).filter((_, i) => i !== idx);
        setFormData({ ...formData, resultsEn: en, resultsAr: ar });
    };

    return (
        <div className="space-y-6">
            {/* Sub-Section 1: Executive Quote */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#6434F5]" />
                        <h4 className="text-sm font-semibold text-black">Section 1: Executive Testimonial Quote (شهادة القيادة)</h4>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* English Quote */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black block">🇬🇧 Quote Statement (English)</label>
                        <textarea
                            rows={3}
                            value={formData.quoteEn?.text || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    quoteEn: { ...formData.quoteEn, text: e.target.value },
                                })
                            }
                            placeholder="Enter quote in English..."
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <div className="flex flex-col gap-2.5 pt-1">
                            <input
                                type="text"
                                value={formData.quoteEn?.author || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quoteEn: { ...formData.quoteEn, author: e.target.value },
                                    })
                                }
                                placeholder="Author Name"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-black"
                            />
                            <input
                                type="text"
                                value={formData.quoteEn?.role || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quoteEn: { ...formData.quoteEn, role: e.target.value },
                                    })
                                }
                                placeholder="Role / Title"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-black"
                            />
                        </div>
                    </div>

                    {/* Arabic Quote */}
                    <div className="space-y-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200/60">
                        <label className="text-xs font-semibold text-black text-right block">🇸🇦 نص الاقتباس (بالعربية)</label>
                        <textarea
                            rows={3}
                            dir="rtl"
                            value={formData.quoteAr?.text || ''}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    quoteAr: { ...formData.quoteAr, text: e.target.value },
                                })
                            }
                            placeholder="اكتب نص الاقتباس بالعربية..."
                            className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm text-black"
                        />
                        <div className="flex flex-col gap-2.5 pt-1">
                            <input
                                type="text"
                                dir="rtl"
                                value={formData.quoteAr?.author || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quoteAr: { ...formData.quoteAr, author: e.target.value },
                                    })
                                }
                                placeholder="اسم القائل"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-black"
                            />
                            <input
                                type="text"
                                dir="rtl"
                                value={formData.quoteAr?.role || ''}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        quoteAr: { ...formData.quoteAr, role: e.target.value },
                                    })
                                }
                                placeholder="المسمى الوظيفي"
                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-Section 2: Measurable Results Cards */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                    <div>
                        <h4 className="text-sm font-semibold text-black">Section 2: Key Metric Highlights (بطاقات النتائج)</h4>
                        <p className="text-xs text-black/50">Displayed in the metric grid under the article body</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddMetric}
                        className="px-4 py-2 bg-[#6434F5] text-white hover:bg-[#5228d9] rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                        <span>+ Add Metric Card</span>
                    </button>
                </div>

                {/* Empty State */}
                {(!formData.resultsEn || formData.resultsEn.length === 0) ? (
                    <div className="py-10 border-2 border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-2 bg-gray-50/40">
                        <p className="text-xs text-black/50">No metric cards added yet.</p>
                        <button
                            type="button"
                            onClick={handleAddMetric}
                            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#6434F5] hover:bg-purple-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                            + Add Metric Card
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {(formData.resultsEn || []).map((result, idx) => (
                            <div key={idx} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2.5">
                                        <input
                                            type="text"
                                            value={result.icon || ''}
                                            onChange={(e) => {
                                                const updated = [...formData.resultsEn];
                                                updated[idx].icon = e.target.value;
                                                setFormData({ ...formData, resultsEn: updated });
                                            }}
                                            placeholder="⚡"
                                            className="w-10 text-center py-1 bg-white border border-gray-200 rounded-lg text-base text-black"
                                        />
                                        <span className="text-xs font-bold text-black/70">Metric Card #{idx + 1}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveMetric(idx)}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                        <span>Remove Card</span>
                                    </button>
                                </div>

                                <div className="space-y-2">
                                    {/* English Metric */}
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-semibold text-black/40">🇬🇧 English Title & Desc</span>
                                        <input
                                            type="text"
                                            value={result.title || ''}
                                            onChange={(e) => {
                                                const updated = [...formData.resultsEn];
                                                updated[idx].title = e.target.value;
                                                setFormData({ ...formData, resultsEn: updated });
                                            }}
                                            placeholder="Title (e.g. Sub-Second Answers)"
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-black"
                                        />
                                        <input
                                            type="text"
                                            value={result.desc || ''}
                                            onChange={(e) => {
                                                const updated = [...formData.resultsEn];
                                                updated[idx].desc = e.target.value;
                                                setFormData({ ...formData, resultsEn: updated });
                                            }}
                                            placeholder="Description snippet..."
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-black"
                                        />
                                    </div>

                                    {/* Arabic Metric */}
                                    <div className="space-y-1 pt-1 border-t border-gray-200/40">
                                        <span className="text-[10px] font-semibold text-black/40 text-right block">🇸🇦 العنوان والوصف بالعربية</span>
                                        <input
                                            type="text"
                                            dir="rtl"
                                            value={formData.resultsAr?.[idx]?.title || ''}
                                            onChange={(e) => {
                                                const updated = [...(formData.resultsAr || [])];
                                                if (!updated[idx]) updated[idx] = { title: '', desc: '' };
                                                updated[idx].title = e.target.value;
                                                setFormData({ ...formData, resultsAr: updated });
                                            }}
                                            placeholder="العنوان بالعربية (مثال: إجابات بأقل من ثانية)"
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-black"
                                        />
                                        <input
                                            type="text"
                                            dir="rtl"
                                            value={formData.resultsAr?.[idx]?.desc || ''}
                                            onChange={(e) => {
                                                const updated = [...(formData.resultsAr || [])];
                                                if (!updated[idx]) updated[idx] = { title: '', desc: '' };
                                                updated[idx].desc = e.target.value;
                                                setFormData({ ...formData, resultsAr: updated });
                                            }}
                                            placeholder="الوصف بالعربية..."
                                            className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-black"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tab 4 Navigation to 5. Create Article */}
            <div className="flex items-center justify-between pt-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('sidebar')}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                    <FiArrowLeft className="w-4 h-4 text-black" />
                    <span>Back: 3. Sidebar Specs</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('create')}
                    className="px-7 py-2.5 bg-[#6434F5] hover:bg-[#5228d9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                    <span>Next: 5. Create Article</span>
                    <FiArrowRight className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}