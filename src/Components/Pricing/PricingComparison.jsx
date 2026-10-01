"use client";

import { useState } from "react";
import { FiCheck, FiMinus, FiChevronDown } from "react-icons/fi";

const CheckIcon = () => (
  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-[#6434F5] border border-purple-100 transition-transform duration-200 hover:scale-105">
    <FiCheck className="h-4.5 w-4.5 stroke-[2.5]" />
  </div>
);

const MinusIcon = () => (
  <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full text-gray-300">
    <FiMinus className="h-4 w-4 stroke-[2]" />
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
      <span className="text-[15px] sm:text-base font-semibold text-gray-800 font-sans">
        {val}
      </span>
    );
  };

  return (
    <section id="compare-features" className="w-full bg-gray-50/40 font-sans text-gray-900 py-16 px-8 sm:px-14 lg:px-20 xl:px-28 border-t border-gray-200/60 transition-all duration-300">
      <div className="mx-auto max-w-6xl">

        {/* Center H2 Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1a1b1e] font-sans">
            Plan Comparison
          </h2>
        </div>

        {/* Top Controls: Expand all | Collapse all */}
        <div className="flex items-center justify-end gap-3 mb-4 text-sm font-semibold">
          <button
            type="button"
            onClick={expandAll}
            className="text-[#6434F5] hover:text-[#5527e0] transition-colors font-sans cursor-pointer"
          >
            Expand all
          </button>
          <span className="text-gray-300">|</span>
          <button
            type="button"
            onClick={collapseAll}
            className="text-[#6434F5] hover:text-[#5527e0] transition-colors font-sans cursor-pointer"
          >
            Collapse all
          </button>
        </div>

        {/* Comparison Table: Flat borders, no shadows */}
        <div className="overflow-x-auto border-t border-b border-gray-200">
          <div className="min-w-[760px]">

            {/* Header Row */}
            <div className="grid grid-cols-12 items-end border-b border-gray-200 pb-4 pt-2">
              <div className="col-span-6 px-6 sm:px-8">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400 font-sans">
                  Feature Breakdown
                </span>
              </div>

              {/* Starter Column */}
              <div className="col-span-2 px-3 sm:px-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-sans">
                  Starter
                </h3>
              </div>

              {/* Growth Column */}
              <div className="col-span-2 px-3 sm:px-4 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-sans">
                  Growth
                </h3>
              </div>

              {/* Enterprise Column */}
              <div className="col-span-2 px-3 sm:px-4 py-3 rounded-t-xl bg-purple-50 text-center border-t border-l border-r border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-sans">
                  Enterprise
                </h3>
              </div>
            </div>

            {/* Categories */}
            {featureCategories.map((category) => {
              const isOpen = openCategories[category.id] !== false;

              return (
                <div key={category.id} className="border-b border-gray-200 transition-all duration-300">

                  {/* Category Header Row (Expand / Collapse trigger) */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between py-4 px-6 sm:px-8 text-left hover:bg-purple-50/20 transition-colors duration-200 border-b border-gray-100 cursor-pointer"
                  >
                    <span className="text-lg sm:text-xl font-bold text-[#1a1b1e] font-sans">
                      {category.name}
                    </span>
                    <FiChevronDown
                      className={`h-5 w-5 text-gray-600 transition-transform duration-300 ease-in-out ${isOpen ? "rotate-180 text-[#6434F5]" : ""
                        }`}
                    />
                  </button>

                  {/* Feature Rows with smooth transition */}
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                      }`}
                  >
                    <div className="divide-y divide-gray-100">
                      {category.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="grid grid-cols-12 items-center hover:bg-purple-50/15 transition-colors duration-150 py-3.5"
                        >
                          {/* Feature Name */}
                          <div className="col-span-6 px-6 sm:px-8 text-base sm:text-[17px] font-medium text-gray-800 font-sans leading-snug">
                            {feature.name}
                          </div>

                          {/* Starter Value */}
                          <div className="col-span-2 px-3 sm:px-4 text-center">
                            {renderValue(feature.starter)}
                          </div>

                          {/* Growth Value */}
                          <div className="col-span-2 px-3 sm:px-4 text-center">
                            {renderValue(feature.growth)}
                          </div>

                          {/* Enterprise Value */}
                          <div className="col-span-2 px-3 sm:px-4 py-1.5 text-center bg-purple-50/30 border-gray-200">
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
