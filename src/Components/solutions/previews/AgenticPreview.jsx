"use client";

import { FiZap, FiDatabase, FiCpu, FiCheckCircle, FiSend } from "react-icons/fi";

const STEPS = [
    { icon: FiZap, title: "Trigger", desc: "New data arrives", status: "Done" },
    { icon: FiCpu, title: "AI Agent", desc: "Analyzes intent", status: "Running" },
    { icon: FiDatabase, title: "Analyze", desc: "Queries warehouse", status: "Queued" },
    { icon: FiSend, title: "Notify", desc: "Posts to Slack", status: "Waiting" },
];

export function AgenticPreview() {
    return (
        <div className="w-full h-full flex flex-col bg-white px-5 py-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                    Automated Workflow
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] text-emerald-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Running
                </span>
            </div>

            {/* Steps */}
            <div className="flex-1 flex flex-col justify-center gap-2.5">
                {STEPS.map((step, i) => {
                    const Icon = step.icon;
                    const isRunning = step.status === "Running";
                    const isDone = step.status === "Done";

                    return (
                        <div key={step.title} className="relative">
                            <div
                                className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${isRunning
                                        ? "border-[#7C3AED]/40 bg-[#7C3AED]/[0.04] shadow-[0_8px_24px_-12px_rgba(124,58,237,0.4)]"
                                        : "border-gray-200 bg-white"
                                    }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${isRunning
                                            ? "bg-[#7C3AED] text-white"
                                            : isDone
                                                ? "bg-black text-white"
                                                : "bg-gray-100 text-black/60"
                                        }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="text-[12.5px] font-medium text-black truncate">
                                        {step.title}
                                    </div>
                                    <div className="text-[10.5px] text-black/50 font-light truncate">
                                        {step.desc}
                                    </div>
                                </div>

                                <span
                                    className={`text-[9px] font-medium tracking-[0.1em] uppercase shrink-0 ${isRunning
                                            ? "text-[#7C3AED]"
                                            : isDone
                                                ? "text-black/60"
                                                : "text-black/30"
                                        }`}
                                >
                                    {step.status}
                                </span>
                            </div>

                            {/* Connector line between cards */}
                            {i < STEPS.length - 1 && (
                                <div
                                    aria-hidden="true"
                                    className="absolute left-[27px] -bottom-[10px] w-[1.5px] h-[10px] bg-gray-200"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center gap-2 text-[10.5px] text-black/50 font-light">
                <FiCheckCircle className="w-3 h-3 text-emerald-500" />
                Last run: 2 minutes ago · Next: in 4 hours
            </div>
        </div>
    );
}

export default AgenticPreview;