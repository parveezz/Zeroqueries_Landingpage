"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/Components/ui/Button";

const navLinks = [
  { name: "Platform", href: "/platform" },
  { name: "Solutions", href: "/solutions" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const pathname = usePathname();
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

  // Auto-close menu on path change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full font-sans transition-all duration-300 ${isScrolled || mobileMenuOpen
          ? "bg-white/85 backdrop-blur-xl backdrop-saturate-150 border-b border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-white/65 backdrop-blur-lg backdrop-saturate-150 border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          } text-black`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between pl-4 pr-0 sm:px-10 lg:px-14">
          <div className="flex items-center gap-8 lg:gap-10 xl:gap-12">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/zerologo.png"
                alt="ZeroQueries logo"
                width={50}
                height={35}
                className="h-auto w-auto max-h-[32px] sm:max-h-[36px]"
                priority
              />
              <span className="text-[19px] sm:text-[22px] font-light tracking-tight text-black">
                ZeroQueries
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden items-center gap-7 lg:flex xl:gap-8">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`block py-2 text-[15px] transition-colors focus-visible:outline-none focus-visible:text-[#6434F5] ${isActive
                      ? "font-medium text-[#6434F5]"
                      : "font-normal text-black/80 hover:text-[#6434F5]"
                      }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
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

            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-xl px-4 py-2.5 h-auto text-[15px] font-normal hover:border-black transition-colors"
              >
                Log in
              </Button>
            </Link>
          </div>

          {/* Mobile toggle button */}
          <button
            type="button"
            className="flex items-center justify-center p-2 pr-0 text-black/80 hover:text-black transition-colors lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
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
                className="h-5 w-5"
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

        {/* Mobile menu dropdown panel */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-[70px] z-50 max-h-[calc(100dvh-70px)] overflow-y-auto bg-white/95 backdrop-blur-2xl border-b border-gray-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.12)] px-4 py-4 lg:hidden">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.href !== "/" && pathname?.startsWith(link.href));

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[15px] transition-colors ${isActive
                      ? "bg-[#6434F5]/10 font-medium text-[#6434F5]"
                      : "font-normal text-black/80 hover:bg-gray-100/70 hover:text-black active:bg-gray-100"
                      }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#6434F5]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTAs */}
            <div className="mt-4 pt-3.5 border-t border-gray-100 flex flex-col gap-2">
              <Link href="/demo" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full rounded-xl py-2.5 h-auto text-[15px] font-normal shadow-sm">
                  Book a Demo
                </Button>
              </Link>

              <div className="grid grid-cols-2 gap-2">
                <Link href="#" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-2.5 h-auto text-[14px] font-normal"
                  >
                    Start Free
                  </Button>
                </Link>

                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full rounded-xl py-2.5 h-auto text-[14px] font-normal hover:border-black"
                  >
                    Log in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 top-[70px] bg-black/20 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}