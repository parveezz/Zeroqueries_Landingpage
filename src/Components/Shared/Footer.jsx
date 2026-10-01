"use client";

import Link from "next/link";
import Image from "next/image";
import { FiGithub, FiTwitter, FiLinkedin, FiYoutube, FiArrowUpRight } from "react-icons/fi";

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
    { name: "Leadership", href: "/company#leadership" },
    { name: "Contact Sales", href: "#demo" },
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
  { name: "LinkedIn", href: "https://linkedin.com", icon: FiLinkedin },
  { name: "Twitter", href: "https://twitter.com", icon: FiTwitter },
  { name: "GitHub", href: "https://github.com", icon: FiGithub },
  { name: "YouTube", href: "https://youtube.com", icon: FiYoutube },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200/80 bg-gray-50/70 font-sans text-gray-900">
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
              <span className="text-[22px] font-bold tracking-tight text-[#1a1b1e]">
                ZeroQueries
              </span>
            </Link>

            <p className="text-sm sm:text-[15px] leading-relaxed text-gray-600 max-w-sm">
              AI-Powered Decision Intelligence. Transform raw enterprise data into instant, verified answers without query friction.
            </p>

            {/* Status Indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50/80 px-3.5 py-1.5 text-xs font-medium text-gray-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
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
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:border-[#6434F5] hover:bg-purple-50 hover:text-[#6434F5]"
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Platform
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.platform.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-[#6434F5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Solutions */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Solutions
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.solutions.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-[#6434F5]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Company
              </h3>
              <ul className="mt-4 space-y-3">
                {footerNavigation.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-[#6434F5]"
                    >
                      <span>{link.name}</span>
                      {link.badge && (
                        <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-[#6434F5]">
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
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
                        className="inline-flex items-center gap-1 text-sm font-medium text-gray-700 transition-colors hover:text-[#6434F5]"
                      >
                        <span>{link.name}</span>
                        <FiArrowUpRight className="h-3.5 w-3.5 opacity-60" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm font-medium text-gray-700 transition-colors hover:text-[#6434F5]"
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
        <div className="mt-14 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} ZeroQueries, Inc. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6 text-gray-600">
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
