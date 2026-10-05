"use client";

import { FiCheckCircle, FiChevronDown, FiTrendingUp } from "react-icons/fi";

export function AutoMLPreview() {
    // Simulated prediction line data
    const actual = [42, 48, 55, 60, 65, 72, 78, 82, 88, 92];
    const predicted = [44, 50, 53, 61, 67, 70, 80, 84, 87, 94];

    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* ============ Header ============ */}
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-2.5">
                    <span className="flex items-center justify-center w-2 h-2 rounded-full bg-emerald-500">
                        <span className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-75" />
                    </span>
                    <span className="text-[12.5px] font-medium text-black">
                        Model trained successfully
                    </span>
                </div>

                <button
                    type="button"
                    tabIndex={-1}
                    aria-hidden="true"
                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] text-black/60"
                >
                    Random Forest
                    <FiChevronDown className="w-3 h-3" />
                </button>
            </div>

            {/* ============ Dataset + Metrics row ============ */}
            <div className="grid grid-cols-3 gap-3 px-5 py-4">
                <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <div className="text-[9px] font-medium tracking-[0.15em] uppercase text-black/40">
                        Dataset
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-black truncate">
                        Sales Data
                    </div>
                    <div className="mt-0.5 text-[10px] text-black/50 font-light">
                        12,480 rows
                    </div>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <div className="text-[9px] font-medium tracking-[0.15em] uppercase text-black/40">
                        Algorithm
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-black truncate">
                        Random Forest
                    </div>
                    <div className="mt-0.5 text-[10px] text-black/50 font-light">
                        Auto-tuned
                    </div>
                </div>

                <div className="rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/[0.05] p-3">
                    <div className="text-[9px] font-medium tracking-[0.15em] uppercase text-[#7C3AED]">
                        Accuracy
                    </div>
                    <div className="mt-1 text-[12.5px] font-medium text-black">
                        94.8%
                    </div>
                    <div className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-emerald-600 font-medium">
                        <FiTrendingUp className="w-2.5 h-2.5" />
                        +2.3% vs baseline
                    </div>
                </div>
            </div>

            {/* ============ Prediction chart ============ */}
            <div className="flex-1 px-5 pb-2 min-h-0">
                <div className="h-full rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40">
                            Predictions vs Actual
                        </div>
                        <div className="flex items-center gap-3 text-[9px] font-light text-black/50">
                            <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-black" />
                                Actual
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#7C3AED]" />
                                Predicted
                            </span>
                        </div>
                    </div>

                    {/* SVG dual-line chart */}
                    <div className="flex-1 relative min-h-0">
                        <svg
                            viewBox="0 0 300 90"
                            preserveAspectRatio="none"
                            className="w-full h-full"
                            aria-hidden="true"
                        >
                            {/* Grid lines */}
                            {[0, 30, 60, 90].map((y) => (
                                <line
                                    key={y}
                                    x1="0"
                                    y1={y}
                                    x2="300"
                                    y2={y}
                                    stroke="rgba(0,0,0,0.05)"
                                    strokeWidth="0.5"
                                />
                            ))}

                            {/* Actual line */}
                            <polyline
                                points={actual
                                    .map((v, i) => `${(i * 300) / 9},${90 - (v / 100) * 80}`)
                                    .join(" ")}
                                fill="none"
                                stroke="black"
                                strokeWidth="1.75"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Predicted line */}
                            <polyline
                                points={predicted
                                    .map((v, i) => `${(i * 300) / 9},${90 - (v / 100) * 80}`)
                                    .join(" ")}
                                fill="none"
                                stroke="#7C3AED"
                                strokeWidth="1.75"
                                strokeDasharray="4 3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Data points on predicted line */}
                            {predicted.map((v, i) => (
                                <circle
                                    key={i}
                                    cx={(i * 300) / 9}
                                    cy={90 - (v / 100) * 80}
                                    r="2.5"
                                    fill="#7C3AED"
                                />
                            ))}
                        </svg>
                    </div>
                </div>
            </div>

            {/* ============ Footer ============ */}
            <div className="px-5 py-3.5 border-t border-gray-100 flex items-center gap-2 text-[10.5px] text-black/50 font-light">
                <FiCheckCircle className="w-3 h-3 text-emerald-500 shrink-0" />
                <span>
                    Model deployed · Predictions updating in real time
                </span>
            </div>
        </div>
    );
}

export default AutoMLPreview;