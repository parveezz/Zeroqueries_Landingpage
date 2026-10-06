"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children, initialLang = "en" }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const match = document.cookie.match(/(?:^|;\s*)preferred_lang=([^;]+)/);
        if (match && (match[1] === "en" || match[1] === "ar")) {
          return match[1];
        }
        const saved = localStorage.getItem("preferred_lang");
        if (saved === "en" || saved === "ar") {
          return saved;
        }
      } catch {}
    }
    return initialLang || "en";
  });

  // Synchronize on mount if browser has stored preference
  useEffect(() => {
    try {
      const match = document.cookie.match(/(?:^|;\s*)preferred_lang=([^;]+)/);
      const cookieVal = match ? match[1] : null;
      const localVal = localStorage.getItem("preferred_lang");
      const active = (cookieVal === "en" || cookieVal === "ar") ? cookieVal : ((localVal === "en" || localVal === "ar") ? localVal : null);
      if (active && active !== lang) {
        setLang(active);
      }
    } catch {}
  }, []);

  // Update HTML lang attribute and ensure cookie and notranslate are set
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.dir = "ltr";
      document.documentElement.setAttribute("translate", "no");
      document.documentElement.classList.add("notranslate");
      document.body.classList.add("notranslate");
      document.cookie = `preferred_lang=${lang};path=/;max-age=31536000;SameSite=Lax`;
      try {
        localStorage.setItem("preferred_lang", lang);
      } catch {}
    }
  }, [lang]);

  const changeLang = (code) => {
    setLang(code);
    try {
      localStorage.setItem("preferred_lang", code);
      if (typeof document !== "undefined") {
        document.cookie = `preferred_lang=${code};path=/;max-age=31536000;SameSite=Lax`;
        document.documentElement.lang = code;
        document.documentElement.dir = "ltr";
        document.documentElement.setAttribute("translate", "no");
        document.documentElement.classList.add("notranslate");
        document.body.classList.add("notranslate");
      }
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

