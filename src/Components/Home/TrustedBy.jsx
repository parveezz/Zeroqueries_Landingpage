"use client";

import Image from "next/image";

// Placeholder logos — replace the `src` with your actual logo files later
const LOGOS = [
    { name: "Company 1", src: "/logos/logo-1.svg" },
    { name: "Company 2", src: "/logos/logo-2.svg" },
    { name: "Company 3", src: "/logos/logo-3.svg" },
    { name: "Company 4", src: "/logos/logo-4.svg" },
    { name: "Company 5", src: "/logos/logo-5.svg" },
    { name: "Company 6", src: "/logos/logo-6.svg" },
    { name: "Company 7", src: "/logos/logo-7.svg" },
    { name: "Company 8", src: "/logos/logo-8.svg" },
];

export default function TrustedBy() {
    return (
        <section className="relative w-full bg-gray-50 font-sans text-black py-10 sm:py-16 lg:py-20 overflow-hidden">
            {/* Heading */}
            <div className="text-center mb-6 sm:mb-10 px-4">
                <p className="text-xs sm:text-sm lg:text-base text-black/60 font-light tracking-wide">
                    Trusted by the world&apos;s most innovative teams
                </p>
            </div>

            {/* Marquee container */}
            <div className="relative w-full">
                {/* Left fade — narrower on mobile so logos remain visible */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-28 lg:w-40 bg-gradient-to-r from-gray-50 to-transparent z-10" />

                {/* Right fade — narrower on mobile */}
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-28 lg:w-40 bg-gradient-to-l from-gray-50 to-transparent z-10" />

                {/* Scrolling track */}
                <div className="flex animate-marquee w-max">
                    {/* First set */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`a-${i}`}
                            className="flex items-center justify-center px-6 sm:px-10 lg:px-14 shrink-0"
                        >
                            <LogoPlaceholder name={logo.name} src={logo.src} />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`b-${i}`}
                            className="flex items-center justify-center px-6 sm:px-10 lg:px-14 shrink-0"
                        >
                            <LogoPlaceholder name={logo.name} src={logo.src} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LogoPlaceholder({ name, src }) {
    return (
        <div className="flex items-center justify-center h-8 sm:h-10 w-[110px] sm:w-[140px] opacity-60 hover:opacity-100 transition-opacity duration-300">
            <span className="text-xs sm:text-sm font-medium text-black/50 tracking-tight whitespace-nowrap">
                {name}
            </span>
            {/* When you have real logos, uncomment this and delete the <span> above: */}
            {/*
      <Image
        src={src}
        alt={name}
        width={140}
        height={40}
        className="object-contain max-h-8 sm:max-h-10 w-auto"
      />
      */}
        </div>
    );
}