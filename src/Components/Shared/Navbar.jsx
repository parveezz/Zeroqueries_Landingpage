"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/Components/ui/Button";
import { FiUser, FiGlobe, FiChevronDown, FiCheck } from "react-icons/fi";
import { useLanguage } from "@/context/LanguageContext";

const languages = [
  { code: "en", label: "English" },
  { code: "ar", label: "العربية" },
];

function LangDropdown({ currentLang = "en", onLangChange = () => { }, size = "desktop" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const isMobile = size === "mobile";
  const current = languages.find((l) => l.code === currentLang) || languages[0];

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  const renderIcon = (lang, iconSize = 15) => {
    if (lang.code === "en") return <FiGlobe size={iconSize} />;
    return (
      <span className="font-bold leading-none" style={{ fontSize: iconSize - 2 }}>
        ع
      </span>
    );
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${current.label}`}
        className={`flex items-center gap-2 rounded-xl font-medium text-black/70 transition-colors hover:bg-gray-100/70 hover:text-black ${isMobile ? "px-2 py-1.5 text-[13px]" : "px-3 py-2 text-[13.5px]"
          }`}
      >
        {renderIcon(current, isMobile ? 14 : 15)}
        <span>{current.label}</span>
        <FiChevronDown
          size={isMobile ? 12 : 13}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+6px)] z-[60] min-w-[160px] rounded-xl border border-gray-200 bg-white p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
        >
          {languages.map((lang) => {
            const isActive = lang.code === currentLang;
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onLangChange(lang.code);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[14px] transition-colors ${isActive
                    ? "bg-[#6434F5]/10 font-medium text-[#6434F5]"
                    : "text-black/80 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    {renderIcon(lang, 15)}
                    <span>{lang.label}</span>
                  </span>
                  {isActive && <FiCheck size={14} />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang: currentLang, setLang: handleLangChange } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isAr = currentLang === "ar";

  const t = {
    platform: isAr ? "المنصة" : "Platform",
    solutions: isAr ? "الحلول" : "Solutions",
    pricing: isAr ? "الأسعار" : "Pricing",
    resources: isAr ? "الموارد" : "Resources",
    contact: isAr ? "اتصل بنا" : "Contact",
    bookDemo: isAr ? "احجز عرضاً" : "Book a Demo",
    login: isAr ? "تسجيل الدخول" : "Log in",
  };

  const navLinks = [
    { name: t.platform, href: "/platform" },
    { name: t.solutions, href: "/solutions" },
    { name: t.pricing, href: "/pricing" },
    { name: t.resources, href: "/resources" },
    { name: t.contact, href: "/contact" },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-50 w-full relative font-sans transition-all duration-300 ${isScrolled || mobileMenuOpen
          ? "bg-white/85 backdrop-blur-xl border-b border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)]"
          : "bg-white/65 backdrop-blur-lg border-b border-gray-200/50 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          } text-black`}
      >
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-14">
          <div className="flex items-center gap-8 lg:gap-10 xl:gap-12">
            {/* Logo — icon always visible, text hidden below sm */}
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/zerologo.png"
                alt="ZeroQueries logo"
                width={50}
                height={35}
                className="h-auto w-auto max-h-[32px] sm:max-h-[36px]"
                priority
              />
              <span className="hidden sm:inline text-[19px] sm:text-[22px] font-light tracking-tight text-black">
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
                    key={link.href}
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

          {/* Desktop right side */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/demo">
              <Button className="rounded-xl px-5 py-2.5 h-auto text-[15px] font-normal">
                {t.bookDemo}
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-xl pl-3 pr-4 py-2.5 h-auto text-[15px] font-normal hover:border-black transition-colors"
              >
                <span className="inline-flex items-center gap-2">
                  <FiUser size={15} />
                  {t.login}
                </span>
              </Button>
            </Link>
            <div className="ml-1 pl-3 border-l border-gray-200/80">
              <LangDropdown currentLang={currentLang} onLangChange={handleLangChange} />
            </div>
          </div>

          {/* Mobile right controls — always visible below lg */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:hidden">
            <LangDropdown
              currentLang={currentLang}
              onLangChange={handleLangChange}
              size="mobile"
            />

            <button
              type="button"
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-black/80 hover:text-black hover:bg-gray-100/70 active:bg-gray-200/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5]"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                    }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transition-opacity duration-200 ease-in-out ${mobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                />
                <span
                  className={`block h-0.5 w-5 bg-current rounded-full transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                    }`}
                />
              </div>
            </button>
          </div>
        </div>

      </nav>

      {/* Mobile menu panel — rendered outside <nav> so it's directly fixed to the screen */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[70px] z-50 bg-white border-b border-gray-200 shadow-2xl px-5 py-5 max-h-[calc(100dvh-70px)] overflow-y-auto"
        >
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-[16px] transition-colors ${isActive
                    ? "bg-[#6434F5]/10 font-semibold text-[#6434F5]"
                    : "font-medium text-gray-900 hover:bg-gray-100 hover:text-black"
                    }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#6434F5]" />}
                </Link>
              );
            })}
          </div>

          <div className="mt-5 pt-4 border-t border-gray-100 flex flex-col gap-2.5">
            <Link
              href="/demo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl py-3 text-[15px] font-semibold text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors text-center"
            >
              {t.bookDemo}
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex w-full items-center justify-center rounded-xl py-3 text-[15px] font-medium border border-gray-200 bg-white text-gray-900 hover:border-black transition-colors text-center"
            >
              <span className="inline-flex items-center gap-2">
                <FiUser size={15} />
                {t.login}
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 top-[70px] z-40 bg-black/40 backdrop-blur-xs"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}