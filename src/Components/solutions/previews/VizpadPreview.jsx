"use client";

export function VizpadPreview() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Toolbar */}
            <div className="flex items-center gap-1.5 px-5 py-3 border-b border-gray-100">
                {["Dashboard", "Chart", "Table", "Filter"].map((tab, i) => (
                    <span
                        key={tab}
                        className={`rounded-md px-2.5 py-1 text-[10.5px] font-medium transition-colors ${i === 0
                                ? "bg-black text-white"
                                : "text-black/50 hover:text-black"
                            }`}
                    >
                        {tab}
                    </span>
                ))}
            </div>

            {/* Canvas */}
            <div className="flex-1 p-5 grid grid-cols-3 gap-3 min-h-0">
                {/* Big chart */}
                <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-3.5 flex flex-col min-h-0">
                    <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-black/40 mb-2">
                        Revenue Trend
                    </div>
                    <div className="flex-1 flex items-end gap-1.5">
                        {[40, 55, 48, 62, 75, 68, 82, 70, 88].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 rounded-sm bg-[#7C3AED]/60"
                                style={{ height: `${h}%` }}
                            />
                        ))}
                    </div>
                </div>

                {/* KPI tiles */}
                <div className="col-span-1 flex flex-col gap-3">
                    <div className="rounded-xl border border-gray-200 bg-white p-3 flex-1">
                        <div className="text-[9px] font-medium tracking-[0.15em] uppercase text-black/40">
                            Revenue
                        </div>
                        <div className="mt-1 text-base font-light text-black">$8.4M</div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-3 flex-1">
                        <div className="text-[9px] font-medium tracking-[0.15em] uppercase text-black/40">
                            Growth
                        </div>
                        <div className="mt-1 text-base font-light text-emerald-600">
                            +24.8%
                        </div>
                    </div>
                </div>

                {/* AI narrative */}
                <div className="col-span-3 rounded-xl border border-[#7C3AED]/20 bg-[#7C3AED]/[0.04] p-3.5">
                    <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-[#7C3AED] mb-1">
                        GenAI Narrative
                    </div>
                    <p className="text-[11.5px] text-black/70 leading-relaxed font-light line-clamp-2">
                        Revenue increased by 24.8% quarter-over-quarter, with the strongest
                        contributions from EMEA and APAC.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VizpadPreview;