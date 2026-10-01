"use client";

import Link from "next/link";

export default function PricingCtaBanner() {
  return (
    <section className="w-full bg-white font-sans text-black pb-24 pt-4 px-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white py-16 px-8 sm:px-16 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-light tracking-tight text-black leading-tight font-sans">
              Not sure which pricing model{" "}
              <span className="text-black/60">fits?</span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-black/60 leading-relaxed font-light font-sans">
              Tell us how your teams expect to use ZeroQueries, and we&apos;ll
              recommend the pricing model that fits best.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#6434F5] hover:bg-[#5527e0] px-7 py-3.5 text-sm sm:text-base font-normal text-white transition-colors duration-150 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
              >
                <span>Compare pricing models</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link
                href="#trial"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 px-7 py-3.5 text-sm sm:text-base font-normal text-black transition-colors duration-150 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
              >
                Start free trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}