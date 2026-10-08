"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/invertio-software-solution/home/",
    icon: FaLinkedinIn,
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/Invertio_s",
    icon: FaXTwitter,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/invertiotechsolutions?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D",
    icon: FaInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/Invertio-Software-Solutions/61554332513059/",
    icon: FaFacebookF,
  },
];

// Translations (Kept exactly as your original)
const content = {
  en: {
    tagline:
      "AI-Powered Decision Intelligence. Transform raw enterprise data into instant, verified answers without query friction.",
    columns: {
      company: "Company",
      integrations: "Integrations",
      legal: "Legal",
    },
    company: [
      { name: "Home", href: "/" },
      { name: "Pricing & Plans", href: "/pricing" },
      { name: "Book a Demo", href: "/demo" },
      { name: "Contact Us", href: "/contact" },
    ],
    integrations: [
      { name: "WhatsApp", href: "/whatsapp" },
      { name: "Slack", href: "/slack" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/tos" },
      { name: "Support", href: "/support" },
      { name: "Sub Processors", href: "/sub-processor" },
      { name: "Cookie Preferences", href: "/cookies" },
    ],
    copyright: `© ${new Date().getFullYear()} ZeroQueries, Inc. All rights reserved.`,
  },
  ar: {
    tagline:
      "ذكاء القرار المدعوم بالذكاء الاصطناعي. حوّل بيانات مؤسستك الخام إلى إجابات فورية وموثقة دون أي تعقيد.",
    columns: {
      company: "الشركة",
      integrations: "التكاملات",
      legal: "قانوني",
    },
    company: [
      { name: "الرئيسية", href: "/" },
      { name: "الأسعار والخطط", href: "/pricing" },
      { name: "احجز عرضاً", href: "/demo" },
      { name: "اتصل بنا", href: "/contact" },
    ],
    integrations: [
      { name: "واتساب", href: "/whatsapp" },
      { name: "سلاك", href: "/slack" },
    ],
    legal: [
      { name: "سياسة الخصوصية", href: "/privacy" },
      { name: "شروط الخدمة", href: "/tos" },
      { name: "الدعم", href: "/support" },
      { name: "معالجو البيانات الفرعيون", href: "/sub-processor" },
      { name: "إعدادات ملفات تعريف الارتباط", href: "/cookies" },
    ],
    copyright: `© ${new Date().getFullYear()} ZeroQueries, Inc. جميع الحقوق محفوظة.`,
  },
};

export default function Footer({ lang: propLang }) {
  const { lang: contextLang } = useLanguage();
  const lang = propLang || contextLang || "en";
  const t = content[lang] || content.en;
  const isAr = lang === "ar";

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle");
  const [newsletterMsg, setNewsletterMsg] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterStatus("loading");
    setNewsletterMsg("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setNewsletterStatus("success");
        setNewsletterMsg(
          lang === "ar"
            ? "شكراً لاشتراكك في نشرتنا الإخبارية!"
            : "Thank you for subscribing to our updates!"
        );
        setNewsletterEmail("");
      } else {
        setNewsletterStatus("error");
        setNewsletterMsg(data.error || (lang === "ar" ? "حدث خطأ ما." : "Something went wrong."));
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      setNewsletterStatus("error");
      setNewsletterMsg(lang === "ar" ? "تعذر الإرسال حالياً." : "Could not subscribe at this time.");
    }
  };

  return (
    <footer className="w-full font-sans" dir={isAr ? "rtl" : "ltr"}>
      {/* Main Container */}
      <div className="relative w-full bg-gradient-to-br from-[#0f172a] via-[#134e4a] to-[#020617] text-white overflow-hidden rounded-t-[2rem]">

        {/* Subtle overlay for the diagonal light ray effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

        {/* Reduced overall padding: pt-10 pb-6 (was pt-20 pb-10) */}
        <div className="relative mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 pt-10 pb-6">

          {/* ================= TOP CTA SECTION ================= */}
          {/* Reduced bottom margin/padding: mb-8 pb-6 (was mb-16 pb-12) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-6 border-b border-white/10">
            <div className="max-w-xl text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                {isAr ? "ابدأ تجربتك المجانية لمدة 30 يوماً" : "Start your 30-day free trial"}
              </h2>
              <p className="text-white/70 text-sm sm:text-base leading-relaxed">
                {isAr
                  ? "بدون أي ضغط - سنوضح لك كيفية عمل منصتنا، لتقرر ما إذا كانت التجربة مناسبة لك."
                  : "No pressure—we’ll show you how our platform works, so you can decide if a trial is right for you."}
              </p>
            </div>

            <Link
              href="/signup"
              className="shrink-0 bg-white text-[#0f172a] px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-colors shadow-lg active:scale-95"
            >
              {isAr ? "ابدأ مجاناً" : "Start For Free"}
            </Link>
          </div>

          {/* ================= MAIN FOOTER LINKS ================= */}
          {/* Reduced gap: gap-8 lg:gap-6 (was gap-12 lg:gap-8) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 text-left">

            {/* Logo Column */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-flex items-center gap-2.5 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-white/10 rounded flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold tracking-tight text-white">
                    ZeroQueries
                  </span>
                </div>
              </Link>
            </div>

            {/* Links Columns */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">

              {/* Company Column */}
              <div>
                <h3 className="text-xs font-semibold text-white/50 mb-3 tracking-wide">
                  {t.columns.company}
                </h3>
                <ul className="space-y-2">
                  {t.company.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-medium text-white hover:text-[#5eead4] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Integrations Column */}
              <div>
                <h3 className="text-xs font-semibold text-white/50 mb-3 tracking-wide">
                  {t.columns.integrations}
                </h3>
                <ul className="space-y-2">
                  {t.integrations.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-medium text-white hover:text-[#5eead4] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Column */}
              <div>
                <h3 className="text-xs font-semibold text-white/50 mb-3 tracking-wide">
                  {t.columns.legal}
                </h3>
                <ul className="space-y-2">
                  {t.legal.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm font-medium text-white hover:text-[#5eead4] transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ================= BOTTOM COPYRIGHT & SOCIAL ================= */}
          {/* Reduced top margin/padding: mt-10 pt-6 (was mt-20 pt-8) */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60 font-light">
              {t.copyright}
            </p>

            <div className="flex items-center gap-4">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="text-white/70 hover:text-[#5eead4] transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}