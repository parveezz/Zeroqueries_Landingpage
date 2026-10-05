"use client";

import Link from "next/link";

export default function PricingCtaBanner() {
  return (
    <section className="w-full bg-white font-sans text-black pb-16 sm:pb-24 pt-4 px-4 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-[#FAFAFC] py-10 sm:py-16 px-4 sm:px-12 text-center">
          <div className="max-w-2xl mx-auto">
            {/* Heading */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[40px] font-light tracking-tight text-black leading-tight font-sans">
              Not sure which pricing model{" "}
              <span className="text-black/60">fits?</span>
            </h2>

            {/* Description */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-black/60 leading-relaxed font-light font-sans max-w-xl mx-auto">
              Tell us how your teams expect to use ZeroQueries, and we&apos;ll
              recommend the pricing model that fits best.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none mx-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#6434F5] hover:bg-[#5527e0] active:scale-[0.98] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-normal text-white transition-all duration-150 font-sans shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
              >
                <span>Get in touch</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>

              <Link
                href="/demo"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50 active:scale-[0.98] px-6 sm:px-7 py-3 sm:py-3.5 text-sm sm:text-base font-normal text-black transition-all duration-150 font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6434F5] focus-visible:ring-offset-2"
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