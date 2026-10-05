import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Shared/Navbar";
import Footer from "@/Components/Shared/Footer";
import WhatsAppFloatingButton from "@/Components/Shared/WhatsAppFloatingButton";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Zeroquries",
  description: "AI-Powered Decision Intelligence",
  icons: {
    icon: "/zerologo.png",
    shortcut: "/zerologo.png",
    apple: "/zerologo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
      data-scribe-recorder-ready="true"
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900 font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
