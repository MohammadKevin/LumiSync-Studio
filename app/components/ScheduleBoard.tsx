"use client";

import React from "react";
import { Calendar, Clock, User, Check, X, ShieldAlert, AlertTriangle, CreditCard } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
  status?: string;
  amount?: number;
}

interface ScheduleBoardProps {
  bookings: Booking[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onSlotClick: (timeSlot: string) => void;
  timeSlots: string[];
  readOnly?: boolean;
  dbError?: string | null;
}

export default function ScheduleBoard({
  bookings,
  selectedDate,
  onDateChange,
  onSlotClick,
  timeSlots,
  readOnly = false,
  dbError = null,
}: ScheduleBoardProps) {
  // Generate 5 days list starting from today (2026-07-21 as per user context)
  const getDaysArray = () => {
    const days = [];
    const baseDate = new Date("2026-07-21T00:00:00");
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    for (let i = 0; i < 5; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const dateString = `${year}-${month}-${day}`;
      
      let label = "";
      if (i === 0) label = "Hari Ini";
      else if (i === 1) label = "Besok";
      else label = `${dayNames[d.getDay()]}`;

      days.push({
        dateString,
        label,
        displayDate: `${d.getDate()} ${monthNames[d.getMonth()].substring(0, 3)}`,
      });
    }
    return days;
  };

  const days = getDaysArray();

  // Helper to format date display e.g., "Selasa, 21 Juli 2026"
  const formatFullDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  // Find booking for a slot
  const getBookingForSlot = (slot: string) => {
    return bookings.find(b => b.date === selectedDate && b.timeSlot === slot);
  };

  // Calculate statistics for the selected date
  const bookedSlots = timeSlots.filter(slot => getBookingForSlot(slot)).length;
  const availableSlots = timeSlots.length - bookedSlots;

  return (
    <section id="schedule" className="py-16 sm:py-24 border-t border-theme-border/50 relative">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-primary/5 blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading tracking-tight mb-4">
            Jadwal Pemakaian <span className="text-brand-primary">Futsal</span>
          </h2>
          <p className="text-theme-text-secondary max-w-2xl mx-auto text-sm sm:text-base">
            Pilih tanggal di bawah untuk melihat ketersediaan lapangan. {readOnly ? "Silakan login untuk memesan slot lapangan." : "Klik slot jam yang berstatus \"Tersedia\" untuk langsung memesan."}
          </p>
        </div>

        {/* Database Offline Error Banner */}
        {dbError && (
          <div className="glass-panel p-6 rounded-2xl border border-red-500/20 bg-red-500/[0.03] mb-8 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 max-w-4xl mx-auto text-left">
            <div className="bg-red-500/10 p-3 rounded-xl border border-red-500/20 text-red-500 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-red-500 font-bold text-base">Local MySQL Database Offline</h4>
              <p className="text-xs sm:text-sm text-theme-text-secondary mt-1 leading-relaxed">
                Sistem tidak dapat terhubung ke database MySQL local Anda (<span className="text-red-400 font-semibold">{dbError}</span>). 
                Koneksi dialihkan sementara menggunakan data simulasi lokal agar Anda tetap dapat mencoba UI. 
                <strong> Cara Memperbaiki:</strong> Nyalakan service MySQL Anda (misal lewat XAMPP / Laragon) dan pastikan kredensial di <code>.env.local</code> sudah sesuai.
              </p>
            </div>
          </div>
        )}

        {/* Date Selector Tabs */}
        <div className="flex justify-center mb-8">
          <div className="glass-panel p-1.5 rounded-2xl flex flex-wrap justify-center gap-1.5 max-w-full sm:max-w-max border border-theme-border">
            {days.map((day) => {
              const isActive = selectedDate === day.dateString;
              return (
                <button
                  key={day.dateString}
                  onClick={() => onDateChange(day.dateString)}
                  className={`px-4 py-3 rounded-xl flex flex-col items-center justify-center min-w-[75px] sm:min-w-[100px] transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-brand-primary text-theme-bg font-extrabold shadow-[0_0_15px_rgba(34,197,94,0.3)] transform scale-[1.03]"
                      : "text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-border/30"
                  }`}
                >
                  <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider opacity-85">
                    {day.label}
                  </span>
                  <span className="text-sm sm:text-base font-bold mt-0.5">
                    {day.displayDate}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Statistics Bar & Selected Date info */}
        <div className="glass-panel p-6 rounded-2xl border border-theme-border mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left w-full sm:w-auto">
            <div className="bg-brand-primary/10 p-2.5 rounded-xl border border-brand-primary/20">
              <Calendar className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <p className="text-xs text-theme-text-secondary font-medium">Tanggal Terpilih</p>
              <h3 className="text-base sm:text-lg font-bold text-theme-text-primary">
                {formatFullDate(selectedDate)}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-6 w-full sm:w-auto justify-end sm:justify-start">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-xs sm:text-sm text-theme-text-secondary font-medium">
                {availableSlots} Tersedia
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="text-xs sm:text-sm text-theme-text-secondary font-medium">
                {bookedSlots} Dipesan
              </span>
            </div>
          </div>
        </div>

        {/* Timeline Grid (Hourly Slots) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {timeSlots.map((slot) => {
            const booking = getBookingForSlot(slot);
            const isBooked = !!booking;
            const isPending = isBooked && booking.status === "Menunggu Pembayaran";

            return (
              <div
                key={slot}
                onClick={() => (!isBooked || readOnly) && onSlotClick(slot)}
                className={`group glass-panel rounded-2xl border p-5 transition-all duration-300 flex flex-col justify-between min-h-[140px] relative overflow-hidden ${
                  isBooked
                    ? isPending
                      ? "border-amber-500/30 bg-amber-500/[0.02] cursor-not-allowed opacity-95"
                      : "border-red-500/20 bg-red-500/[0.02] cursor-not-allowed opacity-90"
                    : "border-brand-primary/20 hover:border-brand-primary/70 hover:bg-brand-primary/[0.02] cursor-pointer hover:shadow-[0_0_15px_rgba(34,197,94,0.05)] transform hover:-translate-y-1"
                }`}
              >
                {/* Diagonal Accent */}
                <div
                  className={`absolute top-0 right-0 w-24 h-24 -mr-12 -mt-12 rotate-45 pointer-events-none opacity-10 transition-transform duration-300 group-hover:scale-110 ${
                    isBooked 
                      ? isPending
                        ? "bg-amber-500"
                        : "bg-red-500" 
                      : "bg-brand-primary"
                  }`}
                />

                {/* Top Row: Time Info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 bg-theme-border/50 px-3 py-1.5 rounded-lg border border-theme-border/80">
                    <Clock className="w-4 h-4 text-theme-text-secondary group-hover:text-brand-primary transition-colors" />
                    <span className="text-sm font-bold tracking-wide text-theme-text-primary">
                      {slot}
                    </span>
                  </div>
                  
                  {/* Status Pill */}
                  <span
                    className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                      isBooked
                        ? isPending
                          ? "bg-amber-500/10 text-amber-500 border border-amber-500/25"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                        : "bg-brand-primary/10 text-brand-primary border border-brand-primary/20 group-hover:bg-brand-primary group-hover:text-theme-bg transition-all duration-300"
                    }`}
                  >
                    {isBooked ? (
                      isPending ? (
                        <>
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pending</span>
                        </>
                      ) : (
                        <>
                          <X className="w-3.5 h-3.5" />
                          <span>Booked</span>
                        </>
                      )
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Tersedia</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Bottom Row: Booking Details */}
                <div className="mt-auto">
                  {isBooked ? (
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-1.5 text-theme-text-secondary text-xs sm:text-sm">
                        <User className={`w-4 h-4 ${isPending ? "text-amber-500/70" : "text-red-500/70"}`} />
                        <span className="font-semibold text-theme-text-primary max-w-[150px] truncate" title={booking.studentName}>
                          {booking.studentName}
                        </span>
                      </div>
                      <p className={`text-[11px] sm:text-xs font-bold tracking-wide pl-5.5 uppercase ${isPending ? "text-amber-500/80" : "text-red-500/80"}`}>
                        {isPending ? "Menunggu Pembayaran" : `Booked by Class ${booking.studentClass}`}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs text-theme-text-secondary group-hover:text-theme-text-primary transition-colors">
                        {readOnly ? "Login untuk memesan slot ini" : "Siswa belum memesan slot ini"}
                      </p>
                      <p className="text-xs font-extrabold text-brand-primary mt-1 group-hover:underline transition-all">
                        {readOnly ? "Login & Booking &rarr;" : "Ambil Slot Jadwal &rarr;"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
