"use client";

import { useState } from "react";
import Link from "next/link";
import {
    FiZap,
    FiCheck,
    FiShield,
    FiLock,
    FiBarChart2,
    FiClock,
    FiChevronDown,
    FiMic,
    FiShare2,
    FiSmartphone,
} from "react-icons/fi";
import { FaWhatsapp, FaFileExcel } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";
import FinalCTA from "@/Components/Home/CTAsection";

const CAPABILITIES_EN = [
    {
        icon: FiSmartphone,
        title: "Zero Apps to Download",
        description:
            "Your executive team already opens WhatsApp fifty times a day. ZeroQueries gives them real-time business answers directly in their favorite messaging app.",
    },
    {
        icon: FiMic,
        title: "Voice Notes to SQL",
        description:
            "On the move? Send a voice message asking 'How did sales perform in EMEA yesterday?' ZeroQueries transcribes, executes the SQL, and replies with structured text in seconds.",
    },
    {
        icon: FiClock,
        title: "Scheduled Morning KPI Briefings",
        description:
            "Receive an automated 8:00 AM summary every morning with revenue, active user counts, and churn alerts delivered directly to your private chat or executive group.",
    },
    {
        icon: FiBarChart2,
        title: "Clean Mobile Visualizations",
        description:
            "Get crisp, mobile-optimized charts and data summaries designed for fast scanning on small screens — complete with instant spreadsheet export options.",
    },
    {
        icon: FiLock,
        title: "Verified Phone Number Authentication",
        description:
            "Each team member's access is tied to their verified business phone number, enforcing organizational role permissions down to specific tables and columns.",
    },
    {
        icon: FiShield,
        title: "Enterprise Encryption & Privacy",
        description:
            "Transport-level TLS 1.3 encryption combined with our zero data persistence architecture ensures query records and customer datasets are never saved or cached.",
    },
];

const CAPABILITIES_AR = [
    {
        icon: FiSmartphone,
        title: "بدون أي تطبيقات إضافية",
        description:
            "يفتح فريقك التنفيذي واتساب عشرات المرات يومياً. تمنحهم ZeroQueries إجابات فورية لأعمالهم مباشرة في تطبيق المراسلة المفضل لديهم.",
    },
    {
        icon: FiMic,
        title: "تحويل الملاحظات الصوتية إلى SQL",
        description:
            "أثناء التنقل؟ أرسل تسجيلاً صوتياً تسأل فيه: «كيف كان أداء المبيعات بالأمس؟» تقوم ZeroQueries بنسخ الصوت وتوليد الاستعلام والرد في ثوانٍ.",
    },
    {
        icon: FiClock,
        title: "موجز صباحي مجدول لمؤشرات الأداء",
        description:
            "استلم تقريراً تلقائياً في الساعة 8:00 صباحاً يتضمن الإيرادات والمستخدمين النشطين وتنبيهات الأداء مباشرة في محادثتك أو مجموعة الإدارة.",
    },
    {
        icon: FiBarChart2,
        title: "تصورات بيانية أنيقة لشاشات الجوال",
        description:
            "احصل على مخططات ورسوم بيانية واضحة ومصممة خصيصاً للقراءة السريعة على شاشات الجوال — مع إمكانية التصدير الفوري لجداول البيانات.",
    },
    {
        icon: FiLock,
        title: "توثيق موثوق برقم الهاتف المعتمد",
        description:
            "يرتبط وصول كل عضو برقم هاتفه المعتمد في العمل، مع تطبيق صلاحيات أمان صارمة تحدد الجداول والأعمدة المصرح بالاطلاع عليها.",
    },
    {
        icon: FiShield,
        title: "تشفير وحماية على مستوى المؤسسات",
        description:
            "تشفير TLS 1.3 على مستوى النقل مع بنية تمنع تخزين البيانات تماماً تضمن عدم حفظ أو تخزين استعلاماتك أو بيانات عملائك إطلاقاً.",
    },
];

const SETUP_STEPS_EN = [
    {
        step: "01",
        title: "Start WhatsApp Chat",
        description:
            "Click 'Chat on WhatsApp' or scan the QR code to open a secure direct conversation with the official ZeroQueries Business bot.",
    },
    {
        step: "02",
        title: "Verify Your Organization",
        description:
            "Enter the 6-digit one-time passkey provided by your company's ZeroQueries administrator to link your workspace permissions.",
    },
    {
        step: "03",
        title: "Ask Any Business Question",
        description:
            "Text or send a voice note asking for any KPI, trend, or comparison. Get verified numbers and interactive charts instantly.",
    },
];

