"use client";

import { FiTrendingUp, FiChevronDown } from "react-icons/fi";

export function InsightsPreview() {
    const bars = [45, 60, 52, 78, 65, 90, 82];

    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100">
                <div>
                    <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                        Revenue Growth
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-2">
                        <span className="text-xl font-light text-black">+24.8%</span>
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                            <FiTrendingUp className="w-3 h-3" />
                            vs last quarter
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    tabIndex={-1}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-black/60"
                    aria-hidden="true"
                >
                    Last 7 days
                    <FiChevronDown className="w-3 h-3" />
                </button>
            </div>

            {/* Chart */}
            <div className="flex-1 px-5 py-5 flex flex-col justify-center">
                <div className="flex items-end justify-between gap-2 h-32">
                    {bars.map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                            <div
                                className={`w-full rounded-t-sm ${i === 5 ? "bg-[#7C3AED]" : "bg-[#7C3AED]/30"
                                    }`}
                                style={{ height: `${h}%` }}
                            />
                            <span className="text-[9px] text-black/40 font-light">
                                {["M", "T", "W", "T", "F", "S", "S"][i]}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Insight callout */}
            <div className="mx-5 mb-5 rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/[0.04] p-3.5">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#7C3AED]">
                        AI Insight
                    </span>
                </div>
                <p className="text-[11.5px] text-black/70 leading-relaxed font-light">
                    Revenue increased significantly in the last quarter, driven primarily
                    by the EMEA region.
                </p>
            </div>
        </div>
    );
}

export default InsightsPreview;