"use client";

import React from 'react';
import BlogCard from './BlogCard';

export default function BlogGrid({ posts = [] }) {
    return (
        <section aria-label="Articles Feed" className="w-full py-6 sm:py-10 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {posts.map((post) => (
                        <BlogCard key={post.slug || post.id} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
