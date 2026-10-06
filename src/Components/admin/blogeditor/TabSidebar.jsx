"use client";

import React from 'react';
import { FiArrowLeft, FiArrowRight, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function TabSidebar({ formData, setFormData, setActiveTab }) {
    const handleAddRow = () => {
        const en = [...(formData.sidebar?.detailsEn || []), { label: '', value: '' }];
        const ar = [...(formData.sidebar?.detailsAr || []), { label: '', value: '' }];
        setFormData({ ...formData, sidebar: { detailsEn: en, detailsAr: ar } });
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                        <h4 className="text-sm font-semibold text-black flex items-center gap-2">
                            <span>📌</span>
                            <span>Case Overview Specs (المعلومات الجانبية للمقال)</span>
                        </h4>
                        <p className="text-xs text-black/50 mt-0.5">
                            Key-value attributes shown in the sticky sidebar (e.g. Industry, Location, Team Size, Platform)
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={handleAddRow}
                        className="px-4 py-2 bg-[#6434F5] text-white hover:bg-[#5228d9] rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                    >
                        <FiPlus className="w-3.5 h-3.5 text-white" />
                        <span>Add Specification Row</span>
                    </button>
                </div>

                {/* Empty State */}
                {(!formData.sidebar?.detailsEn || formData.sidebar.detailsEn.length === 0) ? (
                    <div className="py-12 border-2 border-dashed border-gray-200 rounded-2xl text-center flex flex-col items-center justify-center gap-2.5 bg-gray-50/40">
                        <p className="text-xs text-black/50">No specification rows added yet.</p>
                        <button
                            type="button"
                            onClick={handleAddRow}
                            className="px-3.5 py-1.5 bg-white border border-purple-200 text-[#6434F5] hover:bg-purple-50 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                            + Add Specification Row
                        </button>
                    </div>
                ) : (
                    /* Specification List */
                    <div className="space-y-4">
                        {(formData.sidebar?.detailsEn || []).map((item, idx) => (
                            <div key={idx} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[#6434F5] bg-purple-100/60 px-2.5 py-0.5 rounded-md">
                                        Specification #{idx + 1}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const en = formData.sidebar.detailsEn.filter((_, i) => i !== idx);
                                            const ar = (formData.sidebar.detailsAr || []).filter((_, i) => i !== idx);
                                            setFormData({ ...formData, sidebar: { detailsEn: en, detailsAr: ar } });
                                        }}
                                        className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1"
                                    >
                                        <FiTrash2 className="w-3 h-3 text-red-600" />
                                        <span>Remove Row</span>
                                    </button>
                                </div>

                                <div className="flex flex-col gap-4">
                                    {/* English Row */}
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-semibold text-black/60">🇬🇧 English (Label & Value)</span>
                                        <div className="flex flex-col gap-2.5">
                                            <input
                                                type="text"
                                                value={item.label || ''}
                                                onChange={(e) => {
                                                    const updated = [...formData.sidebar.detailsEn];
                                                    updated[idx].label = e.target.value;
                                                    setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsEn: updated } });
                                                }}
                                                placeholder="Label (e.g. Industry)"
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-black"
                                            />
                                            <input
                                                type="text"
                                                value={item.value || ''}
                                                onChange={(e) => {
                                                    const updated = [...formData.sidebar.detailsEn];
                                                    updated[idx].value = e.target.value;
                                                    setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsEn: updated } });
                                                }}
                                                placeholder="Value (e.g. Retail Commerce)"
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-black"
                                            />
                                        </div>
                                    </div>

                                    {/* Arabic Row */}
                                    <div className="space-y-1">
                                        <span className="text-[11px] font-semibold text-black/60 text-right block">🇸🇦 العربية (التسمية والقيمة)</span>
                                        <div className="flex flex-col gap-2.5">
                                            <input
                                                type="text"
                                                dir="rtl"
                                                value={formData.sidebar?.detailsAr?.[idx]?.label || ''}
                                                onChange={(e) => {
                                                    const updated = [...(formData.sidebar.detailsAr || [])];
                                                    if (updated[idx]) updated[idx].label = e.target.value;
                                                    setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsAr: updated } });
                                                }}
                                                placeholder="التسمية (مثال: القطاع)"
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-black"
                                            />
                                            <input
                                                type="text"
                                                dir="rtl"
                                                value={formData.sidebar?.detailsAr?.[idx]?.value || ''}
                                                onChange={(e) => {
                                                    const updated = [...(formData.sidebar.detailsAr || [])];
                                                    if (updated[idx]) updated[idx].value = e.target.value;
                                                    setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsAr: updated } });
                                                }}
                                                placeholder="القيمة (مثال: التجارة والتجزئة)"
                                                className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs text-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Tab 3 Navigation */}
            <div className="flex items-center justify-between pt-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('body')}
                    className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                    <FiArrowLeft className="w-4 h-4 text-black" />
                    <span>Back: 2. Story</span>
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('quote')}
                    className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                    <span>Next: 4. Quote & Metrics</span>
                    <FiArrowRight className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}