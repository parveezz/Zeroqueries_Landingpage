"use client";

import { useState } from "react";
import { FiCheck, FiMinus, FiChevronDown } from "react-icons/fi";

const CheckIcon = () => (
  <div className="mx-auto flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-purple-50 text-[#6434F5] border border-purple-100 transition-transform duration-200 hover:scale-105">
    <FiCheck className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2.5]" />
  </div>
);

const MinusIcon = () => (
  <div className="mx-auto flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-gray-300">
    <FiMinus className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[2]" />
  </div>
);

const featureCategories = [
  {
    id: "usage",
    name: "Usage & Team Access",
    features: [
      {
        name: "Monthly Insights Volume",
        starter: "Up to 500",
        growth: "Up to 2,000",
        enterprise: "Unlimited",
      },
      {
        name: "Users Included",
        starter: "Up to 5 Users",
        growth: "Up to 5 Users",
        enterprise: "Unlimited",
      },
      {
        name: "Unlimited Viewer Users",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "Web Platform Access",
        starter: true,
        growth: true,
        enterprise: true,
      },
    ],
  },
  {
    id: "integrations",
    name: "Integrations & Channels",
    features: [
      {
        name: "Basic Integrations & Connectors",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "Snowflake, BigQuery & Databricks",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "Slack, WhatsApp, Web & REST API",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "All Enterprise Live Connectors",
        starter: false,
        growth: false,
        enterprise: true,
      },
    ],
  },
  {
    id: "support-security",
    name: "Support, Security & Architecture",
    features: [
      {
        name: "Standard SOC2 Security",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "Email & Community Support",
        starter: true,
        growth: true,
        enterprise: true,
      },
      {
        name: "Advanced Audit Logs & Role Access",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "Priority Email, Chat & Phone Support",
        starter: false,
        growth: true,
        enterprise: true,
      },
      {
        name: "SSO, SAML, RBAC & HIPAA compliance",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        name: "Dedicated Solutions Architect & 24/7 SLA",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        name: "Custom Fine-Tuned Semantic Layer",
        starter: false,
        growth: false,
        enterprise: true,
      },
      {
        name: "On-Premise / VPC Deployment Options",
        starter: false,
        growth: false,
        enterprise: true,
      },
    ],
  },
];

