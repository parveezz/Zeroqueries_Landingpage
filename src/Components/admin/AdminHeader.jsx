"use client";

import React from 'react';
import Link from 'next/link';
import {
    FiLock,
    FiRefreshCw,
    FiPlus,
    FiDownload,
} from 'react-icons/fi';

export default function AdminHeader({
    adminSection,
    handleLock,
    fetchBlogs,
    fetchAllLeads,
    showNotification,
    handleOpenCreate,
    exportToCsv,
    contactInquiries,
    demoRequests,
    newsletterSubscribers
}) {
    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
            {/* LEFT: Breadcrumb + Title */}
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
                    Admin Center
                </h1>
            </div>

            {/* RIGHT: Actions */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto">
                {/* Lock */}
                <button
                    onClick={handleLock}
                    title="Lock Admin Panel"
                    className="px-3 py-2 bg-white hover:bg-gray-50 text-black border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                >
                    <FiLock className="w-4 h-4 text-black" />
                    <span>Lock</span>
                </button>

                {/* Refresh */}
                <button
                    onClick={() => {
                        fetchBlogs();
                        fetchAllLeads();
                        showNotification('Data refreshed from server');
                    }}
                    className="px-3.5 py-2 bg-white hover:bg-gray-50 text-black border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                >
                    <FiRefreshCw className="w-4 h-4 text-black" />
                    <span>Refresh</span>
                </button>

                {/* Create New Post (blogs only) */}
                {adminSection === 'blogs' && (
                    <Link
                        href="/admin/createblog"
                        className="px-4 py-2 bg-[#6434F5] hover:bg-[#5228d9] text-white text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                        <FiPlus className="w-4 h-4 text-white" />
                        <span>Create New Blog</span>
                    </Link>
                )}

                {/* Export CSV — Contacts */}
                {adminSection === 'contacts' && (
                    <button
                        onClick={() => exportToCsv(contactInquiries, 'zeroqueries_contact_inquiries')}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-black border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                        <FiDownload className="w-4 h-4 text-black" />
                        <span>Export CSV</span>
                    </button>
                )}

                {/* Export CSV — Demos */}
                {adminSection === 'demos' && (
                    <button
                        onClick={() => exportToCsv(demoRequests, 'zeroqueries_demo_requests')}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-black border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                        <FiDownload className="w-4 h-4 text-black" />
                        <span>Export CSV</span>
                    </button>
                )}

                {/* Export CSV — Newsletters */}
                {adminSection === 'newsletters' && (
                    <button
                        onClick={() => exportToCsv(newsletterSubscribers, 'zeroqueries_newsletter_subscribers')}
                        className="px-4 py-2 bg-white hover:bg-gray-50 text-black border border-gray-200 text-xs sm:text-sm rounded-lg transition-colors font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                        <FiDownload className="w-4 h-4 text-black" />
                        <span>Export CSV</span>
                    </button>
                )}
            </div>
        </div>
    );
}