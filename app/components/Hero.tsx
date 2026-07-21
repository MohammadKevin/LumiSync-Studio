"use client";

import React from "react";
import { Calendar, Clock, Activity, Award, ShieldAlert } from "lucide-react";

interface HeroProps {
  onBookNowClick: () => void;
}

export default function Hero({ onBookNowClick }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden py-20 sm:py-28 lg:py-32 flex flex-col items-center justify-center min-h-[80vh]">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-brand-primary/10 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-brand-secondary/15 blur-[80px] sm:blur-[120px] pointer-events-none animate-pulse-slow" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/30 px-3.5 py-1.5 rounded-full mb-6 sm:mb-8 animate-bounce">
          <Activity className="w-4 h-4 text-brand-primary" />
          <span className="text-xs sm:text-sm font-bold tracking-wider text-brand-primary uppercase">
            Sistem Booking Lapangan Pintar
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-heading tracking-tight leading-[1.1] mb-6 max-w-4xl text-theme-text-primary">
          Booking Cepat, <br />
          <span className="text-gradient">Main Tanpa Bentrok!</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base sm:text-xl text-theme-text-secondary max-w-2xl mb-8 sm:mb-10 leading-relaxed">
          Atur jadwal tanding kelasmu secara instan di Lapangan Futsal Sekolah. 
          Lihat slot kosong secara real-time, klaim jadwal, dan buktikan siapa tim terkuat!
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20">
          <button
            onClick={onBookNowClick}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-brand-primary text-theme-bg font-extrabold text-base tracking-wide transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] hover:bg-brand-primary/95 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Mulai Booking Sekarang
          </button>
          
          <button
            onClick={() => {
              const el = document.getElementById("schedule");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-theme-card text-theme-text-primary border border-theme-border font-bold text-base tracking-wide hover:bg-theme-border/30 hover:border-brand-primary/30 transition-all duration-300 cursor-pointer"
          >
            Lihat Jadwal Hari Ini
          </button>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl">
          {/* Card 1 */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-brand-primary/10 p-3 rounded-xl mb-4 border border-brand-primary/20">
              <Clock className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Slot Real-time</h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary">
              Status ketersediaan lapangan langsung diperbarui setiap kali ada booking baru.
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-brand-secondary/10 p-3 rounded-xl mb-4 border border-brand-secondary/20">
              <ShieldAlert className="w-6 h-6 text-brand-secondary" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Anti Bentrok</h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary">
              Sistem otomatis mengunci jam yang sudah dipesan. Tidak ada lagi rebutan lapangan!
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel p-6 rounded-2xl border border-theme-border flex flex-col items-center text-center transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-brand-accent/10 p-3 rounded-xl mb-4 border border-brand-accent/20">
              <Award className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Sertifikat Kelas</h3>
            <p className="text-xs sm:text-sm text-theme-text-secondary">
              Konfirmasi resmi booking tercatat atas nama perwakilan kelas yang sah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
