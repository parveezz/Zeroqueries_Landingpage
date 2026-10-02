export default function ContactHeader() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gray-300 bg-white text-black text-xs font-medium tracking-[0.2em] uppercase mb-4">
        <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
        Contact & Support
      </div>

      <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.15]">
        Get in touch with ZeroQueries
      </h1>

      <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto font-light">
        Have questions about our AI decision platform, need dedicated
        enterprise support, or want to explore partnership opportunities?
        Our team in Hyderabad is here to help.
      </p>
    </div>
  );
}
