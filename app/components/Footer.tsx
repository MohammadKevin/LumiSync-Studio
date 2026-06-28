"use client";

import { portfolioConfig } from "../config/portfolio";
import { Mail } from "lucide-react";

export default function Footer() {
  const { teamName, members } = portfolioConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-theme-bg border-t border-zinc-200/60 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-8 border-b border-zinc-200/40">
          
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-white font-bold text-base shadow-sm shadow-brand-primary/10 group-hover:rotate-12 transition-transform duration-300">
                LS
              </div>
              <span className="font-heading font-extrabold text-lg tracking-tight text-gradient">
                {teamName}
              </span>
            </a>
            <p className="text-xs text-zinc-400 mt-1 max-w-xs text-center md:text-left">
              High-performance web applications designed with precision and engineered for scale.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-zinc-500">
            <a href="#home" className="hover:text-brand-primary transition-colors">Home</a>
            <a href="#tim" className="hover:text-brand-primary transition-colors">Tim Kami</a>
            <a href="#layanan" className="hover:text-brand-primary transition-colors">Layanan</a>
            <a href="#portofolio" className="hover:text-brand-primary transition-colors">Portofolio</a>
            <a href="#sinergi" className="hover:text-brand-primary transition-colors">Sinergi</a>
            <a href="#kontak" className="hover:text-brand-primary transition-colors">Kontak</a>
          </div>

          {/* Shared Social Row */}
          <div className="flex items-center gap-3">
            <a
              href={members.kevin.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-colors"
              aria-label="GitHub Team Profile"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href={members.kevin.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-colors"
              aria-label="LinkedIn Team Profile"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href={`mailto:kvn4.200581@gmail.com`}
              className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-colors"
              aria-label="Email Studio"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Copyright notice */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 text-xs text-zinc-400 font-light">
          <div>
            &copy; {currentYear} {teamName}. Hak Cipta Dilindungi.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
            <a href="#" className="hover:underline">Syarat Layanan</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
