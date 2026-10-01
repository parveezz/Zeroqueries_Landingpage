"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/Components/ui/Button";

const navLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Customers", href: "/customers" },
  { name: "Contact", href: "/contact" },
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${isScrolled || mobileMenuOpen
          ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-white/65 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
        } text-black`}
    >
      <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-10 xl:gap-12">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2.5">
            <Image
              src="/zerologo.png"
              alt="ZeroQueries logo"
              width={60}
              height={40}
              priority
            />
            <span className="hidden text-[22px] font-light tracking-tight text-black sm:block">
              ZeroQueries
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center gap-7 lg:flex xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block py-2 text-[15px] font-normal text-black/80 transition-colors hover:text-[#6434F5] focus-visible:outline-none focus-visible:text-[#6434F5]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link href="#">
            <Button
              variant="outline"
              className="rounded-xl px-5 py-2.5 h-auto text-[15px] font-normal"
            >
              Start for Free
            </Button>
          </Link>

          <Link href="/demo">
            <Button className="rounded-xl px-5 py-2.5 h-auto text-[15px] font-normal">
              Book a Demo
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="p-2 text-black/70 hover:text-black transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] rounded-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
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
                strokeWidth="1.75"
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
                strokeWidth="1.75"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="space-y-4 border-t border-gray-200/50 bg-white/85 backdrop-blur-xl backdrop-saturate-150 px-6 py-5 shadow-xl lg:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-base font-normal text-black/80 transition-colors hover:text-[#6434F5]"
            >
              {link.name}
            </Link>
          ))}

          <div className="flex flex-col gap-2.5 border-t border-gray-200/50 pt-3">
            <Link href="#" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant="outline"
                className="w-full rounded-xl py-2.5 h-auto text-[15px] font-normal"
              >
                Start for Free
              </Button>
            </Link>

            <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full rounded-xl py-2.5 h-auto text-[15px] font-normal">
                Book a Demo
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}