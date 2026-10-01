"use client";

export default function Workspace() {
    return (
        // 1. Changed to WHITE background, added responsive horizontal padding (px)
        <div className="relative w-full min-h-screen bg-white text-gray-900 py-12 px-8 md:px-16 lg:px-24 flex flex-col xl:flex-row items-center justify-between gap-10 overflow-hidden">

            {/* Subtle Light Grid Pattern (Optional) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

            {/* ================= LEFT SIDE: ALL OF YOUR DATA ================= */}
            {/* 2. Reduced width from 320px to 260px */}
            <div className="relative z-10 w-full xl:w-[260px] flex flex-col gap-4">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-1 uppercase">
                    All of your data
                </h3>

                {/* Structured Data Card - Reduced Padding & Font Sizes */}
                <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-3.5">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="bg-purple-100 p-1.5 rounded-md">
                            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
                        </div>
                        <span className="font-semibold text-sm">Structured Data</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs px-2.5 py-1.5 rounded-md text-left w-fit transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Salesforce
                        </button>
                        <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs px-2.5 py-1.5 rounded-md text-left w-fit transition-colors">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> HubSpot
                        </button>
                        <div className="flex gap-1.5">
                            <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs px-2.5 py-1.5 rounded-md text-left transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Snowflake
                            </button>
                            <button className="flex items-center justify-center bg-gray-50 hover:bg-gray-100 border border-gray-100 text-xs w-7 h-7 rounded-md transition-colors">
                                ++
                            </button>
                        </div>
                    </div>
                </div>

                {/* Unstructured Card - Reduced Padding & Font Sizes */}
                <div className="border border-teal-100 bg-teal-50/30 rounded-xl p-3.5">
                    <div className="flex items-center gap-2.5 mb-3">
                        <div className="bg-teal-100 p-1.5 rounded-md">
                            <svg className="w-3.5 h-3.5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                        </div>
                        <span className="font-semibold text-sm">Unstructured</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                        <button className="bg-white border border-gray-100 hover:bg-gray-50 text-xs px-2.5 py-1.5 rounded-md transition-colors">Gong</button>
                        <button className="bg-white border border-gray-100 hover:bg-gray-50 text-xs px-2.5 py-1.5 rounded-md transition-colors">Excel</button>
                        <div className="flex gap-1.5 w-full">
                            <button className="flex items-center gap-2 bg-white border border-gray-100 hover:bg-gray-50 text-xs px-2.5 py-1.5 rounded-md transition-colors">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> PDF
                            </button>
                            <button className="flex items-center justify-center bg-white border border-gray-100 hover:bg-gray-50 text-xs w-7 h-7 rounded-md transition-colors">
                                ++
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashed Connection Line (Left to Center) */}
                <div className="hidden xl:block absolute top-1/2 -right-10 w-10 border-t-2 border-dashed border-purple-300"></div>
            </div>


            {/* ================= CENTER: INPUT BAR ================= */}
            {/* 3. Reduced max-width and overall padding to make it smaller */}
            <div className="relative z-10 flex-1 max-w-lg w-full">
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-lg shadow-gray-200/50">
                    <p className="text-sm font-medium mb-4 leading-relaxed text-gray-800">
                        Why did pipeline drop 18% week-over-week? Break down by segment, stage, and rep.
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex gap-1.5">
                            <button className="flex items-center gap-1.5 bg-purple-600 text-white px-2.5 py-1 rounded-full text-[11px] font-medium">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                Insight
                            </button>
                            <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                                Mission
                            </button>
                            <button className="flex items-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Work Product
                            </button>
                        </div>
                        <button className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                            Send
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </button>
                    </div>
                </div>

                {/* Tags below input - Smaller */}
                <div className="flex justify-center gap-2 mt-3">
                    {["RevOps", "Pharma", "CPG", "FP&A"].map((tag) => (
                        <span key={tag} className="bg-gray-50 text-gray-600 text-[11px] px-3 py-1 rounded-full border border-gray-200">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Dashed Connection Line (Center to Right) */}
                <div className="hidden xl:block absolute top-1/2 -right-10 w-10 border-t-2 border-dashed border-teal-300"></div>
            </div>


            {/* ================= RIGHT SIDE: OUTPUTS ================= */}
            {/* 4. Reduced width from 320px to 260px */}
            <div className="relative z-10 w-full xl:w-[260px] flex flex-col gap-3">
                <h3 className="text-[10px] font-bold tracking-[0.2em] text-gray-400 mb-1 uppercase text-right">
                    Outputs
                </h3>

                {/* Insights & Analysis - Reduced Padding & Font */}
                <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-3 flex items-center gap-3 relative overflow-hidden group hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-900">Insights & Analysis</h4>
                        <p className="text-[10px] text-gray-500">Automated investigation</p>
                    </div>
                    <span className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-green-500"></span>
                </div>

                {/* Missions */}
                <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-3 flex items-center gap-3 group hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-900">Missions</h4>
                        <p className="text-[10px] text-gray-500">Runs your analysis 24/7</p>
                    </div>
                </div>

                {/* Finished Outputs */}
                <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-3 flex items-center gap-3 group hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-900">Finished Outputs</h4>
                        <p className="text-[10px] text-gray-500">Ready to present, no cleanup</p>
                    </div>
                </div>

                {/* Agentic Apps */}
                <div className="border border-gray-200 bg-white shadow-sm rounded-xl p-3 flex items-center gap-3 group hover:border-purple-200 hover:shadow-md transition-all">
                    <div className="bg-purple-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    </div>
                    <div>
                        <h4 className="font-semibold text-xs text-gray-900">Agentic Apps</h4>
                        <p className="text-[10px] text-gray-500">Self-service tools</p>
                    </div>
                </div>

            </div>
        </div>
    );
}