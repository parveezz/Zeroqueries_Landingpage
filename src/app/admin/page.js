"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    AdminAuthGate,
    AdminHeader,
    AdminNavTabs,
    BlogsSection,
    ContactsSection,
    DemosSection,
    NewslettersSection,
    MessagePreviewModal,
    BlogEditorModal
} from '@/components/admin';
import { createDefaultFormData } from '@/components/admin/blogeditor/defaultFormData';

const ADMIN_PASSWORD = 'Umar@2026';
const defaultFormData = createDefaultFormData();

export default function BlogAdminPage() {
    const router = useRouter();
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

    // Navigate to dedicated Edit Page
    const handleOpenEdit = (post) => {
        if (post?.slug) {
            router.push(`/admin/editblog/${post.slug}`);
        }
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

    // Password Gate
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
        <div className="min-h-screen bg-gray-50/50 font-sans text-black py-10">
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
                        >
                            ✕
                        </button>
                    </div>
                )}

                {/* Dashboard Header */}
                <AdminHeader
                    adminSection={adminSection}
                    handleLock={handleLock}
                    fetchBlogs={fetchBlogs}
                    fetchAllLeads={fetchAllLeads}
                    showNotification={showNotification}
                    handleOpenCreate={handleOpenCreate}
                    exportToCsv={exportToCsv}
                    contactInquiries={contactInquiries}
                    demoRequests={demoRequests}
                    newsletterSubscribers={newsletterSubscribers}
                />

                {/* Main Navigation Tabs */}
                <AdminNavTabs
                    adminSection={adminSection}
                    setAdminSection={setAdminSection}
                    blogsCount={blogs.length}
                    contactsCount={contactInquiries.length}
                    demosCount={demoRequests.length}
                    newslettersCount={newsletterSubscribers.length}
                />

                {/* 1. BLOGS SECTION */}
                {adminSection === 'blogs' && (
                    <BlogsSection
                        blogs={blogs}
                        loading={loading}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        handleOpenEdit={handleOpenEdit}
                        handleDeletePost={handleDeletePost}
                    />
                )}

                {/* 2. CONTACT INQUIRIES SECTION */}
                {adminSection === 'contacts' && (
                    <ContactsSection
                        contactInquiries={contactInquiries}
                        leadsLoading={leadsLoading}
                        leadSearchTerm={leadSearchTerm}
                        setLeadSearchTerm={setLeadSearchTerm}
                        setViewingMessage={setViewingMessage}
                        handleDeleteLead={handleDeleteLead}
                    />
                )}

                {/* 3. DEMO BOOKINGS SECTION */}
                {adminSection === 'demos' && (
                    <DemosSection
                        demoRequests={demoRequests}
                        leadsLoading={leadsLoading}
                        leadSearchTerm={leadSearchTerm}
                        setLeadSearchTerm={setLeadSearchTerm}
                        handleDeleteLead={handleDeleteLead}
                    />
                )}

                {/* 4. NEWSLETTER SUBSCRIBERS SECTION */}
                {adminSection === 'newsletters' && (
                    <NewslettersSection
                        newsletterSubscribers={newsletterSubscribers}
                        leadsLoading={leadsLoading}
                        leadSearchTerm={leadSearchTerm}
                        setLeadSearchTerm={setLeadSearchTerm}
                        handleDeleteLead={handleDeleteLead}
                    />
                )}
            </div>

            {/* MESSAGE PREVIEW MODAL */}
            <MessagePreviewModal
                viewingMessage={viewingMessage}
                onClose={() => setViewingMessage(null)}
            />

            {/* MODAL: ULTRA-SPACIOUS, CLEARLY SECTIONED BILINGUAL STUDIO */}
            <BlogEditorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                editingPost={editingPost}
                formData={formData}
                setFormData={setFormData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleSavePost={handleSavePost}
            />
        </div>
    );
}
