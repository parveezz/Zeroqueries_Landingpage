"use client";

import React from 'react';
import {
    FiX,
    FiEdit3,
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
} from './blogeditor';

export default function BlogEditorModal({
    isOpen,
    onClose,
    editingPost,
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    handleSavePost,
}) {
    if (!isOpen) return null;

    const tabs = [
        { id: 'basic', label: '1. Overview & Titles', Icon: FiTag },
        { id: 'body', label: '2. Story & Narrative', Icon: FiBookOpen },
        { id: 'sidebar', label: '3. Sidebar Specs', Icon: FiList },
        { id: 'quote', label: '4. Quote & Metrics', Icon: FiMessageSquare },
        { id: 'create', label: '5. Create Article', Icon: FiSend },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
            <div className="bg-white rounded-2xl sm:rounded-3xl max-w-6xl w-full max-h-[94vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100">
                {/* 1. Modal Sticky Header */}
                <div className="px-6 sm:px-8 py-5 border-b border-gray-200/80 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#6434F5]/10 text-[#6434F5] flex items-center justify-center text-lg shrink-0">
                            <FiEdit3 className="w-5 h-5 text-[#6434F5]" />
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
                                {editingPost
                                    ? `Editing slug: /resources/${editingPost.slug}`
                                    : 'Organized in clear sections with paired English (LTR) and Arabic (RTL) inputs'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 text-black/70 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
                        title="Close modal"
                    >
                        <FiX className="w-5 h-5 text-black" />
                    </button>
                </div>

                {/* 2. Spacious Section Navigation Bar */}
                <div className="flex border-b border-gray-200/80 bg-gray-50/70 px-4 sm:px-8 overflow-x-auto gap-2 py-2.5 shrink-0 scrollbar-none">
                    {tabs.map(({ id, label, Icon }) => {
                        const isActive = activeTab === id;
                        return (
                            <button
                                key={id}
                                type="button"
                                onClick={() => setActiveTab(id)}
                                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                                    isActive
                                        ? 'bg-white text-[#6434F5] shadow-xs border border-gray-200 font-semibold'
                                        : 'text-black/60 hover:text-black hover:bg-white/60'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-[#6434F5]' : 'text-black/60'}`} />
                                <span>{label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 3. Modal Form Scrollable Body */}
                <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 bg-gray-50/30">
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
                            editingPost={editingPost}
                            setActiveTab={setActiveTab}
                        />
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
                                onClick={onClose}
                                className="px-5 py-2.5 text-xs sm:text-sm text-black/70 hover:text-black border border-gray-200 hover:bg-gray-100 rounded-xl font-medium transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2.5 text-xs sm:text-sm text-white bg-[#6434F5] hover:bg-[#5228d9] rounded-xl font-medium shadow-md transition-all flex items-center gap-2 cursor-pointer"
                            >
                                <FiSave className="w-4 h-4 text-white" />
                                <span>{editingPost ? 'Save Changes' : 'Create Article'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
