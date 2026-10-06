"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import PostHeader from './PostHeader';
import PostHeroImage from './PostHeroImage';
import PostBody from './PostBody';
import PostSidebar from './PostSidebar';
import PostQuote from './PostQuote';
import PostResults from './PostResults';
import PostFAQ from './PostFAQ';
import RelatedPosts from './RelatedPosts';
import PostCTA from './PostCTA';

export default function SingleBlogPost({ post, slug }) {
    const { lang } = useLanguage();
    const isAr = lang === 'ar';

    const [currentPost, setCurrentPost] = useState(post || null);
    const [relatedPosts, setRelatedPosts] = useState(post?.relatedPosts || []);
    const [loading, setLoading] = useState(!post);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const targetSlug = slug || post?.slug;
        if (!currentPost && targetSlug) {
            setLoading(true);
            fetch(`/api/blogs/${targetSlug}`)
                .then((r) => r.json())
                .then((json) => {
                    if (json.success && json.data) {
                        setCurrentPost(json.data);
                        setNotFound(false);
                    } else {
                        setNotFound(true);
                    }
                })
                .catch(() => setNotFound(true))
                .finally(() => setLoading(false));
        }

        // Dynamically fetch other related articles from /api/blogs
        fetch('/api/blogs')
            .then((r) => r.json())
            .then((json) => {
                if (json.success && Array.isArray(json.data)) {
                    const others = json.data
                        .filter((b) => b.slug !== (targetSlug || currentPost?.slug))
                        .slice(0, 3);
                    setRelatedPosts(others);
                }
            })
            .catch(() => {});
    }, [slug, post]);

    if (loading && !currentPost) {
        return (
            <div className="w-full min-h-[60vh] flex items-center justify-center bg-white font-sans text-black">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[#6434F5] border-t-transparent animate-spin" />
                    <p className="text-xs text-black/50 font-light">Loading article...</p>
                </div>
            </div>
        );
    }

    if (notFound || !currentPost) {
        return (
            <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-white font-sans text-black px-4 text-center">
                <h1 className="text-2xl sm:text-3xl font-light text-black mb-3">
                    {isAr ? "المقال غير موجود" : "Article Not Found"}
                </h1>
                <p className="text-sm text-black/60 font-light mb-6 max-w-md">
                    {isAr
                        ? "عذراً، لم نتمكن من العثور على المقال المطلوب. ربما تم نقله أو حذفه."
                        : "Sorry, we could not find the article you are looking for. It may have been moved or unpublished."}
                </p>
                <Link
                    href="/resources"
                    className="px-5 py-2.5 bg-black hover:bg-[#6434F5] text-white text-xs sm:text-sm rounded-xl transition-colors font-medium"
                >
                    {isAr ? "العودة إلى الموارد" : "Back to Resources"}
                </Link>
            </div>
        );
    }

    const activePost = currentPost;
    const content = isAr ? activePost.contentAr : activePost.contentEn;
    const sidebarDetails = isAr ? activePost.sidebar?.detailsAr : activePost.sidebar?.detailsEn;
    const quote = isAr ? activePost.quoteAr : activePost.quoteEn;
    const results = isAr ? activePost.resultsAr : activePost.resultsEn;
    const faqs = Array.isArray(activePost.faqs) ? activePost.faqs : [];

    return (
        <article className="w-full min-h-screen bg-white font-sans text-black">
            {/* 1. Header Section */}
            <PostHeader post={activePost} isAr={isAr} />

            {/* 2. Hero Image Banner */}
            {(activePost.heroImage || activePost.image) && (
                <PostHeroImage
                    image={activePost.heroImage || activePost.image}
                    alt={isAr ? activePost.titleAr : activePost.titleEn}
                />
            )}

            {/* 3. Main Content Grid (Body + Sidebar) */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 py-6">
                <PostBody content={content} />
                {sidebarDetails && sidebarDetails.length > 0 && (
                    <PostSidebar sidebarDetails={sidebarDetails} isAr={isAr} />
                )}
            </div>

            {/* 4. Executive Quote */}
            {quote && quote.text && (
                <PostQuote quote={quote} />
            )}

            {/* 5. Measurable Results Grid */}
            {results && results.length > 0 && (
                <PostResults results={results} isAr={isAr} />
            )}

            {/* 6. Frequently Asked Questions */}
            {faqs && faqs.length > 0 && (
                <PostFAQ faqs={faqs} isAr={isAr} />
            )}

            {/* 7. Related Articles */}
            {relatedPosts && relatedPosts.length > 0 && (
                <RelatedPosts posts={relatedPosts} isAr={isAr} />
            )}

            {/* 8. Call to Action Banner */}
            <PostCTA isAr={isAr} />

            {/* 9. Footer Return Navigation */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Link
                    href="/resources"
                    className="inline-flex items-center gap-1.5 text-black/60 hover:text-black transition-colors text-xs sm:text-sm font-normal"
                >
                    <span>{isAr ? "→" : "←"}</span>
                    <span>{isAr ? "العودة للمدونة والموارد" : "Back to Resources"}</span>
                </Link>
            </div>
        </article>
    );
}

// Named exports for individual components
export {
    PostHeader,
    PostHeroImage,
    PostBody,
    PostSidebar,
    PostQuote,
    PostResults,
    PostFAQ,
    RelatedPosts,
    PostCTA,
};
