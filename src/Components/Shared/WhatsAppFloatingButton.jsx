"use client";

import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { useLanguage } from "@/context/LanguageContext";

export default function WhatsAppFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <aside
      aria-label="WhatsApp quick chat"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 select-none"
    >
      {/* Tooltip badge */}
      <div
        className={`hidden sm:flex items-center gap-2 rounded-full border border-gray-200/90 bg-white px-3.5 py-1.5 shadow-sm transition-all duration-300 ${
          isHovered
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-2 scale-95 pointer-events-none"
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#25D366]" />
        <span className="text-xs font-medium text-black/80 whitespace-nowrap">
          {isAr ? "تواصل معنا عبر واتساب" : "Chat on WhatsApp"}
        </span>
      </div>

      {/* Floating button */}
      <a
        href="https://wa.me/918121910307?text=Hi%20ZeroQueries%2C%20I%20have%20a%20question%20about%20the%20platform"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isAr ? "تواصل مع ZeroQueries عبر واتساب" : "Chat with ZeroQueries on WhatsApp"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-md transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-[#20ba59] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
      >
        {/* WhatsApp Icon */}
        <FaWhatsapp className="w-7 h-7 transition-transform duration-200 group-hover:scale-105" />
      </a>
    </aside>
  );
}
