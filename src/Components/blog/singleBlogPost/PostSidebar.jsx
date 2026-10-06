"use client";

import React from 'react';

export default function PostSidebar({ sidebarDetails, isAr }) {
    if (!sidebarDetails || sidebarDetails.length === 0) return null;

    return (
        <aside className="lg:col-span-4 lg:pl-4">
            <div className="rounded-xl p-5 bg-gray-50/80">
                <h3 className="text-xs font-normal text-black uppercase tracking-[0.15em] mb-4">
                    {isAr ? "معلومات الحالة" : "Case Overview"}
                </h3>

                <div className="space-y-3">
                    {sidebarDetails.map((item, idx) => (
                        <div key={idx}>
                            <h4 className="text-[11px] font-normal text-black/50 uppercase tracking-wider mb-0.5">
                                {item.label}
                            </h4>
                            <p className="text-sm font-light text-black">{item.value}</p>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}