import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "LumiSync Studio | Premium Web Design & Development Duo",
  description: "Bespoke digital products designed by Kevin Pratama & engineered by Aris Setiawan. High-performance frontend interfaces paired with scalable backend architectures.",
  keywords: [
    "Web Development Duo",
    "Portfolio Kelompok",
    "Next.js Developer Duo",
    "UI UX Designer Indonesia",
    "Backend Architect Go Node",
    "LumiSync Studio"
  ],
  authors: [{ name: "Kevin Pratama" }, { name: "Aris Setiawan" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${outfit.variable} ${plusJakartaSans.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col bg-theme-bg text-theme-text-primary selection:bg-brand-primary/20 selection:text-brand-primary font-sans">
        {children}
      </body>
    </html>
  );
}
