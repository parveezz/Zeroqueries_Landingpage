import PlatformChannels from "@/Components/platform/PlatformChannels";
import PlatformFeatures from "@/Components/platform/PlatformFeatures";
import FinalCTA from "@/Components/Home/CTAsection";

export const metadata = {
  title: "Platform | ZeroQueries",
  description:
    "Ask your data anything — from WhatsApp, Slack, the web app, or the API. ZeroQueries turns plain English into live, trusted answers.",
};

export default function PlatformPage() {
  return (
    <main className="w-full">
      {/* 1. Hero */}
      <PlatformHero />
      <PlatformChannels />
      <PlatformFeatures />
      <FinalCTA />
    </main>
  );
}

// ============== HERO ==============
function PlatformHero() {
  return (
    <section className="relative w-full bg-gray-50 font-sans text-black pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 px-6 sm:px-10 lg:px-14 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] text-black/60 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-black" />
            Platform
          </span>

          <h1 className="mt-4 text-3xl sm:text-5xl lg:text-[64px] font-light tracking-tight text-black leading-[1.05]">
            Your data,
            <br />
            <span className="text-black/40">one question away.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-black/60 leading-relaxed font-light max-w-2xl">
            ZeroQueries connects to every warehouse, database, and document
            store you already run — and turns plain-language questions into
            live, verified answers. From WhatsApp. From Slack. From anywhere.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-black text-white px-6 py-3.5 text-sm font-normal hover:bg-gray-800 transition-colors"
            >
              Book a Demo
            </a>
            <a
              href="/signup"
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full border border-gray-200 bg-white text-black px-6 py-3.5 text-sm font-normal hover:border-gray-400 transition-colors"
            >
              Start for Free
            </a>
          </div>

          {/* Trust line */}
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] font-medium tracking-[0.15em] uppercase text-black/40">
            <span>SOC 2 Type II</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>HIPAA Ready</span>
            <span className="w-1 h-1 rounded-full bg-black/20" />
            <span>256-bit Encryption</span>
          </div>
        </div>
      </div>
    </section>
  );
}