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
  title: "LumiSync Studio | Premium Web Development Duo",
  description: "Bespoke digital products developed by Mohammad Kevin & deployed by Danendra Athallah. High-performance fullstack web applications paired with robust cloud infrastructure.",
  keywords: [
    "Web Development Duo",
    "Portfolio Kelompok",
    "Next.js Developer Duo",
    "Fullstack Developer Indonesia",
    "DevOps Engineer Indonesia",
    "LumiSync Studio"
  ],
  authors: [{ name: "Mohammad Kevin" }, { name: "Danendra Athallah" }],
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
