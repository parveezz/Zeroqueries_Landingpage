import { Inter } from "next/font/google";
import Script from "next/script";
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
  title: "ZeroQueries | Natural Language to SQL AI Platform",
  description: "AI-Powered Enterprise Decision Intelligence",
  manifest: "/manifest.json",
  verification: {
    google: "kcQaVBhgDkNvdOFbwnmTEXcfPZKNzvGJbo-CBuD-LGg",
  },
  icons: {
    icon: [
      { url: "/Home/ZQ_APP_icon.png", type: "image/png" },
      { url: "/zerologo.png" }
    ],
    shortcut: "/Home/ZQ_APP_icon.png",
    apple: "/apple-touch-icon.png",
  },
  other: {
    google: "notranslate",
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

        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-KQBK96S9');`}
        </Script>

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BXL9GZ0W7S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BXL9GZ0W7S');`}
        </Script>

        {/* Microsoft Clarity Tracking */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "y0lj9an7aq");`}
        </Script>
      </head>
      <body className="notranslate min-h-full flex flex-col bg-white text-gray-900 font-sans">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQBK96S9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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

