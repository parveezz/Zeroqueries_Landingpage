"use client";

import { useState, useRef, useEffect } from "react";
import { FiMail, FiClock, FiCheck, FiHeadphones } from "react-icons/fi";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    organization: "",
    role: "",
    dataEnvironment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    timeoutRef.current = setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      workEmail: "",
      organization: "",
      role: "",
      dataEnvironment: "",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-50 font-sans text-black overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* ============== VIOLET GLOW — TOP LEFT ============== */}
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[750px] h-[750px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* ============== VIOLET GLOW — BOTTOM RIGHT ============== */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[750px] h-[750px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-14">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-16">
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.15]">
            Talk with our{" "}
            <span className="text-black/60">Enterprise AI Specialists</span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto font-light">
            See how ZeroQueries connects your structured and unstructured data
            into instantaneous business answers. Schedule a tailored demo with
            our engineering team.
          </p>
        </div>

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-3">
              <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
                What to Expect
              </span>
              <h2 className="text-2xl sm:text-3xl font-light text-black tracking-tight leading-snug">
                A session tailored to your data infrastructure
              </h2>
              <p className="text-black/70 text-base leading-relaxed font-light">
                Whether you run Snowflake, BigQuery, Databricks, PostgreSQL, or
                complex unstructured documents, our solutions architects will
                demonstrate real-time query acceleration without data
                duplication.
              </p>
            </div>

            {/* Contact SLA Card */}
            <div className="rounded-2xl border border-gray-200/90 bg-white p-5 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-black/50 uppercase tracking-[0.15em]">
                      Direct Sales Inquiries
                    </div>
                    <a
                      href="mailto:sales@zeroqueries.com"
                      className="text-sm font-normal text-black hover:text-[#6434F5] transition-colors"
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
                    <div className="text-[11px] font-medium text-black/50 uppercase tracking-[0.15em]">
                      Guaranteed SLA
                    </div>
                    <div className="text-sm font-normal text-black">
                      Within 24 Hours
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200/70 flex items-center gap-2.5 text-xs text-black/60 font-light">
                <FiHeadphones className="h-4 w-4 text-black shrink-0" />
                <span>
                  Need immediate technical assistance? Connect directly with
                  solutions engineering.
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: FORM ================= */}
          <div>
            <div className="relative mx-auto w-full max-w-[500px] rounded-3xl border border-gray-200/90 bg-white p-7 sm:p-9">
              {/* Top brand bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black" />

              {isSubmitted ? (
                <div className="py-10 px-4 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-black border border-gray-200">
                    <FiCheck className="h-8 w-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-2xl font-light text-black tracking-tight">
                    Demo Request Received
                  </h3>
                  <p className="mt-3 text-sm text-black/70 leading-relaxed font-light">
                    Thank you,{" "}
                    <span className="font-normal text-black">
                      {formData.fullName || "there"}
                    </span>
                    . A ZeroQueries enterprise solutions specialist has received
                    your request and will contact you at{" "}
                    <span className="font-normal text-black">
                      {formData.workEmail || "your email"}
                    </span>{" "}
                    within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="mt-7 rounded-xl px-6 py-2.5 h-auto text-sm font-normal"
                  >
                    Submit Another Request
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="mb-2">
                    <h3 className="text-xl font-light text-black tracking-tight">
                      Request an Enterprise Demo
                    </h3>
                    <p className="text-xs text-black/60 mt-1 font-light">
                      Fill out your details to schedule your live walkthrough.
                    </p>
                  </div>

                  {[
                    { id: "fullName", type: "text", label: "Full Name", required: true },
                    { id: "workEmail", type: "email", label: "Work Email", required: true },
                    { id: "organization", type: "text", label: "Organization", required: true },
                    { id: "role", type: "text", label: "Role", required: true },
                    { id: "dataEnvironment", type: "text", label: "Data Environment (Optional)", required: false },
                  ].map((field) => (
                    <div key={field.id} className="w-full">
                      <label htmlFor={field.id} className="sr-only">
                        {field.label}
                      </label>
                      <Input
                        id={field.id}
                        type={field.type}
                        name={field.id}
                        required={field.required}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.label}
                        className="h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-[15px]"
                      />
                    </div>
                  ))}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full h-12 rounded-xl text-[15px] font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-800 transition-all duration-150 active:scale-[0.99]"
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
                        Processing...
                      </span>
                    ) : (
                      "Book Enterprise Demo"
                    )}
                  </Button>

                  <p className="mt-2 text-center text-xs text-black/60 font-light">
                    A solutions specialist will contact you within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}