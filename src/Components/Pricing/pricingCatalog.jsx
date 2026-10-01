"use client";

import { useState } from "react";
import Link from "next/link";

const CheckIcon = () => (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-50 text-[#6434F5]">
        <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 13l4 4L19 7"
            />
        </svg>
    </div>
);

const RocketIcon = () => (
    <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M13.5 10.5L21 3m-7.5 7.5l-2.25 2.25M13.5 10.5l-2.25-2.25M21 3l-7.5 7.5m0 0l-2.25 2.25M13.5 10.5l2.25 2.25M3 21l3.75-3.75M6.75 17.25l2.25-2.25M6.75 17.25L4.5 15M17.25 6.75l-2.25 2.25M17.25 6.75L15 4.5"
        />
    </svg>
);

const TrendingUpIcon = () => (
    <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
    </svg>
);

const BuildingIcon = () => (
    <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.75"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
    </svg>
);

export default function PricingCatalog() {
    const [billingCycle, setBillingCycle] = useState("annual");

    const plans = [
        {
            name: "Starter",
            description:
                "Ideal for small teams getting started with autonomous data intelligence.",
            price: billingCycle === "annual" ? "$399" : "$499",
            period: "/mo",
            billing:
                billingCycle === "annual" ? "Billed annually" : "Billed monthly",
            icon: <RocketIcon />,
            iconStyle: "bg-purple-50 text-[#6434F5] border border-purple-100",
            ctaText: "Start for Free",
            ctaHref: "#",
            ctaStyle:
                "border border-gray-200 bg-white text-black hover:bg-gray-50",
            popular: false,
            features: [
                "Up to 500 Monthly Insights",
                "Basic Integrations & Connectors",
                "Email & Community Support",
                "Standard SOC2 Security",
                "Web Platform Access",
                "Up to 5 Users included",
            ],
        },
        {
            name: "Growth",
            description:
                "For scaling organizations that need high-throughput real-time answers.",
            price: billingCycle === "annual" ? "$1,199" : "$1,499",
            period: "/mo",
            billing:
                billingCycle === "annual" ? "Billed annually" : "Billed monthly",
            icon: <TrendingUpIcon />,
            iconStyle: "bg-[#6434F5] text-white shadow-sm shadow-purple-500/20",
            ctaText: "Start Free Trial",
            ctaHref: "#",
            ctaStyle: "bg-[#6434F5] text-white hover:bg-[#5527e0] shadow-sm",
            popular: true,
            features: [
                "Up to 2,000 Monthly Insights",
                "Snowflake, BigQuery & Databricks",
                "Priority Email, Chat & Phone Support",
                "Advanced Audit Logs & Role Access",
                "Slack, WhatsApp, Web & REST API",
                "Unlimited Viewer Users",
            ],
        },
        {
            name: "Enterprise",
            description:
                "For large enterprises requiring custom models, governance, and SLAs.",
            price: "Custom",
            period: "",
            billing: "Tailored contract & support",
            icon: <BuildingIcon />,
            iconStyle: "bg-gray-100 text-black/70 border border-gray-200",
            ctaText: "Book a Demo",
            ctaHref: "#",
            ctaStyle:
                "border border-gray-200 bg-white text-black hover:bg-gray-50",
            popular: false,
            features: [
                "Unlimited Monthly Insights",
                "All Enterprise Live Connectors",
                "Dedicated Solutions Architect & 24/7 SLA",
                "SSO, SAML, RBAC & HIPAA compliance",
                "Custom Fine-Tuned Semantic Layer",
                "On-Premise / VPC Deployment Options",
            ],
        },
    ];

    return (
        <section className="min-h-screen bg-white font-sans text-black py-20 px-6 sm:px-10 lg:px-16">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-black leading-[1.15]">
                        Powerful data intelligence.
                        <br className="hidden sm:block" />{" "}
                        <span className="text-black/60">Simple pricing.</span>
                    </h1>

                    <p className="mt-6 text-lg sm:text-xl leading-relaxed text-black/60 max-w-2xl mx-auto font-light">
                        Get the insights you need without complicated pricing. Choose a
                        plan that fits your workflow and scale when you&apos;re ready.
                    </p>

                    {/* Billing Toggle */}
                    <div className="relative mt-10 inline-flex select-none items-center rounded-2xl border border-gray-200 bg-gray-100 p-1.5 shadow-sm">
                        {/* Sliding Background */}
                        <div
                            aria-hidden="true"
                            className="absolute left-1.5 top-1.5 bottom-1.5 z-0 rounded-xl bg-white shadow-md ring-1 ring-gray-200 transition-transform duration-500 ease-in-out"
                            style={{
                                width: "calc(50% - 6px)",
                                transform:
                                    billingCycle === "annual"
                                        ? "translateX(100%)"
                                        : "translateX(0)",
                            }}
                        />

                        {/* Monthly */}
                        <button
                            type="button"
                            onClick={() => setBillingCycle("monthly")}
                            aria-pressed={billingCycle === "monthly"}
                            className={`relative z-10 w-36 cursor-pointer py-2.5 text-center text-base font-normal transition-colors duration-300 sm:w-44 ${billingCycle === "monthly"
                                    ? "text-black"
                                    : "text-black/50 hover:text-black"
                                }`}
                        >
                            Monthly
                        </button>

                        {/* Annual */}
                        <button
                            type="button"
                            onClick={() => setBillingCycle("annual")}
                            aria-pressed={billingCycle === "annual"}
                            className={`relative z-10 flex w-36 cursor-pointer items-center justify-center gap-2 py-2.5 text-base font-normal transition-colors duration-300 sm:w-44 ${billingCycle === "annual"
                                    ? "text-black"
                                    : "text-black/50 hover:text-black"
                                }`}
                        >
                            <span>Annual</span>
                            <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all duration-300 ${billingCycle === "annual"
                                        ? "bg-purple-100 text-[#6434F5]"
                                        : "bg-purple-50 text-[#6434F5]/70"
                                    }`}
                            >
                                Save 20%
                            </span>
                        </button>
                    </div>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10 items-stretch">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col justify-between rounded-3xl bg-white transition-all duration-200 ${plan.popular
                                    ? "p-8 xl:p-9 border-2 border-[#6434F5] shadow-2xl shadow-purple-500/15 md:-translate-y-3"
                                    : "p-6 sm:p-7 xl:p-7 border border-gray-200 shadow-sm hover:shadow-lg hover:border-gray-300"
                                }`}
                        >
                            {/* Recommended Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="rounded-full bg-[#6434F5] px-4 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase text-white shadow-md whitespace-nowrap">
                                        Recommended for Organizations
                                    </span>
                                </div>
                            )}

                            {/* Plan Top Content */}
                            <div>
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`flex h-13 w-13 p-3 items-center justify-center rounded-2xl ${plan.iconStyle}`}
                                    >
                                        {plan.icon}
                                    </div>

                                    <h3 className="text-2xl sm:text-[26px] font-normal tracking-tight text-black">
                                        {plan.name}
                                    </h3>
                                </div>

                                <p className="mt-4 text-base text-black/60 leading-relaxed font-light min-h-[48px]">
                                    {plan.description}
                                </p>

                                {/* Price Display */}
                                <div
                                    className={`border-t border-b border-gray-100 ${plan.popular ? "mt-8 py-7" : "mt-6 py-6"
                                        }`}
                                >
                                    <div className="flex items-baseline gap-1.5">
                                        <span className="text-5xl sm:text-6xl font-light tracking-tight text-black transition-all duration-300">
                                            {plan.price}
                                        </span>
                                        {plan.period && (
                                            <span className="text-xl font-light text-black/50">
                                                {plan.period}
                                            </span>
                                        )}
                                    </div>

                                    <span className="mt-3 block text-[11px] font-medium tracking-[0.15em] text-black/40 uppercase">
                                        {plan.billing}
                                    </span>
                                </div>

                                {/* Features List */}
                                <div
                                    className={`${plan.popular ? "mt-8 space-y-4" : "mt-6 space-y-3.5"}`}
                                >
                                    <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-black/50">
                                        What&apos;s included
                                    </p>

                                    <ul className="space-y-3.5">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3.5">
                                                <CheckIcon />
                                                <span className="text-[15px] font-light text-black/80 leading-snug">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <div className={`${plan.popular ? "mt-10 pt-4" : "mt-8 pt-2"}`}>
                                <Link
                                    href={plan.ctaHref}
                                    className={`block w-full rounded-2xl py-3.5 text-center text-base font-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2 ${plan.ctaStyle}`}
                                >
                                    {plan.ctaText}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}