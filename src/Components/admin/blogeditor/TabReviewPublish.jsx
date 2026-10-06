"use client";

import React from 'react';
import { FiSave, FiPlus, FiTrash2, FiArrowLeft } from 'react-icons/fi';

export default function TabReviewPublish({ formData, setFormData, editingPost, setActiveTab }) {
    return (
        <div className="space-y-6">
            {/* Action Card: Big Create Article Button */}
            <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/40 rounded-2xl p-6 sm:p-8 border-2 border-[#6434F5]/30 shadow-md space-y-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-[#6434F5] text-white flex items-center justify-center text-xl font-bold shadow-md shrink-0">
                            <FiSave className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-base sm:text-lg font-bold text-black">
                                {editingPost ? 'Save & Update Article in MySQL' : 'Create Article & Publish to MySQL'}
                            </h4>
                            <p className="text-xs sm:text-sm text-black/60">
                                Your article will be written permanently to the database and will remain intact during any FileZilla deployment.
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-8 py-3.5 bg-[#6434F5] hover:bg-[#5228d9] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 shrink-0 cursor-pointer"
                    >
                        <FiSave className="w-4 h-4 text-white" />
                        <span>{editingPost ? 'Save Changes Now' : 'Create Article Now'}</span>
                    </button>
                </div>

                {/* Quick Summary Grid */}
                <div className="flex flex-col gap-3 pt-4 border-t border-purple-100/80 text-xs">
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                        <span className="text-[10px] text-black/40 font-semibold block uppercase">English Title</span>
                        <p className="font-semibold text-black line-clamp-1 mt-0.5">{formData.titleEn || '(Not filled yet)'}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80" dir="rtl">
                        <span className="text-[10px] text-black/40 font-semibold block uppercase">العنوان بالعربية</span>
                        <p className="font-semibold text-black line-clamp-1 mt-0.5">{formData.titleAr || '(لم يتم التعبئة)'}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                        <span className="text-[10px] text-black/40 font-semibold block uppercase">Public URL Path</span>
                        <p className="font-mono text-[#6434F5] line-clamp-1 mt-0.5">/resources/{formData.slug || 'slug'}</p>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                        <span className="text-[10px] text-black/40 font-semibold block uppercase">Category & Hero</span>
                        <p className="font-medium text-black line-clamp-1 mt-0.5">
                            {formData.categoryEn} {formData.isFeatured ? '• ⭐ Featured' : ''}
                        </p>
                    </div>
                </div>
            </div>

            {/* Sub-Section: Bilingual FAQs */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                        <h4 className="text-sm font-semibold text-black flex items-center gap-2">
                            <span>❓</span>
                            <span>Frequently Asked Questions (الأسئلة الشائعة)</span>
                        </h4>
                        <p className="text-xs text-black/50 mt-0.5">
                            Add and manage bilingual Q&A pairs displayed at the end of the article
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const faqs = [
                                ...(formData.faqs || []),
                                { questionEn: '', questionAr: '', answerEn: '', answerAr: '' },
                            ];
                            setFormData({ ...formData, faqs });
                        }}
                        className="px-4 py-2 bg-purple-50 text-[#6434F5] hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors cursor-pointer"
                    >
                        <FiPlus className="w-3.5 h-3.5 text-[#6434F5]" />
                        <span>Add FAQ Question Pair</span>
                    </button>
                </div>

                {/* FAQ Cards */}
                <div className="space-y-4">
                    {(formData.faqs || []).map((faq, idx) => (
                        <div key={idx} className="p-5 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-4 relative">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-[#6434F5] bg-purple-100/60 px-2.5 py-0.5 rounded-md">
                                    FAQ #{idx + 1}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const faqs = formData.faqs.filter((_, i) => i !== idx);
                                        setFormData({ ...formData, faqs });
                                    }}
                                    className="text-xs text-red-600 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors cursor-pointer flex items-center gap-1"
                                >
                                    <FiTrash2 className="w-3 h-3 text-red-600" />
                                    <span>Remove FAQ</span>
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* English Q&A */}
                                <div className="space-y-2 p-3.5 bg-white rounded-xl border border-gray-200/60">
                                    <label className="text-xs font-semibold text-black block">🇬🇧 Question (English)</label>
                                    <input
                                        type="text"
                                        value={faq.questionEn}
                                        onChange={(e) => {
                                            const faqs = [...formData.faqs];
                                            faqs[idx].questionEn = e.target.value;
                                            setFormData({ ...formData, faqs });
                                        }}
                                        placeholder="e.g. How long did it take to deploy?"
                                        className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-medium text-black"
                                    />
                                    <label className="text-xs font-semibold text-black block pt-1">Answer (English)</label>
                                    <textarea
                                        rows={2}
                                        value={faq.answerEn}
                                        onChange={(e) => {
                                            const faqs = [...formData.faqs];
                                            faqs[idx].answerEn = e.target.value;
                                            setFormData({ ...formData, faqs });
                                        }}
                                        placeholder="Full answer text in English..."
                                        className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                                    />
                                </div>

                                {/* Arabic Q&A */}
                                <div className="space-y-2 p-3.5 bg-white rounded-xl border border-gray-200/60">
                                    <label className="text-xs font-semibold text-black text-right block">🇸🇦 السؤال (بالعربية)</label>
                                    <input
                                        type="text"
                                        dir="rtl"
                                        value={faq.questionAr}
                                        onChange={(e) => {
                                            const faqs = [...formData.faqs];
                                            faqs[idx].questionAr = e.target.value;
                                            setFormData({ ...formData, faqs });
                                        }}
                                        placeholder="مثال: كم استغرق نشر المنصة وتفعيلها؟"
                                        className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-medium text-black"
                                    />
                                    <label className="text-xs font-semibold text-black text-right block pt-1">الإجابة (بالعربية)</label>
                                    <textarea
                                        rows={2}
                                        dir="rtl"
                                        value={faq.answerAr}
                                        onChange={(e) => {
                                            const faqs = [...formData.faqs];
                                            faqs[idx].answerAr = e.target.value;
                                            setFormData({ ...formData, faqs });
                                        }}
                                        placeholder="نص الإجابة الكاملة بالعربية..."
                                        className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Back Button */}
            {setActiveTab && (
                <div className="flex items-center justify-start pt-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('quote')}
                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                        <FiArrowLeft className="w-4 h-4 text-black" />
                        <span>Back: 4. Quote & Metrics</span>
                    </button>
                </div>
            )}
        </div>
    );
}