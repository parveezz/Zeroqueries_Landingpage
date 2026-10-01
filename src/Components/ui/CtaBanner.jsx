"use client";

import Link from "next/link";

export default function CtaBanner({
  title = "Start your 30-day free trial",
  description = "No pressure—we'll show you how our platform works, so you can decide if a trial is right for you.",
  buttonText = "Start For Free",
  buttonHref = "#trial",
  className = "",
}) {
  return (
    <section className={`w-full font-sans ${className}`}>
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-14">
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[32px] bg-gradient-to-r from-[#4d1bd6] via-[#5c28eb] to-[#6a3bf7] px-8 py-12 sm:px-14 sm:py-16 shadow-xl shadow-purple-900/10">
          
          {/* Subtle Organic Background Waves & Glows on the Right */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Soft Ambient Radial Glow */}
            <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute right-1/4 -bottom-24 h-72 w-72 rounded-full bg-purple-400/20 blur-2xl" />
            
            {/* Decorative Smooth Curved Wave Silhouette */}
            <svg
              className="absolute right-0 top-0 h-full w-2/3 lg:w-1/2 opacity-30 text-white"
              viewBox="0 0 600 300"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d="M150 0 C 300 80, 200 220, 600 300 L 600 0 Z"
                fill="currentColor"
              />
              <path
                d="M320 0 C 420 120, 360 220, 600 270 L 600 0 Z"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Content Layout */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8 lg:gap-12">
            
            {/* Left Content */}
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-snug">
                {title}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-purple-100/90 leading-relaxed font-normal">
                {description}
              </p>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <Link
                href={buttonHref}
                className="inline-flex items-center justify-center rounded-xl bg-white px-7 py-3.5 text-sm sm:text-base font-semibold text-gray-900 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                {buttonText}
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
