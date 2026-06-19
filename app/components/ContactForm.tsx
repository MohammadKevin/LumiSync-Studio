"use client";

import { useState } from "react";
import { portfolioConfig } from "../config/portfolio";
import { Mail, Send, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const { teamName } = portfolioConfig;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "webapp",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }
    
    setIsSubmitting(true);
    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", projectType: "webapp", message: "" });
    }, 1500);
  };

  return (
    <section id="kontak" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Call to action info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10 inline-block">
                Hubungi Kami
              </span>
              <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-text-primary mb-4 leading-tight">
                Mari Buat Sesuatu Yang Luar Biasa
              </h2>
              <p className="text-sm md:text-base text-theme-text-secondary leading-relaxed font-light">
                Apakah Anda memiliki ide project, kebutuhan custom dashboard, atau ingin berkolaborasi? Hubungi kami dan mari wujudkan bersama.
              </p>
            </div>

            {/* Quick Contact Details */}
            <div className="flex flex-col gap-4 mt-4">
              
              <div className="flex gap-4 items-center bg-zinc-50 border border-zinc-200/50 p-4 rounded-2xl">
                <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase">Email Utama Kami</div>
                  <a href={`mailto:hello@lumisync.dev`} className="text-sm font-semibold text-zinc-800 hover:text-brand-primary transition-colors">
                    hello@lumisync.dev
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-center bg-zinc-50 border border-zinc-200/50 p-4 rounded-2xl">
                <div className="p-3 bg-brand-secondary/10 text-brand-secondary rounded-xl shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-zinc-400 font-bold uppercase">Waktu Respon</div>
                  <div className="text-sm font-semibold text-zinc-800">
                    Kurang dari 24 jam
                  </div>
                </div>
              </div>

            </div>

            {/* Creative Pitch Info */}
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 rounded-[32px] p-8 border border-brand-primary/10">
              <h4 className="font-heading font-extrabold text-lg text-theme-text-primary">
                Mengapa Memilih {teamName}?
              </h4>
              <ul className="flex flex-col gap-3 mt-4 text-xs text-zinc-600 leading-relaxed font-light">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  <span>Komunikasi langsung dengan developer & desainer tanpa perantara manager sales.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  <span>Desain kustom eksklusif, tidak memakai template instan generic.</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                  <span>Backend yang dioptimasi untuk kecepatan request dan keamanan tingkat tinggi.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Contact Card Form */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/60 rounded-[36px] p-8 md:p-10 shadow-sm relative">
            
            {submitStatus === "success" ? (
              <div className="flex flex-col items-center text-center py-12 animate-float-none">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-zinc-800">
                  Pesan Terkirim!
                </h3>
                <p className="text-sm text-zinc-500 max-w-sm mt-3 leading-relaxed">
                  Terima kasih telah menghubungi kami. Kami akan memeriksa pesan Anda dan membalasnya dalam waktu maksimal 24 jam.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className="mt-8 px-6 py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 text-sm font-semibold text-zinc-700 transition-colors cursor-pointer"
                >
                  Kirim Pesan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                {submitStatus === "error" && (
                  <div className="flex items-center gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Harap lengkapi semua kolom form input yang wajib diisi.</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-bold uppercase text-zinc-500 tracking-wider">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama Anda"
                      className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all"
                      required
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-bold uppercase text-zinc-500 tracking-wider">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="nama@perusahaan.com"
                      className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Project type field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="projectType" className="text-xs font-bold uppercase text-zinc-500 tracking-wider">
                    Kategori Project
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all appearance-none cursor-pointer"
                  >
                    <option value="webapp">Web Application Development</option>
                    <option value="uiux">UI/UX Rebranding & Figma</option>
                    <option value="backend">API Dev & Database Tuning</option>
                    <option value="fullstack">Full-Stack SaaS (Design & Dev)</option>
                    <option value="other">Konsultasi / Lainnya</option>
                  </select>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase text-zinc-500 tracking-wider">
                    Jelaskan Detail Project Anda *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Beri tahu kami mengenai fungsionalitas, target rilis, dan konsep project yang ingin Anda bangun..."
                    rows={5}
                    className="w-full px-4 py-3.5 bg-white border border-zinc-200 rounded-xl text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-zinc-900 text-white font-bold text-base hover:bg-zinc-800 transition-colors shadow-md disabled:bg-zinc-400 disabled:cursor-not-allowed cursor-pointer active:scale-99"
                >
                  {isSubmitting ? (
                    <span>Mengirim...</span>
                  ) : (
                    <>
                      <span>Kirim Pesan</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
