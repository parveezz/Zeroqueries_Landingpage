"use client";

import { FiZap, FiSend } from "react-icons/fi";

export function ConversationalPreview() {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-100">
                <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-[#7C3AED] opacity-25 animate-ping" />
                    <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#7C3AED] text-white">
                        <FiZap className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-black">ZeroQueries AI</div>
                    <div className="text-[10px] text-black/50 font-light flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Connected · Live data
                    </div>
                </div>
            </div>

            {/* Chat area */}
            <div className="flex-1 px-5 py-5 space-y-4 overflow-hidden">
                {/* User bubble */}
                <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gray-100 px-3.5 py-2.5">
                        <p className="text-[12.5px] text-black font-light leading-relaxed">
                            Show revenue by region last quarter.
                        </p>
                    </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-2.5">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#7C3AED] text-white shrink-0">
                        <FiZap className="w-3 h-3" strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0 rounded-2xl rounded-tl-sm border border-gray-200 bg-white px-3.5 py-3">
                        <p className="text-[12.5px] text-black font-light leading-relaxed">
                            Revenue grew by 18% in EMEA. NA held flat; APAC saw the largest
                            dip.
                        </p>

                        {/* Mini bar chart */}
                        <div className="mt-3 flex items-end gap-1.5 h-14">
                            <div className="flex-1 rounded-sm bg-[#7C3AED]" style={{ height: "60%" }} />
                            <div className="flex-1 rounded-sm bg-[#7C3AED]/70" style={{ height: "40%" }} />
                            <div className="flex-1 rounded-sm bg-[#7C3AED]/50" style={{ height: "75%" }} />
                            <div className="flex-1 rounded-sm bg-[#7C3AED]/30" style={{ height: "35%" }} />
                        </div>
                        <div className="mt-1.5 flex justify-between text-[9px] text-black/40 font-light">
                            <span>NA</span>
                            <span>EMEA</span>
                            <span>APAC</span>
                            <span>LATAM</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-gray-100">
                <div className="flex items-center gap-2.5 rounded-2xl border border-gray-200 bg-gray-50 px-3.5 py-2.5">
                    <span className="text-[12.5px] text-black/40 font-light italic flex-1">
                        Ask anything…
                    </span>
                    <button
                        type="button"
                        tabIndex={-1}
                        className="flex items-center justify-center w-7 h-7 rounded-full bg-black text-white shrink-0"
                        aria-hidden="true"
                    >
                        <FiSend className="w-3 h-3" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConversationalPreview;