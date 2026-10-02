"use client";

import Link from "next/link";
import { FiArrowLeft, FiClock, FiCalendar, FiShare2, FiArrowUpRight } from "react-icons/fi";

export default function ResourcePost({ post, relatedPosts = [] }) {
    if (!post) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center py-20 px-6 font-sans">
                <h1 className="text-2xl font-light text-black">Article not found</h1>
                <p className="mt-2 text-sm text-black/60">
                    The requested resource could not be found or has moved.
                </p>
                <Link
                    href="/resources"
                    className="mt-6 px-6 py-2.5 rounded-full bg-black text-white text-xs font-normal hover:bg-gray-800 transition-colors"
                >
                    Back to Resources
                </Link>
            </div>
        );
    }

    const paragraphs = Array.isArray(post.content) ? post.content : [post.content || post.excerpt];

    return (
        <article className="w-full bg-white font-sans text-black py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-14">
            <div className="mx-auto max-w-4xl">
                {/* Back button */}
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 text-xs font-medium text-black/60 hover:text-black transition-colors mb-10"
                >
                    <FiArrowLeft className="w-3.5 h-3.5" />
                    Back to all resources
                </Link>

                {/* Article Header */}
                <div className="space-y-5 pb-10 border-b border-gray-100">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="px-3.5 py-1 rounded-full text-[11px] font-medium tracking-[0.15em] uppercase bg-black text-white">
                            {post.category}
                        </span>
                        <span className="text-xs text-black/50 flex items-center gap-1.5">
                            <FiClock className="w-3.5 h-3.5" />
                            {post.readTime}
                        </span>
                        <span className="text-xs text-black/30">•</span>
                        <span className="text-xs text-black/50 flex items-center gap-1.5">
                            <FiCalendar className="w-3.5 h-3.5" />
                            {post.date}
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.1]">
                        {post.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-black/60 font-light leading-relaxed">
                        {post.excerpt}
                    </p>

                    {/* Author block */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-black">
                                {post.author.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-black">{post.author}</p>
                                <p className="text-xs text-black/50 font-light">{post.authorRole}</p>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => {
                                if (navigator.clipboard) {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert("Link copied to clipboard!");
                                }
                            }}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-200 text-xs text-black/70 hover:border-black transition-colors"
                        >
                            <FiShare2 className="w-3.5 h-3.5" />
                            Share
                        </button>
                    </div>
                </div>

                {/* Article Body */}
                <div className="py-12 space-y-6 text-base sm:text-lg text-black/80 font-light leading-relaxed">
                    {paragraphs.map((p, idx) => (
                        <p key={idx} className="leading-relaxed">
                            {p}
                        </p>
                    ))}
                </div>

                {/* In-article Callout */}
                <div className="my-10 p-8 rounded-3xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <h4 className="text-base font-medium text-black">
                            Ready to try conversational queries on your data?
                        </h4>
                        <p className="text-xs text-black/60 font-light">
                            Connect your warehouse in minutes with zero retention and SOC 2 security.
                        </p>
                    </div>
                    <Link
                        href="/demo"
                        className="px-5 py-2.5 rounded-full bg-black text-white text-xs font-normal hover:bg-gray-800 transition-colors whitespace-nowrap"
                    >
                        Book a Demo
                    </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <h3 className="text-xl font-light text-black mb-8">Related Resources</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {relatedPosts.map((rel) => (
                                <Link
                                    key={rel.slug}
                                    href={`/resources/${rel.slug}`}
                                    className="group p-6 rounded-2xl border border-gray-200 hover:border-gray-400 transition-all flex flex-col justify-between"
                                >
                                    <div>
                                        <span className="text-[11px] font-medium tracking-wide uppercase text-black/50">
                                            {rel.category}
                                        </span>
                                        <h4 className="mt-2 text-base font-medium text-black group-hover:text-black/80">
                                            {rel.title}
                                        </h4>
                                        <p className="mt-2 text-xs text-black/60 font-light line-clamp-2">
                                            {rel.excerpt}
                                        </p>
                                    </div>
                                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-gray-100 text-xs text-black/50">
                                        <span>{rel.readTime}</span>
                                        <FiArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </article>
    );
}