const SETUP_STEPS_AR = [
    {
        step: "01",
        title: "ابدأ محادثة واتساب",
        description:
            "انقر على «المحادثة عبر واتساب» أو امسح رمز QR لبدء محادثة مشفرة ومباشرة مع بوت ZeroQueries الرسمي للأعمال.",
    },
    {
        step: "02",
        title: "تحقق من مؤسستك",
        description:
            "أدخل رمز المرور المكون من 6 أرقام والمقدم من مسؤول ZeroQueries في شركتك لربط صلاحيات الوصول الخاصة بك.",
    },
    {
        step: "03",
        title: "اطرح أي سؤال حول بياناتك",
        description:
            "أرسل رسالة نصية أو ملاحظة صوتية تطلب فيها أي مؤشر أداء أو مقارنة، واحصل على أرقام موثوقة ورسوم بيانية فوراً.",
    },
];

const FAQS_EN = [
    {
        q: "How does ZeroQueries verify user access in WhatsApp?",
        a: "Users authenticate via a secure one-time passkey generated in your company's ZeroQueries admin console. Access is bound to their verified business phone number and can be revoked instantly at any time.",
    },
    {
        q: "Can ZeroQueries read my personal WhatsApp messages?",
        a: "No. ZeroQueries is an enterprise WhatsApp Business bot that only processes messages sent directly to its dedicated chat. It has zero visibility into any other conversations on your device.",
    },
    {
        q: "Does ZeroQueries store data returned in WhatsApp chats?",
        a: "No. We enforce a strict zero-persistence policy. Queries are processed in memory against your read-only database connections and discarded once the message payload is sent.",
    },
    {
        q: "Can we use voice notes to query data?",
        a: "Yes. You can record a voice note in WhatsApp asking any natural language question. ZeroQueries accurately transcribes your speech, constructs the SQL query, and replies with formatted data.",
    },
];

const FAQS_AR = [
    {
        q: "كيف تتحقق ZeroQueries من وصول المستخدم في واتساب؟",
        a: "يتم التحقق عبر رمز مرور أمني لمرة واحدة يتم إنشاؤه من لوحة تحكم إدارة ZeroQueries في شركتك، ويكون الوصول مقترناً برقم هاتف العمل المعتمد ويمكن إلغاؤه في أي لحظة.",
    },
    {
        q: "هل يمكن لـ ZeroQueries قراءة رسائلي الشخصية في واتساب؟",
        a: "كلا على الإطلاق. ZeroQueries هو بوت أعمال رسمي لمعالجة الرسائل المرسلة مباشرة إلى محادثته المخصصة فقط، وليس لديه أي وصول لمحادثاتك الأخرى على جهازك.",
    },
    {
        q: "هل تخزن ZeroQueries البيانات المعروضة في محادثات واتساب؟",
        a: "كلا. نطبق سياسة عدم حفظ البيانات تماماً (Zero-Persistence). تُعالج الاستعلامات في الذاكرة الحية فقط عبر اتصال القراءة المشفر لقواعد بياناتك وتُمسح فور إرسال الإجابة.",
    },
    {
        q: "هل يمكننا استخدام الملاحظات الصوتية لطرح الأسئلة؟",
        a: "نعم بالتأكيد. يمكنك تسجيل ملاحظة صوتية بأي لغة طبيعية، وسيقوم البوت بنسخ الكلام بدقة وبناء استعلام SQL وإرجاع النتائج منسقة في ثوانٍ.",
    },
];

