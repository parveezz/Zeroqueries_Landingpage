"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiEye,
    FiTrash2,
} from 'react-icons/fi';

const PAGE_SIZE = 10;

export default function ContactsSection({
    contactInquiries = [],
    leadsLoading = false,
    leadSearchTerm = '',
    setLeadSearchTerm,
    setViewingMessage,
    handleDeleteLead
}) {
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 whenever the search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [leadSearchTerm]);

    // Filter first (search works on full dataset)
    const filteredInquiries = useMemo(() => {
        const q = leadSearchTerm.toLowerCase();
        return contactInquiries.filter((c) => {
            const name = `${c.firstName || c.first_name || ''} ${c.lastName || c.last_name || ''}`.toLowerCase();
            const email = (c.email || '').toLowerCase();
            const topic = (c.topic || '').toLowerCase();
            const msg = (c.message || '').toLowerCase();
            return name.includes(q) || email.includes(q) || topic.includes(q) || msg.includes(q);
        });
    }, [contactInquiries, leadSearchTerm]);

    // Pagination math
    const totalPages = Math.max(1, Math.ceil(filteredInquiries.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedInquiries = filteredInquiries.slice(startIndex, endIndex);

    // Keep currentPage within bounds if data shrinks (e.g. after delete)
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
                        placeholder="Filter by name, email, topic, or message..."
                        value={leadSearchTerm}
                        onChange={(e) => setLeadSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5] text-black"
                    />
                    <FiSearch className="w-4 h-4 text-black absolute left-3 top-2.5" />
                </div>
                <span className="text-xs text-black/50 font-light">
                    Showing {filteredInquiries.length} message(s)
                </span>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {leadsLoading ? (
                    <div className="py-20 text-center text-black/50 text-sm">Loading contact inquiries...</div>
                ) : filteredInquiries.length === 0 ? (
                    <div className="py-20 text-center text-black/50 text-sm">
                        {leadSearchTerm ? 'No results match your search.' : 'No contact inquiries submitted yet.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-gray-50 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
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
                                {paginatedInquiries.map((item, idx) => {
                                    const globalIndex = startIndex + idx + 1;
                                    const fullName = `${item.firstName || item.first_name || ''} ${item.lastName || item.last_name || ''}`.trim() || 'Anonymous';
                                    const email = item.email || '';
                                    const phone = item.phone || '';
                                    const date = item.createdAt || item.created_at || 'Just now';
                                    return (
                                        <tr key={item.id || globalIndex} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4 text-black/40 font-mono text-xs">{globalIndex}</td>
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
                                                {new Date(date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
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
                                                        className="px-2.5 py-1 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer flex items-center gap-1.5"
                                                    >
                                                        <FiEye className="w-3.5 h-3.5 text-black" />
                                                        <span>Read Full</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteLead('contact', item.id)}
                                                        className="px-2.5 py-1 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer flex items-center gap-1.5"
                                                    >
                                                        <FiTrash2 className="w-3.5 h-3.5 text-black" />
                                                        <span>Delete</span>
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

                {/* Pagination footer */}
                {!leadsLoading && filteredInquiries.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-white">
                        <span className="text-xs text-black/50">
                            Page {currentPage} of {totalPages} &middot; {filteredInquiries.length} total
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

                            {/* Page number buttons (windowed) */}
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