"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

const inquiryTopicsEn = [
  "General Inquiry",
  "Enterprise Sales",
  "Product Support",
  "Partnership",
  "Other",
];

const inquiryTopicsAr = [
  "استفسار عام",
  "مبيعات المؤسسات",
  "دعم المنتج",
  "شراكة",
  "أخرى",
];

export default function ContactForm() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const inquiryTopics = isAr ? inquiryTopicsAr : inquiryTopicsEn;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: isAr ? "استفسار عام" : "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      topic: isAr ? "استفسار عام" : "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="relative mx-auto w-full rounded-2xl sm:rounded-3xl border border-gray-200 bg-white p-5 sm:p-8 lg:p-9 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
      {/* Top brand bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black" />

      {isSubmitted ? (
        <div className="py-8 sm:py-10 px-2 sm:px-4 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gray-100 text-black border border-gray-200">
            <FiCheck className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.5]" />
          </div>
          <h3 className="text-xl sm:text-2xl font-light text-black tracking-tight">
            {isAr ? "تم إرسال الرسالة بنجاح" : "Message Sent Successfully"}
          </h3>
          <p className="mt-3 text-sm text-black/70 leading-relaxed font-light max-w-sm mx-auto">
            {isAr ? (
              <>
                شكراً لك،{" "}
                <span className="font-normal text-black">
                  {formData.firstName || ""}
                </span>
                . لقد استلمنا استفسارك بخصوص{" "}
                <span className="font-normal text-black">{formData.topic}</span> وسوف نقوم بالرد على{" "}
                <span className="font-normal text-black">{formData.email}</span> قريباً.
              </>
            ) : (
              <>
                Thank you,{" "}
                <span className="font-normal text-black">
                  {formData.firstName || "there"}
                </span>
                . We have received your inquiry about{" "}
                <span className="font-normal text-black">{formData.topic}</span> and
                will reply to{" "}
                <span className="font-normal text-black">{formData.email}</span> shortly.
              </>
            )}
          </p>
          <Button
            variant="outline"
            onClick={handleReset}
            className="mt-6 sm:mt-7 rounded-xl px-6 py-2.5 h-auto text-sm font-normal"
          >
            {isAr ? "إرسال رسالة أخرى" : "Send Another Message"}
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-1 sm:mb-2">
            <h3 className="text-xl font-light text-black tracking-tight">
              {isAr ? "أرسل لنا رسالة" : "Send us a Message"}
            </h3>
            <p className="text-xs text-black/60 mt-1 font-light">
              {isAr
                ? "املأ البيانات أدناه وسيتواصل معك فريقنا خلال 24 ساعة."
                : "Fill in the details below and our team will get back to you within 24 hours."}
            </p>
          </div>

          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-normal text-black mb-1.5">
                {isAr ? "الاسم الأول" : "First Name"} <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder={isAr ? "الاسم" : "Jane"}
                className="h-10 sm:h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-sm sm:text-[15px]"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-black mb-1.5">
                {isAr ? "اسم العائلة" : "Last Name"} <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                placeholder={isAr ? "العائلة" : "Doe"}
                className="h-10 sm:h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-sm sm:text-[15px]"
              />
            </div>
          </div>

          {/* Email & Phone Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
            <div>
              <label className="block text-xs font-normal text-black mb-1.5">
                {isAr ? "البريد الإلكتروني للعمل" : "Work Email"} <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="h-10 sm:h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-sm sm:text-[15px]"
              />
            </div>
            <div>
              <label className="block text-xs font-normal text-black mb-1.5">
                {isAr ? "رقم الهاتف (اختياري)" : "Phone Number (Optional)"}
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+966 ..."
                className="h-10 sm:h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-sm sm:text-[15px]"
              />
            </div>
          </div>

          {/* Topic Select Pills */}
          <div>
            <label className="block text-xs font-normal text-black mb-2">
              {isAr ? "موضوع الاستفسار" : "Inquiry Topic"}
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {inquiryTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, topic }))}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
                    formData.topic === topic
                      ? "bg-black text-white font-normal shadow-sm"
                      : "bg-gray-50 border border-gray-200 text-black/80 hover:bg-gray-100 font-light"
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* Message Textarea */}
          <div>
            <label className="block text-xs font-normal text-black mb-1.5">
              {isAr ? "كيف يمكننا مساعدتك؟" : "How can we help?"} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={
                isAr
                  ? "أخبرنا عن متطلبات فريقك، أو حالات الاستخدام، أو أي استفسارات لديك..."
                  : "Tell us about your team, use cases, or any questions you have..."
              }
              className="flex w-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white px-3.5 py-2.5 sm:py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all leading-relaxed font-light resize-none"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full h-11 sm:h-12 rounded-xl text-sm sm:text-[15px] font-medium tracking-wider uppercase bg-black text-white hover:bg-gray-800 shadow-md shadow-black/10 transition-all duration-150 active:scale-[0.99]"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {isAr ? "جارٍ الإرسال..." : "Sending Message..."}
              </span>
            ) : (
              isAr ? "إرسال الرسالة" : "Send Message"
            )}
          </Button>

          <p className="mt-1 text-center text-xs text-black/60 font-light">
            {isAr ? (
              <>
                بالإرسال، فإنك توافق على{" "}
                <Link href="/privacy" className="text-black hover:underline font-normal">
                  سياسة الخصوصية
                </Link>{" "}
                والشروط.
              </>
            ) : (
              <>
                By submitting, you agree to our{" "}
                <Link href="/privacy" className="text-black hover:underline font-normal">
                  Privacy Policy
                </Link>{" "}
                and terms.
              </>
            )}
          </p>
        </form>
      )}
    </div>
  );
}
