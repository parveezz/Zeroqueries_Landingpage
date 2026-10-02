"use client";

import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiArrowRight,
  FiGlobe,
} from "react-icons/fi";

const office = {
  city: "Hyderabad",
  country: "India",
  address: "HITEC City, Madhapur",
  postal: "Hyderabad, Telangana 500081",
  phone: "+91 40 4567 8900",
  hours: "Mon – Fri: 9:00 AM – 6:00 PM IST",
  timezone: "IST (UTC +5:30)",
};

export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      <div className="space-y-3">
        <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
          Our Location
        </span>
        <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight leading-snug">
          Based in Hyderabad, India
        </h2>
        <p className="text-black/70 text-sm sm:text-base leading-relaxed font-light">
          We operate from HITEC City — one of India&apos;s leading technology hubs
          — supporting enterprise customers across the globe with a single,
          focused team.
        </p>
      </div>

      {/* Highlights List */}
      <div className="space-y-4">
        {/* Card 1: Office Detail */}
        <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
            <FiMapPin className="h-5 w-5" />
          </div>
          <div className="w-full">
            <h3 className="text-base font-medium text-black tracking-tight">
              {office.city}{" "}
              <span className="text-black/60 font-light">· {office.country}</span>
            </h3>
            <p className="mt-1 text-sm text-black/70 leading-relaxed font-light">
              {office.address}, {office.postal}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black/80 px-2.5 py-1 rounded-md text-xs font-normal">
                <FiPhone className="h-3.5 w-3.5 text-black/60" />
                {office.phone}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black/80 px-2.5 py-1 rounded-md text-xs font-normal">
                <FiClock className="h-3.5 w-3.5 text-black/60" />
                {office.hours}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black/80 px-2.5 py-1 rounded-md text-xs font-normal">
                <FiGlobe className="h-3.5 w-3.5 text-black/60" />
                {office.timezone}
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: Demo */}
        <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
            <FiMessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-medium text-black tracking-tight">
              Looking for a live product demo?
            </h3>
            <p className="mt-1 text-sm text-black/70 leading-relaxed font-light">
              Schedule a 1-on-1 walkthrough tailored to your company&apos;s
              data warehouse and business workflows.
            </p>
            <div className="mt-3">
              <Link
                href="/demo"
                className="inline-flex items-center gap-1.5 text-sm font-normal text-black hover:underline"
              >
                <span>Book Enterprise Demo</span>
                <FiArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Contact SLA Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
              <FiMail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-[11px] font-medium text-black/60 uppercase tracking-[0.15em]">
                Direct Sales Inquiries
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
                Guaranteed SLA
              </div>
              <div className="text-sm font-normal text-black">
                Within 24 Hours
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
