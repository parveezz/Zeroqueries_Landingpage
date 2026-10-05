"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiClock,
  FiExternalLink,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";

const ALL_POLICIES = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/tos" },
  { label: "Security & Compliance", href: "/support" },
  { label: "Authorized Sub-Processors", href: "/sub-processor" },
  { label: "Cookie Preferences", href: "/cookies" },
];

export default function LegalPage({
  title,
  subtitle,
  lastUpdated,
  version,
  sections = [],
  related = ALL_POLICIES,
  children,
}) {
  const [activeId, setActiveId] = useState("");
  const pathname = usePathname();

  // Scroll spy
  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <main className="relative w-full bg-[#fbfbfc] font-sans text-black pt-10 sm:pt-14 lg:pt-16 pb-24 px-4 sm:px-8 lg:px-14 overflow-hidden">
      {/* Background Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-35" />

      <div className="relative z-10 mx-auto max-w-7xl">


        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ============ LEFT ASIDE: TABLE OF CONTENTS ============ */}
          <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-[0_2px_16px_rgba(0,0,0,0.03)]">
              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-gray-100">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-black/45">
                  On this page
                </p>
                <span className="text-[11px] font-mono text-black/40">
                  {sections.length} sections
                </span>
              </div>

              <nav className="flex flex-col space-y-0.5 max-h-[calc(100vh-280px)] overflow-y-auto no-scrollbar">
                {sections.map((section) => {
                  const isActive = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => scrollToSection(e, section.id)}
                      className={`text-[13px] leading-snug py-2 px-3 rounded-xl transition-all ${isActive
                          ? "bg-purple-50 text-[#6434F5] font-medium border-l-2 border-[#6434F5]"
                          : "text-black/60 hover:text-black hover:bg-gray-50"
                        }`}
                    >
                      {section.title}
                    </a>
                  );
                })}
              </nav>

              {/* Document Meta Info Block */}
              <div className="mt-5 pt-4 border-t border-gray-100 text-[11px] text-black/50 font-light space-y-2">
                {lastUpdated && (
                  <div className="flex items-center gap-1.5">
                    <FiClock className="w-3 h-3 text-black/40" />
                    <span>Updated {lastUpdated}</span>
                  </div>
                )}
                {version && (
                  <div className="flex items-center gap-1.5">
                    <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-gray-100 text-[9px] font-mono font-medium text-black/70">
                      v{version}
                    </span>
                    <span>Legal Revision</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-emerald-600 font-normal pt-1">
                  <FiCheckCircle className="w-3 h-3" />
                  <span>Enforceable &amp; Verified</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ============ MAIN: CONTENT CONTAINER ============ */}
          <div className="lg:col-span-8 xl:col-span-9 max-w-4xl">
            {/* Mobile TOC Drawer */}
            {sections.length > 0 && (
              <details className="lg:hidden mb-8 rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-2xs">
                <summary className="cursor-pointer list-none px-5 py-3.5 flex items-center justify-between">
                  <span className="text-sm font-medium text-black">
                    Jump to section
                  </span>
                  <span className="text-xs text-black/40">
                    {sections.length} sections
                  </span>
                </summary>
                <nav className="flex flex-col border-t border-gray-100 p-2 space-y-1 bg-gray-50/50">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      onClick={(e) => scrollToSection(e, section.id)}
                      className="block text-[13px] py-2 px-3 rounded-lg text-black/70 hover:text-black hover:bg-white transition-colors"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>
              </details>
            )}

            {/* Content Card Wrapper */}
            <div className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-10 lg:p-14 shadow-[0_4px_30px_rgba(0,0,0,0.03)]">
              {/* Header */}
              <header className="pb-8 sm:pb-10 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-[#6434F5] uppercase bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6434F5]" />
                    Legal Document
                  </span>
                </div>

                <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[52px] font-light tracking-tight text-black leading-[1.08]">
                  {title}
                </h1>

                {subtitle && (
                  <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-2xl">
                    {subtitle}
                  </p>
                )}

                {/* Meta Chips */}
                <div className="mt-7 flex flex-wrap items-center gap-2.5 text-[11px] font-medium tracking-[0.1em] uppercase">
                  {lastUpdated && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-black/60">
                      <FiClock className="w-3 h-3 text-black/40" />
                      Updated {lastUpdated}
                    </span>
                  )}
                  {version && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-black/60">
                      Version {version}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-black/60">
                    <FiShield className="w-3 h-3 text-black/40" />
                    SOC 2 Type II
                  </span>
                </div>
              </header>

              {/* Formatted Article Body */}
              <article className="legal-article mt-8 sm:mt-10">
                {children}
              </article>

              {/* Related Policies Cross-links */}
              {related.length > 0 && (
                <div className="mt-16 pt-10 border-t border-gray-100">
                  <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-black/40 mb-5">
                    Other Legal &amp; Compliance Policies
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {related
                      .filter((r) => r.href !== pathname)
                      .map((r) => (
                        <Link
                          key={r.href}
                          href={r.href}
                          className="group flex items-center justify-between gap-3 rounded-2xl border border-gray-200/90 bg-gray-50/40 p-4 text-sm text-black hover:bg-white hover:border-[#6434F5]/50 hover:shadow-xs transition-all duration-200"
                        >
                          <span className="font-normal group-hover:text-[#6434F5] transition-colors">
                            {r.label}
                          </span>
                          <FiExternalLink className="w-4 h-4 text-black/30 group-hover:text-[#6434F5] transition-colors" />
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
