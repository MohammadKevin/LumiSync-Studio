"use client";

import React from "react";
import { Mail, Phone, MapPin, Activity, HelpCircle } from "lucide-react";

export default function Footer() {
  const sponsors = [
    { name: "Kantin Sehat", desc: "Makanan bergizi penambah energi siswa", tag: "Kantin Sekolah" },
    { name: "Koperasi Siswa", desc: "Penyedia jersey & perlengkapan futsal", tag: "Kopsis Mart" },
    { name: "Sponsor OSIS", desc: "Mendukung kreativitas & olahraga sekolah", tag: "OSIS Cup" },
  ];

  return (
    <footer className="bg-theme-card border-t border-theme-border/60 mt-auto relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-brand-secondary/5 blur-[80px] pointer-events-none" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* Logo & About Column */}
          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <div className="bg-brand-primary/10 p-2 rounded-lg border border-brand-primary/30">
                <Activity className="h-5 w-5 text-brand-primary" />
              </div>
              <span className="text-lg font-bold tracking-wider font-heading text-theme-text-primary">
                KICK<span className="text-brand-primary font-extrabold">TIME</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-theme-text-secondary leading-relaxed">
              Sistem booking lapangan futsal sekolah pintar yang dikembangkan untuk memastikan semua siswa mendapatkan hak bermain secara adil, tertata, dan anti bentrok.
            </p>
          </div>

          {/* Admin Contacts Column */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-theme-text-primary flex items-center space-x-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-brand-primary" />
              <span>Kontak Admin Sekolah</span>
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-theme-text-secondary">
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span className="hover:text-brand-primary transition-colors">Ext. 104 (Guru Olahraga)</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span className="hover:text-brand-primary transition-colors">admin@kicktime-school.sch.id</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-brand-primary flex-shrink-0" />
                <span className="leading-snug">Gedung Olahraga (GOR) Lantai 1, Lapangan Belakang</span>
              </li>
            </ul>
          </div>

          {/* Sponsors Column */}
          <div className="space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-theme-text-primary">
              Sponsor Lokal Sekolah
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="glass-panel p-3.5 rounded-xl border border-theme-border flex flex-col justify-between hover:border-brand-primary/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="text-xs font-bold text-theme-text-primary">{sponsor.name}</h5>
                    <span className="text-[9px] font-bold text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-2 py-0.5 rounded-full uppercase">
                      {sponsor.tag}
                    </span>
                  </div>
                  <p className="text-[10px] text-theme-text-secondary leading-snug">
                    {sponsor.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-theme-border/60 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-theme-text-secondary">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} KickTime. All rights reserved. Hubungi admin sekolah jika terdapat kendala sistem.
          </p>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-brand-primary transition-colors">Panduan Lapangan</a>
            <span>&bull;</span>
            <a href="#" className="hover:text-brand-primary transition-colors">Aturan Bermain</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
