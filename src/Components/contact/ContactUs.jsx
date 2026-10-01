"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiMessageSquare,
  FiCheck,
  FiArrowRight,
  FiGlobe,
  FiHelpCircle,
} from "react-icons/fi";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";

const contactChannels = [
  {
    icon: FiMail,
    title: "Sales & Inquiries",
    description:
      "Talk with our team about plans, pricing, and tailored deployments.",
    contact: "sales@zeroqueries.com",
    href: "mailto:sales@zeroqueries.com",
    badge: "< 2 hr response",
  },
  {
    icon: FiHelpCircle,
    title: "Technical Support",
    description:
      "Help with connectors, integrations, and workspace configuration.",
    contact: "support@zeroqueries.com",
    href: "mailto:support@zeroqueries.com",
    badge: "24/7 for Enterprise",
  },
  {
    icon: FiGlobe,
    title: "Partnerships & Press",
    description: "Collaborations, technology alliances, and media requests.",
    contact: "partners@zeroqueries.com",
    href: "mailto:partners@zeroqueries.com",
    badge: "Global Relations",
  },
];

const office = {
  city: "Hyderabad",
  country: "India",
  address: "HITEC City, Madhapur",
  postal: "Hyderabad, Telangana 500081",
  phone: "+91 40 4567 8900",
  hours: "Mon – Fri: 9:00 AM – 6:00 PM IST",
  timezone: "IST (UTC +5:30)",
};

const inquiryTopics = [
  "General Inquiry",
  "Enterprise Sales",
  "Product Support",
  "Partnership",
  "Other",
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: "General Inquiry",
      message: "",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-50 font-sans text-black overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Soft neutral glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-gray-200/50 via-gray-100/30 to-transparent blur-[110px] rounded-full" />

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-black text-xs font-medium tracking-[0.2em] uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
            Contact & Support
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.15]">
            Get in touch with ZeroQueries
          </h1>

          <p className="mt-5 text-base sm:text-lg text-black leading-relaxed max-w-2xl mx-auto font-light">
            Have questions about our AI decision platform, need dedicated
            enterprise support, or want to explore partnership opportunities?
            Our team in Hyderabad is here to help.
          </p>
        </div>

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-3">
              <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
                Our Location
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight leading-snug">
                Based in Hyderabad, India
              </h2>
              <p className="text-black text-base leading-relaxed font-light">
                We operate from HITEC City — one of India&apos;s leading
                technology hubs — supporting enterprise customers across the
                globe with a single, focused team.
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
                    <span className="text-black font-light">
                      · {office.country}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-black leading-relaxed font-light">
                    {office.address}, {office.postal}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                      <FiPhone className="h-3.5 w-3.5" />
                      {office.phone}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                      <FiClock className="h-3.5 w-3.5" />
                      {office.hours}
                    </span>
                    <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 text-black px-2.5 py-1 rounded-md text-xs font-normal">
                      <FiGlobe className="h-3.5 w-3.5" />
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
                  <p className="mt-1 text-sm text-black leading-relaxed font-light">
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
            <div className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-black uppercase tracking-[0.15em]">
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
                    <div className="text-[11px] font-medium text-black uppercase tracking-[0.15em]">
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

          {/* ================= RIGHT SIDE: FORM ================= */}
          <div>
            <div className="relative mx-auto w-full rounded-3xl border border-gray-200 bg-white p-7 sm:p-9 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
              {/* Top brand bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black" />

              {isSubmitted ? (
                <div className="py-10 px-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-black border border-gray-200">
                    <FiCheck className="h-8 w-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-light text-black tracking-tight">
                    Message Sent Successfully
                  </h3>
                  <p className="mt-3 text-sm text-black leading-relaxed font-light">
                    Thank you,{" "}
                    <span className="font-normal text-black">
                      {formData.firstName || "there"}
                    </span>
                    . We have received your inquiry about{" "}
                    <span className="font-normal text-black">
                      {formData.topic}
                    </span>{" "}
                    and will reply to{" "}
                    <span className="font-normal text-black">
                      {formData.email}
                    </span>{" "}
                    shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="mt-7 rounded-xl px-6 py-2.5 h-auto text-sm font-normal"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="mb-2">
                    <h3 className="text-xl font-light text-black tracking-tight">
                      Send us a Message
                    </h3>
                    <p className="text-xs text-black mt-1 font-light">
                      Fill in the details below and our Hyderabad team will get
                      back to you within 24 hours.
                    </p>
                  </div>

                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-normal text-black mb-1.5">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-normal text-black mb-1.5">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-[15px]"
                      />
                    </div>
                  </div>

                  {/* Email & Phone Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-normal text-black mb-1.5">
                        Work Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-[15px]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-normal text-black mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-[15px]"
                      />
                    </div>
                  </div>

                  {/* Topic Select Pills */}
                  <div>
                    <label className="block text-xs font-normal text-black mb-2">
                      Inquiry Topic
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {inquiryTopics.map((topic) => (
                        <button
                          key={topic}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({ ...prev, topic }))
                          }
                          className={`px-3.5 py-1.5 rounded-lg text-xs transition-all ${formData.topic === topic
                              ? "bg-black text-white font-normal shadow-sm"
                              : "bg-gray-50 border border-gray-200 text-black hover:bg-gray-100 font-light"
                            }`}
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div>
                    <label className="block text-xs font-normal text-black mb-1.5">
                      How can we help? <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your team, use cases, or any questions you have..."
                      className="flex w-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white px-3.5 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all leading-relaxed font-light resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full h-12 rounded-xl text-[15px] font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/10 transition-all duration-150 active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <svg
                          className="h-4 w-4 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      "Send Message"
                    )}
                  </Button>

                  <p className="mt-2 text-center text-xs text-black font-light">
                    By submitting, you agree to our{" "}
                    <Link
                      href="/privacy"
                      className="text-black hover:underline"
                    >
                      Privacy Policy
                    </Link>{" "}
                    and terms.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM: 3 CONTACT CHANNELS ================= */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight">
              Other ways to reach us
            </h2>
            <p className="mt-2 text-sm text-black font-light">
              Pick the channel that best fits your inquiry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              return (
                <div
                  key={channel.title}
                  className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:border-gray-400 hover:shadow-md transition-all"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="w-full">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="text-base font-medium text-black tracking-tight">
                        {channel.title}
                      </h3>
                      <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-black border border-gray-200">
                        {channel.badge}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-black leading-relaxed font-light mb-3">
                      {channel.description}
                    </p>
                    <a
                      href={channel.href}
                      className="inline-flex items-center gap-1.5 text-sm font-normal text-black hover:underline"
                    >
                      <span>{channel.contact}</span>
                      <FiArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}