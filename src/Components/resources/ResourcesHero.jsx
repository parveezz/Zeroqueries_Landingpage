"use client";

import { FiSearch, FiBookOpen } from "react-icons/fi";

export default function ResourcesHero({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}) {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black pt-20 sm:pt-24 lg:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-14 overflow-hidden border-b border-gray-200/80">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="max-w-3xl">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        Resources & Insights
                    </span>

                    <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[56px] font-light tracking-tight text-black leading-[1.08]">
                        Knowledge, guides &amp;
                        <br />
                        <span className="text-black/40">engineering deep dives.</span>
                    </h1>

                    <p className="mt-5 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-2xl">
                        Everything you need to master natural-language data intelligence,
                        AI-powered semantic layers, and conversational SQL across modern warehouses.
                    </p>
                </div>

                {/* Search & Categories Bar */}
                <div className="mt-10 max-w-3xl flex flex-col gap-4">
                    {/* Search Input */}
                    <div className="relative w-full max-w-lg">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black/40" />
                        <input
                            type="text"
                            placeholder="Search articles, guides, topics..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm text-black placeholder:text-black/40 focus:outline-none focus:border-black/50 transition-colors shadow-sm"
                        />
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        {categories.map((cat) => {
                            const isSelected = selectedCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    type="button"
                                    onClick={() => onCategoryChange(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-normal transition-all ${
                                        isSelected
                                            ? "bg-black text-white shadow-sm"
                                            : "bg-white text-black/70 border border-gray-200 hover:border-gray-400"
                                    }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
