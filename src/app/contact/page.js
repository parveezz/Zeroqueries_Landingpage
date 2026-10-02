import ContactHeader from "@/Components/contact/ContactHeader";
import ContactInfo from "@/Components/contact/ContactInfo";
import ContactForm from "@/Components/contact/ContactForm";
import ContactChannels from "@/Components/contact/ContactChannels";

export const metadata = {
  title: "Contact Us | ZeroQueries",
  description: "Get in touch with ZeroQueries for enterprise sales, technical support, and partnership inquiries.",
};

export default function ContactPage() {
  return (
    <section className="relative w-full min-h-screen bg-gray-50 font-sans text-black overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Soft neutral glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-gray-200/50 via-gray-100/30 to-transparent blur-[110px] rounded-full" />

      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* Header */}
        <ContactHeader />

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <ContactInfo />
          <ContactForm />
        </div>

        {/* Other ways to reach us */}
        <ContactChannels />
      </div>
    </section>
  );
}