export default function PricingComparison() {
  const [openCategories, setOpenCategories] = useState({
    usage: true,
    integrations: true,
    "support-security": true,
  });

  const [mobilePlan, setMobilePlan] = useState("growth");
  const [mobileViewMode, setMobileViewMode] = useState("plan"); // "plan" | "table"

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const allOpen = {};
    featureCategories.forEach((cat) => {
      allOpen[cat.id] = true;
    });
    setOpenCategories(allOpen);
  };

  const collapseAll = () => {
    const allClosed = {};
    featureCategories.forEach((cat) => {
      allClosed[cat.id] = false;
    });
    setOpenCategories(allClosed);
  };

  const renderValue = (val) => {
    if (val === true) return <CheckIcon />;
    if (val === false) return <MinusIcon />;
    return (
      <span className="text-[13px] sm:text-base font-light text-black/80 font-sans">
        {val}
      </span>
    );
  };

  return (
    <section
      id="compare-features"
      className="w-full bg-gray-50/40 font-sans text-black py-12 sm:py-16 px-4 sm:px-8 lg:px-14 xl:px-20 border-t border-gray-200/60 transition-all duration-300 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Center H2 Heading */}
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black font-sans">
            Plan Comparison
          </h2>
        </div>

        {/* ================= MOBILE CONTROLS (TABS & MODE SWITCH) ================= */}
        <div className="md:hidden mb-5 space-y-3">
          {/* Mode Switch: Plan Details vs Full Table */}
          <div className="flex rounded-xl bg-gray-200/70 p-1">
            <button
              type="button"
              onClick={() => setMobileViewMode("plan")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                mobileViewMode === "plan"
                  ? "bg-white text-black shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              By Plan
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode("table")}
              className={`flex-1 rounded-lg py-1.5 text-xs font-medium transition-all ${
                mobileViewMode === "table"
                  ? "bg-white text-black shadow-xs"
                  : "text-black/60 hover:text-black"
              }`}
            >
              Side-by-Side Table
            </button>
          </div>

          {/* Plan Selector Pills (When in "plan" mode) */}
          {mobileViewMode === "plan" && (
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "starter", name: "Starter" },
                { id: "growth", name: "Growth", popular: true },
                { id: "enterprise", name: "Enterprise" },
              ].map((p) => {
                const isSelected = mobilePlan === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setMobilePlan(p.id)}
                    className={`relative rounded-xl py-2 px-2 text-center text-xs font-medium transition-all border ${
                      isSelected
                        ? "border-black bg-black text-white shadow-xs"
                        : "border-gray-200 bg-white text-black/70 hover:bg-gray-50"
                    }`}
                  >
                    <div>{p.name}</div>
                    {p.popular && (
                      <span
                        className={`block text-[9px] font-normal ${
                          isSelected ? "text-purple-200" : "text-[#6434F5]"
                        }`}
                      >
                        Popular
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Top Controls: Expand all | Collapse all */}
        <div className="flex items-center justify-between sm:justify-end gap-3 mb-3 sm:mb-4 text-xs sm:text-sm font-normal px-1">
          {mobileViewMode === "table" && (
            <span className="text-[11px] sm:text-xs text-black/45 font-light md:hidden flex items-center gap-1">
              <span>Swipe table horizontally</span>
              <span>→</span>
            </span>
          )}

          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              onClick={expandAll}
              className="text-[#6434F5] hover:text-[#5527e0] transition-colors font-sans cursor-pointer focus-visible:outline-none focus-visible:underline"
            >
              Expand all
            </button>
            <span className="text-gray-300">|</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-[#6434F5] hover:text-[#5527e0] transition-colors font-sans cursor-pointer focus-visible:outline-none focus-visible:underline"
            >
              Collapse all
            </button>
          </div>
        </div>

        {/* ================= VIEW 1: MOBILE SINGLE-PLAN CARD LIST ================= */}
        {mobileViewMode === "plan" && (
          <div className="md:hidden space-y-4">
            {featureCategories.map((category) => {
              const isOpen = openCategories[category.id] !== false;

              return (
                <div
                  key={category.id}
                  className="rounded-2xl border border-gray-200/90 bg-white overflow-hidden shadow-xs"
                >
                  {/* Category Header */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between p-4 text-left bg-gray-50/70 hover:bg-gray-100/50 transition-colors"
                  >
                    <span className="text-[15px] font-medium text-black">
                      {category.name}
                    </span>
                    <FiChevronDown
                      className={`h-4 w-4 text-black/50 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#6434F5]" : ""
                      }`}
                    />
                  </button>

                  {/* Feature Rows */}
                  {isOpen && (
                    <div className="divide-y divide-gray-100 p-2">
                      {category.features.map((feature, idx) => {
                        const val = feature[mobilePlan];
                        return (
                          <div
                            key={idx}
                            className="flex items-center justify-between gap-3 py-3 px-2"
                          >
                            <span className="text-[13px] font-light text-black/80 leading-snug">
                              {feature.name}
                            </span>
                            <div className="shrink-0 text-right">
                              {renderValue(val)}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* ================= VIEW 2: FULL TABLE (Desktop Always, Mobile in "table" mode) ================= */}
        <div
          className={`${
            mobileViewMode === "table" ? "block" : "hidden md:block"
          } overflow-x-auto border-t border-b border-gray-200 rounded-xl bg-white/70 touch-pan-x overscroll-x-contain shadow-xs`}
        >
          <div className="min-w-[580px] sm:min-w-[700px] lg:min-w-[760px]">
            {/* Header Row */}
            <div className="grid grid-cols-12 items-end border-b border-gray-200 pb-3 sm:pb-4 pt-2">
              <div className="col-span-5 px-3 sm:px-6 sticky left-0 z-20 bg-white/95 backdrop-blur-md">
                <span className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-black/40 font-sans">
                  Feature Breakdown
                </span>
              </div>

              {/* Starter Column */}
              <div className="col-span-2 px-2 sm:px-4 text-center">
                <h3 className="text-sm sm:text-xl font-normal text-black font-sans">
                  Starter
                </h3>
              </div>

              {/* Growth Column */}
              <div className="col-span-2 px-2 sm:px-4 text-center">
                <h3 className="text-sm sm:text-xl font-normal text-black font-sans">
                  Growth
                </h3>
              </div>

              {/* Enterprise Column */}
              <div className="col-span-3 px-2 sm:px-4 py-2 sm:py-3 rounded-t-xl bg-purple-50 text-center border-t border-l border-r border-gray-200">
                <h3 className="text-sm sm:text-xl font-normal text-black font-sans">
                  Enterprise
                </h3>
              </div>
            </div>

            {/* Categories */}
            {featureCategories.map((category) => {
              const isOpen = openCategories[category.id] !== false;

              return (
                <div
                  key={category.id}
                  className="border-b border-gray-200 transition-all duration-300"
                >
                  {/* Category Header Row */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between py-3 sm:py-4 px-3 sm:px-6 text-left hover:bg-purple-50/20 transition-colors duration-200 border-b border-gray-100 cursor-pointer focus-visible:outline-none focus-visible:bg-purple-50/30 sticky left-0 bg-white/90 backdrop-blur-md"
                  >
                    <span className="text-sm sm:text-xl font-normal text-black font-sans">
                      {category.name}
                    </span>
                    <FiChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 text-black/50 transition-transform duration-300 ease-in-out ${
                        isOpen ? "rotate-180 text-[#6434F5]" : ""
                      }`}
                    />
                  </button>

                  {/* Feature Rows */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="divide-y divide-gray-100">
                      {category.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 items-center hover:bg-purple-50/15 transition-colors duration-150 py-3 sm:py-3.5"
                        >
                          {/* Feature Name (Sticky on horizontal scroll) */}
                          <div className="col-span-5 px-3 sm:px-6 sticky left-0 z-10 bg-white/95 backdrop-blur-md text-[12.5px] sm:text-base font-light text-black/80 font-sans leading-snug shadow-[2px_0_6px_-2px_rgba(0,0,0,0.06)]">
                            {feature.name}
                          </div>

                          {/* Starter Value */}
                          <div className="col-span-2 px-2 sm:px-4 text-center">
                            {renderValue(feature.starter)}
                          </div>

                          {/* Growth Value */}
                          <div className="col-span-2 px-2 sm:px-4 text-center">
                            {renderValue(feature.growth)}
                          </div>

                          {/* Enterprise Value */}
                          <div className="col-span-3 px-2 sm:px-4 py-1.5 text-center bg-purple-50/30 border-gray-200">
                            {renderValue(feature.enterprise)}
                          </div>
                        </div>
                      ))}
                    </div>
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