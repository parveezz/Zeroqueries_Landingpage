"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const footerNavigation = {
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
};

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

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-gray-50/70 font-sans text-black">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 lg:px-14 pt-12 sm:pt-16 pb-8 sm:pb-12">

        {/* ================= MAIN FOOTER: BRAND & COLUMNS ================= */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Brand Info & Status */}
          <div className="lg:col-span-5 xl:col-span-5 space-y-5 sm:space-y-6">
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
              AI-Powered Decision Intelligence. Transform raw enterprise data
              into instant, verified answers without query friction.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200/90 bg-white/80 px-3.5 py-1.5 text-xs font-normal text-black/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1 sm:pt-2">
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

          {/* Links Columns: Company, Integrations, Legal */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 sm:gap-8 lg:col-span-7 xl:col-span-7 pt-2 lg:pt-0">
            {/* Column 1: Company */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Company
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {footerNavigation.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex flex-wrap items-center gap-1.5 py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-[#6434F5] whitespace-nowrap">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Integrations */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Integrations
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {footerNavigation.integrations.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                      >
                        <span>{link.name}</span>
                        <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-block py-0.5 text-[13.5px] sm:text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Legal */}
            <div className="col-span-2 sm:col-span-1">
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Legal
              </h3>
              <ul className="mt-4 space-y-2.5 sm:space-y-3">
                {footerNavigation.legal.map((link) => (
                  <li key={link.name}>
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
        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-black/50 font-light">
          <p>© {new Date().getFullYear()} ZeroQueries, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}