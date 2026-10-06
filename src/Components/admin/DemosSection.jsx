"use client";

import React, { useState, useEffect, useMemo } from 'react';
import {
    FiSearch,
    FiChevronLeft,
    FiChevronRight,
    FiMail,
    FiTrash2,
} from 'react-icons/fi';

const PAGE_SIZE = 10;

export default function DemosSection({
    demoRequests = [],
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
    const filteredRequests = useMemo(() => {
        const q = leadSearchTerm.toLowerCase();
        return demoRequests.filter((d) => {
            const name = (d.fullName || d.full_name || '').toLowerCase();
            const email = (d.workEmail || d.work_email || '').toLowerCase();
            const org = (d.organization || '').toLowerCase();
            const role = (d.role || '').toLowerCase();
            const env = (d.dataEnvironment || d.data_environment || '').toLowerCase();
            return name.includes(q) || email.includes(q) || org.includes(q) || role.includes(q) || env.includes(q);
        });
    }, [demoRequests, leadSearchTerm]);

    // Pagination math
    const totalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedRequests = filteredRequests.slice(startIndex, endIndex);

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
                        placeholder="Filter by name, work email, organization..."
                        value={leadSearchTerm}
                        onChange={(e) => setLeadSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#6434F5] text-black"
                    />
                    <FiSearch className="w-4 h-4 text-black absolute left-3 top-2.5" />
                </div>
                <span className="text-xs text-black/50 font-light">
                    Showing {filteredRequests.length} booking(s)
                </span>
            </div>

            {/* Table card */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {leadsLoading ? (
                    <div className="py-20 text-center text-black/50 text-sm">Loading demo requests...</div>
                ) : filteredRequests.length === 0 ? (
                    <div className="py-20 text-center text-black/50 text-sm">
                        {leadSearchTerm ? 'No results match your search.' : 'No demo requests received yet.'}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs sm:text-sm">
                            <thead className="bg-gray-50 text-black/60 uppercase text-[11px] font-semibold tracking-wider border-b border-gray-200">
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
                                {paginatedRequests.map((item, idx) => {
                                    const globalIndex = startIndex + idx + 1;
                                    const fullName = item.fullName || item.full_name || 'Anonymous';
                                    const email = item.workEmail || item.work_email || '';
                                    const org = item.organization || 'Not specified';
                                    const role = item.role || '—';
                                    const env = item.dataEnvironment || item.data_environment || '—';
                                    const date = item.createdAt || item.created_at || 'Just now';
                                    return (
                                        <tr key={item.id || globalIndex} className="hover:bg-gray-50/50 transition-colors">
                                            <td className="py-3 px-4 text-black/40 font-mono text-xs">{globalIndex}</td>
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
                                                    <a
                                                        href={`mailto:${email}?subject=ZeroQueries%20Demo%20Session&body=Hi%20${encodeURIComponent(fullName)},%0D%0A%0D%0AThank%20you%20for%20requesting%20a%20ZeroQueries%20enterprise%20demo...`}
                                                        className="px-2.5 py-1 text-xs text-black bg-white hover:bg-gray-50 border border-gray-200 rounded-md font-medium cursor-pointer flex items-center gap-1.5"
                                                    >
                                                        <FiMail className="w-3.5 h-3.5 text-black" />
                                                        <span>Reply</span>
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeleteLead('demo', item.id)}
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
                {!leadsLoading && filteredRequests.length > 0 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-gray-200 bg-white">
                        <span className="text-xs text-black/50">
                            Page {currentPage} of {totalPages} &middot; {filteredRequests.length} total
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