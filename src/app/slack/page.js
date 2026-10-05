"use client";

import { useState } from "react";
import SlackIntegrationHero from "@/Components/platform/SlackIntegrationHero";
import SlackConversation from "@/Components/platform/SlackConversation";
import SlackComplianceSections from "@/Components/platform/SlackComplianceSections";
import {
    FiBarChart2,
    FiMessageSquare,
    FiUsers,
    FiClock,
    FiLock,
    FiShield,
    FiChevronDown,
    FiTerminal,
    FiLayers,
    FiCheckSquare,
} from "react-icons/fi";
import FinalCTA from "@/Components/Home/CTAsection";

const CAPABILITIES = [
    {
        icon: FiMessageSquare,
        title: "Query in Plain English with /ask",
        description:
            "Trigger live queries anywhere in Slack. Type /ask followed by any question, and ZeroQueries compiles SQL, retrieves verified answers, and formats charts in milliseconds.",
    },
    {
        icon: FiClock,
        title: "Automated Daily & Weekly Digests",
        description:
            "Schedule morning KPI briefings directly into leadership channels like #exec-kpis or #growth-daily. Teams start their day aligned without opening five different dashboards.",
    },
    {
        icon: FiBarChart2,
        title: "Inline Visualizations & Drill-Downs",
        description:
            "ZeroQueries doesn't just return raw numbers — it renders clean summary charts, comparison tables, and interactive action buttons for one-click country or cohort drill-downs.",
    },
    {
        icon: FiUsers,
        title: "Thread-Aware Conversation Memory",
        description:
            "Ask follow-ups naturally inside Slack threads. Say 'Now filter that by mobile users only' or 'Compare with last year' — ZeroQueries maintains conversational state seamlessly.",
    },
    {
        icon: FiLock,
        title: "Enterprise Role-Based Access (RBAC)",
        description:
            "Enforce strict data governance. Slack user identities map directly to database role permissions so sensitive payroll or revenue tables are only revealed to authorized personnel.",
    },
    {
        icon: FiShield,
        title: "Zero Foundation Model Training",
        description:
            "Zero commercial training on customer prompts. Data processed through LLMs is protected by zero-data-retention (ZDR) provider agreements and strict ephemeral RAM execution.",
    },
];

const SETUP_STEPS = [
    {
        step: "01",
        title: "Install the Slack App",
        description:
            "Click 'Add to Slack' and authorize the ZeroQueries bot with standard read-only messaging permissions in your workspace.",
    },
    {
        step: "02",
        title: "Connect Data Sources",
        description:
            "Link PostgreSQL, Snowflake, BigQuery, or Databricks with read-only credentials via our SOC 2 Type II compliant admin console.",
    },
    {
        step: "03",
        title: "Invite to Channels & Query",
        description:
            "Invite @ZeroQueries to any channel or DM, or simply type /ask followed by your question to get instant, verified insights.",
    },
];

