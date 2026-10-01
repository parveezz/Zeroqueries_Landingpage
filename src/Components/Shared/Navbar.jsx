"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Customers", href: "/customers" },
  { name: "Company", href: "/company" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-white/65 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
      } text-gray-900`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-10 xl:gap-12">
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/zerologo.png"
              alt="ZeroQueries logo"
              width={60}
              height={40}
              priority
            />
            <span className="hidden text-[22px] font-bold tracking-tight text-[#1a1b1e] sm:block">
              ZeroQueries
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-[15px] font-medium text-gray-800 transition-colors hover:text-[#6434F5]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="#"
            className="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[15px] font-medium text-gray-900 transition-colors hover:bg-gray-50"
          >
            Start for Free
          </Link>

          <Link
            href="#"
            className="rounded-xl bg-[#6434F5] px-5 py-2.5 text-[15px] font-medium text-white transition-colors hover:bg-[#5527e0]"
          >
            Book a Demo
          </Link>
        </div>

        <button
          type="button"
          className="p-2 text-gray-700 hover:text-gray-900 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="space-y-4 border-t border-gray-200/50 bg-white/85 backdrop-blur-xl backdrop-saturate-150 px-6 py-5 shadow-xl lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-base font-medium text-gray-800 transition-colors hover:text-[#6434F5]"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2.5 border-t border-gray-200/50 pt-3">
            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-xl border border-gray-200/80 bg-white/70 px-5 py-2.5 text-center text-[15px] font-medium text-gray-900 hover:bg-white transition-colors"
            >
              Start for Free
            </Link>

            <Link
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full rounded-xl bg-[#6434F5] px-5 py-2.5 text-center text-[15px] font-medium text-white hover:bg-[#5527e0]"
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}