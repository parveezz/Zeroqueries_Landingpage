"use client";

import { useState, useEffect } from "react";
import BlogHeader from "@/Components/blog/BlogHeader";
import CategoryFilter from "@/Components/blog/CategoryFilter";
import FeaturedPost from "@/Components/blog/FeaturedPost";
import BlogGrid from "@/Components/blog/BlogGrid";
import Pagination from "@/Components/blog/Pagination";
import FinalCTA from "@/Components/Home/CTAsection";
import { CATEGORIES } from "@/Components/blog/blogData";

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setAllPosts(json.data);
        }
      })
      .catch((err) => console.error('Error fetching blogs from API:', err))
      .finally(() => setLoading(false));
  }, []);

  const featuredPost = allPosts.find((p) => p.isFeatured) || allPosts[0] || null;

  const filteredPosts =
    activeCategory === "all"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  return (
    <main className="w-full bg-white font-sans text-black">
      {/* 1. Header with title and subtitle */}
      <BlogHeader />

      {/* 2. Category Filter Pills */}
      <CategoryFilter
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onSelectCategory={(id) => {
          setActiveCategory(id);
          setCurrentPage(1);
        }}
      />

      {/* 3. Featured Post (shown when viewing all categories if post exists) */}
      {loading ? (
        <div className="py-20 flex justify-center items-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6434F5] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {activeCategory === "all" && featuredPost && <FeaturedPost post={featuredPost} />}

          {/* 4. Blog Posts Grid */}
          {filteredPosts.length === 0 ? (
            <div className="py-16 text-center text-sm text-black/50 font-light">
              No articles found in this category.
            </div>
          ) : (
            <BlogGrid posts={filteredPosts} />
          )}

          {/* 5. Pagination */}
          {filteredPosts.length > 6 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredPosts.length / 6)}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}

      {/* 6. Call To Action Footer Banner */}
      <FinalCTA />
    </main>
  );
}
