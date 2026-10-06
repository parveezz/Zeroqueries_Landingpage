"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FiArrowLeft,
    FiTag,
    FiBookOpen,
    FiList,
    FiMessageSquare,
    FiSend,
    FiSave,
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

export default function CreateBlogPage() {
    const router = useRouter();

    // Authentication state
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);

    // Form and navigation state
    const [activeTab, setActiveTab] = useState('basic');
    const [formData, setFormData] = useState(createDefaultFormData());
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

    // Save/Submit handler
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
            const res = await fetch('/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                showNotification('Article created and published successfully!');
                setTimeout(() => {
                    router.push('/admin');
                }, 1200);
            } else {
                showNotification(data.error || 'Failed to create article', 'error');
            }
        } catch (err) {
            console.error('Create blog error:', err);
            showNotification('Server error while creating article', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Sidebar section definitions (memoized so the array isn't recreated each render)
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
                desc: 'Executive testimonial & 4 measurable results cards',
                Icon: FiMessageSquare,
                isCompleted: Boolean(
                    formData.quoteEn?.text && formData.resultsEn?.length > 0
                ),
            },
            {
                id: 'create',
                step: '05',
                label: 'Review & Publish',
                desc: 'Bilingual FAQs, publication summary & final review',
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
                        className={`mb-6 p-4 rounded-xl text-sm font-medium flex items-center justify-between ${notification.type === 'error'
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
                <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 mb-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/admin"
                            className="p-2 text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                            title="Back to Admin Center"
                            aria-label="Back to Admin Center"
                        >
                            <FiArrowLeft className="w-4 h-4 text-black" />
                        </Link>
                        <h1 className="text-lg sm:text-xl font-bold text-black tracking-tight">
                            Creating a blog
                        </h1>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href="/admin"
                            className="px-4 py-2 text-xs sm:text-sm font-medium text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancel
                        </Link>
                        <button
                            type="button"
                            onClick={handleSavePost}
                            disabled={isSubmitting}
                            className="px-5 py-2 text-xs sm:text-sm font-medium text-white bg-[#6434F5] hover:bg-[#5228d9] rounded-xl transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <FiSave className="w-4 h-4 text-white" />
                            <span>
                                {isSubmitting ? 'Publishing...' : 'Publish Blog'}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Main 30% Left Sidebar & 70% Right Content Grid */}
                <div className="flex flex-col lg:flex-row items-start gap-6">
                    {/* LEFT SIDEBAR: 30% */}
                    <aside className="w-full lg:w-[30%] shrink-0 flex flex-col gap-4">
                        {/* Brand */}
                        <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-black leading-[1.1] px-1">
                            ZeroQueries
                        </h1>

                        {/* Article Sections */}
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
                                            className={`text-sm font-semibold ${isActive
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
                                Live Summary
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
                                        Category & Slug
                                    </span>
                                    <p className="font-mono text-[#6434F5] leading-relaxed line-clamp-1 mt-1">
                                        /{formData.slug || 'slug-preview'}
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
                                    editingPost={null}
                                    setActiveTab={setActiveTab}
                                />
                            )}
                        </form>
                    </main>
                </div>
            </div>
        </div>
    );
}