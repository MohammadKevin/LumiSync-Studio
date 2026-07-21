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
  title: "KickTime - Booking Cepat, Main Tanpa Bentrok!",
  description: "Sistem booking lapangan futsal sekolah pintar, cepat, dan real-time.",
  keywords: [
    "KickTime",
    "Futsal Court Booking",
    "Booking Lapangan Futsal",
    "Futsal Sekolah",
    "Smart Booking System"
  ],
  authors: [{ name: "KickTime Team" }],
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
