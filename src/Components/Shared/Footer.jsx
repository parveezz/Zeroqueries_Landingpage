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

// Translations
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

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("idle"); // idle | loading | success | error
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
    <footer className="w-full border-t border-gray-200/80 bg-gray-50/70 font-sans text-black">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-8 sm:pb-12">

        {/* ================= MAIN FOOTER ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info & Social */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5 sm:space-y-6 text-left">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/zerologo.png"
                alt="ZeroQueries logo"
                width={50}
                height={35}
                className="h-8 sm:h-9 w-auto object-contain"
              />
              <span className="text-[20px] sm:text-[22px] font-light tracking-tight text-black">
                ZeroQueries
              </span>
            </Link>

            <p className="text-sm sm:text-[15px] leading-relaxed text-black/60 font-light max-w-sm">
              {t.tagline}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-1 max-w-sm">
              <label className="block text-xs font-medium uppercase tracking-[0.1em] text-black/50 mb-2">
                {lang === "ar" ? "اشترك في النشرة الإخبارية" : "Subscribe to Updates"}
              </label>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder={lang === "ar" ? "بريدك الإلكتروني" : "Enter your email"}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 min-w-0 px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white placeholder-black/30 focus:outline-none focus:border-[#6434F5] focus:ring-1 focus:ring-[#6434F5]"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === "loading"}
                  className="px-4 py-2 text-xs sm:text-sm font-medium rounded-xl bg-black text-white hover:bg-[#6434F5] transition-colors disabled:opacity-50 whitespace-nowrap cursor-pointer"
                >
                  {newsletterStatus === "loading"
                    ? (lang === "ar" ? "..." : "...")
                    : (lang === "ar" ? "اشتراك" : "Join")}
                </button>
              </form>
              {newsletterMsg && (
                <p className={`text-xs mt-1.5 font-light ${newsletterStatus === "success" ? "text-emerald-600" : "text-rose-500"}`}>
                  {newsletterMsg}
                </p>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1 justify-start">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-black/60 transition-colors hover:border-[#6434F5] hover:bg-purple-50 hover:text-[#6434F5] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-8 lg:col-span-7 xl:col-span-7 pt-2 lg:pt-0 text-left">
            {/* Company */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                {t.columns.company}
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {t.company.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Integrations */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                {t.columns.integrations}
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {t.integrations.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      <span>{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                {t.columns.legal}
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {t.legal.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-black/50 font-light text-left">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}