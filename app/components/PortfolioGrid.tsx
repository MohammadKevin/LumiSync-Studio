"use client";

import { useState } from "react";
import Image from "next/image";
import { portfolioConfig, Project } from "../config/portfolio";
import { ExternalLink, X, Check, Code } from "lucide-react";

export default function PortfolioGrid() {
  const { projects } = portfolioConfig;
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const categories = [
    { value: "all", label: "Semua" },
    { value: "webapp", label: "Web App" },
    { value: "uiux", label: "UI/UX Design" },
    { value: "backend", label: "Backend Dev" },
    { value: "fullstack", label: "Full-Stack" }
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portofolio" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary mb-3 px-3 py-1 rounded-full bg-brand-primary/5 border border-brand-primary/10">
            Showcase Karya
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-theme-text-primary mb-4">
            Project Yang Kami Selesaikan
          </h2>
          <p className="text-base md:text-lg text-theme-text-secondary max-w-2xl font-light">
            Kombinasi performa komputasi tingkat tinggi dan antarmuka web modern yang estetik.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat.value
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20"
                    : "bg-zinc-50 border border-zinc-200/60 text-zinc-600 hover:bg-zinc-100/60 hover:text-zinc-900"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="group bg-zinc-50 border border-zinc-200/60 rounded-[32px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:bg-white hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
            >
              {/* Project Image Wrapper */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 border-b border-zinc-200/40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 500px"
                  className="object-cover group-hover:scale-103 transition-transform duration-500"
                />
                
                {/* Category Badge overlay */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs text-xs font-bold text-zinc-800 shadow-sm capitalize border border-white/50">
                  {project.category === 'webapp' ? 'Web App' : 
                   project.category === 'uiux' ? 'UI/UX Design' : 
                   project.category === 'backend' ? 'Backend Dev' : 'Full-Stack'}
                </div>

                {/* Hover reveal CTA overlay */}
                <div className="absolute inset-0 bg-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-5 py-3 rounded-2xl bg-white shadow-xl text-xs font-extrabold text-brand-primary tracking-wide scale-90 group-hover:scale-100 transition-transform duration-300">
                    Lihat Detail Project
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-heading font-extrabold text-2xl text-theme-text-primary group-hover:text-brand-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-sm text-theme-text-secondary mt-2.5 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mt-6">
                  {project.techStack.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-100/80 rounded-lg text-xs font-bold text-zinc-600 border border-zinc-200/30"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-2 py-1 bg-zinc-100/80 rounded-lg text-xs font-bold text-zinc-500 border border-zinc-200/30">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if category filter matches nothing */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-zinc-500 font-light">Tidak ada project untuk kategori ini.</p>
          </div>
        )}

      </div>

      {/* Dynamic Project Details Modal Overlay */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[36px] shadow-2xl border border-zinc-200 overflow-y-auto relative animate-float-none">
            
            {/* Modal Header bar */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-md px-6 md:px-10 py-5 border-b border-zinc-100 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <Code className="w-5 h-5 text-brand-primary" />
                <span className="font-heading font-bold text-sm uppercase tracking-widest text-zinc-400">
                  Detail Project
                </span>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="p-2 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 text-zinc-600 cursor-pointer hover:text-zinc-900 transition-colors"
                aria-label="Tutup modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Visual Area (left) */}
                <div className="lg:col-span-6 flex flex-col gap-5">
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-200/60 bg-zinc-50">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex gap-4">
                    {activeProject.liveUrl && (
                      <a
                        href={activeProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-primary text-white text-sm font-bold shadow-md shadow-brand-primary/20 hover:bg-brand-primary/95 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Kunjungi Situs</span>
                      </a>
                    )}
                    {activeProject.githubUrl && (
                      <a
                        href={activeProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white border border-zinc-200 text-zinc-700 text-sm font-bold hover:bg-zinc-50 hover:border-zinc-300 transition-all"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        <span>Lihat Code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Detail Information (right) */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div>
                    <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-zinc-900 leading-tight">
                      {activeProject.title}
                    </h3>
                    <p className="text-sm text-zinc-500 mt-2">
                      {activeProject.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Fitur & Fungsionalitas Utama
                    </h4>
                    <ul className="flex flex-col gap-1.5">
                      {activeProject.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-zinc-700">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Stack */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Tech Stack Terpakai
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-zinc-50 rounded-lg text-xs font-semibold text-zinc-700 border border-zinc-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Team Roles breakdown */}
                  <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200/50">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      Pembagian Peran (Duo Collaboration)
                    </h4>
                    <div className="flex flex-col gap-3">
                      <div>
                        <span className="text-xs font-bold text-brand-primary">🎨 Kevin Pratama:</span>
                        <p className="text-xs text-zinc-600 mt-0.5">{activeProject.roleDistribution.kevin}</p>
                      </div>
                      <div className="h-px bg-zinc-200/40 my-0.5" />
                      <div>
                        <span className="text-xs font-bold text-brand-secondary">⚙️ Aris Setiawan:</span>
                        <p className="text-xs text-zinc-600 mt-0.5">{activeProject.roleDistribution.aris}</p>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
