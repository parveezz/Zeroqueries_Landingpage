"use client";

import { useState, useRef, useEffect } from "react";
import { FiMail, FiClock, FiCheck, FiHeadphones } from "react-icons/fi";
import { Input } from "@/Components/ui/Input";
import { Button } from "@/Components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    organization: "",
    role: "",
    dataEnvironment: "",
    teamSize: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        form_type: "demo",
      };
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsSubmitted(true);
      } else {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error("Error submitting demo request:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      workEmail: "",
      phone: "",
      organization: "",
      role: "",
      dataEnvironment: "",
      teamSize: "",
      message: "",
    });
  };

  return (
    <section className="relative w-full min-h-screen bg-gray-50 font-sans text-black overflow-hidden py-10 sm:py-16 lg:py-20">
      {/* Dot Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      {/* ============== VIOLET GLOW — TOP LEFT ============== */}
      <div
        className="pointer-events-none absolute -top-24 sm:-top-40 -left-24 sm:-left-40 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
          filter: "blur(90px)",
        }}
      />

      {/* ============== VIOLET GLOW — BOTTOM RIGHT ============== */}
      <div
        className="pointer-events-none absolute -bottom-24 sm:-bottom-40 -right-24 sm:-right-40 w-[320px] sm:w-[550px] lg:w-[750px] h-[320px] sm:h-[550px] lg:h-[750px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(167, 139, 250, 0.15) 40%, rgba(196, 181, 253, 0) 70%)",
          filter: "blur(90px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-14">
        {/* ================= HEADING ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-[54px] font-light tracking-tight text-black leading-[1.15]">
            {isAr ? "تحدث مع " : "Talk with our "}
            <span className="text-black/60">
              {isAr ? "متخصصي الذكاء الاصطناعي للمؤسسات" : "Enterprise AI Specialists"}
            </span>
          </h1>

          <p className="mt-3.5 sm:mt-5 text-sm sm:text-base lg:text-lg text-black/70 leading-relaxed max-w-2xl mx-auto font-light">
            {isAr
              ? "تعرف على كيفية قيام ZeroQueries بربط بياناتك المنظمة وغير المنظمة لتوفير إجابات أعمال فورية. احجز عرضاً مخصصاً مع فريقنا الهندسي."
              : "See how ZeroQueries connects your structured and unstructured data into instantaneous business answers. Schedule a tailored demo with our engineering team."}
          </p>
        </div>

        {/* ================= 2-COLUMN LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* ================= LEFT SIDE ================= */}
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="space-y-2.5 sm:space-y-3">
              <span className="text-xs font-medium tracking-[0.2em] text-black uppercase">
                {isAr ? "ما الذي تتوقعه" : "What to Expect"}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-light text-black tracking-tight leading-snug">
                {isAr
                  ? "جلسة مخصصة للبنية التحتية لبياناتك"
                  : "A session tailored to your data infrastructure"}
              </h2>
              <p className="text-black/70 text-sm sm:text-base leading-relaxed font-light">
                {isAr
                  ? "سواء كنت تستخدم Snowflake أو BigQuery أو Databricks أو PostgreSQL أو مستندات غير منظمة معقدة، سيعرض مهندسو الحلول لدينا تسريع الاستعلام في الوقت الفعلي دون تكرار البيانات."
                  : "Whether you run Snowflake, BigQuery, Databricks, PostgreSQL, or complex unstructured documents, our solutions architects will demonstrate real-time query acceleration without data duplication."}
              </p>
            </div>

            {/* Contact SLA Card */}
            <div className="rounded-2xl border border-gray-200/90 bg-white p-4 sm:p-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                    <FiMail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-black/50 uppercase tracking-[0.15em]">
                      {isAr ? "استفسارات المبيعات المباشرة" : "Direct Sales Inquiries"}
                    </div>
                    <a
                      href="mailto:sales@zeroqueries.com"
                      className="text-sm font-normal text-black hover:text-[#6434F5] transition-colors"
                    >
                      sales@zeroqueries.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black">
                    <FiClock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-medium text-black/50 uppercase tracking-[0.15em]">
                      {isAr ? "اتفاقية مستوى الخدمة" : "Guaranteed SLA"}
                    </div>
                    <div className="text-sm font-normal text-black">
                      {isAr ? "خلال 24 ساعة" : "Within 24 Hours"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3.5 sm:pt-4 border-t border-gray-200/70 flex items-start sm:items-center gap-2.5 text-xs text-black/60 font-light">
                <FiHeadphones className="h-4 w-4 text-black shrink-0 mt-0.5 sm:mt-0" />
                <span>
                  {isAr
                    ? "هل تحتاج إلى مساعدة فنية فورية؟ تواصل مباشرة مع فريق هندسة الحلول لدينا."
                    : "Need immediate technical assistance? Connect directly with solutions engineering."}
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE: FORM ================= */}
          <div>
            <div className="relative mx-auto w-full max-w-[500px] rounded-2xl sm:rounded-3xl border border-gray-200/90 bg-white p-5 sm:p-8 lg:p-9 shadow-[0_16px_45px_rgba(0,0,0,0.06)]">
              {/* Top brand bar */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 rounded-full bg-black" />

              {isSubmitted ? (
                <div className="py-8 sm:py-10 px-2 sm:px-4 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gray-100 text-black border border-gray-200">
                    <FiCheck className="h-7 w-7 sm:h-8 sm:w-8 stroke-[2.5]" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-light text-black tracking-tight">
                    {isAr ? "تم استلام طلب العرض التوضيحي" : "Demo Request Received"}
                  </h3>
                  <p className="mt-3 text-sm text-black/70 leading-relaxed font-light">
                    {isAr ? "شكراً لك، " : "Thank you, "}
                    <span className="font-normal text-black">
                      {formData.fullName || (isAr ? "عزيزنا" : "there")}
                    </span>
                    {isAr
                      ? ". لقد استلم أحد متخصصي حلول المؤسسات في ZeroQueries طلبك وسيتواصل معك على "
                      : ". A ZeroQueries enterprise solutions specialist has received your request and will contact you at "}
                    <span className="font-normal text-black">
                      {formData.workEmail || (isAr ? "بريدك الإلكتروني" : "your email")}
                    </span>{" "}
                    {isAr ? "في غضون 24 ساعة." : "within 24 hours."}
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    className="mt-6 sm:mt-7 rounded-xl px-6 py-2.5 h-auto text-sm font-normal"
                  >
                    {isAr ? "إرسال طلب آخر" : "Submit Another Request"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 sm:gap-4">
                  <div className="mb-1 sm:mb-2">
                    <h3 className="text-lg sm:text-xl font-light text-black tracking-tight">
                      {isAr ? "طلب عرض توضيحي للمؤسسات" : "Request an Enterprise Demo"}
                    </h3>
                    <p className="text-xs text-black/60 mt-1 font-light">
                      {isAr
                        ? "املأ بياناتك لجدولة العرض التوضيحي المباشر."
                        : "Fill out your details to schedule your live walkthrough."}
                    </p>
                  </div>

                  {[
                    { id: "fullName", type: "text", label: isAr ? "الاسم الكامل" : "Full Name", required: true },
                    { id: "workEmail", type: "email", label: isAr ? "البريد الإلكتروني للعمل" : "Work Email", required: true },
                    { id: "phone", type: "tel", label: isAr ? "رقم الهاتف (اختياري)" : "Phone Number (Optional)", required: false },
                    { id: "organization", type: "text", label: isAr ? "المؤسسة / الشركة" : "Organization", required: true },
                    { id: "role", type: "text", label: isAr ? "المسمى الوظيفي" : "Role", required: true },
                    { id: "dataEnvironment", type: "text", label: isAr ? "بيئة البيانات (مثل: PostgreSQL, Snowflake)" : "Data Environment (e.g. PostgreSQL, Snowflake)", required: false },
                    { id: "teamSize", type: "text", label: isAr ? "حجم الفريق / المستخدمين المتوقعين (اختياري)" : "Team Size / Expected Users (Optional)", required: false },
                  ].map((field) => (
                    <div key={field.id} className="w-full">
                      <label htmlFor={field.id} className="sr-only">
                        {field.label}
                      </label>
                      <Input
                        id={field.id}
                        type={field.type}
                        name={field.id}
                        required={field.required}
                        value={formData[field.id]}
                        onChange={handleChange}
                        placeholder={field.label}
                        className="h-10 sm:h-11 rounded-xl bg-gray-50 hover:bg-gray-100 focus:bg-white text-sm sm:text-[15px]"
                      />
                    </div>
                  ))}

                  <div className="w-full">
                    <label htmlFor="demo-message" className="sr-only">
                      {isAr ? "ملاحظات أو متطلبات إضافية" : "Additional Notes / Specific Requirements"}
                    </label>
                    <textarea
                      id="demo-message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isAr ? "متطلبات محددة أو ملاحظات إضافية (اختياري)..." : "Specific requirements or notes (Optional)..."}
                      className="flex w-full rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 focus:bg-white px-3.5 py-2.5 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all leading-relaxed font-light resize-none"
                    />
                  </div>

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
                        {isAr ? "جاري الإرسال..." : "Processing..."}
                      </span>
                    ) : (
                      isAr ? "حجز عرض تجريبي للمؤسسات" : "Book Enterprise Demo"
                    )}
                  </Button>

                  <p className="mt-1 text-center text-xs text-black/60 font-light">
                    {isAr
                      ? "سيتواصل معك أحد متخصصي الحلول خلال 24 ساعة."
                      : "A solutions specialist will contact you within 24 hours."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}