const FAQS = [
    {
        q: "What does ZeroQueries do and how does it integrate with Slack?",
        a: "ZeroQueries is an AI-powered conversational analytics application. It connects your organizational data warehouses (PostgreSQL, Snowflake, BigQuery, Databricks, MySQL) directly to Slack. Workspace members can type `/ask [question]` or mention `@ZeroQueries` in any channel to run natural language queries, generate visualizations, and receive instant verified business intelligence without writing SQL.",
    },
    {
        q: "Can ZeroQueries generate inaccurate or incorrect responses?",
        a: "Yes. Because ZeroQueries uses Large Language Models (LLMs) to interpret natural language and synthesize answers, there is potential for AI-generated responses to contain inaccuracies, omissions, or hallucinations. While our platform enforces strict schema-grounding and automated SQL validation to ensure high precision, users should always independently verify critical business, operational, and financial decisions against primary source data.",
    },
    {
        q: "What is the standard retention period for LLM-processed data under normal operations?",
        a: "During normal operations, prompts and raw database contents processed by the AI model are held ephemerally in RAM (0 days retention). Encrypted conversational thread context is retained for 30 calendar days to enable multi-turn follow-ups, and operational audit telemetry (scrubbed of sensitive data) is retained for 90 calendar days. Third-party model providers are legally bound by Zero Data Retention (ZDR) agreements and never train on your data.",
    },
    {
        q: "How are customer-initiated deletion requests handled?",
        a: "Customer administrators can request immediate data deletion at any time via privacy@zeroqueries.com or through the ZeroQueries admin console. Active session caches, user tokens, and connector configurations are purged within 24 to 48 hours. Secondary encrypted recovery snapshots are completely and irrevocably expunged within a maximum of 30 business days.",
    },
    {
        q: "Can we restrict which Slack channels or users have access to sensitive financial metrics?",
        a: "Yes. ZeroQueries supports granular channel allowlists and user role mapping. You can designate specific channels (e.g. #finance-exec) for restricted data models while keeping general product analytics accessible to everyone.",
    },
    {
        q: "Does it support private channels and direct messages?",
        a: "Yes. You can invite @ZeroQueries into private Slack channels or query it directly in a private 1-on-1 direct message without sharing numbers with the rest of the workspace.",
    },
    {
        q: "Is it compatible with Slack Enterprise Grid?",
        a: "Yes. ZeroQueries fully supports Slack Enterprise Grid with multi-workspace deployments, central admin controls, and automated SCIM / SSO provisioning.",
    },
];

