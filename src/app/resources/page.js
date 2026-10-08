"use client";

import { useState, useEffect } from "react";
import BlogHeader from "@/Components/blog/BlogHeader";
import CategoryFilter from "@/Components/blog/CategoryFilter";
import FeaturedPost from "@/Components/blog/FeaturedPost";
import BlogGrid from "@/Components/blog/BlogGrid";
import Pagination from "@/Components/blog/Pagination";
import FinalCTA from "@/Components/Home/CTAsection";
import { CATEGORIES } from "@/Components/blog/blogData";
import { useLanguage } from "@/context/LanguageContext";

export default function ResourcesPage() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
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
    <main className="w-full bg-white font-sans text-black min-h-screen">
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

      {/* 3. Featured Post & Grid */}
      {loading ? (
        <div className="py-24 flex justify-center items-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#6434F5] border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          {activeCategory === "all" && featuredPost && <FeaturedPost post={featuredPost} />}

          {/* 4. Blog Posts Grid or Empty State */}
          {filteredPosts.length === 0 ? (
            <div className="py-24 max-w-xl mx-auto px-4 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-50 text-[#6434F5] flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isAr ? "لا توجد مقالات منشورة بعد" : "No Articles Published Yet"}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                {isAr
                  ? "سيتم عرض دراسات الحالة وأدلة الذكاء الاصطناعي هنا فور إضافتها من لوحة التحكم."
                  : "Articles and case studies will appear here as soon as they are published from the admin panel."}
              </p>
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
