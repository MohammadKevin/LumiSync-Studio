"use client";

import { portfolioConfig } from "../config/portfolio";
import { Sparkles, Zap, RefreshCw } from "lucide-react";

export default function Synergy() {
  const { synergySteps } = portfolioConfig;

  return (
    <section id="sinergi" className="py-24 bg-theme-bg relative overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] rounded-full bg-brand-primary/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-brand-secondary/5 blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10">
            Sinergi Alur Kerja
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-text-primary mb-4">
            Bagaimana Kami Berkolaborasi
          </h2>
          <p className="text-base md:text-lg text-theme-text-secondary max-w-2xl font-light">
            Alur kerja paralel yang terkoordinasi rapi untuk menghasilkan web app berkualitas tinggi secara efisien.
          </p>
        </div>

        {/* Process Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {synergySteps.map((step, idx) => (
            <div
              key={idx}
              className="group relative bg-white border border-zinc-200/80 p-8 rounded-3xl transition-all duration-300 hover:shadow-lg hover:shadow-zinc-200/30 hover:-translate-y-1 overflow-hidden"
            >
              {/* Animated Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-zinc-100 group-hover:bg-gradient-to-r group-hover:from-brand-primary group-hover:to-brand-secondary transition-all duration-300" />

              {/* Number Badge */}
              <div className="font-heading font-black text-4xl text-zinc-200 group-hover:text-brand-primary/20 transition-colors duration-300">
                {step.number}
              </div>

              {/* Title & Role */}
              <h3 className="font-heading font-bold text-lg text-theme-text-primary mt-4">
                {step.title}
              </h3>
              
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-50 border border-zinc-100 text-[10px] font-bold text-zinc-500 uppercase mt-2">
                <Zap className="w-3 h-3 text-brand-primary" />
                <span>Lead: {step.lead}</span>
              </div>

              {/* Description */}
              <p className="text-xs leading-relaxed text-theme-text-secondary mt-4 font-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Synergy Values Callout */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white/60 border border-zinc-200/60 rounded-3xl p-6 flex gap-4 items-start">
            <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-zinc-800">Komunikasi Transparan</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Kami menyelaraskan pembaruan project secara rutin melalui Discord dan GitHub agar klien selalu mengetahui progress terkini.
              </p>
            </div>
          </div>

          <div className="bg-white/60 border border-zinc-200/60 rounded-3xl p-6 flex gap-4 items-start">
            <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-xl shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-zinc-800">Paralel Coding & Sync</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Pengerjaan paralel memungkinkan durasi pengerjaan 2x lebih cepat tanpa merusak kualitas masing-masing bagian.
              </p>
            </div>
          </div>

          <div className="bg-white/60 border border-zinc-200/60 rounded-3xl p-6 flex gap-4 items-start">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-base text-zinc-800">Zero Redundancy</h4>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Desainer dan Developer sinkron sejak awal pembuatan database schema, memastikan layout dinamis dan responsif tanpa hambatan integrasi.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
