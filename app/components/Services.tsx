"use client";

import { portfolioConfig } from "../config/portfolio";
import { Palette, Layout, Server, Database, Cloud, Cpu, ArrowUpRight } from "lucide-react";

// Map string identifiers from config to actual Lucide component references
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette: Palette,
  Layout: Layout,
  Server: Server,
  Database: Database,
  Cloud: Cloud,
  Cpu: Cpu
};

export default function Services() {
  const { services } = portfolioConfig;

  return (
    <section id="layanan" className="py-24 bg-theme-bg relative overflow-hidden">
      
      {/* Decorative grids/shapes */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary mb-3 px-3 py-1 rounded-full bg-brand-secondary/5 border border-brand-secondary/10">
            Layanan Kami
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-text-primary mb-4">
            Solusi Digital Terpadu
          </h2>
          <p className="text-base md:text-lg text-theme-text-secondary max-w-2xl font-light">
            Dari perancangan visual hingga peluncuran server, kami menyediakan layanan menyeluruh tanpa perantara pihak ketiga.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.iconName] || Cpu;
            
            return (
              <div
                key={index}
                className="group relative bg-white border border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/40 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                {/* Decorative border accent */}
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-brand-primary/10 transition-colors duration-300 pointer-events-none" />
                
                <div>
                  {/* Icon Block */}
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-700 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 group-hover:shadow-md group-hover:shadow-brand-primary/20">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-xl text-theme-text-primary mt-6 group-hover:text-brand-primary transition-colors duration-200">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-theme-text-secondary mt-3">
                    {service.description}
                  </p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 group-hover:text-brand-primary transition-colors duration-200 mt-6 pt-4 border-t border-zinc-50">
                  <span>Pelajari Selengkapnya</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Pitch Callout */}
        <div className="mt-16 bg-white border border-zinc-200/60 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="font-heading font-bold text-lg text-theme-text-primary">
              Butuh solusi kustom yang tidak ada di daftar ini?
            </h4>
            <p className="text-sm text-theme-text-secondary mt-1">
              Jangan ragu untuk mengonsultasikan ide project Anda kepada kami secara gratis.
            </p>
          </div>
          <a
            href="#kontak"
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-zinc-900 rounded-xl hover:bg-zinc-800 transition-colors shadow-sm cursor-pointer"
          >
            Konsultasi Sekarang
          </a>
        </div>

      </div>
    </section>
  );
}
