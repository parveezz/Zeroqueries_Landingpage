"use client";

import { FiHash, FiBarChart2 } from "react-icons/fi";
import { FaSlack, FaFileExcel } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

export default function SlackConversation() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <section className="relative w-full bg-gray-50 font-sans text-black py-14 sm:py-20 px-4 sm:px-8 lg:px-14 overflow-hidden border-b border-gray-200">
      {/* Dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ================= SLACK WINDOW ================= */}
        <div className="rounded-2xl sm:rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-[0_16px_45px_-20px_rgba(0,0,0,0.15)]">

          {/* ============ WINDOW CHROME / CHANNEL HEADER ============ */}
          <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 sm:px-5 py-3 sm:py-3.5">
            <div className="flex items-center gap-3 min-w-0">
              {/* Three dots (Slack-style window controls) */}
              <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              </div>

              {/* Channel name */}
              <div className="flex items-center gap-1.5 min-w-0">
                <FiHash className="w-4 h-4 text-black/60 shrink-0" />
                <span className="text-sm font-medium text-black truncate">
                  data-intelligence
                </span>
                <span className="hidden sm:inline text-xs text-black/40 font-light ml-1">
                  | {isAr ? "60 عضواً" : "60 members"}
                </span>
              </div>
            </div>

            {/* Yesterday chip */}
            <span className="hidden sm:inline-flex shrink-0 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-black/60">
              {isAr ? "أمس" : "Yesterday"}
            </span>
          </div>

          {/* ============ MESSAGES AREA ============ */}
          <div className="px-4 sm:px-6 py-5 sm:py-6 space-y-5 sm:space-y-6">

            {/* ------------- USER MESSAGE ------------- */}
            <div className="flex items-start gap-3">
              {/* Avatar */}
              <div className="flex items-center justify-center w-9 h-9 rounded-md bg-black text-white text-sm font-medium shrink-0">
                J
              </div>

              <div className="flex-1 min-w-0">
                {/* Name + timestamp */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-black">
                    John Doe
                  </span>
                  <span className="text-[11px] text-black/40 font-light">
                    9:35 AM
                  </span>
                </div>

                {/* Message content */}
                <p className="mt-1 text-sm text-black font-light leading-relaxed">
                  <span className="inline-flex items-center rounded bg-gray-100 px-1.5 py-0.5 text-[13px] font-medium text-black mr-1.5">
                    @ZeroQueries
                  </span>
                  {isAr ? "ما هو إجمالي عدد المستخدمين؟" : "What is the total number of users?"}
                </p>
              </div>
            </div>

            {/* ------------- AI BOT RESPONSE ------------- */}
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">

              {/* Bot header bar */}
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Bot avatar */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-black text-white shrink-0">
                    <FiBarChart2 className="w-4 h-4" />
                  </div>

                  {/* Bot name + APP tag */}
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span className="text-sm font-semibold text-black">
                      ZeroQueriesBot
                    </span>
                    <span className="inline-flex items-center rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[9px] font-medium tracking-[0.1em] uppercase text-black/60">
                      {isAr ? "تطبيق" : "App"}
                    </span>
                    <span className="text-[11px] text-black/40 font-light">
                      9:36 AM
                    </span>
                  </div>
                </div>

                {/* Reaction pill */}
                <div className="hidden sm:flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1 text-[11px] text-black/50 shrink-0">
                  <span>✅</span>
                  <span>2</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>{isAr ? "تفاعل" : "React"}</span>
                  <span className="w-px h-3 bg-gray-200" />
                  <span>{isAr ? "رد" : "Reply"}</span>
                </div>
              </div>

              {/* Bot content */}
              <div className="px-4 sm:px-5 py-4 sm:py-5 space-y-4 sm:space-y-5">

                {/* Section: Intelligent Analysis title */}
                <div className="flex items-center gap-2">
                  <span className="text-base leading-none">✨</span>
                  <span className="text-sm font-semibold text-black tracking-tight">
                    {isAr ? "التحليل الذكي من ZeroQueries" : "ZeroQueries Intelligent Analysis"}
                  </span>
                </div>

                {/* -------- Answer -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm leading-none">📊</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "الإجابة:" : "Answer:"}
                    </span>
                  </div>
                  <p className="text-sm text-black/70 font-light leading-relaxed pl-6">
                    {isAr ? (
                      <>
                        إجمالي عدد المستخدمين في مجموعة البيانات هو{" "}
                        <span className="font-medium text-black">60</span> مستخدماً.
                      </>
                    ) : (
                      <>
                        The total number of users in the dataset is{" "}
                        <span className="font-medium text-black">60</span>.
                      </>
                    )}
                  </p>
                </div>

                {/* -------- Executed SQL -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm leading-none">💻</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "استعلام SQL المنفذ:" : "Executed SQL:"}
                    </span>
                  </div>

                  {/* Code block */}
                  <div className="rounded-lg border border-gray-800 bg-gray-900 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-gray-800">
                      <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">
                        sql
                      </span>
                    </div>
                    <pre className="px-3.5 py-3 overflow-x-auto">
                      <code className="font-mono text-[12.5px] leading-relaxed text-gray-100">
                        SELECT COUNT(DISTINCT u.id) AS{" "}
                        <span className="text-emerald-400">total_users</span>{" "}
                        FROM users u;
                      </code>
                    </pre>
                  </div>
                </div>

                {/* -------- KPIs -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm leading-none">📈</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "مؤشرات الأداء الرئيسية (KPIs):" : "Key Performance Indicators (KPIs):"}
                    </span>
                  </div>
                  <ul className="pl-6 space-y-1.5">
                    <li className="relative text-sm text-black/70 font-light leading-relaxed pl-4">
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-black/60" />
                      <span className="font-medium text-black">{isAr ? "إجمالي المستخدمين:" : "Total Users:"}</span>{" "}
                      {isAr
                        ? "60 (العدد الإجمالي للمستخدمين الفريدين المسجلين في مجموعة البيانات.)"
                        : "60 (The total count of unique users in the dataset.)"}
                    </li>
                  </ul>
                </div>

                {/* -------- Insights -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm leading-none">💡</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "الرؤى والتحليلات:" : "Insights:"}
                    </span>
                  </div>
                  <ul className="pl-6 space-y-2">
                    <li className="relative text-sm text-black/70 font-light leading-relaxed pl-4">
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-black/60" />
                      <span className="font-medium text-black">{isAr ? "توزيع المستخدمين:" : "User Distribution:"}</span>{" "}
                      {isAr
                        ? "تحتوي مجموعة البيانات على 60 مستخدماً فريداً، مما يشير إلى قاعدة مستخدمين متنوعة. يساعد فهم الخصائص الديموغرافية والسلوكيات في تخصيص المنتجات أو الخدمات لتلبية احتياجاتهم على نحو أفضل."
                        : "The dataset contains 60 unique users, indicating a diverse user base. Understanding the demographics, behaviors, and preferences of these users can help tailor products or services to better meet their needs."}
                    </li>
                    <li className="relative text-sm text-black/70 font-light leading-relaxed pl-4">
                      <span className="absolute left-0 top-2 w-1 h-1 rounded-full bg-black/60" />
                      <span className="font-medium text-black">{isAr ? "نمو المستخدمين:" : "User Growth:"}</span>{" "}
                      {isAr
                        ? "وصل إجمالي عدد المستخدمين إلى 60، مما يظهر نمواً واعداً في اكتساب المستخدمين وتسجيلهم بمرور الوقت. يساعد رصد هذا الاتجاه في تقييم فعالية استراتيجيات التسويق والمنتجات."
                        : "The total number of users has reached 60, showing potential growth in user acquisition or registration over time. Monitoring this trend can help assess the effectiveness of marketing strategies or product offerings."}
                    </li>
                  </ul>
                </div>

                {/* -------- Data Preview -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-sm leading-none">📄</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "معاينة البيانات:" : "Data Preview:"}
                    </span>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <pre className="font-mono text-[12.5px] text-black/80 leading-relaxed">
                      <span className="text-black/50">1.</span>{" "}
                      total_users:{" "}
                      <span className="font-medium text-emerald-600">60</span>
                    </pre>
                  </div>
                </div>

                {/* -------- Analysis Chart -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="text-sm leading-none">📊</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "مخطط التحليل البياني" : "Analysis Chart"}
                    </span>
                  </div>

                  {/* Chart card */}
                  <div className="rounded-xl border border-gray-200 bg-white overflow-hidden max-w-md">
                    {/* Chart header */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-100">
                      <span className="text-xs font-medium text-black">
                        {isAr ? "توزيع المستخدمين" : "User Distribution"}
                      </span>
                      <span className="text-black/30 text-xs">⋮</span>
                    </div>

                    {/* Chart canvas */}
                    <div className="p-5">
                      <div className="rounded-lg border border-gray-100 bg-gray-50/40 p-6 flex items-center justify-center min-h-[180px]">
                        {/* Single-bar chart — the blue bar with "60" */}
                        <div className="flex flex-col items-center">
                          <div className="w-32 h-32 rounded-md bg-[#2563EB] flex items-center justify-center text-white font-medium text-lg shadow-sm">
                            60
                          </div>
                        </div>
                      </div>

                      {/* X-axis label */}
                      <div className="mt-3 pt-2 border-t border-gray-100 text-center text-[11px] text-black/50 font-light">
                        {isAr ? "إجمالي المستخدمين" : "Total Users"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* -------- Excel Spreadsheet -------- */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm leading-none">📊</span>
                    <span className="text-[13px] font-semibold text-black">
                      {isAr ? "جدول بيانات Excel" : "Excel Spreadsheet"}
                    </span>
                  </div>

                  {/* Excel download card */}
                  <a
                    href="#"
                    className="group flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3 hover:border-gray-400 transition-colors max-w-md"
                  >
                    {/* Excel icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                      <FaFileExcel className="w-5 h-5" />
                    </div>

                    {/* File meta */}
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-black truncate">
                        Report_053bf29c-16a6-48f0-a3f0-25f24175cb8...
                      </div>
                      <div className="text-[11px] text-black/50 font-light">
                        {isAr ? "جدول بيانات Excel" : "Excel Spreadsheet"}
                      </div>
                    </div>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Optional caption below */}
        <p className="mt-5 text-center text-[11px] sm:text-xs text-black/50 font-light">
          {isAr
            ? "تعمل ZeroQueries داخل قنوات سلاك التي يستخدمها فريقك بالفعل كل يوم."
            : "ZeroQueries works inside the Slack channels your team already uses."}
        </p>
      </div>
    </section>
  );
}
