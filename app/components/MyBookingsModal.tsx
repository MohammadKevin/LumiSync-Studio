"use client";

import React from "react";
import { X, Calendar, Clock, Trash2, ShieldAlert, Award } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
}

interface MyBookingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userBookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

export default function MyBookingsModal({
  isOpen,
  onClose,
  userBookings,
  onCancelBooking,
}: MyBookingsModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6">
      {/* Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#07090e]/85 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl glass-panel rounded-3xl border border-theme-border shadow-2xl overflow-hidden transform transition-all duration-300 animate-float">
        
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
                Daftar Booking Saya
              </h3>
              <p className="text-xs text-theme-text-secondary">
                Jadwal lapangan futsal yang telah Anda pesan
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
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-4">
          {userBookings.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-theme-border/40 p-4 rounded-full border border-theme-border">
                <Calendar className="w-8 h-8 text-theme-text-secondary" />
              </div>
              <div>
                <h4 className="text-base font-bold text-theme-text-primary">Belum Ada Booking</h4>
                <p className="text-xs sm:text-sm text-theme-text-secondary max-w-xs mx-auto mt-1">
                  Anda belum memesan slot jadwal lapangan futsal untuk tanggal manapun.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-2xl p-4 flex items-start space-x-2.5">
                <ShieldAlert className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-theme-text-secondary leading-relaxed">
                  Harap hadir di lapangan <span className="font-extrabold text-brand-primary">10 menit sebelum jam bermain</span>. Pembatalan dapat dilakukan paling lambat 1 jam sebelum jadwal dimulai.
                </p>
              </div>

              {userBookings.map((booking) => (
                <div 
                  key={booking.id}
                  className="bg-theme-card border border-theme-border hover:border-brand-primary/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,197,94,0.02)]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 bg-theme-border/50 px-3 py-1 rounded-lg border border-theme-border/80 w-max">
                      <Clock className="w-3.5 h-3.5 text-brand-primary" />
                      <span className="text-xs sm:text-sm font-bold text-theme-text-primary">
                        {booking.timeSlot}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-theme-text-primary flex items-center space-x-1.5">
                        <Calendar className="w-4 h-4 text-theme-text-secondary" />
                        <span>{formatFullDate(booking.date)}</span>
                      </h4>
                      <p className="text-xs text-theme-text-secondary flex items-center space-x-1.5 pl-0.5">
                        <Award className="w-3.5 h-3.5 text-brand-primary/70" />
                        <span>Atas Nama: <span className="font-bold text-theme-text-primary">{booking.studentName} ({booking.studentClass})</span></span>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (confirm("Apakah Anda yakin ingin membatalkan booking jadwal ini?")) {
                        onCancelBooking(booking.id);
                      }
                    }}
                    className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 hover:border-red-500 text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer w-full sm:w-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Batalkan</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-theme-border/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-theme-text-primary bg-theme-border/50 hover:bg-theme-border transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}
