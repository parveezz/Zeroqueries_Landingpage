"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
    FiArrowLeft,
    FiTag,
    FiBookOpen,
    FiList,
    FiMessageSquare,
    FiSend,
    FiSave,
    FiExternalLink,
} from 'react-icons/fi';
import {
    TabOverview,
    TabStory,
    TabSidebar,
    TabQuoteMetrics,
    TabReviewPublish,
} from '@/components/admin/blogeditor';
import { createDefaultFormData } from '@/components/admin/blogeditor/defaultFormData';
import { AdminAuthGate } from '@/components/admin';

const ADMIN_PASSWORD = 'Umar@2026';

export default function EditBlogPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params?.slug;

    // Authentication state
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);

    // Form and data state
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState(createDefaultFormData());
    const [originalBlog, setOriginalBlog] = useState(null);
    const [loadingBlog, setLoadingBlog] = useState(true);
    const [fetchError, setFetchError] = useState('');
    const [notification, setNotification] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Check existing authentication session
    useEffect(() => {
        try {
            const savedAuth =
                typeof window !== 'undefined'
                    ? localStorage.getItem('zq_admin_session')
                    : null;
            if (savedAuth === 'authenticated') {
                setIsAuthenticated(true);
            }
        } catch (_) { }
        setAuthChecking(false);
    }, []);

    const showNotification = useCallback((message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    }, []);

    // Unlock handler
    const handleUnlock = (e) => {
        if (e) e.preventDefault();
        setPasswordError('');

        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            try {
                localStorage.setItem('zq_admin_session', 'authenticated');
            } catch (_) { }
            setPassword('');
            showNotification('Admin panel unlocked successfully');
        } else {
            setPasswordError('Incorrect password. Please try again.');
        }
    };

    // Fetch existing blog data from /api/blogs/[slug]
    useEffect(() => {
        if (!slug || !isAuthenticated) return;

        const fetchBlog = async () => {
            try {
                setLoadingBlog(true);
                setFetchError('');
                const res = await fetch(`/api/blogs/${slug}`);
                const json = await res.json();

                if (json.success && json.data) {
                    const b = json.data;
                    setOriginalBlog(b);
                    setFormData({
                        ...createDefaultFormData(),
                        ...b,
                        sidebar: {
                            detailsEn: Array.isArray(b.sidebar?.detailsEn) ? b.sidebar.detailsEn : [],
                            detailsAr: Array.isArray(b.sidebar?.detailsAr) ? b.sidebar.detailsAr : [],
                        },
                        contentEn: {
                            aboutTitle: b.contentEn?.aboutTitle || '',
                            about: b.contentEn?.about || '',
                            challengeTitle: b.contentEn?.challengeTitle || '',
                            challenges: Array.isArray(b.contentEn?.challenges) ? b.contentEn.challenges : [],
                            solutionTitle: b.contentEn?.solutionTitle || '',
                            solutions: Array.isArray(b.contentEn?.solutions) ? b.contentEn.solutions : [],
                        },
                        contentAr: {
                            aboutTitle: b.contentAr?.aboutTitle || '',
                            about: b.contentAr?.about || '',
                            challengeTitle: b.contentAr?.challengeTitle || '',
                            challenges: Array.isArray(b.contentAr?.challenges) ? b.contentAr.challenges : [],
                            solutionTitle: b.contentAr?.solutionTitle || '',
                            solutions: Array.isArray(b.contentAr?.solutions) ? b.contentAr.solutions : [],
                        },
                        quoteEn: {
                            text: b.quoteEn?.text || '',
                            author: b.quoteEn?.author || '',
                            role: b.quoteEn?.role || '',
                        },
                        quoteAr: {
                            text: b.quoteAr?.text || '',
                            author: b.quoteAr?.author || '',
                            role: b.quoteAr?.role || '',
                        },
                        resultsEn: Array.isArray(b.resultsEn) ? b.resultsEn : [],
                        resultsAr: Array.isArray(b.resultsAr) ? b.resultsAr : [],
                        faqs: Array.isArray(b.faqs) ? b.faqs : [],
                    });
                } else {
                    setFetchError(json.error || `Article "${slug}" could not be found.`);
                }
            } catch (err) {
                console.error('Error fetching blog for edit:', err);
                setFetchError('Network error loading article details');
            } finally {
                setLoadingBlog(false);
            }
        };

        fetchBlog();
    }, [slug, isAuthenticated]);

    // Save/Update handler (PUT to /api/blogs/[slug])
    const handleSavePost = async (e) => {
        if (e) e.preventDefault();

        if (!formData.titleEn || !formData.titleAr) {
            setActiveTab('basic');
            showNotification(
                'Please fill in both English and Arabic titles',
                'error'
            );
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await fetch(`/api/blogs/${slug}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                showNotification('Article updated and saved successfully!');
                setTimeout(() => {
                    router.push('/admin');
                }, 1200);
            } else {
                showNotification(data.error || 'Failed to update article', 'error');
            }
        } catch (err) {
            console.error('Update blog error:', err);
            showNotification('Server error while saving changes', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Sidebar section definitions
    const sections = useMemo(
        () => [
            {
                id: 'basic',
                step: '01',
                label: 'Overview & Titles',
                desc: 'English & Arabic titles, slug route, category, tags & cover',
                Icon: FiTag,
                isCompleted: Boolean(
                    formData.titleEn && formData.titleAr && formData.slug
                ),
            },
            {
                id: 'body',
                step: '02',
                label: 'Story & Narrative',
                desc: 'Company background, core challenges & solution copy',
                Icon: FiBookOpen,
                isCompleted: Boolean(
                    formData.contentEn?.about && formData.contentAr?.about
                ),
            },
            {
                id: 'sidebar',
                step: '03',
                label: 'Sidebar Specs',
                desc: 'Company attributes, industry, team size & platform specs',
                Icon: FiList,
                isCompleted: Boolean(formData.sidebar?.detailsEn?.length > 0),
            },
            {
                id: 'quote',
                step: '04',
                label: 'Quote & Metrics',
                desc: 'Executive testimonial & measurable results cards',
                Icon: FiMessageSquare,
                isCompleted: Boolean(
                    formData.quoteEn?.text && formData.resultsEn?.length > 0
                ),
            },
            {
                id: 'create',
                step: '05',
                label: 'Review & Publish',
                desc: 'Bilingual FAQs, publication summary & save updates',
                Icon: FiSend,
                isCompleted: false,
            },
        ],
        [formData]
    );

    if (authChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-black/60">
                    <div className="w-8 h-8 border-2 border-[#6434F5] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm font-medium">
                        Verifying access...
                    </span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <AdminAuthGate
                password={password}
                setPassword={setPassword}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                passwordError={passwordError}
                setPasswordError={setPasswordError}
                handleUnlock={handleUnlock}
            />
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/60 font-sans text-black py-8">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Notification Banner */}
                {notification && (
                    <div
                        className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center justify-between ${
                            notification.type === 'error'
                                ? 'bg-red-50 text-red-700 border border-red-200'
                                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        }`}
                    >
                        <span>{notification.message}</span>
                        <button
                            onClick={() => setNotification(null)}
                            className="text-xs opacity-70 hover:opacity-100 cursor-pointer"
                            aria-label="Dismiss notification"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Top Header Bar */}
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="p-2 text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                            title="Back to Admin Center"
                            aria-label="Back to Admin Center"
                        >
                            <FiArrowLeft className="w-4 h-4 text-black" />
                        </Link>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold text-black tracking-tight flex items-center gap-2">
                                <span>Edit Article</span>
                                <span className="text-xs font-mono font-normal text-black/50 bg-gray-100 px-2 py-0.5 rounded-md">
                                    /{slug}
                                </span>
                            </h1>
                            <p className="text-xs text-black/50 mt-0.5">
                                Modify article content, upload new cover image, and save changes to MySQL.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 self-end sm:self-auto">
                        <Link
                            href={`/resources/${slug}`}
                            target="_blank"
                            className="px-3.5 py-2 text-xs sm:text-sm font-medium text-black/70 hover:text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                            <span>Preview</span>
                            <FiExternalLink className="w-3.5 h-3.5 text-black/60" />
                        </Link>
                        <Link
                            href="/admin"
                            className="px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancel
                        </Link>
                        <button
                            type="button"
                            onClick={handleSavePost}
                            disabled={isSubmitting || loadingBlog}
                            className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#6434F5] hover:bg-[#5228d9] rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <FiSave className="w-4 h-4 text-white" />
                            <span>
                                {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Loading / Error States */}
                {loadingBlog ? (
                    <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center flex flex-col items-center justify-center gap-3">
                        <div className="w-10 h-10 border-3 border-[#6434F5] border-t-transparent rounded-full animate-spin" />
                        <p className="text-sm font-medium text-black/70">Loading article data from database...</p>
                    </div>
                ) : fetchError ? (
                    <div className="bg-white rounded-3xl border border-red-200 p-12 text-center flex flex-col items-center justify-center gap-3">
                        <div className="p-3 bg-red-50 text-red-600 rounded-2xl text-xl font-bold">⚠️</div>
                        <h3 className="text-base font-bold text-red-700">{fetchError}</h3>
                        <p className="text-xs text-black/50 max-w-md">
                            Could not retrieve article data for slug "{slug}". Please check that this blog exists.
                        </p>
                        <Link
                            href="/admin"
                            className="mt-2 px-4 py-2 bg-black text-white text-xs font-semibold rounded-xl hover:bg-gray-800 transition-colors"
                        >
                            Return to Admin Dashboard
                        </Link>
                    </div>
                ) : (
                    /* Main 30% Left Sidebar & 70% Right Content Grid */
                    <div className="flex flex-col lg:flex-row items-start gap-6">
                        {/* LEFT SIDEBAR: 30% */}
                        <aside className="w-full lg:w-[30%] shrink-0 flex flex-col gap-4">
                            {/* Brand */}
                            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-black leading-[1.1] px-1">
                                ZeroQueries
                            </h1>

                            {/* Article Sections Navigation */}
                            <nav className="flex flex-col gap-3">
                                {sections.map((sec) => {
                                    const isActive = activeTab === sec.id;
                                    return (
                                        <button
                                            key={sec.id}
                                            type="button"
                                            onClick={() => setActiveTab(sec.id)}
                                            className="w-full text-left p-4 rounded-2xl transition-colors cursor-pointer border border-gray-200 bg-white hover:border-gray-300"
                                        >
                                            <span
                                                className={`text-sm font-semibold ${
                                                    isActive
                                                        ? 'text-[#6434F5]'
                                                        : 'text-black'
                                                }`}
                                            >
                                                {sec.label}
                                            </span>
                                            <p className="text-sm text-black/50 font-normal mt-1 leading-relaxed">
                                                {sec.desc}
                                            </p>
                                        </button>
                                    );
                                })}
                            </nav>

                            {/* Live Summary */}
                            <div className="flex flex-col gap-3 mt-2">
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40 px-1">
                                    Current Article
                                </span>

                                <div className="flex flex-col gap-2 text-xs">
                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <span className="text-[10px] text-black/40 uppercase block font-semibold tracking-widest">
                                            Title (EN)
                                        </span>
                                        <p className="font-normal text-black leading-relaxed line-clamp-1 mt-1">
                                            {formData.titleEn || '(Not filled yet)'}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-gray-50 rounded-xl" dir="rtl">
                                        <span className="text-[10px] text-black/40 uppercase block font-semibold tracking-widest">
                                            العنوان (عربي)
                                        </span>
                                        <p className="font-normal text-black leading-relaxed line-clamp-1 mt-1">
                                            {formData.titleAr || '(لم يتم التعبئة)'}
                                        </p>
                                    </div>

                                    <div className="p-3 bg-gray-50 rounded-xl">
                                        <span className="text-[10px] text-black/40 uppercase block font-semibold tracking-widest">
                                            Category & Route
                                        </span>
                                        <p className="font-mono text-[#6434F5] leading-relaxed line-clamp-1 mt-1">
                                            /resources/{formData.slug || slug}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* RIGHT MAIN CONTENT: 70% */}
                        <main className="flex-1 w-full lg:w-[70%]">
                            <form onSubmit={handleSavePost}>
                                {activeTab === 'basic' && (
                                    <TabOverview
                                        formData={formData}
                                        setFormData={setFormData}
                                        setActiveTab={setActiveTab}
                                    />
                                )}

                                {activeTab === 'body' && (
                                    <TabStory
                                        formData={formData}
                                        setFormData={setFormData}
                                        setActiveTab={setActiveTab}
                                    />
                                )}

                                {activeTab === 'sidebar' && (
                                    <TabSidebar
                                        formData={formData}
                                        setFormData={setFormData}
                                        setActiveTab={setActiveTab}
                                    />
                                )}

                                {activeTab === 'quote' && (
                                    <TabQuoteMetrics
                                        formData={formData}
                                        setFormData={setFormData}
                                        setActiveTab={setActiveTab}
                                    />
                                )}

                                {activeTab === 'create' && (
                                    <TabReviewPublish
                                        formData={formData}
                                        setFormData={setFormData}
                                        editingPost={originalBlog || true}
                                        setActiveTab={setActiveTab}
                                    />
                                )}
                            </form>
                        </main>
                    </div>
                )}
            </div>
        </div>
    );
}
