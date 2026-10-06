"use client";

import Link from "next/link";
import {
  FiPhone,
  FiMapPin,
  FiClock,
  FiGlobe,
  FiNavigation,
  FiArrowUpRight,
  FiMessageSquare,
  FiArrowRight,
  FiMail,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa6";

import { useLanguage } from "@/context/LanguageContext";

const companyDetails = {
  name: "Invertio Software Solutions",
  product: "ZeroQueries",
  addressEn: "Tolichowki, Hyderabad, Telangana 500008, India",
  addressAr: "توليتشوكي، حيدر أباد، تيلانجانا 500008، الهند",
  phone: "+91 81219 10307",
  website: "invertiosolutions.com",
  websiteUrl: "https://invertiosolutions.com",
  hoursEn: "Mon – Fri · 9:00 AM – 6:00 PM IST",
  hoursAr: "الاثنين – الجمعة · 9:00 ص – 6:00 م بتوقيت الهند",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Invertio+software+solution+pvt+ltd+Tolichowki+Hyderabad",
};

export default function ContactInfo() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col gap-6 sm:gap-8 font-sans">
      {/* ================= HEADING ================= */}
      <div className="space-y-3">
        <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
          {isAr ? "معلومات التواصل" : "Contact"}
        </span>
        <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight leading-snug">
          {isAr ? "تحدث مع الفريق وراء ZeroQueries" : "Talk to the team behind ZeroQueries"}
        </h2>
        <p className="text-black/70 text-sm sm:text-base leading-relaxed font-light">
          {isAr
            ? "تم تطوير ZeroQueries بواسطة Invertio Software Solutions. تواصل معنا للحصول على عروض تقديمية للمنتج، أو خيارات النشر للمؤسسات، أو الدعم الفني المباشر."
            : "ZeroQueries is built by Invertio Software Solutions in Hyderabad. Reach out for product walkthroughs, enterprise deployments, or technical support."}
        </p>
      </div>

      {/* ================= MAIN CONTACT CARD ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 transition-colors hover:border-gray-300">
        {/* Detail rows */}
        <div className="space-y-4 pt-2 text-xs sm:text-sm">
          <DetailRow
            icon={FiMapPin}
            label={isAr ? "المقر" : "Office"}
            value={isAr ? companyDetails.addressAr : companyDetails.addressEn}
          />

          <DetailRow
            icon={FiClock}
            label={isAr ? "أوقات العمل" : "Hours"}
            value={isAr ? companyDetails.hoursAr : companyDetails.hoursEn}
          />

          <DetailRow
            icon={FiPhone}
            label={isAr ? "الهاتف" : "Phone"}
            value={companyDetails.phone}
            href={`tel:${companyDetails.phone}`}
          />

          <DetailRow
            icon={FiGlobe}
            label={isAr ? "الموقع الإلكتروني" : "Website"}
            value={companyDetails.website}
            href={companyDetails.websiteUrl}
            external
          />
        </div>
      </div>

      {/* ================= SLA CARD ================= */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
              <FiMail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-black/60 uppercase tracking-[0.15em]">
                {isAr ? "المبيعات" : "Sales"}
              </div>
              <a
                href="mailto:sales@zeroqueries.com"
                className="text-sm font-normal text-black hover:underline transition-colors"
              >
                sales@zeroqueries.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3.5 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
              <FiClock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-black/60 uppercase tracking-[0.15em]">
                {isAr ? "سرعة الاستجابة" : "Response time"}
              </div>
              <div className="text-sm font-normal text-black">
                {isAr ? "خلال 24 ساعة" : "Within 24 hours"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// ACTION BUTTON
// ============================================================================
function ActionButton({ href, icon: Icon, label, variant = "default", external }) {
  const isWhatsApp = variant === "whatsapp";

  const baseClasses =
    "group flex flex-col items-center justify-center gap-1.5 rounded-xl border p-3 text-center transition-colors";

  const colorClasses = isWhatsApp
    ? "border-emerald-200 bg-emerald-50/50 hover:border-emerald-500 hover:bg-emerald-100/60"
    : "border-gray-200 bg-gray-50/60 hover:border-gray-400 hover:bg-gray-100";

  const iconBgClasses = isWhatsApp
    ? "bg-white border border-emerald-300 text-emerald-600"
    : "bg-white border border-gray-200 text-black";

  const labelClasses = isWhatsApp ? "text-emerald-800" : "text-black";

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`${baseClasses} ${colorClasses}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${iconBgClasses}`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={`text-xs font-medium ${labelClasses}`}>{label}</span>
    </a>
  );
}

// ============================================================================
// DETAIL ROW
// ============================================================================
function DetailRow({ icon: Icon, label, value, href, external }) {
  const valueContent = href ? (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="mt-0.5 inline-flex items-center gap-1 text-black hover:underline underline-offset-4 transition-colors font-normal"
    >
      <span>{value}</span>
      {external && <FiArrowUpRight className="w-3.5 h-3.5" />}
    </a>
  ) : (
    <p className="mt-0.5 text-black/80 font-light leading-relaxed">{value}</p>
  );

  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-black">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium text-black/50 uppercase tracking-wider block">
          {label}
        </span>
        {valueContent}
      </div>
    </div>
  );
}