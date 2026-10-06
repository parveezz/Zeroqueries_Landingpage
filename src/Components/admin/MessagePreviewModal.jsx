"use client";

import React from 'react';

export default function MessagePreviewModal({ viewingMessage, onClose }) {
    if (!viewingMessage) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                    <div>
                        <h3 className="text-base font-semibold text-black">{viewingMessage.title}</h3>
                        <p className="text-xs text-black/50 mt-0.5">
                            {viewingMessage.email} {viewingMessage.phone && `• ${viewingMessage.phone}`}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-black/60 flex items-center justify-center font-bold text-xs cursor-pointer"
                    >
                        ✕
                    </button>
                </div>
                <div className="mb-4">
                    <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block mb-1">
                        Topic
                    </span>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-[#6434F5] border border-purple-100">
                        {viewingMessage.topic || 'General Inquiry'}
                    </span>
                </div>
                <div className="mb-6">
                    <span className="text-[11px] font-semibold text-black/40 uppercase tracking-wider block mb-1">
                        Message
                    </span>
                    <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs sm:text-sm text-black/80 font-light whitespace-pre-wrap leading-relaxed">
                        {viewingMessage.message || 'No message provided.'}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-2.5">
                    <button
                        onClick={onClose}
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
    );
}
