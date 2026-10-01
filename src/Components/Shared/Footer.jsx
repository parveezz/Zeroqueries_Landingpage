"use client";

import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";

const footerNavigation = {
  platform: [
    { name: "Platform Overview", href: "/platform" },
    { name: "AI Semantic Layer", href: "/platform#semantic-layer" },
    { name: "Autonomous Insights", href: "/platform#insights" },
    { name: "Live Query Engine", href: "/platform#query-engine" },
    { name: "Enterprise Connectors", href: "/platform#connectors" },
    { name: "Pricing & Plans", href: "/pricing" },
  ],
  solutions: [
    { name: "Financial Analytics", href: "/solutions#finance" },
    { name: "Healthcare & Life Sciences", href: "/solutions#healthcare" },
    { name: "Retail & E-Commerce", href: "/solutions#retail" },
    { name: "Supply Chain & Ops", href: "/solutions#supply-chain" },
    { name: "Product & Growth Teams", href: "/solutions#growth" },
    { name: "Executive Dashboards", href: "/solutions#executive" },
  ],
  company: [
    { name: "About ZeroQueries", href: "/company" },
    { name: "Customers & Case Studies", href: "/customers" },
    { name: "Careers", href: "/careers", badge: "We're hiring" },
    { name: "News & Press", href: "/press" },
    { name: "Contact Us", href: "/contact" },
    { name: "Book a Demo", href: "/demo" },
  ],
  resources: [
    { name: "Documentation", href: "/resources#docs" },
    { name: "API Reference", href: "/resources#api" },
    { name: "Community & Forum", href: "/resources#community" },
    { name: "Security & SOC2", href: "/security" },
    { name: "System Status", href: "https://status.zeroqueries.com", external: true },
    { name: "Resource Library", href: "/resources" },
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
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14 pt-16 pb-12">
        {/* Top Grid: Brand & Links */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand Info & Status */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <Image
                src="/zerologo.png"
                alt="ZeroQueries logo"
                width={50}
                height={35}
                className="h-9 w-auto object-contain"
              />
              <span className="text-[22px] font-light tracking-tight text-black">
                ZeroQueries
              </span>
            </Link>

            <p className="text-sm sm:text-[15px] leading-relaxed text-black/60 font-light max-w-sm">
              AI-Powered Decision Intelligence. Transform raw enterprise data
              into instant, verified answers without query friction.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/70 px-3.5 py-1.5 text-xs font-normal text-black/70">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-black/60 transition-colors hover:border-[#6434F5] hover:bg-purple-50 hover:text-[#6434F5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8 xl:col-span-8">
            {/* Column 1: Platform */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Platform
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Solutions
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-[#6434F5]">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-black/40">
                Resources
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.resources.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                      >
                        <span>{link.name}</span>
                        <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-normal text-black/70 transition-colors hover:text-[#6434F5]"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-14 pt-8 border-t border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-black/50 font-light">
          <p>© {new Date().getFullYear()} ZeroQueries, Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-[#6434F5] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#6434F5] transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-[#6434F5] transition-colors">
              Security & Compliance
            </Link>
            <Link href="/cookies" className="hover:text-[#6434F5] transition-colors">
              Cookie Preferences
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}