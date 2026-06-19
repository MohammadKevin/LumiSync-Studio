"use client";

import { useState, useEffect } from "react";
import { portfolioConfig } from "../config/portfolio";
import { Menu, X, Copy, Check, Sparkles } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Tim Kami", href: "#tim" },
    { label: "Layanan", href: "#layanan" },
    { label: "Portofolio", href: "#portofolio" },
    { label: "Sinergi", href: "#sinergi" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/70 backdrop-blur-md border-b border-zinc-200/50 shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-brand-primary flex items-center justify-center text-white font-bold text-lg shadow-md shadow-brand-primary/20 group-hover:rotate-12 transition-transform duration-300">
            LS
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-gradient">
            {portfolioConfig.teamName}
          </span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-theme-text-secondary hover:text-brand-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-brand-primary hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Utilities */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-700 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 shadow-xs cursor-pointer transition-all duration-200 active:scale-95"
            title="Salin Link Portofolio"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </>
            )}
          </button>

          <a
            href="#kontak"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-brand-primary rounded-full hover:bg-brand-primary/95 shadow-md shadow-brand-primary/20 transition-all duration-200 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mulai Project</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="p-2 text-zinc-600 bg-white border border-zinc-200 rounded-full hover:bg-zinc-50"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-800 hover:text-brand-primary transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-white shadow-2xl p-8 border-l border-zinc-200 transition-transform duration-300 ease-in-out md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-10">
          <span className="font-heading font-bold text-lg text-gradient">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-zinc-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-zinc-700 hover:text-brand-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="h-px bg-zinc-100 my-4" />
          <a
            href="#kontak"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 text-sm font-bold text-white bg-brand-primary rounded-xl shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/95 transition-all duration-200"
          >
            Mulai Project
          </a>
        </div>
      </div>
    </nav>
  );
}