export default function SlackPage() {
    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <main className="w-full font-sans text-black bg-white overflow-hidden">
            {/* ================= USER'S INTRO HERO COMPONENT ================= */}
            <SlackIntegrationHero />

            {/* ================= USER'S SLACK CONVERSATION COMPONENT ================= */}
            <SlackConversation />

            {/* ================= CAPABILITIES GRID ================= */}
            <section className="relative w-full py-20 sm:py-24 px-6 sm:px-10 lg:px-14 bg-gray-50/50">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl mb-14">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Capabilities
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                            Engineered for high-performing modern teams.
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-black/60 font-light leading-relaxed">
                            Everything you need to turn Slack from a conversation stream into a live operational command center.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {CAPABILITIES.map((cap) => {
                            const Icon = cap.icon;
                            return (
                                <div
                                    key={cap.title}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-400 hover:shadow-xs"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#611f69]/10 text-[#611f69] flex items-center justify-center mb-4">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base sm:text-lg font-medium tracking-tight text-black leading-snug">
                                        {cap.title}
                                    </h3>
                                    <p className="mt-2 text-xs sm:text-sm text-black/60 font-light leading-relaxed">
                                        {cap.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= 3-STEP SETUP ================= */}
            <section className="relative w-full bg-gray-50 py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden border-y border-gray-200/80">
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

                <div className="relative z-10 mx-auto max-w-7xl">
                    {/* ================= HEADING ================= */}
                    <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Fast Deployment
                        </span>

                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-[40px] font-light tracking-tight text-black leading-[1.15]">
                            Live in less than{" "}
                            <span className="text-black/50">three minutes.</span>
                        </h2>

                        <p className="mt-4 text-sm sm:text-base text-black/60 leading-relaxed font-light max-w-md mx-auto">
                            No infrastructure to spin up. No pipelines to build. Just connect and start asking.
                        </p>
                    </div>

                    {/* ================= 3-STEP GRID ================= */}
                    <div className="relative">
                        {/* Dashed connector line — desktop only */}
                        <div className="hidden lg:block absolute top-[72px] left-[16.6%] right-[16.6%] h-px border-t border-dashed border-gray-300 z-0" />

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                            {SETUP_STEPS.map((s, i) => (
                                <StepCard key={s.step} step={s} index={i} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= DETAILED APP SUMMARY & SLACK INTEGRATION OVERVIEW ================= */}
            <section className="relative w-full bg-gray-50/60 py-20 sm:py-24 px-6 sm:px-10 lg:px-14 border-b border-gray-200">
                <div className="mx-auto max-w-5xl">
                    <div className="max-w-2xl mb-12">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Comprehensive App Overview
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                            How ZeroQueries Integrates with Slack
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-black/60 font-light leading-relaxed">
                            A complete, detailed breakdown of our app architecture, interaction modalities, and data protection model.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-purple-100 text-[#6434F5]">
                                    <FiTerminal className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-medium text-black">
                                    1. Slash Commands &amp; Channel Bot Mentions
                                </h3>
                            </div>
                            <p className="text-sm text-black/70 font-light leading-relaxed">
                                Users can trigger on-demand queries from any channel, private group, or direct message using the <code>/ask</code> slash command (e.g. <code>/ask What was our net retention rate in APAC for Q2?</code>) or by mentioning <code>@ZeroQueries</code> in conversational threads. The bot parses user intent, extracts temporal dimensions, identifies relevant metrics, and queries underlying databases securely.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-purple-100 text-[#6434F5]">
                                    <FiLayers className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-medium text-black">
                                    2. Interactive Slack Block Kit Responses &amp; Visualizations
                                </h3>
                            </div>
                            <p className="text-sm text-black/70 font-light leading-relaxed">
                                Responses are delivered natively into the Slack interface using Slack Block Kit elements. Instead of unstructured blocks of text, ZeroQueries returns structured key performance cards, comparison deltas, inline visual charts, and interactive action buttons (such as &ldquo;Filter by Product&rdquo; or &ldquo;Export CSV&rdquo;) that trigger immediate drill-downs without page refreshes.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 rounded-lg bg-purple-100 text-[#6434F5]">
                                    <FiCheckSquare className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-medium text-black">
                                    3. Granular RBAC Permissions &amp; Channel Segregation
                                </h3>
                            </div>
                            <p className="text-sm text-black/70 font-light leading-relaxed">
                                ZeroQueries honors your database security model. By linking Slack user IDs to organizational database roles, sensitive tables (such as executive payroll or confidential contract revenue) are restricted strictly to authorized team members. Questions asked in public channels will never reveal restricted data to unauthorized viewers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= COMPLIANCE & SLACK REVIEW SECTIONS (AI DISCLAIMER & RETENTION LIFECYCLE) ================= */}
            <SlackComplianceSections />

            {/* ================= FAQS ================= */}
            <section className="relative w-full py-20 sm:py-24 px-6 sm:px-10 lg:px-14 bg-gray-50/40">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Frequently Asked Questions
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl font-light tracking-tight text-black">
                            Questions about Slack &amp; Security?
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {FAQS.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={faq.q}
                                    className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-colors"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-medium text-black hover:text-[#611f69] transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <FiChevronDown
                                            className={`w-4 h-4 text-black/50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-black/60 font-light leading-relaxed border-t border-gray-100 pt-3">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ================= FINAL CTA ================= */}
            <FinalCTA />
        </main>
    );
}


function StepCard({ step, index }) {
    // Cycle accent shades so each step feels distinct but on-brand
    const accents = [
        "bg-black text-white",
        "bg-gray-800 text-white",
        "bg-gray-600 text-white",
    ];
    const accent = accents[index % accents.length];

    return (
        <div className="group relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.15)]">
            {/* Step number badge */}
            <div
                className={`flex items-center justify-center w-9 h-9 rounded-xl ${accent} text-sm font-medium shrink-0 transition-transform duration-300 group-hover:scale-105`}
            >
                {step.step}
            </div>

            {/* Title */}
            <h3 className="mt-5 text-base sm:text-lg font-medium tracking-tight text-black leading-snug">
                {step.title}
            </h3>

            {/* Description */}
            <p className="mt-2.5 text-[13px] sm:text-sm text-black/60 leading-relaxed font-light flex-1">
                {step.description}
            </p>

            {/* Bottom accent bar — grows on hover */}
            <div className="mt-6 h-[2px] w-8 rounded-full bg-black opacity-20 transition-all duration-500 group-hover:w-16 group-hover:opacity-100" />
        </div>
    );
}