"use client";

import React, { useState, useEffect } from "react";
import { X, Calendar, Clock, User, Award, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedTimeSlot: string;
  timeSlots: string[];
  user: { name: string; studentClass: string; studentId: string } | null;
  bookings: Booking[];
  onConfirmBooking: (name: string, studentClass: string, timeSlot: string) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTimeSlot,
  timeSlots,
  user,
  bookings,
  onConfirmBooking,
}: BookingModalProps) {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");

  // Sync state when modal opens or inputs change
  useEffect(() => {
    if (isOpen) {
      setTimeSlot(selectedTimeSlot);
      setError("");
      if (user) {
        setName(user.name);
        setStudentClass(user.studentClass);
      } else {
        setName("");
        setStudentClass("");
      }
    }
  }, [isOpen, selectedTimeSlot, user]);

  if (!isOpen) return null;

  // Format date for display
  const formatFullDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Get available slots for the selected date (excluding already booked ones, except current selected one)
  const isSlotBooked = (slot: string) => {
    return bookings.some(b => b.date === selectedDate && b.timeSlot === slot && slot !== selectedTimeSlot);
  };

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
    if (!timeSlot) {
      setError("Silakan pilih slot waktu!");
      return;
    }

    // Double check slot availability
    const isAlreadyBooked = bookings.some(b => b.date === selectedDate && b.timeSlot === timeSlot);
    if (isAlreadyBooked) {
      setError("Maaf, slot waktu ini baru saja dipesan oleh siswa lain!");
      return;
    }

    onConfirmBooking(name, studentClass, timeSlot);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel rounded-3xl border border-theme-border shadow-2xl overflow-hidden transform transition-all duration-300 animate-float">
        
        {/* Glowing border effects */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-theme-border/60">
          <div className="flex items-center space-x-2">
            <div className="bg-brand-primary/10 p-2 rounded-xl border border-brand-primary/20">
              <Calendar className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-theme-text-primary">
                Formulir Booking
              </h3>
              <p className="text-xs text-theme-text-secondary">
                Konfirmasi pemakaian lapangan futsal sekolah
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
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 text-red-500 px-4 py-3 rounded-xl border border-red-500/20 text-xs sm:text-sm font-semibold flex items-center space-x-2">
              <X className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Date-Time Badge */}
          <div className="bg-theme-card/80 border border-theme-border rounded-2xl p-4 space-y-3">
            <div className="flex items-center space-x-3">
              <Calendar className="w-4 h-4 text-brand-primary" />
              <span className="text-xs sm:text-sm font-bold text-theme-text-primary">
                {formatFullDate(selectedDate)}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-brand-secondary" />
              <span className="text-xs sm:text-sm font-bold text-theme-text-primary">
                {timeSlot || "Belum dipilih"}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Student Name */}
            <div>
              <label htmlFor="student-name" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Nama Lengkap Siswa
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-secondary">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="student-name"
                  type="text"
                  required
                  disabled={!!user}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap"
                  className={`w-full pl-10 pr-4 py-3 bg-theme-bg/60 border rounded-xl text-sm font-semibold text-theme-text-primary placeholder-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-all ${
                    user 
                      ? "border-theme-border bg-theme-border/20 cursor-not-allowed text-theme-text-secondary" 
                      : "border-theme-border focus:border-brand-primary"
                  }`}
                />
              </div>
            </div>

            {/* Student Class */}
            <div>
              <label htmlFor="student-class" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Kelas
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-theme-text-secondary">
                  <Award className="w-4 h-4" />
                </div>
                <input
                  id="student-class"
                  type="text"
                  required
                  disabled={!!user}
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder="Contoh: 12 IPA 1, 10 IPS 3"
                  className={`w-full pl-10 pr-4 py-3 bg-theme-bg/60 border rounded-xl text-sm font-semibold text-theme-text-primary placeholder-theme-text-secondary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/45 transition-all ${
                    user 
                      ? "border-theme-border bg-theme-border/20 cursor-not-allowed text-theme-text-secondary" 
                      : "border-theme-border focus:border-brand-primary"
                  }`}
                />
              </div>
            </div>

            {/* Time Slot Selector Dropdown (Optional picker fallback inside modal) */}
            <div>
              <label htmlFor="time-select" className="block text-xs font-bold uppercase tracking-wider text-theme-text-secondary mb-2">
                Pilih Jam Pemakaian
              </label>
              <select
                id="time-select"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-3 bg-theme-bg/60 border border-theme-border rounded-xl text-sm font-semibold text-theme-text-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/45 focus:border-brand-primary transition-all"
              >
                <option value="">Pilih Jam</option>
                {timeSlots.map((slot) => (
                  <option 
                    key={slot} 
                    value={slot}
                    disabled={isSlotBooked(slot)}
                  >
                    {slot} {isSlotBooked(slot) ? "(Sudah Dipesan)" : "(Tersedia)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secure Info Alert */}
          {user ? (
            <div className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-2xl p-3.5 flex items-start space-x-2.5">
              <ShieldCheck className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] sm:text-xs leading-relaxed text-theme-text-secondary">
                Anda melakukan booking menggunakan akun terverifikasi siswa: <span className="font-bold text-brand-primary">{user.name} ({user.studentClass})</span>.
              </p>
            </div>
          ) : (
            <div className="bg-amber-500/5 text-amber-500 border border-amber-500/10 rounded-2xl p-3.5 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] sm:text-xs leading-relaxed text-theme-text-secondary">
                Anda memesan sebagai Tamu. Silakan gunakan <span className="font-bold text-amber-500">Login Siswa</span> untuk autofill profil dan verifikasi booking otomatis kelas Anda.
              </p>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-2 border-t border-theme-border/60">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-bold text-theme-text-secondary hover:text-theme-text-primary bg-theme-border/30 hover:bg-theme-border transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-brand-primary text-theme-bg font-extrabold text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:bg-brand-primary/95 cursor-pointer"
            >
              Konfirmasi Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
