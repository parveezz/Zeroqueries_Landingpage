"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiClock, FiCalendar, FiUser } from "react-icons/fi";
import ResourcesHero from "./ResourcesHero";

const ALL_CATEGORIES = [
    "All",
    "Product",
    "Engineering",
    "Security",
    "Data Infrastructure",
    "Leadership",
    "Insights",
];

export default function ResourcesGrid({ posts = [] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesCategory =
                selectedCategory === "All" ||
                post.category?.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch =
                !searchTerm.trim() ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.category?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [posts, searchTerm, selectedCategory]);

    const featuredPost =
        selectedCategory === "All" && !searchTerm.trim() && filteredPosts.length > 0
            ? filteredPosts[0]
            : null;

    const gridPosts = featuredPost
        ? filteredPosts.slice(1)
        : filteredPosts;

    return (
        <div className="w-full bg-white font-sans text-black">
            <ResourcesHero
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                categories={ALL_CATEGORIES}
            />

            <section className="relative w-full py-16 sm:py-20 px-6 sm:px-10 lg:px-14">
                <div className="mx-auto max-w-7xl">
                    {/* Featured Post */}
                    {featuredPost && (
                        <div className="mb-14">
                            <Link
                                href={`/resources/${featuredPost.slug}`}
                                className="group block relative rounded-3xl border border-gray-200 bg-gray-50/60 p-8 sm:p-12 hover:border-gray-400 transition-all duration-300"
                            >
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                    <div className="max-w-3xl space-y-4">
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase bg-black text-white">
                                                Featured • {featuredPost.category}
                                            </span>
                                            <span className="text-xs text-black/50 flex items-center gap-1.5">
                                                <FiClock className="w-3.5 h-3.5" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>

                                        <h2 className="text-2xl sm:text-4xl font-light tracking-tight text-black group-hover:text-black/80 transition-colors">
                                            {featuredPost.title}
                                        </h2>

                                        <p className="text-base text-black/60 font-light leading-relaxed">
                                            {featuredPost.excerpt}
                                        </p>

                                        <div className="flex items-center gap-3 pt-2 text-xs text-black/60 font-light">
                                            <span className="font-medium text-black">
                                                {featuredPost.author}
                                            </span>
                                            <span>•</span>
                                            <span>{featuredPost.authorRole}</span>
                                            <span>•</span>
                                            <span>{featuredPost.date}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 self-start lg:self-center">
                                        <span className="text-sm font-medium text-black group-hover:underline underline-offset-4">
                                            Read article
                                        </span>
                                        <span className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 bg-white group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                                            <FiArrowUpRight className="w-4 h-4" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    )}

                    {/* Empty State */}
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-20 border border-dashed border-gray-200 rounded-3xl">
                            <h3 className="text-lg font-medium text-black">
                                No resources found
                            </h3>
                            <p className="mt-2 text-sm text-black/60 font-light">
                                Try changing your search query or choosing another category filter.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                                className="mt-6 px-5 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        /* Standard Grid */
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {gridPosts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/resources/${post.slug}`}
                                    className="group relative flex flex-col justify-between rounded-3xl border border-gray-200 bg-white p-7 sm:p-8 hover:-translate-y-1 hover:border-gray-400 hover:shadow-sm transition-all duration-300"
                                >
                                    <div>
                                        <div className="flex items-center justify-between gap-2 mb-5">
                                            <span className="px-3 py-1 rounded-full text-[11px] font-medium tracking-[0.1em] uppercase bg-gray-100 text-black/80">
                                                {post.category}
                                            </span>
                                            <span className="text-xs text-black/40 flex items-center gap-1">
                                                <FiClock className="w-3 h-3" />
                                                {post.readTime}
                                            </span>
                                        </div>

                                        <h3 className="text-lg sm:text-xl font-medium text-black tracking-tight leading-snug group-hover:text-black/80 transition-colors">
                                            {post.title}
                                        </h3>

                                        <p className="mt-3 text-sm text-black/60 font-light leading-relaxed line-clamp-3">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-medium text-black">
                                                {post.author}
                                            </p>
                                            <p className="text-[11px] text-black/40 font-light">
                                                {post.date}
                                            </p>
                                        </div>

                                        <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-black/50 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all">
                                            <FiArrowUpRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
