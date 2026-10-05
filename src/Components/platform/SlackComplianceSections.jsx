"use client";

import { FiAlertTriangle, FiShield, FiClock, FiDatabase, FiTrash2, FiCheckCircle, FiInfo } from "react-icons/fi";
import Link from "next/link";

export default function SlackComplianceSections() {
    return (
        <div className="w-full">
            {/* ================= AI RESPONSE ACCURACY DISCLAIMER ================= */}
            <section
                id="ai-disclaimer"
                className="relative w-full bg-amber-50/40 border-y border-amber-200/70 py-16 sm:py-20 px-6 sm:px-10 lg:px-14"
            >
                <div className="mx-auto max-w-5xl">
                    <div className="rounded-2xl border border-amber-200 bg-white p-6 sm:p-10 shadow-xs">
                        <div className="flex flex-col sm:flex-row items-start gap-5">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                                <FiAlertTriangle className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.15em] text-amber-900">
                                        Mandatory AI Transparency Notice
                                    </span>
                                </div>
                                <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-black">
                                    AI-Generated Content Disclaimer &amp; Response Accuracy
                                </h3>
                                <p className="mt-3 text-sm sm:text-base leading-relaxed text-black/75 font-light">
                                    ZeroQueries uses artificial intelligence and Large Language Models (LLMs) to understand natural language questions, translate conversational intent into database analytical queries, and generate conversational summaries in Slack.
                                </p>
                                <div className="mt-4 rounded-xl bg-amber-50/70 border border-amber-200/60 p-4 sm:p-5 text-sm text-black/80 font-light leading-relaxed">
                                    <strong className="font-semibold text-black">Notice Regarding Potential Inaccuracies:</strong> While ZeroQueries employs strict schema grounding, automated deterministic query validation, and enterprise guardrails to maintain high fidelity,{" "}
                                    <span className="font-medium text-black">
                                        AI-generated responses have the potential to produce inaccurate, incomplete, or hallucinated statements or calculations.
                                    </span>{" "}
                                    ZeroQueries is designed as a decision-support acceleration tool and should not be used as the sole basis for critical financial, medical, legal, or regulatory actions. Users and administrators are advised to independently review and cross-reference critical numbers against primary database records and source systems.
                                </div>
                                <p className="mt-4 text-xs sm:text-sm text-black/60 font-light">
                                    If you encounter any discrepancy in an AI response, report it immediately to your workspace administrator or reach out to our team at{" "}
                                    <a href="mailto:support@zeroqueries.com" className="text-[#6434F5] underline hover:text-[#5025d1]">
                                        support@zeroqueries.com
                                    </a>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= LLM DATA RETENTION & LIFECYCLE SETTINGS ================= */}
            <section
                id="data-retention"
                className="relative w-full bg-white py-20 sm:py-24 px-6 sm:px-10 lg:px-14 border-b border-gray-200"
            >
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-3xl mb-14">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            Security &amp; Data Governance
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                            LLM Data Retention Settings &amp; Operational Lifecycle
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-black/60 font-light leading-relaxed">
                            Clear, concrete timelines for how data processed through AI models is stored, retained, and permanently deleted under normal operations versus customer-initiated deletion requests.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* NORMAL OPERATION RETENTION TIMELINE */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-[#6434F5] flex items-center justify-center">
                                            <FiClock className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-black">
                                                Normal Operation Lifecycle
                                            </h3>
                                            <p className="text-xs text-black/50 font-light">
                                                Standard automated retention timelines
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-medium tracking-wide uppercase px-2.5 py-1">
                                        Automated
                                    </span>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-purple-100 text-[#6434F5] flex items-center justify-center shrink-0 text-xs font-semibold">
                                            1
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    In-Memory Processing
                                                </h4>
                                                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                                                    0 Days (RAM Only)
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                User questions and raw database query results processed by the AI model exist strictly in volatile RAM during query generation. No raw database tables are written to persistent storage.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-purple-100 text-[#6434F5] flex items-center justify-center shrink-0 text-xs font-semibold">
                                            2
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    Third-Party Model Retention
                                                </h4>
                                                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                                                    0 Days (No Training)
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                ZeroQueries holds Zero Data Retention (ZDR) commercial agreements with enterprise LLM inference providers. Customer data is strictly never used to train or refine foundational models.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-purple-100 text-[#6434F5] flex items-center justify-center shrink-0 text-xs font-semibold">
                                            3
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    Conversational Thread Context
                                                </h4>
                                                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                                                    30 Calendar Days
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                Encrypted conversational state is retained for 30 calendar days to enable users to ask follow-up questions within Slack threads. After 30 days, the session token is automatically flushed and destroyed.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-purple-100 text-[#6434F5] flex items-center justify-center shrink-0 text-xs font-semibold">
                                            4
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    Security &amp; Audit Logs
                                                </h4>
                                                <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                                                    90 Calendar Days
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                Execution metadata (timestamps, channel IDs, user handles, and query success codes — scrubbed of sensitive underlying data) is retained for 90 calendar days for compliance auditing, then purged.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-200/80 text-[11px] text-black/50 font-light flex items-center gap-2">
                                <FiCheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>Automated cron routines permanently expunge expired records without human intervention.</span>
                            </div>
                        </div>

                        {/* CUSTOMER-INITIATED DELETION REQUESTS */}
                        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8 flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between gap-3 mb-6 pb-5 border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center">
                                            <FiTrash2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-medium text-black">
                                                Customer-Initiated Requests
                                            </h3>
                                            <p className="text-xs text-black/50 font-light">
                                                Separate protocol for customer-requested deletion
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-medium tracking-wide uppercase px-2.5 py-1">
                                        On Demand
                                    </span>
                                </div>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                                            A
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    On-Demand Admin Purge
                                                </h4>
                                                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                                                    24 – 48 Hours
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                Workspace administrators can initiate a complete purge of all workspace data, user session tokens, and database connector credentials at any time. Active caches are cleared within 24 to 48 hours.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                                            B
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    Workspace Disconnect / Uninstall
                                                </h4>
                                                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                                                    Immediate Revocation
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                When the ZeroQueries Slack app is removed from a workspace, all OAuth access tokens, bot scopes, and database access keys are immediately revoked and rendered inoperable.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                                            C
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    Backup Archive Shredding
                                                </h4>
                                                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                                                    Max 30 Days
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                Full deletion requests irrevocably cycle through encrypted secondary recovery snapshots. All residual metadata is completely shredded within a maximum of 30 business days.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5">
                                        <div className="mt-1 h-5 w-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 text-xs font-semibold">
                                            D
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-sm font-semibold text-black">
                                                    How to Request Deletion
                                                </h4>
                                                <span className="text-[11px] font-mono text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md">
                                                    Direct Contact
                                                </span>
                                            </div>
                                            <p className="mt-1 text-xs sm:text-[13px] text-black/65 font-light leading-relaxed">
                                                Submit deletion requests directly via the ZeroQueries Admin Console or email our data protection officer at{" "}
                                                <a href="mailto:privacy@zeroqueries.com" className="text-rose-700 underline font-medium">
                                                    privacy@zeroqueries.com
                                                </a>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-200/80 text-[11px] text-black/50 font-light flex items-center gap-2">
                                <FiShield className="w-3.5 h-3.5 text-rose-700 shrink-0" />
                                <span>ZeroQueries complies with GDPR, CCPA, and SOC 2 Type II right-to-be-forgotten standards.</span>
                            </div>
                        </div>
                    </div>

                    {/* COMPARISON SUMMARY TABLE */}
                    <div className="mt-12 rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-2xs">
                        <div className="bg-gray-100/70 px-6 py-4 border-b border-gray-200">
                            <h4 className="text-sm font-semibold text-black">
                                Data Retention Specification Matrix
                            </h4>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-xs sm:text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50/50 text-black/60 font-medium">
                                        <th className="py-3 px-5">Data Category</th>
                                        <th className="py-3 px-5">Lifecycle Stage</th>
                                        <th className="py-3 px-5">Normal Operation Retention</th>
                                        <th className="py-3 px-5">Customer Deletion Request</th>
                                        <th className="py-3 px-5">Model Training Use</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-black/80 font-light">
                                    <tr>
                                        <td className="py-3.5 px-5 font-medium text-black">LLM Prompts &amp; Queries</td>
                                        <td className="py-3.5 px-5">Inference &amp; Execution</td>
                                        <td className="py-3.5 px-5 font-mono text-purple-700">0 Days (RAM only)</td>
                                        <td className="py-3.5 px-5 font-mono text-rose-700">Immediate</td>
                                        <td className="py-3.5 px-5 text-emerald-700 font-medium">Never (0%)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3.5 px-5 font-medium text-black">Raw Database Records</td>
                                        <td className="py-3.5 px-5">Query Fetch &amp; Formatting</td>
                                        <td className="py-3.5 px-5 font-mono text-purple-700">0 Days (Never Stored)</td>
                                        <td className="py-3.5 px-5 font-mono text-rose-700">Not Applicable</td>
                                        <td className="py-3.5 px-5 text-emerald-700 font-medium">Never (0%)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3.5 px-5 font-medium text-black">Slack Thread Context</td>
                                        <td className="py-3.5 px-5">Conversational Follow-ups</td>
                                        <td className="py-3.5 px-5 font-mono text-purple-700">30 Calendar Days</td>
                                        <td className="py-3.5 px-5 font-mono text-rose-700">Within 24–48 Hours</td>
                                        <td className="py-3.5 px-5 text-emerald-700 font-medium">Never (0%)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3.5 px-5 font-medium text-black">System &amp; Audit Logs</td>
                                        <td className="py-3.5 px-5">Security Telemetry</td>
                                        <td className="py-3.5 px-5 font-mono text-purple-700">90 Calendar Days</td>
                                        <td className="py-3.5 px-5 font-mono text-rose-700">Max 30 Days (Backups)</td>
                                        <td className="py-3.5 px-5 text-emerald-700 font-medium">Never (0%)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
