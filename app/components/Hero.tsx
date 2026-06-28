"use client";

import Image from "next/image";
import { portfolioConfig } from "../config/portfolio";
import { ArrowRight, Sparkles, Layers } from "lucide-react";

export default function Hero() {
  const { tagline, description, members } = portfolioConfig;

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-theme-bg"
    >
      {/* Animated Glowing Orbs Background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-brand-primary/10 blur-[100px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-secondary/10 blur-[120px] animate-pulse-slow pointer-events-none" />

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid-bg opacity-70 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold tracking-wide animate-float">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Colaborative Developer Duo</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-theme-text-primary leading-[1.15]">
            Kami Mendesain & <br />
            <span className="text-gradient">Membangun Web Impian</span>
          </h1>

          <p className="text-lg md:text-xl text-theme-text-secondary max-w-2xl leading-relaxed font-light">
            {tagline}. {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
            <a
              href="#kontak"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-brand-primary text-white font-bold text-base hover:bg-brand-primary/95 shadow-lg shadow-brand-primary/25 hover:shadow-brand-primary/35 transition-all duration-300 active:scale-98"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#portofolio"
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-zinc-200 text-zinc-700 font-bold text-base hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 shadow-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Lihat Portofolio</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 md:gap-12 mt-8 pt-8 border-t border-zinc-200/60 w-full max-w-lg">
            <div>
              <div className="font-heading font-extrabold text-2xl md:text-3xl text-brand-primary">40+</div>
              <div className="text-xs text-theme-text-secondary mt-1">Project Selesai</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl md:text-3xl text-brand-secondary">99.9%</div>
              <div className="text-xs text-theme-text-secondary mt-1">Uptime Target</div>
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl md:text-3xl text-rose-500">100%</div>
              <div className="text-xs text-theme-text-secondary mt-1">Kepuasan Klien</div>
            </div>
          </div>
        </div>

        {/* Right Side: Duo Feature Image Mockup */}
        <div className="lg:col-span-5 flex justify-center items-center relative w-full h-[400px] md:h-[450px]">
          {/* Main Visual: Two Overlapping Cards */}
          
          {/* Card Kevin (Designer) */}
          <div className="absolute w-[240px] md:w-[270px] bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 hover:-translate-y-4 hover:-rotate-2 group z-20 left-[5%] sm:left-[10%] top-[5%]">
            <div className="relative w-full h-[180px] md:h-[210px] rounded-2xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200/30">
              <Image
                src={members.kevin.avatar}
                alt={members.kevin.name}
                fill
                sizes="(max-width: 768px) 240px, 270px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-brand-primary/90 text-white font-semibold text-[10px] tracking-wider uppercase">
                Fullstack Dev
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-theme-text-primary">
              {members.kevin.name}
            </h3>
            <p className="text-xs text-theme-text-secondary mt-1">
              &quot;Menghubungkan visual yang memukau dengan logika backend yang solid untuk menghasilkan web premium.&quot;
            </p>
          </div>

          {/* Card Aris (Backend) */}
          <div className="absolute w-[240px] md:w-[270px] bg-white rounded-3xl p-5 border border-zinc-200/80 shadow-xl shadow-zinc-200/50 hover:shadow-2xl hover:shadow-brand-secondary/10 transition-all duration-500 hover:-translate-y-4 hover:rotate-2 group z-10 right-[5%] sm:right-[10%] bottom-[5%]">
            <div className="relative w-full h-[180px] md:h-[210px] rounded-2xl overflow-hidden bg-zinc-100 mb-4 border border-zinc-200/30">
              <Image
                src={members.aris.avatar}
                alt={members.aris.name}
                fill
                sizes="(max-width: 768px) 240px, 270px"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-brand-secondary/90 text-white font-semibold text-[10px] tracking-wider uppercase">
                DevOps
              </div>
            </div>
            <h3 className="font-heading font-bold text-lg text-theme-text-primary">
              {members.aris.name}
            </h3>
            <p className="text-xs text-theme-text-secondary mt-1">
              &quot;Otomatisasi, skalabilitas, dan stabilitas server adalah kunci utama kelancaran bisnis digital.&quot;
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
