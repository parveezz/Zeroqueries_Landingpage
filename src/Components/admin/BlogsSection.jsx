"use client";

import React from 'react';
import Link from 'next/link';

export default function BlogsSection({
    blogs = [],
    loading = false,
    searchTerm = '',
    setSearchTerm,
    selectedCategory = 'all',
    setSelectedCategory,
    handleOpenEdit,
    handleDeletePost
}) {
    // Filtered blogs
    const filteredBlogs = blogs.filter((b) => {
        const matchesCategory = selectedCategory === 'all' || b.category === selectedCategory;
        const matchesSearch =
            (b.titleEn || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (b.titleAr || '').includes(searchTerm) ||
            (b.slug || '').toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const categories = ['all', 'product', 'guides', 'enterprise', 'case-studies', 'security'];

    return (
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
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-colors cursor-pointer ${
                                selectedCategory === cat
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
                                                    className="px-2.5 py-1 text-xs text-black/70 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-md transition-colors font-medium inline-block"
                                                >
                                                    View ↗
                                                </Link>
                                                <Link
                                                    href={`/admin/editblog/${post.slug}`}
                                                    className="px-2.5 py-1 text-xs text-white bg-black hover:bg-gray-800 rounded-md transition-colors font-medium inline-block text-center"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeletePost(post.slug, post.titleEn)}
                                                    className="px-2.5 py-1 text-xs text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors font-medium cursor-pointer"
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
    );
}
