"use client";

import React from "react";
import {
  Users,
  Ruler,
  Layout,
  Wrench,
  CalendarCheck,
  ShieldOff,
} from "lucide-react";

interface Court {
  id: string;
  name: string;
  badge: string;
  price: string;
  capacity: number;
  size: string;
  surface: string;
  isMaintenance: boolean;
  maintenanceNote?: string;
  gradientFrom: string;
  gradientTo: string;
}

const COURTS: Court[] = [
  {
    id: "court-interlock",
    name: "Lapangan Standar Interlock",
    badge: "TRAKSI TINGGI ANTI-SLIP",
    price: "Rp 150rb",
    capacity: 10,
    size: "25m x 15m",
    surface: "Interlock",
    isMaintenance: false,
    gradientFrom: "from-blue-900/70",
    gradientTo: "to-green-900/50",
  },
  {
    id: "court-vinyl",
    name: "Lapangan Vinyl Deluxe",
    badge: "SHOCK ABSORPTION MULTILAYER",
    price: "Rp 200rb",
    capacity: 10,
    size: "25m x 15m",
    surface: "Vinyl Premium",
    isMaintenance: true,
    maintenanceNote: "Penggantian permukaan vinyl dijadwalkan s/d 30 Juli 2026",
    gradientFrom: "from-emerald-900/70",
    gradientTo: "to-teal-900/50",
  },
  {
    id: "court-premier",
    name: "Lapangan Premier International",
    badge: "SPESIFIKASI KAYU FIFA",
    price: "Rp 250rb",
    capacity: 10,
    size: "30m x 20m",
    surface: "Parquet",
    isMaintenance: false,
    gradientFrom: "from-green-900/70",
    gradientTo: "to-lime-900/40",
  },
];

interface CourtsSectionProps {
  onBookClick: (courtId: string, courtName: string) => void;
}

export default function CourtsSection({ onBookClick }: CourtsSectionProps) {
  return (
    <section
      id="pilih-lapangan"
      className="py-16 sm:py-24 border-t border-theme-border/50 relative overflow-hidden"
    >
      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-brand-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-secondary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-extrabold tracking-[0.25em] uppercase text-brand-primary mb-3">
            Fasilitas Premium
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight mb-4">
            Lapangan <span className="text-brand-primary">Kami</span>
          </h2>
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-primary" />
            <div className="w-2 h-2 rounded-full bg-brand-primary" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-primary" />
          </div>
          <p className="text-theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Pilih lapangan sesuai kebutuhan timmu. Lapangan yang sedang
            maintenance sementara tidak dapat dipesan.
          </p>
        </div>

        {/* Court Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {COURTS.map((court) => (
            <div
              key={court.id}
              className={`group glass-panel rounded-2xl border overflow-hidden flex flex-col transition-all duration-300 ${
                court.isMaintenance
                  ? "border-amber-500/30"
                  : "border-theme-border hover:border-brand-primary/50 hover:shadow-[0_0_30px_rgba(34,197,94,0.08)] hover:-translate-y-1"
              }`}
            >
              {/* Court Image Area */}
              <div className="relative h-44 sm:h-48 overflow-hidden flex-shrink-0">
                {/* Top badge */}
                <div className="absolute top-3 left-3 z-20">
                  <span
                    className={`text-[9px] sm:text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                      court.isMaintenance
                        ? "bg-amber-500/90 text-black"
                        : "bg-brand-primary/90 text-black"
                    }`}
                  >
                    {court.isMaintenance ? "🔧 MAINTENANCE" : court.badge}
                  </span>
                </div>

                {/* Maintenance overlay */}
                {court.isMaintenance && (
                  <div className="absolute inset-0 z-10 bg-amber-950/60 backdrop-blur-[2px] flex flex-col items-center justify-center gap-2">
                    <div className="bg-amber-500/20 border border-amber-500/40 rounded-full p-3">
                      <Wrench className="w-8 h-8 text-amber-400 animate-pulse" />
                    </div>
                    <span className="text-amber-300 font-bold text-sm">
                      Sedang Maintenance
                    </span>
                  </div>
                )}

                {/* Court visual bg */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${court.gradientFrom} ${court.gradientTo} transition-transform duration-500 ${
                    !court.isMaintenance ? "group-hover:scale-105" : ""
                  }`}
                />
                {/* Grid lines */}
                <div
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Center circle */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div
                    className={`w-20 h-20 rounded-full border-2 transition-all duration-300 ${
                      court.isMaintenance
                        ? "border-amber-400/15"
                        : "border-white/10 group-hover:border-brand-primary/30"
                    }`}
                  />
                </div>
                {/* Penalty area lines */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-3/5 h-1/3 border-t-2 border-x-2 transition-all duration-300 ${
                    court.isMaintenance
                      ? "border-amber-400/10"
                      : "border-white/8"
                  } rounded-t-xl`}
                />
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1">
                {/* Stats Row */}
                <div className="flex items-center gap-4 text-xs text-theme-text-secondary mb-4 flex-wrap">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-brand-primary/70" />
                    {court.capacity}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Ruler className="w-3.5 h-3.5 text-brand-primary/70" />
                    {court.size}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layout className="w-3.5 h-3.5 text-brand-primary/70" />
                    {court.surface}
                  </span>
                </div>

                {/* Court Name */}
                <h3
                  className={`text-base sm:text-lg font-bold mb-2 leading-snug ${
                    court.isMaintenance
                      ? "text-theme-text-secondary"
                      : "text-theme-text-primary"
                  }`}
                >
                  {court.name}
                </h3>

                {/* Maintenance Note */}
                {court.isMaintenance && court.maintenanceNote && (
                  <div className="flex items-start gap-2 text-[11px] text-amber-400/90 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3 py-2.5 mb-3 leading-snug">
                    <ShieldOff className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                    <span>{court.maintenanceNote}</span>
                  </div>
                )}

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-theme-border/50">
                  <div>
                    <p
                      className={`text-xl font-extrabold leading-none ${
                        court.isMaintenance
                          ? "text-theme-text-secondary/60"
                          : "text-theme-text-primary"
                      }`}
                    >
                      {court.price}
                    </p>
                    <p className="text-[10px] text-theme-text-secondary mt-0.5">
                      per jam
                    </p>
                  </div>

                  {court.isMaintenance ? (
                    <button
                      disabled
                      aria-disabled="true"
                      title="Lapangan sedang dalam maintenance, tidak dapat dipesan"
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500/60 font-bold text-xs cursor-not-allowed select-none"
                    >
                      <Wrench className="w-3.5 h-3.5" />
                      Maintenance
                    </button>
                  ) : (
                    <button
                      onClick={() => onBookClick(court.id, court.name)}
                      className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-primary text-theme-bg font-extrabold text-xs tracking-wide transition-all duration-300 hover:bg-brand-primary/90 hover:shadow-[0_0_20px_rgba(34,197,94,0.45)] active:scale-95 cursor-pointer"
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      BOOKING
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10 text-xs text-theme-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary" />
            <span>Lapangan tersedia untuk booking</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Sedang dalam maintenance — tidak dapat dipesan</span>
          </div>
        </div>
      </div>
    </section>
  );
}
