"use client";

import Image from "next/image";
import { FaQuoteRight } from "react-icons/fa";

// --- Testimonial data ---
const testimonials = [
    {
        id: 1,
        quote:
            "ZeroQueries replaced our entire BI backlog. Our revenue team asks questions in plain English and gets answers before the meeting starts — no SQL, no waiting on analysts. It's the first time data has actually kept pace with our decision-making.",
        name: "Adrian Reyes",
        role: "VP of Revenue Operations, Meridian Logistics",
        avatar: "/avatars/adrian.jpg",
        logo: "/logos/meridian.svg",
        logoAlt: "Meridian Logistics",
        layout: "wide", // spans full width
        bgTint: "bg-[#fdf2f8]", // soft pink bg behind avatar
    },
    {
        id: 2,
        quote:
            "We needed flexibility that a standard dashboard can't offer. Now our team asks questions we'd never have thought to ask before, directly against the warehouse. ZeroQueries feels like an analyst on demand.",
        name: "Monika Zander",
        role: "Managing Director, Food Service Switzerland",
        avatar: "/avatars/monika.jpg",
        logo: "/logos/valora.svg",
        logoAlt: "Valora",
        layout: "half",
        bgTint: "bg-[#f5f3ff]", // soft violet bg
    },
    {
        id: 3,
        quote:
            "Our sales partners finally get answers without filing tickets. They ask, ZeroQueries retrieves — across contracts, calls, and the warehouse in one shot. It's transformed how we serve customers.",
        name: "Martin Studer",
        role: "Head of Distribution Transformation, Global Insurance",
        avatar: "/avatars/martin.jpg",
        logo: "/logos/axa.svg",
        logoAlt: "Global Insurance",
        layout: "half",
        bgTint: "bg-[#f0f9ff]", // soft blue bg
    },
];

export default function Testimonials() {
    const wideCard = testimonials.find((t) => t.layout === "wide");
    const halfCards = testimonials.filter((t) => t.layout === "half");

    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-20 px-6 sm:px-10 lg:px-14 overflow-hidden">
            {/* Dot grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

            <div className="relative z-10 mx-auto max-w-6xl">
                {/* Optional heading */}
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-medium tracking-[0.2em] text-black/60 uppercase">
                        Customer Stories
                    </span>
                    <h2 className="mt-3 text-3xl sm:text-4xl lg:text-[40px] font-light tracking-tight text-black leading-[1.15]">
                        Real teams. Real decisions.{" "}
                        <span className="text-black/50">Real speed.</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Wide card — spans both columns */}
                    {wideCard && <TestimonialCard testimonial={wideCard} wide />}

                    {/* Two half cards */}
                    {halfCards.map((t) => (
                        <TestimonialCard key={t.id} testimonial={t} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// --- Card component ---
function TestimonialCard({ testimonial, wide = false }) {
    const { quote, name, role, avatar, logo, logoAlt, bgTint } = testimonial;

    return (
        <div
            className={`group relative bg-white rounded-2xl border border-gray-200 overflow-hidden flex flex-col sm:flex-row transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-gray-300
        hover:shadow-[0_20px_45px_-20px_rgba(0,0,0,0.15)]
        ${wide ? "lg:col-span-2" : ""}
      `}
        >
            {/* Avatar block */}
            <div
                className={`${bgTint} flex items-center justify-center shrink-0 overflow-hidden
          ${wide ? "sm:w-[280px] lg:w-[320px]" : "sm:w-[200px] lg:w-[220px]"}
        `}
            >
                <div
                    className={`relative w-full ${wide ? "h-[240px] sm:h-[280px]" : "h-[220px] sm:h-[240px]"}`}
                >
                    {/* Placeholder avatar — replace with <Image /> later */}
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-white/60 border border-white flex items-center justify-center text-black/30 text-xs font-medium transition-transform duration-500 group-hover:scale-105">
                            Avatar
                        </div>
                    </div>
                </div>
            </div>

            {/* Content block */}
            <div className="flex-1 flex flex-col justify-between p-6 sm:p-8">
                <div>
                    {/* Quote icon — subtle rotate on hover */}
                    <FaQuoteRight className="text-gray-200 w-5 h-5 mb-4 transition-transform duration-300 group-hover:-rotate-6 group-hover:text-gray-300" />

                    {/* Quote */}
                    <p
                        className={`text-black font-light leading-relaxed ${wide
                                ? "text-base sm:text-[17px] leading-[1.65]"
                                : "text-[15px] sm:text-base leading-[1.6]"
                            }`}
                    >
                        {quote}
                    </p>
                </div>

                {/* Bottom: name + role + logo */}
                <div className="mt-6 pt-5 border-t border-gray-100">
                    <div className="font-medium text-black text-sm sm:text-[15px]">
                        {name}
                    </div>
                    <div className="text-black/60 text-xs sm:text-sm font-light mt-0.5">
                        {role}
                    </div>

                    {/* Company logo */}
                    <div className="mt-4 h-6 flex items-center">
                        <span className="text-black/70 font-medium text-sm tracking-tight transition-colors duration-300 group-hover:text-black">
                            {logoAlt}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}