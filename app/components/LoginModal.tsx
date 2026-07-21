"use client";

import React, { useState, useEffect } from "react";
import { X, LogIn, User, Award, ShieldAlert, Key } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string, studentClass: string, studentId: string) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLoginSuccess,
}: LoginModalProps) {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setStudentClass("");
      setStudentId("");
      setError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Nama siswa harus diisi!");
      return;
    }
    if (!studentClass.trim()) {
      setError("Kelas harus diisi!");
      return;
    }
    if (!studentId.trim()) {
      setError("NIS (Nomor Induk Siswa) harus diisi!");
      return;
    }

    onLoginSuccess(name.trim(), studentClass.trim(), studentId.trim());
  };

  // Demo accounts for instant filling
  const demoAccounts = [
    { name: "Rian Pratama", class: "12 IPA 1", id: "12001" },
    { name: "Dika Wijaya", class: "10 IPS 3", id: "10003" },
    { name: "Siti Rahma", class: "11 IPA 2", id: "11002" },
  ];

  const handleQuickFill = (acc: typeof demoAccounts[0]) => {
    setName(acc.name);
    setStudentClass(acc.class);
    setStudentId(acc.id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-md glass-panel rounded-3xl border border-theme-border shadow-2xl overflow-hidden transform transition-all duration-300 animate-float">
        
        {/* Glowing border effects */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-theme-border/60">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-primary/10 p-2 rounded-xl border border-brand-primary/20">
              <LogIn className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-theme-text-primary">
                Login Portal Siswa
              </h3>
              <p className="text-xs text-theme-text-secondary">
                Verifikasi identitas untuk booking lapangan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-border transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-xl border border-red-500/20 text-xs sm:text-sm font-semibold flex items-center space-x-2 animate-shake">
              <X className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Student Name */}
            <div>
              <label htmlFor="login-name" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Nama Lengkap Siswa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-secondary">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="login-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-3 bg-theme-bg/60 border border-theme-border rounded-xl text-sm font-semibold text-theme-text-primary placeholder-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Student Class */}
            <div>
              <label htmlFor="login-class" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Kelas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-secondary">
                  <Award className="w-4 h-4" />
                </div>
                <input
                  id="login-class"
                  type="text"
                  required
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: 12 IPA 1, 10 IPS 3"
                  className="w-full pl-10 pr-4 py-3 bg-theme-bg/60 border border-theme-border rounded-xl text-sm font-semibold text-theme-text-primary placeholder-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            {/* Student NIS */}
            <div>
              <label htmlFor="login-id" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Nomor Induk Siswa (NIS)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-secondary">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="login-id"
                  type="text"
                  required
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="Contoh: 12001"
                  className="w-full pl-10 pr-4 py-3 bg-theme-bg/60 border border-theme-border rounded-xl text-sm font-semibold text-theme-text-primary placeholder-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          {/* Quick Demo Fills */}
          <div className="pt-2 border-t border-theme-border/60">
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
              Akun Demo Uji Coba:
            </p>
            <div className="flex flex-wrap gap-2">
              {demoAccounts.map((acc) => (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleQuickFill(acc)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-theme-border/50 border border-theme-border hover:border-brand-primary/40 hover:bg-brand-primary/5 text-theme-text-primary hover:text-brand-primary font-semibold transition-all cursor-pointer"
                >
                  {acc.name.split(" ")[0]} ({acc.class})
                </button>
              ))}
            </div>
          </div>

          {/* Alert Security */}
          <div className="bg-brand-accent/5 text-brand-accent border border-brand-accent/10 rounded-2xl p-3 flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="text-[10px] sm:text-xs leading-relaxed text-theme-text-secondary">
              Login ini bersifat simulasi lokal untuk mempermudah Anda mencicipi fitur booking terintegrasi profil.
            </p>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-2 border-t border-theme-border/60">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-theme-text-secondary hover:text-theme-text-primary bg-theme-border/30 hover:bg-theme-border transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-brand-primary text-theme-bg font-extrabold text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:bg-brand-primary/95 cursor-pointer"
            >
              Login Masuk
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
