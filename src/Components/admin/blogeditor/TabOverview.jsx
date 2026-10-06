"use client";

import React, { useState, useRef } from 'react';
import {
    FiArrowRight,
    FiUploadCloud,
    FiImage,
    FiTrash2,
    FiCheckCircle,
} from 'react-icons/fi';

export default function TabOverview({ formData, setFormData, setActiveTab }) {
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState('');
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState('');

    // Handle file upload to /api/upload
    const handleFileUpload = async (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setUploadError('Please select a valid image file (PNG, JPG, WEBP, GIF, SVG)');
            return;
        }

        // Limit to 10MB
        if (file.size > 10 * 1024 * 1024) {
            setUploadError('Image size exceeds 10MB limit');
            return;
        }

        setUploadError('');
        setUploading(true);

        // Responsive local preview during upload
        const localPreview = URL.createObjectURL(file);
        setPreviewUrl(localPreview);

        try {
            // Upload to API
            const body = new FormData();
            body.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body,
            });

            const data = await res.json();

            if (data.success && data.url) {
                setFormData((prev) => ({
                    ...prev,
                    image: data.url,
                    heroImage: data.url,
                }));
            } else {
                setPreviewUrl('');
                setUploadError(data.error || 'Failed to upload image to server');
            }
        } catch (err) {
            console.error('Image upload failed:', err);
            setPreviewUrl('');
            setUploadError('Network error uploading image to server');
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer?.files?.[0];
        if (file) {
            handleFileUpload(file);
        }
    };

    const handleRemoveImage = () => {
        setPreviewUrl('');
        setFormData((prev) => ({
            ...prev,
            image: '',
            heroImage: '',
        }));
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-6">
            {/* Section A: Article Titles */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#6434F5]" />
                        <h4 className="text-sm font-semibold text-black">Section 1: Main Article Titles</h4>
                    </div>
                    <span className="text-xs text-black/40">Required field</span>
                </div>

                <div className="flex flex-col gap-5">
                    {/* English Title */}
                    <div className="space-y-1.5 bg-blue-50/20 p-4 rounded-xl border border-blue-100/60">
                        <div className="flex items-center justify-between">
                            <label className="text-xs font-semibold text-black flex items-center gap-1.5">
                                <span>🇬🇧 English Title</span>
                                <span className="text-red-500">*</span>
                            </label>
                            <span className="text-[10px] font-mono uppercase bg-blue-100/60 text-blue-700 px-1.5 py-0.5 rounded">
                                LTR
                            </span>
                        </div>
                        <input
                            type="text"
                            required
                            dir="ltr"
                            value={formData.titleEn || ''}
                            onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                            placeholder="Enter English blog title..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 transition-all text-black"
                        />
                    </div>

                    {/* Arabic Title */}
                    <div className="space-y-1.5 bg-purple-50/20 p-4 rounded-xl border border-purple-100/60">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono uppercase bg-purple-100/60 text-purple-700 px-1.5 py-0.5 rounded">
                                RTL
                            </span>
                            <label className="text-xs font-semibold text-black flex items-center gap-1.5 text-right">
                                <span className="text-red-500">*</span>
                                <span>🇸🇦 العنوان الرئيسي بالعربية</span>
                            </label>
                        </div>
                        <input
                            type="text"
                            required
                            dir="rtl"
                            value={formData.titleAr || ''}
                            onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                            placeholder="اكتب عنوان المقال بالعربية..."
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 transition-all font-sans text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Section B: Subtitles & Excerpts */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="text-sm font-semibold text-black">Section 2: Subtitle & Article Summary</h4>
                    </div>
                    <span className="text-xs text-black/40">Displays in hero header and blog cards</span>
                </div>

                {/* Subtitle Row */}
                <div className="flex flex-col gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black">🇬🇧 Hero Subtitle (English)</label>
                        <textarea
                            rows={2}
                            dir="ltr"
                            value={formData.subtitleEn || ''}
                            onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                            placeholder="Brief introductory subtitle in English..."
                            className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 text-black"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black block text-right">🇸🇦 العنوان الفرعي في الترويسة (بالعربية)</label>
                        <textarea
                            rows={2}
                            dir="rtl"
                            value={formData.subtitleAr || ''}
                            onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                            placeholder="العنوان الفرعي للمقال بالعربية..."
                            className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 text-black"
                        />
                    </div>
                </div>

                {/* Excerpt Row */}
                <div className="flex flex-col gap-5 pt-2">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black">🇬🇧 Card Excerpt Summary (English)</label>
                        <textarea
                            rows={2}
                            dir="ltr"
                            value={formData.excerptEn || ''}
                            onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                            placeholder="Brief summary displayed on blog index cards..."
                            className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 text-black"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black block text-right">🇸🇦 نبذة البطاقة المختصرة (بالعربية)</label>
                        <textarea
                            rows={2}
                            dir="rtl"
                            value={formData.excerptAr || ''}
                            onChange={(e) => setFormData({ ...formData, excerptAr: e.target.value })}
                            placeholder="نبذة مختصرة تظهر في بطاقة المقال في صفحة المقالات..."
                            className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Section C: Publishing & Categorization */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        <h4 className="text-sm font-semibold text-black">Section 3: URL Route, Category & Featured Status</h4>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {/* Slug */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black">URL Slug (Route Path)</label>
                        <div className="flex items-center">
                            <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs text-black/50 font-mono">
                                /resources/
                            </span>
                            <input
                                type="text"
                                value={formData.slug || ''}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="my-article-slug"
                                className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-r-xl text-xs font-mono focus:outline-none focus:border-[#6434F5] text-black"
                            />
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-black">Category</label>
                        <select
                            value={formData.category || 'product'}
                            onChange={(e) => {
                                const cat = e.target.value;
                                const map = {
                                    product: { en: 'Product', ar: 'المنتج' },
                                    guides: { en: 'Guides', ar: 'أدلة وإرشادات' },
                                    enterprise: { en: 'Enterprise AI', ar: 'ذكاء المؤسسات' },
                                    'case-studies': { en: 'Case Studies', ar: 'قصص نجاح' },
                                    security: { en: 'Security', ar: 'الأمان والامتثال' },
                                };
                                setFormData({
                                    ...formData,
                                    category: cat,
                                    categoryEn: map[cat]?.en || cat,
                                    categoryAr: map[cat]?.ar || cat,
                                });
                            }}
                            className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#6434F5] text-black"
                        >
                            <option value="product">Product (المنتج)</option>
                            <option value="case-studies">Case Studies (قصص نجاح)</option>
                            <option value="guides">Guides (أدلة وإرشادات)</option>
                            <option value="enterprise">Enterprise AI (ذكاء المؤسسات)</option>
                            <option value="security">Security (الأمان والامتثال)</option>
                        </select>
                    </div>

                    {/* Featured Switch */}
                    <div>
                        <label className="flex items-center gap-3 p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={Boolean(formData.isFeatured)}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                                className="w-4 h-4 text-[#6434F5] rounded-sm focus:ring-[#6434F5]"
                            />
                            <div>
                                <p className="text-xs font-semibold text-black">Featured Hero Post</p>
                                <p className="text-[10px] text-black/50">Display prominently at the top of the blog page</p>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Read Time & Date */}
                <div className="flex flex-col gap-4 pt-2">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-black">🇬🇧 Read Time (English)</label>
                        <input
                            type="text"
                            value={formData.readTimeEn || ''}
                            onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                            placeholder="e.g. 5 min read"
                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-black text-right block">🇸🇦 مدة القراءة (بالعربية)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={formData.readTimeAr || ''}
                            onChange={(e) => setFormData({ ...formData, readTimeAr: e.target.value })}
                            placeholder="مثال: قراءة 5 دقائق"
                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-black">🇬🇧 Published Date (English)</label>
                        <input
                            type="text"
                            value={formData.dateEn || ''}
                            onChange={(e) => setFormData({ ...formData, dateEn: e.target.value })}
                            placeholder="e.g. May 21, 2026"
                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-black text-right block">🇸🇦 تاريخ النشر (بالعربية)</label>
                        <input
                            type="text"
                            dir="rtl"
                            value={formData.dateAr || ''}
                            onChange={(e) => setFormData({ ...formData, dateAr: e.target.value })}
                            placeholder="مثال: 21 مايو 2026"
                            className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs text-black"
                        />
                    </div>
                </div>
            </div>

            {/* Section D: Cover Image via File Upload */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <h4 className="text-sm font-semibold text-black">Section 4: Cover Image (Upload File)</h4>
                    </div>
                    <span className="text-xs text-black/40">16:9 Recommended &middot; PNG, JPG, WEBP</span>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {/* Upload Drop Zone / Active state */}
                    {!formData.image && !previewUrl ? (
                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-3 ${
                                dragActive
                                    ? 'border-[#6434F5] bg-purple-50/50'
                                    : 'border-gray-200 bg-gray-50/40 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#6434F5] flex items-center justify-center text-xl">
                                {uploading ? (
                                    <div className="w-6 h-6 border-2 border-[#6434F5] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <FiUploadCloud className="w-6 h-6 text-[#6434F5]" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-black">
                                    {uploading ? 'Uploading image to server...' : 'Click to select image file, or drag & drop'}
                                </p>
                                <p className="text-xs text-black/45 mt-1 font-light">
                                    PNG, JPG, WEBP, GIF up to 10MB (Uploaded via API)
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={uploading}
                                className="px-4 py-2 text-xs font-medium text-[#6434F5] bg-white border border-purple-200 hover:bg-purple-50 rounded-xl transition-colors shadow-2xs cursor-pointer"
                            >
                                Browse Files
                            </button>
                        </div>
                    ) : (
                        /* Uploaded Image Preview & Controls */
                        <div className="space-y-3">
                            <div className="w-full h-56 rounded-2xl bg-gray-100 overflow-hidden border border-gray-200 relative flex items-center justify-center group shadow-2xs">
                                <img
                                    src={previewUrl || formData.image}
                                    alt="Article Cover Preview"
                                    className="w-full h-full object-cover"
                                />

                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-sm cursor-pointer"
                                    >
                                        Change File
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>

                                {formData.image && !uploading && (
                                    <span className="absolute bottom-2.5 right-2.5 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1 font-mono">
                                        <FiCheckCircle className="w-3 h-3 text-emerald-400" />
                                        <span>Uploaded to Server</span>
                                    </span>
                                )}

                                {uploading && (
                                    <span className="absolute bottom-2.5 right-2.5 text-[10px] bg-[#6434F5] text-white px-2.5 py-1 rounded-md backdrop-blur-xs flex items-center gap-1.5 font-medium shadow-sm">
                                        <div className="w-2.5 h-2.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>Uploading via API...</span>
                                    </span>
                                )}
                            </div>

                            <div className="flex items-center justify-between text-xs px-1">
                                {formData.image ? (
                                    <span className="text-black/50 font-mono text-[11px] truncate max-w-sm">
                                        {formData.image}
                                    </span>
                                ) : (
                                    <span className="text-[#6434F5] text-[11px] font-medium">
                                        {uploading ? 'Processing upload...' : 'File selected'}
                                    </span>
                                )}
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-[#6434F5] hover:underline font-medium text-xs cursor-pointer"
                                    >
                                        Change Image
                                    </button>
                                    <span className="text-black/30">&middot;</span>
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="text-red-600 hover:underline font-medium text-xs cursor-pointer"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Upload error display */}
                    {uploadError && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                            {uploadError}
                        </div>
                    )}
                </div>
            </div>

            {/* Next Step Navigation to Tab 2 */}
            <div className="flex justify-end pt-3">
                <button
                    type="button"
                    onClick={() => setActiveTab('body')}
                    className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                    <span>Next: 2. Story & Narrative</span>
                    <FiArrowRight className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}