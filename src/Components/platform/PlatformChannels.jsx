"use client";

import Link from "next/link";
import { FiArrowUpRight, FiGlobe } from "react-icons/fi";
import { FaWhatsapp, FaSlack } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const CHANNELS_EN = [
    {
        name: "WhatsApp",
        icon: FaWhatsapp,
        description:
            "Ask ZeroQueries right inside WhatsApp — get answers, charts, and summaries as if you were chatting with a colleague.",
        status: "Available now",
        color: "#25D366",
        href: "/whatsapp",
    },
    {
        name: "Slack",
        icon: FaSlack,
        description:
            "Summon ZeroQueries in any channel with /ask. Answers appear where your team already works — no context switching.",
        status: "Available now",
        color: "#611f69",
        href: "/slack",
    },
    {
        name: "Web App",
        icon: FiGlobe,
        description:
            "The full ZeroQueries canvas — dashboards, saved questions, and deeper drill-downs for teams who live in the browser.",
        status: "Included on all plans",
        color: "#111827",
        href: "/login",
    },
];

const CHANNELS_AR = [
    {
        name: "واتساب",
        icon: FaWhatsapp,
        description:
            "اسأل ZeroQueries مباشرة من تطبيق واتساب — احصل على إجابات ومخططات وملخصات فورية كأنك تتحدث مع زميلك في العمل.",
        status: "متاح الآن",
        color: "#25D366",
        href: "/whatsapp",
    },
    {
        name: "سلاك",
        icon: FaSlack,
        description:
            "استدعِ ZeroQueries في أي قناة عبر أمر /ask. تظهر الإجابات مباشرة حيث يعمل فريقك دون الحاجة للتنقل بين التطبيقات.",
        status: "متاح الآن",
        color: "#611f69",
        href: "/slack",
    },
    {
        name: "تطبيق الويب",
        icon: FiGlobe,
        description:
            "منصة ZeroQueries المتكاملة — لوحات معلومات، تحليلات معمقة، واستعلامات متقدمة للفرق التي تفضل العمل عبر المتصفح.",
        status: "متاح في كافة الباقات",
        color: "#111827",
        href: "/login",
    },
];

export default function PlatformChannels() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const channels = isAr ? CHANNELS_AR : CHANNELS_EN;

    return (
        <section className="relative w-full bg-white font-sans text-black py-20 sm:py-24 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                {/* ================= HEADING ================= */}
                <div className="max-w-3xl mb-14 sm:mb-16">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        {isAr ? "أين يمكنك استخدامه" : "Where You Can Use It"}
                    </span>

                    <h2 className="mt-4 text-3xl sm:text-4xl lg:text-[52px] font-light tracking-tight text-black leading-[1.1]">
                        {isAr ? (
                            <>
                                اطرح أسئلتك من أي مكان.
                                <br />
                                <span className="text-black/40">الإجابات تصلك أينما كنت.</span>
                            </>
                        ) : (
                            <>
                                Ask from anywhere.
                                <br />
                                <span className="text-black/40">Answers follow you.</span>
                            </>
                        )}
                    </h2>

                    <p className="mt-5 text-base text-black/60 leading-relaxed font-light max-w-xl">
                        {isAr
                            ? "يعمل ZeroQueries داخل الأدوات التي يستعملها فريقك يومياً. نفس الأسئلة وبنفس الدقة — سواء كنت على واتساب أو سلاك أو عبر الويب."
                            : "ZeroQueries lives inside the tools your team already uses. Same questions, same answers — whether you're on WhatsApp, in Slack, or on the web."}
                    </p>
                </div>

                {/* ================= CHANNELS GRID ================= */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {channels.map((channel) => (
                        <ChannelCard key={channel.name} channel={channel} />
                    ))}
                </div>

                {/* ================= FOOTNOTE ================= */}
                <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 pt-8 border-t border-gray-200">
                    <p className="text-xs text-black/50 font-light">
                        {isAr
                            ? "قنوات إضافية قيد الإطلاق قريباً — تشمل Microsoft Teams والبريد الإلكتروني."
                            : "More channels rolling out — including Microsoft Teams and Email."}
                    </p>
                </div>
            </div>
        </section>
    );
}

// ============== CHANNEL CARD ==============
function ChannelCard({ channel }) {
    const Icon = channel.icon;

    return (
        <Link
            href={channel.href}
            className="group relative flex flex-col rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-gray-400"
        >
            {/* Icon + Title row — title sits beside the icon */}
            <div className="flex items-center gap-3">
                {/* Icon */}
                <div
                    className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl text-white shrink-0"
                    style={{ backgroundColor: channel.color }}
                >
                    <Icon className="w-5 h-5" />
                </div>

                {/* Title */}
                <h3 className="flex-1 text-base sm:text-lg font-medium tracking-tight text-black leading-tight">
                    {channel.name}
                </h3>

                {/* Arrow */}
                <span className="flex items-center justify-center w-7 h-7 rounded-full border border-gray-200 text-black/40 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all shrink-0">
                    <FiArrowUpRight className="w-3.5 h-3.5" />
                </span>
            </div>

            {/* Description */}
            <p className="mt-3 text-[13px] sm:text-sm text-black/60 leading-relaxed font-light flex-1">
                {channel.description}
            </p>

            {/* Status */}
            <div className="mt-3.5 pt-3 border-t border-gray-100 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="text-[10.5px] sm:text-[11px] font-medium tracking-[0.15em] uppercase text-black/50">
                    {channel.status}
                </span>
            </div>
        </Link>
    );
}