"use client";

import React from 'react';
import {
    FiFileText,
    FiMessageSquare,
    FiSend,
    FiMail,
} from 'react-icons/fi';

export default function AdminNavTabs({
    adminSection,
    setAdminSection,
    blogsCount = 0,
    contactsCount = 0,
    demosCount = 0,
    newslettersCount = 0
}) {
    const tabs = [
        { key: 'blogs', label: 'Blog Articles', Icon: FiFileText, count: blogsCount },
        { key: 'contacts', label: 'Contact Inquiries', Icon: FiMessageSquare, count: contactsCount },
        { key: 'demos', label: 'Demo Bookings', Icon: FiSend, count: demosCount },
        { key: 'newsletters', label: 'Newsletter Subscribers', Icon: FiMail, count: newslettersCount },
    ];

    return (
        <div className="flex border-b border-gray-200 mb-6 gap-2 sm:gap-4 overflow-x-auto pb-1 scrollbar-none">
            {tabs.map(({ key, label, Icon, count }) => {
                const isActive = adminSection === key;
                return (
                    <button
                        key={key}
                        onClick={() => setAdminSection(key)}
                        className={`pb-3 px-3 text-xs sm:text-sm font-medium flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${isActive
                                ? 'border-[#6434F5] text-[#6434F5] font-semibold'
                                : 'border-transparent text-black/60 hover:text-black'
                            }`}
                    >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#6434F5]' : 'text-black'}`} />
                        <span>{label}</span>
                        <span
                            className={`px-2 py-0.5 text-xs rounded-full font-bold ${isActive
                                    ? 'bg-[#6434F5]/10 text-[#6434F5]'
                                    : 'bg-gray-100 text-black/60'
                                }`}
                        >
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}