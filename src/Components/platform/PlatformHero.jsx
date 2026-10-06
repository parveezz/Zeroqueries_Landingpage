"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function PlatformHero() {
    const { lang } = useLanguage();
    const isAr = lang === "ar";

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-14 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-7xl">
                <div className="max-w-4xl">
                    <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        {isAr ? "المنصة" : "Platform"}
                    </span>

                    <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[64px] font-light tracking-tight text-black leading-[1.05]">
                        {isAr ? (
                            <>
                                بياناتك،
                                <br />
                                <span className="text-black/40">على بُعد سؤال واحد.</span>
                            </>
                        ) : (
                            <>
                                Your data,
                                <br />
                                <span className="text-black/40">one question away.</span>
                            </>
                        )}
                    </h1>

                    <p className="mt-6 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-2xl">
                        {isAr
                            ? "يتصل ZeroQueries بكل مستودع بيانات وقاعدة بيانات ومخزن مستندات لديك — ويحوّل الأسئلة باللغة البسيطة إلى إجابات حية وموثوقة. من واتساب، من سلاك، ومن أي مكان."
                            : "ZeroQueries connects to every warehouse, database, and document store you already run — and turns plain-language questions into live, verified answers. From WhatsApp. From Slack. From anywhere."}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        <Link
                            href="/demo"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-black text-white px-6 py-3.5 text-sm font-normal hover:bg-gray-800 transition-colors"
                        >
                            {isAr ? "احجز عرضاً توضيحياً" : "Book a Demo"}
                        </Link>
                        <Link
                            href="/signup"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-gray-200 bg-white text-black px-6 py-3.5 text-sm font-normal hover:border-gray-400 transition-colors"
                        >
                            {isAr ? "ابدأ مجاناً" : "Start for Free"}
                        </Link>
                    </div>

                    {/* Trust line */}
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium tracking-[0.15em] uppercase text-black/40">
                        <span>SOC 2 Type II</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" />
                        <span>{isAr ? "جاهز للتوافق مع HIPAA" : "HIPAA Ready"}</span>
                        <span className="w-1 h-1 rounded-full bg-black/20" />
                        <span>{isAr ? "تشفير 256-بت" : "256-bit Encryption"}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
