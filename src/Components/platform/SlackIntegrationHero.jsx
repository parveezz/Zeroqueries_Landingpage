"use client";

import Link from "next/link";
import { FiZap, FiArrowUpRight } from "react-icons/fi";
import { FaSlack } from "react-icons/fa6";

export default function SlackIntegrationHero() {
  return (
    <section className="relative w-full bg-gray-50 font-sans text-black pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-14 overflow-hidden border-b border-gray-200">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      {/* Soft radial glow — centered behind the headline */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(100, 52, 245, 0.08) 0%, rgba(100, 52, 245, 0.02) 45%, transparent 75%)",
          filter: "blur(80px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* ================= BADGE ================= */}
        <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-black/70 shadow-2xs">
          <FiZap className="w-3.5 h-3.5 text-black" strokeWidth={2.25} />
          Official Integration
        </span>

        {/* ================= HEADING ================= */}
        <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl lg:text-[56px] font-light tracking-tight text-black leading-[1.1]">
          ZeroQueries for{" "}
          <span className="text-black/50">Slack</span>
        </h1>

        {/* ================= DESCRIPTION ================= */}
        <p className="mt-5 sm:mt-6 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-xl mx-auto">
          Ask questions, query your databases, and receive instant data
          insights — without ever leaving your Slack workspace.
        </p>

        {/* ================= PRIMARY CTA ================= */}
        <div className="mt-9 sm:mt-10 flex justify-center">
          <a
            href="https://slack.com/oauth/v2/authorize?client_id=YOUR_CLIENT_ID&scope=commands,chat:write"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-black text-white px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-[15px] font-normal hover:bg-gray-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-xs"
            aria-label="Add ZeroQueries to your Slack workspace"
          >
            <FaSlack className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span>Add to Slack</span>
          </a>
        </div>

        {/* ================= TERMS LINE ================= */}
        <p className="mt-6 sm:mt-7 text-[11px] sm:text-xs text-black/50 font-light">
          By installing ZeroQueries, you agree to our{" "}
          <Link
            href="/privacy"
            className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
          >
            Privacy Policy
          </Link>{" "}
          &amp;{" "}
          <Link
            href="/tos"
            className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
          >
            Terms of Service
          </Link>
          .
        </p>

        {/* ================= TRUST & COMPLIANCE LINE ================= */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium tracking-[0.12em] uppercase text-black/50">
          <span>SOC 2 Type II</span>
          <span className="w-1 h-1 rounded-full bg-black/20" aria-hidden="true" />
          <span>Read-only access</span>
          <span className="w-1 h-1 rounded-full bg-black/20" aria-hidden="true" />
          <a href="#ai-disclaimer" className="text-amber-800 underline underline-offset-4 hover:text-amber-900 transition-colors">
            AI Disclaimer
          </a>
          <span className="w-1 h-1 rounded-full bg-black/20" aria-hidden="true" />
          <a href="#data-retention" className="text-[#6434F5] underline underline-offset-4 hover:text-black transition-colors">
            LLM Retention Policy
          </a>
        </div>
      </div>
    </section>
  );
}
