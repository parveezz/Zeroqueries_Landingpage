"use client";

import Image from "next/image";

const LOGOS = [
    { name: "The Forest", src: "/logos/the-forest-badge.png", width: 140, height: 140 },
    { name: "The greenloop", src: "/logos/greenloop.png", width: 140, height: 140 },
    { name: "nfc.works", src: "/logos/nf_logo.jpeg", width: 140, height: 140 },
    { name: "geddit", src: "/logos/geedi.webp", width: 140, height: 140 },
    { name: "smsassets", src: "/logos/smsa-express.png", width: 140, height: 140 },
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
                <div className="flex animate-marquee w-max items-center">
                    {/* First set */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`a-${i}`}
                            className="flex items-center justify-center px-6 sm:px-10 lg:px-14 shrink-0"
                        >
                            <LogoItem logo={logo} />
                        </div>
                    ))}
                    {/* Duplicate set for seamless loop */}
                    {LOGOS.map((logo, i) => (
                        <div
                            key={`b-${i}`}
                            className="flex items-center justify-center px-6 sm:px-10 lg:px-14 shrink-0"
                        >
                            <LogoItem logo={logo} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function LogoItem({ logo }) {
    return (
        <div className="flex items-center justify-center h-10 sm:h-12 w-[120px] sm:w-[150px] opacity-75 hover:opacity-100 transition-opacity duration-300">
            <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width || 140}
                height={logo.height || 40}
                className="object-contain max-h-8 sm:max-h-10 w-auto mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
        </div>
    );
}