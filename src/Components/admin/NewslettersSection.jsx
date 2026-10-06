"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiTrash2,
} from 'react-icons/fi';

const PAGE_SIZE = 10;

export default function NewslettersSection({
    newsletterSubscribers = [],
    leadsLoading = false,
    leadSearchTerm = '',
    setLeadSearchTerm,
    handleDeleteLead
}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 whenever the search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [leadSearchTerm]);

    // Filter first (search works on full dataset)
    const filteredSubscribers = useMemo(() => {
        const q = leadSearchTerm.toLowerCase();
        return newsletterSubscribers.filter((n) =>
            (n.email || '').toLowerCase().includes(q)
        );
    }, [newsletterSubscribers, leadSearchTerm]);

    // Pagination math
    const totalPages = Math.max(1, Math.ceil(filteredSubscribers.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedSubscribers = filteredSubscribers.slice(startIndex, endIndex);

    // Keep currentPage within bounds if data shrinks
    useEffect(() => {
        if (currentPage > totalPages) setCurrentPage(totalPages);
    }, [currentPage, totalPages]);

    const goToPage = (page) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    return (
        <>
            {/* Search + Summary bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        placeholder="Filter by subscriber email..."
                        value={leadSearchTerm}
                        onChange={(e) => setLeadSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5] text-black"
                    />
                    <FiSearch className="w-4 h-4 text-black absolute left-3 top-2.5" />
                </div>
                <span className="text-xs text-black/50 font-light">
                    Total Active Subscribers: {newsletterSubscribers.length}
                </span>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {leadsLoading ? (
                    <div className="py-20 text-center text-black/50 text-sm">Loading subscribers...</div>
                ) : filteredSubscribers.length === 0 ? (
                    <div className="py-20 text-center text-black/50 text-sm">
                        {leadSearchTerm ? 'No results match your search.' : 'No newsletter subscribers yet.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-gray-50 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
                                <tr>
                                    <th className="py-3 px-4">#</th>
                                    <th className="py-3 px-4">Subscriber Email</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Subscribed Date</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 font-light">
                                {paginatedSubscribers.map((item, idx) => {
                                    const globalIndex = startIndex + idx + 1;
                                    const email = item.email || '';
                                    const date = item.subscribedAt || item.subscribed_at || item.createdAt || item.created_at || 'Recently';
                                    return (
                                        <tr key={item.id || globalIndex} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4 text-black/40 font-mono text-xs">{globalIndex}</td>
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
                                                {new Date(date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="py-3 px-4 text-right whitespace-nowrap">
                                                <button
                                                    onClick={() => handleDeleteLead('newsletter', item.id, email)}
                                                    className="px-2.5 py-1 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer flex items-center gap-1.5 ml-auto"
                                                >
                                                    <FiTrash2 className="w-3.5 h-3.5 text-black" />
                                                    <span>Remove</span>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination footer */}
                {!leadsLoading && filteredSubscribers.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-white">
                        <span className="text-xs text-black/50">
                            Page {currentPage} of {totalPages} &middot; {filteredSubscribers.length} total
                        </span>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-2.5 py-1.5 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <FiChevronLeft className="w-3.5 h-3.5 text-black" />
                                <span>Prev</span>
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1)
                                .filter((p) => {
                                    return (
                                        p === 1 ||
                                        p === totalPages ||
                                        Math.abs(p - currentPage) <= 1
                                    );
                                })
                                .map((p, i, arr) => {
                                    const prev = arr[i - 1];
                                    const showEllipsis = prev && p - prev > 1;
                                    return (
                                        <React.Fragment key={p}>
                                            {showEllipsis && (
                                                <span className="px-1.5 text-xs text-black/40">…</span>
                                            )}
                                            <button
                                                onClick={() => goToPage(p)}
                                                className={`min-w-[28px] px-2 py-1.5 text-xs rounded-md font-medium cursor-pointer border ${p === currentPage
                                                        ? 'bg-[#6434F5] text-white border-[#6434F5]'
                                                        : 'bg-white text-black hover:bg-gray-50 border-gray-200'
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        </React.Fragment>
                                    );
                                })}

                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-2.5 py-1.5 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <span>Next</span>
                                <FiChevronRight className="w-3.5 h-3.5 text-black" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}