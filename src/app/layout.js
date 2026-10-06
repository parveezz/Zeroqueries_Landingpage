import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";
import WhatsAppFloatingButton from "@/Components/Shared/WhatsAppFloatingButton";
import { cookies } from "next/headers";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Zeroquries",
  description: "AI-Powered Decision Intelligence",
  other: {
    google: "notranslate",
  },
  icons: {
    icon: "/zerologo.png",
    shortcut: "/zerologo.png",
    apple: "/zerologo.png",
  },
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("preferred_lang")?.value;
  const initialLang = langCookie === "ar" ? "ar" : "en";

  return (
    <html
      lang={initialLang}
      dir="ltr"
      translate="no"
      className={`${inter.variable} notranslate h-full antialiased`}
      data-scroll-behavior="smooth"
      data-scribe-recorder-ready="true"
    >
      <head>
        <meta name="google" content="notranslate" />
      </head>
      <body className="notranslate min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <LanguageProvider initialLang={initialLang}>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFloatingButton />
        </LanguageProvider>
      </body>
    </html>
  );
}

