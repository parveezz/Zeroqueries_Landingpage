"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';

const ADMIN_PASSWORD = 'Umar@2026';

export default function BlogAdminPage() {
    // Password Authentication State (Strictly password only, compared against ADMIN_PASSWORD)
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [authChecking, setAuthChecking] = useState(true);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState(null);
    const [activeTab, setActiveTab] = useState('basic');
    const [notification, setNotification] = useState(null);

    // Section Switching: 'blogs' | 'contacts' | 'demos' | 'newsletters'
    const [adminSection, setAdminSection] = useState('blogs');
    const [contactInquiries, setContactInquiries] = useState([]);
    const [demoRequests, setDemoRequests] = useState([]);
    const [newsletterSubscribers, setNewsletterSubscribers] = useState([]);
    const [leadsLoading, setLeadsLoading] = useState(false);
    const [leadSearchTerm, setLeadSearchTerm] = useState('');
    const [viewingMessage, setViewingMessage] = useState(null);

    // Initial Empty Form State with explicit dual English & Arabic fields
    const defaultFormData = {
        titleEn: '',
        titleAr: '',
        slug: '',
        subtitleEn: '',
        subtitleAr: '',
        excerptEn: '',
        excerptAr: '',
        category: 'case-studies',
        categoryEn: 'Case Studies',
        categoryAr: 'قصص نجاح',
        readTimeEn: '6 min read',
        readTimeAr: 'قراءة 6 دقائق',
        dateEn: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        dateAr: new Date().toLocaleDateString('ar-EG', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
        heroImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200',
        isFeatured: false,
        sidebar: {
            detailsEn: [
                { label: 'Company', value: 'Global Retail Commerce' },
                { label: 'Location', value: 'London, UK & Dubai, UAE' },
                { label: 'Industry', value: 'Retail / E-commerce' },
                { label: 'Team Size', value: '250+ employees' },
                { label: 'Data Warehouse', value: 'BigQuery & Snowflake' },
                { label: 'Platform', value: 'ZeroQueries Enterprise' }
            ],
            detailsAr: [
                { label: 'الشركة', value: 'التجارة العالمية للتجزئة' },
                { label: 'المقر', value: 'لندن، المملكة المتحدة ودبي، الإمارات' },
                { label: 'القطاع', value: 'التجزئة والتجارة الإلكترونية' },
                { label: 'حجم الفريق', value: 'أكثر من 250 موظف' },
                { label: 'مستودع البيانات', value: 'BigQuery و Snowflake' },
                { label: 'المنصة', value: 'ZeroQueries للمؤسسات' }
            ]
        },
        contentEn: {
            aboutTitle: 'About the Company',
            about: 'Operating across multiple international markets with thousands of unique product lines and rapidly moving inventory, data drives every operational milestone.',
            challengeTitle: 'The Challenge: Static Dashboards and Reporting Delays',
            challenges: [
                'With inventory spread across multiple distribution centres, decision-makers frequently faced high reporting friction. Traditional dashboards were rigid and static.',
                'The backlog of data requests was growing by double digits each month, slowing down commercial decision velocity.'
            ],
            solutionTitle: 'The Solution with ZeroQueries',
            solutions: [
                'The enterprise connected their primary BigQuery and Snowflake warehouses directly to ZeroQueries with zero pipeline rebuilds.',
                'Teams in Slack and WhatsApp began asking everyday business questions directly in natural language.'
            ]
        },
        contentAr: {
            aboutTitle: 'عن المؤسسة',
            about: 'مع إدارة عمليات تجارية عبر عدة أسواق دولية وآلاف المنتجات ومخزون سريع الدوران، تشكل البيانات المحرك الأساسي لكل قرار تشغيلي.',
            challengeTitle: 'التحدي: لوحات التحكم الثابتة وتأخر التقارير',
            challenges: [
                'مع توزيع المخزون عبر مراكز لوجستية متعددة، واجه صناع القرار تباطؤاً ملحوظاً في الحصول على الإجابات.',
                'كانت قائمة طلبات الاستعلام المؤجلة تتزايد بشكل مستمر، مما أعاق سرعة اتخاذ القرارات التجارية الحاسمة.'
            ],
            solutionTitle: 'الحل مع ZeroQueries',
            solutions: [
                'قامت المؤسسة بربط مستودعات BigQuery وSnowflake مباشرة بـ ZeroQueries دون الحاجة لإعادة بناء أي خطوط نقل بيانات.',
                'بدأت الفرق في سلاك وواتساب بطرح أسئلة الأعمال بلغة حوارية عادية.'
            ]
        },
        quoteEn: {
            text: 'ZeroQueries broke down the communication silos between our business units. Our leadership can now interrogate live numbers in seconds right from everyday chat channels.',
            author: 'Mark McQuade',
            role: 'Commercial Finance Director'
        },
        quoteAr: {
            text: 'قضى ZeroQueries على الحواجز التي كانت تفصل بين إداراتنا. أصبح بإمكان قيادتنا الآن استجواب الأرقام الحية في ثوانٍ مباشرة من قنوات المحادثة اليومية.',
            author: 'مارك ماكويد',
            role: 'مدير الشؤون المالية التجارية'
        },
        resultsEn: [
            { title: 'Sub-Second Answers', desc: 'Direct answers without waiting on the data team', icon: '⚡' },
            { title: '80% Backlog Reduction', desc: 'Data engineers freed to focus on high-value models', icon: '⚙️' },
            { title: 'Slack & WhatsApp Native', desc: 'Peer-to-peer insights shared across teams instantly', icon: '💬' },
            { title: '100% Zero-Training', desc: 'Strict ephemeral memory execution with zero retention', icon: '🔒' }
        ],
        resultsAr: [
            { title: 'إجابات بأقل من ثانية', desc: 'إجابات مباشرة دون انتظار فريق البيانات', icon: '⚡' },
            { title: 'خفض 80٪ من التراكم', desc: 'تحرير مهندسي البيانات للتركيز على النماذج الاستراتيجية', icon: '⚙️' },
            { title: 'مدمج في سلاك وواتساب', desc: 'مشاركة التحليلات بين الفرق بلحظات', icon: '💬' },
            { title: 'أمان 100٪ دون تدريب', desc: 'تنفيذ لحظي في الذاكرة مع عدم الاحتفاظ بالبيانات', icon: '🔒' }
        ],
        faqs: [
            {
                questionEn: 'How long did it take to deploy ZeroQueries across the enterprise warehouse?',
                questionAr: 'كم استغرق نشر ZeroQueries عبر مستودع بيانات المؤسسة؟',
                answerEn: 'The full integration was completed in less than one business day without copying tables.',
                answerAr: 'تم اكتمال الربط بالكامل في أقل من يوم عمل واحد دون الحاجة لنسخ الجداول.'
            }
        ]
    };

    const [formData, setFormData] = useState(defaultFormData);

    // Fetch blogs from API (Compatible with Next.js & Hostinger PHP)
    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/blogs');
            const json = await res.json();
            if (json.success && Array.isArray(json.data)) {
                setBlogs(json.data);
            }
        } catch (err) {
            console.error('Error fetching blogs:', err);
            showNotification('Error loading blogs from API', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all leads (Contact, Demo, Newsletter)
    const fetchAllLeads = async () => {
        try {
            setLeadsLoading(true);
            const [cRes, dRes, nRes] = await Promise.all([
                fetch('/api/contact').then(r => r.json()).catch(() => ({ data: [] })),
                fetch('/api/demo').then(r => r.json()).catch(() => ({ data: [] })),
                fetch('/api/newsletter').then(r => r.json()).catch(() => ({ data: [] })),
            ]);
            if (cRes.success && Array.isArray(cRes.data)) setContactInquiries(cRes.data);
            if (dRes.success && Array.isArray(dRes.data)) setDemoRequests(dRes.data);
            if (nRes.success && Array.isArray(nRes.data)) setNewsletterSubscribers(nRes.data);
        } catch (err) {
            console.error('Error fetching leads:', err);
        } finally {
            setLeadsLoading(false);
        }
    };

    const handleDeleteLead = async (type, id, email) => {
        if (!confirm('Are you sure you want to delete this record?')) return;
        try {
            let url = '';
            if (type === 'contact') url = `/api/contact?id=${id}`;
            if (type === 'demo') url = `/api/demo?id=${id}`;
            if (type === 'newsletter') url = `/api/newsletter?${id ? `id=${id}` : `email=${encodeURIComponent(email)}`}`;

            const res = await fetch(url, { method: 'DELETE' });
            const data = await res.json();
            if (data.success) {
                showNotification('Record deleted successfully');
                fetchAllLeads();
            } else {
                showNotification(data.error || 'Failed to delete record', 'error');
            }
        } catch (err) {
            console.error('Delete lead error:', err);
            showNotification('Server error while deleting', 'error');
        }
    };

    const exportToCsv = (data, filename) => {
        if (!data || !data.length) {
            showNotification('No data to export', 'error');
            return;
        }
        const headers = Object.keys(data[0]);
        const csvRows = [
            headers.join(','),
            ...data.map(row => headers.map(fieldName => JSON.stringify(row[fieldName] ?? '')).join(','))
        ];
        const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showNotification(`${filename}.csv exported successfully!`);
    };

    // Restore session on mount if previously unlocked
    useEffect(() => {
        try {
            const savedAuth = typeof window !== 'undefined' ? localStorage.getItem('zq_admin_session') : null;
            if (savedAuth === 'authenticated') {
                setIsAuthenticated(true);
                fetchBlogs();
                fetchAllLeads();
            }
        } catch (_) {}
        setAuthChecking(false);
    }, []);

    // Unlock Admin by comparing entered password in useState
    const handleUnlock = (e) => {
        if (e) e.preventDefault();
        setPasswordError('');

        // Compare entered password with secret
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            try {
                localStorage.setItem('zq_admin_session', 'authenticated');
            } catch (_) {}
            setPassword('');
            fetchBlogs();
            fetchAllLeads();
            showNotification('Admin panel unlocked successfully');
        } else {
            setPasswordError('Incorrect password. Please try again.');
        }
    };

    // Lock Admin and clear session
    const handleLock = () => {
        setIsAuthenticated(false);
        try {
            localStorage.removeItem('zq_admin_session');
        } catch (_) {}
        setPassword('');
        setPasswordError('');
        showNotification('Admin panel locked');
    };

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    // Open Modal for Create
    const handleOpenCreate = () => {
        setEditingPost(null);
        setFormData(defaultFormData);
        setActiveTab('basic');
        setIsModalOpen(true);
    };

    // Open Modal for Edit
    const handleOpenEdit = (post) => {
        setEditingPost(post);
        setFormData({
            ...defaultFormData,
            ...post,
            sidebar: {
                detailsEn: post.sidebar?.detailsEn || defaultFormData.sidebar.detailsEn,
                detailsAr: post.sidebar?.detailsAr || defaultFormData.sidebar.detailsAr,
            },
            contentEn: post.contentEn || defaultFormData.contentEn,
            contentAr: post.contentAr || defaultFormData.contentAr,
            quoteEn: post.quoteEn || defaultFormData.quoteEn,
            quoteAr: post.quoteAr || defaultFormData.quoteAr,
            resultsEn: post.resultsEn || defaultFormData.resultsEn,
            resultsAr: post.resultsAr || defaultFormData.resultsAr,
            faqs: post.faqs || defaultFormData.faqs,
        });
        setActiveTab('basic');
        setIsModalOpen(true);
    };

    // Save (Create or Update)
    const handleSavePost = async (e) => {
        e.preventDefault();
        try {
            const isEdit = Boolean(editingPost);
            const url = isEdit ? `/api/blogs/${editingPost.slug}` : '/api/blogs';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                showNotification(isEdit ? 'Article updated successfully!' : 'Article created successfully!');
                setIsModalOpen(false);
                fetchBlogs();
            } else {
                showNotification(data.error || 'Failed to save article', 'error');
            }
        } catch (err) {
            console.error('Save error:', err);
            showNotification('Server error while saving article', 'error');
        }
    };

    // Delete Post
    const handleDeletePost = async (slug, title) => {
        if (!confirm(`Are you sure you want to delete "${title || slug}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const res = await fetch(`/api/blogs/${slug}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                showNotification('Article deleted successfully');
                fetchBlogs();
            } else {
                showNotification(data.error || 'Failed to delete article', 'error');
            }
        } catch (err) {
            console.error('Delete error:', err);
            showNotification('Server error while deleting', 'error');
        }
    };

    // Filtered blogs
    const filteredBlogs = blogs.filter((b) => {
        const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
        const matchesSearch =
            (b.titleEn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.titleAr || '').includes(searchTerm) ||
            (b.slug || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Verification loading screen
    if (authChecking) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-black/60">
                    <div className="w-8 h-8 border-2 border-[#6434F5] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs sm:text-sm font-medium">Verifying access...</span>
                </div>
            </div>
        );
    }

    // Password Gate (Designed identically to the ZeroQueries Login Page)
    if (!isAuthenticated) {
        return (
            <main className="relative min-h-screen w-full bg-gray-50 font-sans text-black py-8 sm:py-16 px-4 sm:px-8 lg:px-14 flex items-center justify-center overflow-hidden">
                {/* Background Dot Grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

                <div className="relative z-10 w-full max-w-[440px]">
                    {/* Card */}
                    <div className="rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white p-5 xs:p-6 sm:p-9 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
                        {/* Brand header */}
                        <div className="text-center mb-6 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl lg:text-[26px] font-normal tracking-tight text-black">
                                Admin Access
                            </h1>
                            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-black/60 font-light">
                                Enter password to access ZeroQueries Admin Center
                            </p>
                        </div>

                        {/* Password-Only Form */}
                        <form onSubmit={handleUnlock} className="space-y-3.5 sm:space-y-4">
                            <div>
                                <label
                                    htmlFor="admin-password"
                                    className="block text-xs font-medium text-black/80 mb-1.5"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40 pointer-events-none" />
                                    <input
                                        id="admin-password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        required
                                        autoFocus
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (passwordError) setPasswordError('');
                                        }}
                                        placeholder="••••••••••••"
                                        className="w-full h-11 rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-10 text-xs sm:text-sm text-black placeholder:text-black/40 focus:bg-white focus:border-black focus:outline-none transition-colors"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md text-black/40 hover:text-black transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <FiEyeOff className="w-4 h-4" />
                                        ) : (
                                            <FiEye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Error banner */}
                            {passwordError && (
                                <div className="flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5">
                                    <FiAlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                    <p className="text-xs text-red-700 font-normal leading-relaxed">
                                        {passwordError}
                                    </p>
                                </div>
                            )}

                            {/* Submit button */}
                            <button
                                type="submit"
                                className="w-full mt-2 h-11 sm:h-12 rounded-xl bg-black px-4 text-sm font-medium text-white hover:bg-gray-800 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm cursor-pointer"
                            >
                                Unlock Admin Panel
                            </button>
                        </form>

                        {/* Return to Website link */}
                        <div className="mt-5 sm:mt-6 text-center text-xs text-black/60 font-light leading-relaxed">
                            <Link
                                href="/"
                                className="font-medium text-black hover:underline underline-offset-4 inline-flex items-center gap-1"
                            >
                                <span>←</span>
                                <span>Return to Website</span>
                            </Link>
                        </div>
                    </div>

                    {/* Security badge */}
                    <p className="mt-5 sm:mt-6 text-center text-[11px] text-black/40 font-light flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
                        <FiLock className="w-3 h-3 text-black/40 shrink-0" />
                        <span>ZeroQueries Enterprise Security</span>
                        <span className="hidden xs:inline">·</span>
                        <span>256-bit SSL Encrypted</span>
                    </p>
                </div>
            </main>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans text-black py-10">
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
                            className="text-xs opacity-70 hover:opacity-100"
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs text-black/50 mb-1">
                            <Link href="/" className="hover:text-black">
                                Home
                            </Link>
                            <span>/</span>
                            <Link href="/resources" className="hover:text-black">
                                Resources
                            </Link>
                            <span>/</span>
                            <span className="text-black font-medium">Dedicated Admin Hub (/admin)</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                            ZeroQueries Admin Center
                        </h1>
                        <p className="text-xs sm:text-sm text-black/60 font-light mt-0.5">
                            Manage blog articles, contact inquiries, enterprise demo bookings, and newsletter subscribers
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                        <button
                            onClick={handleLock}
                            title="Lock Admin Panel"
                            className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-2xs"
                        >
                            <span>🔒</span>
                            <span>Lock</span>
                        </button>

                        <button
                            onClick={() => {
                                fetchBlogs();
                                fetchAllLeads();
                                showNotification('Data refreshed from server');
                            }}
                            className="px-3.5 py-2 bg-white hover:bg-gray-100 text-black/70 border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-2xs"
                        >
                            <span>↻</span>
                            <span>Refresh</span>
                        </button>

                        {adminSection === 'blogs' && (
                            <button
                                onClick={handleOpenCreate}
                                className="px-4 py-2 bg-[#6434F5] hover:bg-[#5228d9] text-white text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-sm"
                            >
                                <span>+</span>
                                <span>Create New Post</span>
                            </button>
                        )}

                        {adminSection === 'contacts' && (
                            <button
                                onClick={() => exportToCsv(contactInquiries, 'zeroqueries_contact_inquiries')}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-sm"
                            >
                                <span>📥</span>
                                <span>Export CSV</span>
                            </button>
                        )}

                        {adminSection === 'demos' && (
                            <button
                                onClick={() => exportToCsv(demoRequests, 'zeroqueries_demo_requests')}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-sm"
                            >
                                <span>📥</span>
                                <span>Export CSV</span>
                            </button>
                        )}

                        {adminSection === 'newsletters' && (
                            <button
                                onClick={() => exportToCsv(newsletterSubscribers, 'zeroqueries_newsletter_subscribers')}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 shadow-sm"
                            >
                                <span>📥</span>
                                <span>Export CSV</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Main Navigation Tabs */}
                <div className="flex border-b border-gray-200/90 mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
                    <button
                        onClick={() => setAdminSection('blogs')}
                        className={`pb-3 px-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                            adminSection === 'blogs'
                                ? 'border-[#6434F5] text-[#6434F5] font-semibold'
                                : 'border-transparent text-black/60 hover:text-black'
                        }`}
                    >
                        <span>📝 Blog Articles</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                            adminSection === 'blogs' ? 'bg-[#6434F5]/10 text-[#6434F5]' : 'bg-gray-100 text-black/60'
                        }`}>
                            {blogs.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setAdminSection('contacts')}
                        className={`pb-3 px-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                            adminSection === 'contacts'
                                ? 'border-[#6434F5] text-[#6434F5] font-semibold'
                                : 'border-transparent text-black/60 hover:text-black'
                        }`}
                    >
                        <span>💬 Contact Inquiries</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                            adminSection === 'contacts' ? 'bg-[#6434F5]/10 text-[#6434F5]' : 'bg-gray-100 text-black/60'
                        }`}>
                            {contactInquiries.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setAdminSection('demos')}
                        className={`pb-3 px-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                            adminSection === 'demos'
                                ? 'border-[#6434F5] text-[#6434F5] font-semibold'
                                : 'border-transparent text-black/60 hover:text-black'
                        }`}
                    >
                        <span>🚀 Demo Bookings</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                            adminSection === 'demos' ? 'bg-[#6434F5]/10 text-[#6434F5]' : 'bg-gray-100 text-black/60'
                        }`}>
                            {demoRequests.length}
                        </span>
                    </button>

                    <button
                        onClick={() => setAdminSection('newsletters')}
                        className={`pb-3 px-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                            adminSection === 'newsletters'
                                ? 'border-[#6434F5] text-[#6434F5] font-semibold'
                                : 'border-transparent text-black/60 hover:text-black'
                        }`}
                    >
                        <span>📬 Newsletter Subscribers</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full font-bold ${
                            adminSection === 'newsletters' ? 'bg-[#6434F5]/10 text-[#6434F5]' : 'bg-gray-100 text-black/60'
                        }`}>
                            {newsletterSubscribers.length}
                        </span>
                    </button>
                </div>

                {/* 1. BLOGS SECTION */}
                {adminSection === 'blogs' && (
                    <>
                        {/* Filters & Search */}
                <div className="bg-white rounded-xl border border-gray-200/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    {/* Search Input */}
                    <div className="relative w-full sm:w-80">
                        <input
                            type="text"
                            placeholder="Search English or Arabic..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5]"
                        />
                        <svg
                            className="w-4 h-4 text-black/40 absolute left-3 top-2.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                        {['all', 'product', 'guides', 'enterprise', 'case-studies', 'security'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors ${selectedCategory === cat
                                        ? 'bg-black text-white'
                                        : 'bg-gray-100 text-black/70 hover:bg-gray-200'
                                    }`}
                            >
                                {cat === 'all' ? 'All Posts' : cat.replace('-', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Table */}
                <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs">
                    {loading ? (
                        <div className="py-20 text-center text-black/50 text-sm">Loading articles from API...</div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="py-20 text-center text-black/50 text-sm">
                            No articles found matching your criteria.
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="bg-gray-50/80 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
                                    <tr>
                                        <th className="py-3 px-4">Article (English & Arabic)</th>
                                        <th className="py-3 px-4">Category</th>
                                        <th className="py-3 px-4">Date & Read Time</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredBlogs.map((post) => (
                                        <tr key={post.slug || post.id} className="hover:bg-gray-50/60 transition-colors">
                                            {/* Thumbnail + Title En & Ar */}
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                                                        <img
                                                            src={post.image || post.heroImage}
                                                            alt=""
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="min-w-0 max-w-md">
                                                        <p className="font-medium text-black line-clamp-1">{post.titleEn}</p>
                                                        <p className="text-black/55 text-xs line-clamp-1 mt-0.5" dir="rtl">
                                                            {post.titleAr}
                                                        </p>
                                                        <p className="text-[11px] text-[#6434F5] font-mono mt-0.5">
                                                            /{post.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="py-3.5 px-4 whitespace-nowrap">
                                                <span className="inline-flex px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-purple-50 text-[#6434F5]">
                                                    {post.categoryEn || post.category}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="py-3.5 px-4 whitespace-nowrap text-black/60 text-xs">
                                                <p>{post.dateEn || 'N/A'}</p>
                                                <p className="text-black/40 text-[11px]">{post.readTimeEn}</p>
                                            </td>

                                            {/* Actions */}
                                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/resources/${post.slug}`}
                                                        target="_blank"
                                                        className="px-2.5 py-1 text-xs text-black/70 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium"
                                                    >
                                                        View ↗
                                                    </Link>
                                                    <button
                                                        onClick={() => handleOpenEdit(post)}
                                                        className="px-2.5 py-1 text-xs text-white bg-black hover:bg-gray-800 rounded-md transition-colors font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeletePost(post.slug, post.titleEn)}
                                                        className="px-2.5 py-1 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors font-medium"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                </>
            )}

            {/* 2. CONTACT INQUIRIES SECTION */}
            {adminSection === 'contacts' && (
                <>
                    <div className="bg-white rounded-xl border border-gray-200/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Filter by name, email, topic, or message..."
                                value={leadSearchTerm}
                                onChange={(e) => setLeadSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5]"
                            />
                            <span className="text-black/40 absolute left-3 top-2.5 text-xs">🔍</span>
                        </div>
                        <span className="text-xs text-black/50 font-light">
                            Showing {contactInquiries.filter(c => {
                                const q = leadSearchTerm.toLowerCase();
                                const name = `${c.firstName || c.first_name || ''} ${c.lastName || c.last_name || ''}`.toLowerCase();
                                const email = (c.email || '').toLowerCase();
                                const topic = (c.topic || '').toLowerCase();
                                const msg = (c.message || '').toLowerCase();
                                return name.includes(q) || email.includes(q) || topic.includes(q) || msg.includes(q);
                            }).length} message(s)
                        </span>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs">
                        {leadsLoading ? (
                            <div className="py-20 text-center text-black/50 text-sm">Loading contact inquiries...</div>
                        ) : contactInquiries.length === 0 ? (
                            <div className="py-20 text-center text-black/50 text-sm">
                                No contact inquiries submitted yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead className="bg-gray-50/80 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="py-3 px-4">#</th>
                                            <th className="py-3 px-4">Contact Person</th>
                                            <th className="py-3 px-4">Topic</th>
                                            <th className="py-3 px-4">Message Preview</th>
                                            <th className="py-3 px-4">Date</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-light">
                                        {contactInquiries
                                            .filter(c => {
                                                const q = leadSearchTerm.toLowerCase();
                                                const name = `${c.firstName || c.first_name || ''} ${c.lastName || c.last_name || ''}`.toLowerCase();
                                                const email = (c.email || '').toLowerCase();
                                                const topic = (c.topic || '').toLowerCase();
                                                const msg = (c.message || '').toLowerCase();
                                                return name.includes(q) || email.includes(q) || topic.includes(q) || msg.includes(q);
                                            })
                                            .map((item, idx) => {
                                                const fullName = `${item.firstName || item.first_name || ''} ${item.lastName || item.last_name || ''}`.trim() || 'Anonymous';
                                                const email = item.email || '';
                                                const phone = item.phone || '';
                                                const date = item.createdAt || item.created_at || 'Just now';
                                                return (
                                                    <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-3 px-4 text-black/40 font-mono text-xs">{item.id || idx + 1}</td>
                                                        <td className="py-3 px-4">
                                                            <p className="font-medium text-black">{fullName}</p>
                                                            <a href={`mailto:${email}`} className="text-xs text-[#6434F5] hover:underline">
                                                                {email}
                                                            </a>
                                                            {phone && <p className="text-[11px] text-black/50 font-mono">{phone}</p>}
                                                        </td>
                                                        <td className="py-3 px-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-[#6434F5] border border-purple-100">
                                                                {item.topic || 'General'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 max-w-xs">
                                                            <p className="text-xs text-black/70 line-clamp-2">
                                                                {item.message || '—'}
                                                            </p>
                                                        </td>
                                                        <td className="py-3 px-4 text-xs text-black/60 whitespace-nowrap">
                                                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <button
                                                                    onClick={() => setViewingMessage({
                                                                        title: `Inquiry from ${fullName}`,
                                                                        email,
                                                                        topic: item.topic,
                                                                        phone,
                                                                        message: item.message,
                                                                        date
                                                                    })}
                                                                    className="px-2.5 py-1 text-xs text-black bg-gray-100 hover:bg-gray-200 rounded-md font-medium cursor-pointer"
                                                                >
                                                                    Read Full
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteLead('contact', item.id)}
                                                                    className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium cursor-pointer"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* 3. DEMO BOOKINGS SECTION */}
            {adminSection === 'demos' && (
                <>
                    <div className="bg-white rounded-xl border border-gray-200/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Filter by name, work email, organization..."
                                value={leadSearchTerm}
                                onChange={(e) => setLeadSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5]"
                            />
                            <span className="text-black/40 absolute left-3 top-2.5 text-xs">🔍</span>
                        </div>
                        <span className="text-xs text-black/50 font-light">
                            Showing {demoRequests.filter(d => {
                                const q = leadSearchTerm.toLowerCase();
                                const name = (d.fullName || d.full_name || '').toLowerCase();
                                const email = (d.workEmail || d.work_email || '').toLowerCase();
                                const org = (d.organization || '').toLowerCase();
                                const role = (d.role || '').toLowerCase();
                                const env = (d.dataEnvironment || d.data_environment || '').toLowerCase();
                                return name.includes(q) || email.includes(q) || org.includes(q) || role.includes(q) || env.includes(q);
                            }).length} booking(s)
                        </span>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs">
                        {leadsLoading ? (
                            <div className="py-20 text-center text-black/50 text-sm">Loading demo requests...</div>
                        ) : demoRequests.length === 0 ? (
                            <div className="py-20 text-center text-black/50 text-sm">
                                No demo requests received yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead className="bg-gray-50/80 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="py-3 px-4">#</th>
                                            <th className="py-3 px-4">Lead</th>
                                            <th className="py-3 px-4">Organization & Role</th>
                                            <th className="py-3 px-4">Data Stack / Environment</th>
                                            <th className="py-3 px-4">Submitted</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-light">
                                        {demoRequests
                                            .filter(d => {
                                                const q = leadSearchTerm.toLowerCase();
                                                const name = (d.fullName || d.full_name || '').toLowerCase();
                                                const email = (d.workEmail || d.work_email || '').toLowerCase();
                                                const org = (d.organization || '').toLowerCase();
                                                const role = (d.role || '').toLowerCase();
                                                const env = (d.dataEnvironment || d.data_environment || '').toLowerCase();
                                                return name.includes(q) || email.includes(q) || org.includes(q) || role.includes(q) || env.includes(q);
                                            })
                                            .map((item, idx) => {
                                                const fullName = item.fullName || item.full_name || 'Anonymous';
                                                const email = item.workEmail || item.work_email || '';
                                                const org = item.organization || 'Not specified';
                                                const role = item.role || '—';
                                                const env = item.dataEnvironment || item.data_environment || '—';
                                                const date = item.createdAt || item.created_at || 'Just now';
                                                return (
                                                    <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-3 px-4 text-black/40 font-mono text-xs">{item.id || idx + 1}</td>
                                                        <td className="py-3 px-4">
                                                            <p className="font-medium text-black">{fullName}</p>
                                                            <a href={`mailto:${email}`} className="text-xs text-[#6434F5] hover:underline font-mono">
                                                                {email}
                                                            </a>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <p className="font-medium text-black text-xs">{org}</p>
                                                            <p className="text-[11px] text-black/50">{role}</p>
                                                        </td>
                                                        <td className="py-3 px-4">
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                                {env}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-xs text-black/60 whitespace-nowrap">
                                                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                                            <div className="flex items-center justify-end gap-2">
                                                                <a
                                                                    href={`mailto:${email}?subject=ZeroQueries%20Demo%20Session&body=Hi%20${encodeURIComponent(fullName)},%0D%0A%0D%0AThank%20you%20for%20requesting%20a%20ZeroQueries%20enterprise%20demo...`}
                                                                    className="px-2.5 py-1 text-xs text-black bg-gray-100 hover:bg-gray-200 rounded-md font-medium"
                                                                >
                                                                    Reply ✉️
                                                                </a>
                                                                <button
                                                                    onClick={() => handleDeleteLead('demo', item.id)}
                                                                    className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium cursor-pointer"
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* 4. NEWSLETTER SUBSCRIBERS SECTION */}
            {adminSection === 'newsletters' && (
                <>
                    <div className="bg-white rounded-xl border border-gray-200/80 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <input
                                type="text"
                                placeholder="Filter by subscriber email..."
                                value={leadSearchTerm}
                                onChange={(e) => setLeadSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5]"
                            />
                            <span className="text-black/40 absolute left-3 top-2.5 text-xs">🔍</span>
                        </div>
                        <span className="text-xs text-black/50 font-light">
                            Total Active Subscribers: {newsletterSubscribers.length}
                        </span>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-200/80 overflow-hidden shadow-xs">
                        {leadsLoading ? (
                            <div className="py-20 text-center text-black/50 text-sm">Loading subscribers...</div>
                        ) : newsletterSubscribers.length === 0 ? (
                            <div className="py-20 text-center text-black/50 text-sm">
                                No newsletter subscribers yet.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs sm:text-sm">
                                    <thead className="bg-gray-50/80 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
                                        <tr>
                                            <th className="py-3 px-4">#</th>
                                            <th className="py-3 px-4">Subscriber Email</th>
                                            <th className="py-3 px-4">Status</th>
                                            <th className="py-3 px-4">Subscribed Date</th>
                                            <th className="py-3 px-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-light">
                                        {newsletterSubscribers
                                            .filter(n => (n.email || '').toLowerCase().includes(leadSearchTerm.toLowerCase()))
                                            .map((item, idx) => {
                                                const email = item.email || '';
                                                const date = item.subscribedAt || item.subscribed_at || item.createdAt || item.created_at || 'Recently';
                                                return (
                                                    <tr key={item.id || idx} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="py-3 px-4 text-black/40 font-mono text-xs">{item.id || idx + 1}</td>
                                                        <td className="py-3 px-4 font-medium text-black">
                                                            <a href={`mailto:${email}`} className="hover:text-[#6434F5] hover:underline font-mono">
                                                                {email}
                                                            </a>
                                                        </td>
                                                        <td className="py-3 px-4 whitespace-nowrap">
                                                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                                Active
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-4 text-xs text-black/60 whitespace-nowrap">
                                                            {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                        </td>
                                                        <td className="py-3 px-4 text-right whitespace-nowrap">
                                                            <button
                                                                onClick={() => handleDeleteLead('newsletter', item.id, email)}
                                                                className="px-2.5 py-1 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-md font-medium cursor-pointer"
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </>
            )}
            </div>

            {/* MESSAGE PREVIEW MODAL */}
            {viewingMessage && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                            <div>
                                <h3 className="text-base font-semibold text-black">{viewingMessage.title}</h3>
                                <p className="text-xs text-black/50 mt-0.5">{viewingMessage.email} {viewingMessage.phone && `• ${viewingMessage.phone}`}</p>
                            </div>
                            <button
                                onClick={() => setViewingMessage(null)}
                                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-black/60 flex items-center justify-center font-bold text-xs cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        <div className="mb-4">
                            <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block mb-1">Topic</span>
                            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-[#6434F5] border border-purple-100">
                                {viewingMessage.topic || 'General Inquiry'}
                            </span>
                        </div>
                        <div className="mb-6">
                            <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block mb-1">Message</span>
                            <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs sm:text-sm text-black/80 font-light whitespace-pre-wrap leading-relaxed">
                                {viewingMessage.message || 'No message provided.'}
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-2.5">
                            <button
                                onClick={() => setViewingMessage(null)}
                                className="px-4 py-2 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 text-black/70 cursor-pointer"
                            >
                                Close
                            </button>
                            <a
                                href={`mailto:${viewingMessage.email}?subject=Regarding%20your%20inquiry:%20${encodeURIComponent(viewingMessage.topic || '')}&body=Hi,%0D%0A%0D%0AThank%20you%20for%20contacting%20ZeroQueries...`}
                                className="px-4 py-2 text-xs font-medium rounded-lg bg-[#6434F5] hover:bg-[#5228d9] text-white flex items-center gap-1.5 cursor-pointer"
                            >
                                <span>Reply via Email</span>
                                <span>↗</span>
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: ULTRA-SPACIOUS, CLEARLY SECTIONED BILINGUAL STUDIO */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
                    <div className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100">
                        {/* 1. Modal Sticky Header */}
                        <div className="px-6 sm:px-8 py-5 border-b border-gray-200/80 flex items-center justify-between bg-white shrink-0">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#6434F5]/10 text-[#6434F5] flex items-center justify-center font-bold text-lg shrink-0">
                                    ✍️
                                </div>
                                <div>
                                    <div className="flex items-center gap-2.5">
                                        <h3 className="text-lg sm:text-xl font-semibold text-black tracking-tight">
                                            {editingPost ? 'Edit Blog Article' : 'Create New Blog Article'}
                                        </h3>
                                        <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-[#6434F5] border border-purple-100">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#6434F5]" />
                                            Dual English & Arabic Mode
                                        </span>
                                    </div>
                                    <p className="text-xs text-black/50 mt-0.5">
                                        {editingPost ? `Editing slug: /resources/${editingPost.slug}` : 'Organized in clear sections with paired English (LTR) and Arabic (RTL) inputs'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black flex items-center justify-center transition-colors text-sm font-semibold"
                                title="Close modal"
                            >
                                ✕
                            </button>
                        </div>

                        {/* 2. Spacious Section Navigation Bar */}
                        <div className="flex border-b border-gray-200/80 bg-gray-50/70 px-4 sm:px-8 overflow-x-auto gap-2 py-2.5 shrink-0 scrollbar-none">
                            {[
                                { id: 'basic', label: '1. Overview & Titles', icon: '🏷️' },
                                { id: 'body', label: '2. Story & Narrative', icon: '📖' },
                                { id: 'sidebar', label: '3. Sidebar Specs', icon: '📌' },
                                { id: 'quote', label: '4. Quote & Metrics', icon: '💬' },
                                { id: 'create', label: '5. Create Article', icon: '🚀' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${activeTab === tab.id
                                            ? 'bg-white text-[#6434F5] shadow-xs border border-gray-200 font-semibold'
                                            : 'text-black/60 hover:text-black hover:bg-white/60'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        {/* 3. Modal Form Scrollable Body */}
                        <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-gray-50/30">
                            {/* ==================================================== */}
                            {/* TAB 1: OVERVIEW & TITLES                             */}
                            {/* ==================================================== */}
                            {activeTab === 'basic' && (
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

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            {/* English Title */}
                                            <div className="space-y-1.5 bg-blue-50/20 p-4 rounded-xl border border-blue-100/60">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-xs font-semibold text-black flex items-center gap-1.5">
                                                        <span>🇬🇧 English Title</span>
                                                        <span className="text-red-500">*</span>
                                                    </label>
                                                    <span className="text-[10px] font-mono uppercase bg-blue-100/60 text-blue-700 px-1.5 py-0.5 rounded">LTR</span>
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    dir="ltr"
                                                    value={formData.titleEn}
                                                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                                                    placeholder="e.g. Game Changer: How Global Retailers Empower Teams with Conversational AI"
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 transition-all"
                                                />
                                            </div>

                                            {/* Arabic Title */}
                                            <div className="space-y-1.5 bg-purple-50/20 p-4 rounded-xl border border-purple-100/60">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-mono uppercase bg-purple-100/60 text-purple-700 px-1.5 py-0.5 rounded">RTL</span>
                                                    <label className="text-xs font-semibold text-black flex items-center gap-1.5 text-right">
                                                        <span className="text-red-500">*</span>
                                                        <span>🇸🇦 العنوان الرئيسي بالعربية</span>
                                                    </label>
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    dir="rtl"
                                                    value={formData.titleAr}
                                                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                                                    placeholder="مثال: نقطة تحول: كيف تُمكّن شركات التجزئة العالمية فرق عملها عبر الذكاء الاصطناعي الحواري"
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10 transition-all font-sans"
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
                                            <span className="text-xs text-black/40">Displays in hero header and 3x3 blog cards</span>
                                        </div>

                                        {/* Subtitle Row */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black">🇬🇧 Hero Subtitle (English)</label>
                                                <textarea
                                                    rows={2}
                                                    dir="ltr"
                                                    value={formData.subtitleEn}
                                                    onChange={(e) => setFormData({ ...formData, subtitleEn: e.target.value })}
                                                    placeholder="Discover how modern enterprise commerce operations transformed their data culture..."
                                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black block text-right">🇸🇦 العنوان الفرعي في الترويسة (بالعربية)</label>
                                                <textarea
                                                    rows={2}
                                                    dir="rtl"
                                                    value={formData.subtitleAr}
                                                    onChange={(e) => setFormData({ ...formData, subtitleAr: e.target.value })}
                                                    placeholder="اكتشف كيف غيرت شركات التجارة الحديثة ثقافة البيانات لديها..."
                                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10"
                                                />
                                            </div>
                                        </div>

                                        {/* Excerpt Row */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pt-2">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black">🇬🇧 Card Excerpt Summary (English)</label>
                                                <textarea
                                                    rows={2}
                                                    dir="ltr"
                                                    value={formData.excerptEn}
                                                    onChange={(e) => setFormData({ ...formData, excerptEn: e.target.value })}
                                                    placeholder="Brief preview snippet shown on the blog index grid..."
                                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black block text-right">🇸🇦 نبذة البطاقة المختصرة (بالعربية)</label>
                                                <textarea
                                                    rows={2}
                                                    dir="rtl"
                                                    value={formData.excerptAr}
                                                    onChange={(e) => setFormData({ ...formData, excerptAr: e.target.value })}
                                                    placeholder="نبذة مختصرة تظهر في بطاقة المقال في صفحة المقالات..."
                                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5] focus:ring-2 focus:ring-[#6434F5]/10"
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

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                            {/* Slug */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black">URL Slug (Route Path)</label>
                                                <div className="flex items-center">
                                                    <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-xs text-black/50 font-mono">
                                                        /resources/
                                                    </span>
                                                    <input
                                                        type="text"
                                                        value={formData.slug}
                                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                        placeholder="game-changer-retail"
                                                        className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-r-xl text-xs font-mono focus:outline-none focus:border-[#6434F5]"
                                                    />
                                                </div>
                                            </div>

                                            {/* Category */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-black">Category</label>
                                                <select
                                                    value={formData.category}
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#6434F5]"
                                                >
                                                    <option value="case-studies">Case Studies (قصص نجاح)</option>
                                                    <option value="product">Product (المنتج)</option>
                                                    <option value="guides">Guides (أدلة وإرشادات)</option>
                                                    <option value="enterprise">Enterprise AI (ذكاء المؤسسات)</option>
                                                    <option value="security">Security (الأمان والامتثال)</option>
                                                </select>
                                            </div>

                                            {/* Featured Switch */}
                                            <div className="flex flex-col justify-end">
                                                <label className="flex items-center gap-3 p-2.5 bg-purple-50/50 border border-purple-100 rounded-xl cursor-pointer hover:bg-purple-50 transition-colors">
                                                    <input
                                                        type="checkbox"
                                                        checked={formData.isFeatured}
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
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-black">🇬🇧 Read Time (English)</label>
                                                <input
                                                    type="text"
                                                    value={formData.readTimeEn}
                                                    onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                                                    placeholder="6 min read"
                                                    className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-black text-right block">🇸🇦 مدة القراءة (بالعربية)</label>
                                                <input
                                                    type="text"
                                                    dir="rtl"
                                                    value={formData.readTimeAr}
                                                    onChange={(e) => setFormData({ ...formData, readTimeAr: e.target.value })}
                                                    placeholder="قراءة 6 دقائق"
                                                    className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-black">🇬🇧 Published Date (English)</label>
                                                <input
                                                    type="text"
                                                    value={formData.dateEn}
                                                    onChange={(e) => setFormData({ ...formData, dateEn: e.target.value })}
                                                    placeholder="May 21, 2026"
                                                    className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-black text-right block">🇸🇦 تاريخ النشر (بالعربية)</label>
                                                <input
                                                    type="text"
                                                    dir="rtl"
                                                    value={formData.dateAr}
                                                    onChange={(e) => setFormData({ ...formData, dateAr: e.target.value })}
                                                    placeholder="21 مايو 2026"
                                                    className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section D: Cover Image */}
                                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                                <h4 className="text-sm font-semibold text-black">Section 4: Cover Image & Visual Assets</h4>
                                            </div>
                                            <span className="text-xs text-black/40">16:9 High-Resolution Recommended</span>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-center">
                                            <div className="lg:col-span-2 space-y-1.5">
                                                <label className="text-xs font-semibold text-black">Cover Image URL</label>
                                                <input
                                                    type="url"
                                                    value={formData.image}
                                                    onChange={(e) => setFormData({ ...formData, image: e.target.value, heroImage: e.target.value })}
                                                    placeholder="https://images.unsplash.com/photo-..."
                                                    className="w-full px-3.5 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6434F5]"
                                                />
                                                <p className="text-[11px] text-black/45">
                                                    Paste any direct image link from Unsplash, AWS S3, or your server public assets.
                                                </p>
                                            </div>

                                            {/* Live Preview Card */}
                                            <div className="w-full h-32 rounded-xl bg-gray-100 overflow-hidden border border-gray-200/80 relative flex items-center justify-center">
                                                {formData.image ? (
                                                    <img
                                                        src={formData.image}
                                                        alt="Article Cover Preview"
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                ) : (
                                                    <span className="text-xs text-black/40">Image Preview</span>
                                                )}
                                                <span className="absolute bottom-2 right-2 text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-md backdrop-blur-xs">
                                                    16:9 Preview
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Step Navigation to Tab 2 */}
                                    <div className="flex justify-end pt-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('body')}
                                            className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
                                        >
                                            <span>Next: 2. Story & Narrative</span>
                                            <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================== */}
                            {/* TAB 2: STORY & MAIN BODY                             */}
                            {/* ==================================================== */}
                            {activeTab === 'body' && (
                                <div className="space-y-6">
                                    {/* Sub-Section 1: About the Company */}
                                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#6434F5]" />
                                                <h4 className="text-sm font-semibold text-black">Section 1: About the Company (عن المؤسسة)</h4>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
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

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
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

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
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
                                                    className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tab 2 Navigation */}
                                    <div className="flex items-center justify-between pt-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('basic')}
                                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                                        >
                                            ← Back: 1. Overview
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('sidebar')}
                                            className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
                                        >
                                            <span>Next: 3. Sidebar Specs</span>
                                            <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================== */}
                            {/* TAB 3: SIDEBAR SPECS (PAIRED EN/AR DUAL INPUTS)      */}
                            {/* ==================================================== */}
                            {activeTab === 'sidebar' && (
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
                                                onClick={() => {
                                                    const en = [...(formData.sidebar?.detailsEn || []), { label: 'New Field', value: 'Value' }];
                                                    const ar = [...(formData.sidebar?.detailsAr || []), { label: 'حقل جديد', value: 'قيمة' }];
                                                    setFormData({ ...formData, sidebar: { detailsEn: en, detailsAr: ar } });
                                                }}
                                                className="px-4 py-2 bg-[#6434F5] text-white hover:bg-[#5228d9] rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
                                            >
                                                <span>+</span>
                                                <span>Add Specification Row</span>
                                            </button>
                                        </div>

                                        {/* Specification List */}
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
                                                            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                        >
                                                            ✕ Remove Row
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                        {/* English Row */}
                                                        <div className="space-y-1">
                                                            <span className="text-[11px] font-semibold text-black/60">🇬🇧 English (Label & Value)</span>
                                                            <div className="grid grid-cols-2 gap-2.5">
                                                                <input
                                                                    type="text"
                                                                    value={item.label}
                                                                    onChange={(e) => {
                                                                        const updated = [...formData.sidebar.detailsEn];
                                                                        updated[idx].label = e.target.value;
                                                                        setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsEn: updated } });
                                                                    }}
                                                                    placeholder="Label (e.g. Industry)"
                                                                    className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
                                                                />
                                                                <input
                                                                    type="text"
                                                                    value={item.value}
                                                                    onChange={(e) => {
                                                                        const updated = [...formData.sidebar.detailsEn];
                                                                        updated[idx].value = e.target.value;
                                                                        setFormData({ ...formData, sidebar: { ...formData.sidebar, detailsEn: updated } });
                                                                    }}
                                                                    placeholder="Value (e.g. Retail Commerce)"
                                                                    className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs"
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Arabic Row */}
                                                        <div className="space-y-1">
                                                            <span className="text-[11px] font-semibold text-black/60 text-right block">🇸🇦 العربية (التسمية والقيمة)</span>
                                                            <div className="grid grid-cols-2 gap-2.5">
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
                                                                    className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
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
                                                                    className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tab 3 Navigation */}
                                    <div className="flex items-center justify-between pt-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('body')}
                                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                                        >
                                            ← Back: 2. Story
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('quote')}
                                            className="px-6 py-2.5 bg-black text-white hover:bg-gray-800 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-xs transition-all"
                                        >
                                            <span>Next: 4. Quote & Metrics</span>
                                            <span>→</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================== */}
                            {/* TAB 4: QUOTE & RESULTS METRICS                        */}
                            {/* ==================================================== */}
                            {activeTab === 'quote' && (
                                <div className="space-y-6">
                                    {/* Sub-Section 1: Executive Quote */}
                                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-[#6434F5]" />
                                                <h4 className="text-sm font-semibold text-black">Section 1: Executive Testimonial Quote (شهادة القيادة)</h4>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                                                />
                                                <div className="grid grid-cols-2 gap-2.5 pt-1">
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
                                                        className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
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
                                                        className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs"
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
                                                    className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-sm"
                                                />
                                                <div className="grid grid-cols-2 gap-2.5 pt-1">
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
                                                        className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold"
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
                                                        className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-xs"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sub-Section 2: 4 Measurable Results Cards */}
                                    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-xs space-y-4">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                            <div>
                                                <h4 className="text-sm font-semibold text-black">Section 2: Four Key Metric Highlights (بطاقات النتائج الأربعة)</h4>
                                                <p className="text-xs text-black/50">Displayed in the 4-card metric grid under the article body</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {(formData.resultsEn || []).map((result, idx) => (
                                                <div key={idx} className="p-4 bg-gray-50/70 rounded-2xl border border-gray-200/80 space-y-3">
                                                    <div className="flex items-center gap-2.5">
                                                        <input
                                                            type="text"
                                                            value={result.icon}
                                                            onChange={(e) => {
                                                                const updated = [...formData.resultsEn];
                                                                updated[idx].icon = e.target.value;
                                                                setFormData({ ...formData, resultsEn: updated });
                                                            }}
                                                            placeholder="⚡"
                                                            className="w-10 text-center py-1 bg-white border border-gray-200 rounded-lg text-base"
                                                        />
                                                        <span className="text-xs font-bold text-black/70">Metric Card #{idx + 1}</span>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {/* English Metric */}
                                                        <div className="space-y-1">
                                                            <span className="text-[10px] font-semibold text-black/40">🇬🇧 English Title & Desc</span>
                                                            <input
                                                                type="text"
                                                                value={result.title}
                                                                onChange={(e) => {
                                                                    const updated = [...formData.resultsEn];
                                                                    updated[idx].title = e.target.value;
                                                                    setFormData({ ...formData, resultsEn: updated });
                                                                }}
                                                                placeholder="Title (e.g. Sub-Second Answers)"
                                                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold"
                                                            />
                                                            <input
                                                                type="text"
                                                                value={result.desc}
                                                                onChange={(e) => {
                                                                    const updated = [...formData.resultsEn];
                                                                    updated[idx].desc = e.target.value;
                                                                    setFormData({ ...formData, resultsEn: updated });
                                                                }}
                                                                placeholder="Description snippet..."
                                                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
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
                                                                    if (updated[idx]) updated[idx].title = e.target.value;
                                                                    setFormData({ ...formData, resultsAr: updated });
                                                                }}
                                                                placeholder="العنوان بالعربية (مثال: إجابات بأقل من ثانية)"
                                                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold"
                                                            />
                                                            <input
                                                                type="text"
                                                                dir="rtl"
                                                                value={formData.resultsAr?.[idx]?.desc || ''}
                                                                onChange={(e) => {
                                                                    const updated = [...(formData.resultsAr || [])];
                                                                    if (updated[idx]) updated[idx].desc = e.target.value;
                                                                    setFormData({ ...formData, resultsAr: updated });
                                                                }}
                                                                placeholder="الوصف بالعربية..."
                                                                className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tab 4 Navigation to 5. Create Article */}
                                    <div className="flex items-center justify-between pt-3">
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('sidebar')}
                                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black rounded-xl text-xs sm:text-sm font-semibold transition-colors"
                                        >
                                            ← Back: 3. Sidebar Specs
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setActiveTab('create')}
                                            className="px-7 py-2.5 bg-[#6434F5] hover:bg-[#5228d9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md transition-all"
                                        >
                                            <span>Next: 5. Create Article</span>
                                            <span>🚀</span>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* ==================================================== */}
                            {/* TAB 5: CREATE ARTICLE & FINAL REVIEW                */}
                            {/* ==================================================== */}
                            {activeTab === 'create' && (
                                <div className="space-y-6">
                                    {/* Action Card: Big Create Article Button */}
                                    <div className="bg-gradient-to-br from-purple-50 via-white to-purple-50/40 rounded-2xl p-6 sm:p-8 border-2 border-[#6434F5]/30 shadow-md space-y-5">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-3.5">
                                                <div className="w-12 h-12 rounded-2xl bg-[#6434F5] text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0">
                                                    🚀
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
                                                className="px-8 py-3.5 bg-[#6434F5] hover:bg-[#5228d9] text-white rounded-xl text-sm font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2.5 shrink-0"
                                            >
                                                <span>💾</span>
                                                <span>{editingPost ? 'Save Changes Now' : 'Create Article Now'}</span>
                                            </button>
                                        </div>

                                        {/* Quick Summary Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4 border-t border-purple-100/80 text-xs">
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
                                                className="px-4 py-2 bg-purple-50 text-[#6434F5] hover:bg-purple-100 border border-purple-200 rounded-xl text-xs font-semibold shadow-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                                            >
                                                <span>+</span>
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
                                                            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded-md hover:bg-red-50 transition-colors"
                                                        >
                                                            ✕ Remove FAQ
                                                        </button>
                                                    </div>

                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                                                                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-medium"
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
                                                                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
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
                                                                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs font-medium"
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
                                                                className="w-full px-3 py-2 bg-gray-50/50 border border-gray-200 rounded-xl text-xs"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 4. Sticky Modal Actions Footer */}
                            <div className="sticky bottom-0 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 px-6 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
                                <div className="text-xs text-black/50 flex items-center gap-1.5 self-start sm:self-auto">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>Changes are saved immediately to the MySQL database.</span>
                                </div>
                                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-2.5 text-xs sm:text-sm text-black/70 hover:text-black border border-gray-200 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-2.5 text-xs sm:text-sm text-white bg-[#6434F5] hover:bg-[#5228d9] rounded-xl font-medium shadow-md transition-all flex items-center gap-2"
                                    >
                                        <span>💾</span>
                                        <span>{editingPost ? 'Save Changes' : 'Create Article'}</span>
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
