"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioConfig } from "../config/portfolio";
import { Mail, CheckCircle2 } from "lucide-react";

export default function TeamSection() {
  const { members } = portfolioConfig;
  const [activeTab, setActiveTab] = useState<"kevin" | "aris">("kevin");

  const activeMember = members[activeTab];

  return (
    <section id="tim" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 rounded-full bg-brand-primary/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-brand-secondary/5 blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10">
            Duo Power
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-text-primary mb-4">
            Dibalik Setiap Baris Kode & Desain
          </h2>
          <p className="text-base md:text-lg text-theme-text-secondary max-w-2xl font-light">
            Kami memadukan estetika desain dengan rekayasa sistem yang matang untuk menghadirkan produk digital tingkat tinggi.
          </p>

          {/* Member Toggle Tabs */}
          <div className="flex bg-zinc-100 p-1.5 rounded-2xl mt-10 shadow-inner max-w-sm w-full border border-zinc-200/50">
            <button
              onClick={() => setActiveTab("kevin")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === "kevin"
                  ? "bg-white text-brand-primary shadow-md"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              💻 {members.kevin.nickname || members.kevin.name.split(" ")[0]}
            </button>
            <button
              onClick={() => setActiveTab("aris")}
              className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === "aris"
                  ? "bg-white text-brand-secondary shadow-md"
                  : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              🚀 {members.aris.nickname || members.aris.name.split(" ")[0]}
            </button>
          </div>
        </div>

        {/* Member Profile Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[480px]">
          
          {/* Avatar Area */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-[36px] overflow-hidden border border-zinc-200 shadow-2xl bg-zinc-50 group">
              {/* Decorative backgrounds */}
              <div className={`absolute inset-0 bg-gradient-to-t ${activeTab === 'kevin' ? 'from-brand-primary/20' : 'from-brand-secondary/20'} to-transparent opacity-60 z-10`} />
              
              <Image
                src={activeMember.avatar}
                alt={activeMember.name}
                fill
                sizes="(max-width: 768px) 100vw, 360px"
                className="object-cover group-hover:scale-103 transition-transform duration-700"
                priority
              />

              {/* Float Tags */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-white/95 backdrop-blur-xs p-5 rounded-2xl shadow-lg border border-white/50">
                <div className="font-heading font-extrabold text-lg text-theme-text-primary">
                  {activeMember.name}
                </div>
                <div className={`text-xs font-semibold mt-0.5 ${activeTab === 'kevin' ? 'text-brand-primary' : 'text-brand-secondary'}`}>
                  {activeMember.role}
                </div>
              </div>
            </div>
          </div>

          {/* Details Area */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Bio Card */}
            <div>
              <span className={`inline-block text-xs font-bold uppercase tracking-wider ${activeTab === 'kevin' ? 'text-brand-primary' : 'text-brand-secondary'} mb-2`}>
                Bio & Filosofi
              </span>
              <p className="text-lg md:text-xl text-zinc-700 leading-relaxed font-light">
                &quot;{activeMember.bio}&quot;
              </p>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-4 py-6 my-2 border-y border-zinc-100">
              {activeMember.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-heading font-extrabold text-2xl md:text-3xl text-zinc-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500 mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Skills & Badges */}
            <div>
              <span className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-3">
                Keahlian & Teknologi Utama
              </span>
              <div className="flex flex-wrap gap-2">
                {activeMember.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-50 border border-zinc-200/60 text-sm font-semibold text-zinc-700 hover:border-zinc-300 hover:bg-zinc-100/50 transition-colors"
                  >
                    <CheckCircle2 className={`w-4 h-4 ${activeTab === 'kevin' ? 'text-brand-primary' : 'text-brand-secondary'}`} />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Connect buttons */}
            <div className="flex flex-wrap gap-4 items-center mt-4">
              <span className="text-xs font-bold uppercase text-zinc-400 tracking-wider">
                Hubungi Langsung:
              </span>
              
              <div className="flex items-center gap-2">
                {activeMember.socials.github && (
                  <a
                    href={activeMember.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600 transition-colors"
                    aria-label="GitHub Profile"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                    </svg>
                  </a>
                )}
                {activeMember.socials.linkedin && (
                  <a
                    href={activeMember.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600 transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </a>
                )}
                {activeTab === 'kevin' && activeMember.socials.dribbble && (
                  <a
                    href={activeMember.socials.dribbble}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600 transition-colors"
                    aria-label="Dribbble Portfolio"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.49-11.05 1-11.6 8.56" />
                    </svg>
                  </a>
                )}
                {activeTab === 'aris' && activeMember.socials.twitter && (
                  <a
                    href={activeMember.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-zinc-600 transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </a>
                )}
                
                <a
                  href={`mailto:${activeMember.socials.email}`}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300 text-sm font-semibold text-zinc-700 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>Kirim Email</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