export default function WhatsAppPage() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";
    const capabilities = isAr ? CAPABILITIES_AR : CAPABILITIES_EN;
    const setupSteps = isAr ? SETUP_STEPS_AR : SETUP_STEPS_EN;
    const faqs = isAr ? FAQS_AR : FAQS_EN;

    const [activeFaq, setActiveFaq] = useState(null);

    return (
        <main className="w-full font-sans text-black bg-white overflow-hidden">
            {/* ================= HERO ================= */}
            <section className="relative w-full bg-gray-50 font-sans text-black pt-16 sm:pt-20 lg:pt-24 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-14 overflow-hidden border-b border-gray-200">
                {/* Dot grid */}
                <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

                {/* Ambient glow */}
                <div
                    className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
                    style={{
                        background:
                            "radial-gradient(ellipse, rgba(37, 211, 102, 0.10) 0%, rgba(37, 211, 102, 0.02) 45%, transparent 75%)",
                        filter: "blur(80px)",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase text-black/70 shadow-2xs">
                        <FiZap className="w-3.5 h-3.5 text-[#25D366]" strokeWidth={2.25} />
                        {isAr ? "تكامل رسمي معتمد" : "Official Integration"}
                    </span>

                    {/* Heading */}
                    <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl lg:text-[56px] font-light tracking-tight text-black leading-[1.1]">
                        {isAr ? (
                            <>
                                ZeroQueries عبر{" "}
                                <span className="text-[#25D366] font-normal">واتساب</span>
                            </>
                        ) : (
                            <>
                                ZeroQueries for{" "}
                                <span className="text-[#25D366] font-normal">WhatsApp</span>
                            </>
                        )}
                    </h1>

                    {/* Description */}
                    <p className="mt-5 sm:mt-6 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-xl mx-auto">
                        {isAr
                            ? "اطرح الأسئلة واستعلم من قواعد بياناتك واستلم تحليلات ورؤى فورية — مباشرة داخل محادثات واتساب الخاصة بك."
                            : "Ask questions, query your databases, and receive instant data insights — directly inside your WhatsApp conversations."}
                    </p>

                    {/* Primary CTA */}
                    <div className="mt-9 sm:mt-10 flex justify-center">
                        <a
                            href="https://wa.me/918121910307?text=Hi%20ZeroQueries"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white px-6 sm:px-7 py-3.5 sm:py-4 text-sm sm:text-[15px] font-medium hover:bg-[#20ba59] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 shadow-xs"
                            aria-label="Chat with ZeroQueries on WhatsApp"
                        >
                            <FaWhatsapp className="w-5 h-5" />
                            <span>{isAr ? "محادثة عبر واتساب" : "Chat on WhatsApp"}</span>
                        </a>
                    </div>

                    {/* Terms */}
                    <p className="mt-6 sm:mt-7 text-[11px] sm:text-xs text-black/50 font-light">
                        {isAr ? (
                            <>
                                باستخدامك ZeroQueries، فإنك توافق على{" "}
                                <Link
                                    href="/privacy"
                                    className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
                                >
                                    سياسة الخصوصية
                                </Link>{" "}
                                و{" "}
                                <Link
                                    href="/tos"
                                    className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
                                >
                                    شروط الخدمة
                                </Link>
                                .
                            </>
                        ) : (
                            <>
                                By using ZeroQueries, you agree to our{" "}
                                <Link
                                    href="/privacy"
                                    className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
                                >
                                    Privacy Policy
                                </Link>{" "}
                                &amp;{" "}
                                <Link
                                    href="/tos"
                                    className="text-black/70 underline underline-offset-4 hover:text-black transition-colors"
                                >
                                    Terms of Service
                                </Link>
                                .
                            </>
                        )}
                    </p>

                    {/* Trust line */}
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] font-medium tracking-[0.15em] uppercase text-black/40">
                        <span>{isAr ? "شهادة SOC 2 النوع الثاني" : "SOC 2 Type II"}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" aria-hidden="true" />
                        <span>{isAr ? "وصول للقراءة فقط" : "Read-only access"}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" aria-hidden="true" />
                        <span>{isAr ? "لا يتم تخزين أي بيانات" : "No data stored"}</span>
                    </div>
                </div>
            </section>

            {/* ================= WHATSAPP CONVERSATION PREVIEW ================= */}
            <section className="relative w-full bg-white py-14 sm:py-20 px-4 sm:px-8 lg:px-14 overflow-hidden border-b border-gray-200">
                <div className="relative z-10 mx-auto max-w-xl">
                    <div className="rounded-3xl border border-gray-200 bg-[#efeae2] overflow-hidden shadow-xl">
                        {/* WhatsApp Header */}
                        <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 bg-[#075E54] text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs">
                                    ZQ
                                </div>
                                <div>
                                    <div className="text-sm font-semibold leading-tight">ZeroQueries AI</div>
                                    <div className="text-[11px] text-white/70">
                                        {isAr ? "حساب أعمال موثق ومعتمد" : "Verified Business Account"}
                                    </div>
                                </div>
                            </div>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        </div>

                        {/* WhatsApp Message stream */}
                        <div className="p-4 sm:p-6 space-y-4">
                            {/* User bubble */}
                            <div className="flex justify-end">
                                <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-[#d9fdd3] p-3 text-sm text-black shadow-xs">
                                    <p className="font-light">
                                        {isAr
                                            ? "اعرض لي إجمالي الإيرادات الشهرية وأفضل منطقة أداءً لهذا الربع."
                                            : "Show me total monthly revenue and top performing region for this quarter."}
                                    </p>
                                    <div className="text-[10px] text-black/40 text-right mt-1">10:14 AM ✓✓</div>
                                </div>
                            </div>

                            {/* Bot bubble */}
                            <div className="flex justify-start">
                                <div className="max-w-[90%] rounded-2xl rounded-tl-xs bg-white p-4 text-sm text-black shadow-xs space-y-2.5">
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#075E54]">
                                        <span>📊</span>
                                        <span>{isAr ? "ملخص ZeroQueries" : "ZeroQueries Summary"}</span>
                                    </div>
                                    <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed">
                                        {isAr ? (
                                            <>
                                                بلغ إجمالي الإيرادات هذا الربع <strong className="text-black font-semibold">1.42M$</strong> (+14.8% مقارنة بالربع السابق).
                                            </>
                                        ) : (
                                            <>
                                                Total revenue this quarter reached <strong className="text-black font-semibold">$1.42M</strong> (+14.8% QoQ).
                                            </>
                                        )}
                                    </p>
                                    <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-mono space-y-1">
                                        <div className="flex justify-between">
                                            <span className="text-black/60">{isAr ? "أمريكا الشمالية:" : "North America:"}</span>
                                            <span className="font-semibold text-black">$820,000 (57.7%)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-black/60">{isAr ? "الشرق الأوسط وأوروبا:" : "EMEA:"}</span>
                                            <span className="font-semibold text-black">$460,000 (32.4%)</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-black/60">{isAr ? "آسيا والمحيط الهادئ:" : "APAC:"}</span>
                                            <span className="font-semibold text-black">$140,000 (9.9%)</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-black/60 font-light">
                                        {isAr ? (
                                            <>
                                                💡 <em>رؤية: قادت أمريكا الشمالية 68% من ترقيات الاشتراكات للشركات الكبرى.</em>
                                            </>
                                        ) : (
                                            <>
                                                💡 <em>Insight: North America drove 68% of new enterprise tier upsells.</em>
                                            </>
                                        )}
                                    </p>
                                    <div className="text-[10px] text-black/40 text-right pt-1">10:14 AM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ================= CAPABILITIES GRID ================= */}
            <section className="relative w-full py-20 sm:py-24 px-6 sm:px-10 lg:px-14 bg-gray-50/50">
                <div className="mx-auto max-w-7xl">
                    <div className="max-w-2xl mb-14">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            {isAr ? "إمكانيات متميزة" : "Capabilities"}
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                            {isAr ? "ذكاء أعمال مصمم ليتناسب مع أسلوب تواصل القادة." : "Business intelligence built for how leaders chat."}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {capabilities.map((cap) => {
                            const Icon = cap.icon;
                            return (
                                <div
                                    key={cap.title}
                                    className="rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-gray-400 hover:shadow-xs"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center mb-4">
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
            <section className="relative w-full bg-white py-20 sm:py-24 px-6 sm:px-10 lg:px-14 border-y border-gray-200">
                <div className="mx-auto max-w-7xl">
                    <div className="text-center max-w-2xl mx-auto mb-14">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            {isAr ? "إعداد سريع وسهل" : "Quick Setup"}
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight text-black">
                            {isAr ? "ابدأ المحادثة في دقيقتين فقط." : "Start chatting in two minutes."}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {setupSteps.map((s) => (
                            <div
                                key={s.step}
                                className="relative rounded-2xl border border-gray-200 bg-gray-50/60 p-6 sm:p-7 shadow-xs"
                            >
                                <span className="text-2xl font-light text-[#25D366] font-mono">
                                    {s.step}
                                </span>
                                <h3 className="mt-3 text-lg font-medium text-black">
                                    {s.title}
                                </h3>
                                <p className="mt-2 text-xs sm:text-sm text-black/60 font-light leading-relaxed">
                                    {s.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= FAQS ================= */}
            <section className="relative w-full py-20 sm:py-24 px-6 sm:px-10 lg:px-14 bg-gray-50/40">
                <div className="mx-auto max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-black" />
                            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
                        </span>
                        <h2 className="mt-3 text-2xl sm:text-3xl font-light tracking-tight text-black">
                            {isAr ? "أسئلة شائعة حول التكامل مع واتساب" : "Questions about WhatsApp Integration?"}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, idx) => {
                            const isOpen = activeFaq === idx;
                            return (
                                <div
                                    key={faq.q}
                                    className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-colors"
                                >
                                    <button
                                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-medium text-black hover:text-[#25D366] transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <FiChevronDown
                                            className={`w-4 h-4 text-black/50 transition-transform duration-200 ${
                                                isOpen ? "rotate-180" : ""
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
