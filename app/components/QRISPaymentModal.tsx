"use client";

import React, { useState, useEffect } from "react";
import { X, Clock, CheckCircle2, ShieldCheck, CreditCard, Sparkles } from "lucide-react";

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

interface QRISPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking | null;
  onPaymentSuccess: (bookingId: string) => void;
}

export default function QRISPaymentModal({
  isOpen,
  onClose,
  booking,
  onPaymentSuccess,
}: QRISPaymentModalProps) {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  // Sync state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(300);
      setIsProcessing(false);
      setIsPaid(false);
    }
  }, [isOpen]);

  // Countdown timer logic
  useEffect(() => {
    if (!isOpen || timeLeft <= 0 || isPaid) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, timeLeft, isPaid]);

  if (!isOpen || !booking) return null;

  // Format time (e.g. 05:00)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSimulatePayment = async () => {
    setIsProcessing(true);
    
    // Simulate network delay for verification
    setTimeout(async () => {
      try {
        const res = await fetch("/api/bookings/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: booking.id }),
        });

        if (res.ok) {
          setIsPaid(true);
          setTimeout(() => {
            onPaymentSuccess(booking.id);
          }, 1500); // Wait 1.5s to show the beautiful success animation
        } else {
          alert("Gagal memverifikasi pembayaran.");
        }
      } catch (error) {
        console.error("Payment error", error);
        // Fallback to local state changes if MySQL server is offline (simulation fallback)
        setIsPaid(true);
        setTimeout(() => {
          onPaymentSuccess(booking.id);
        }, 1500);
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  // Generate QR code URL using standard public QR server mapping booking parameters
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&color=0b0f17&bgcolor=ffffff&data=qrisku://merchant-kicktime/pay-id-${booking.id}?amount=${booking.amount || 50000}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 sm:px-6">
      {/* Dark Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#07090e]/90 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Payment Ticket container */}
      <div className="relative w-full max-w-sm glass-panel rounded-3xl border border-theme-border shadow-2xl overflow-hidden transform transition-all duration-300">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-secondary via-amber-400 to-brand-primary" />

        {/* Modal Header */}
        <div className="p-5 border-b border-theme-border/60 flex items-center justify-between bg-theme-card/50">
          <div className="flex items-center space-x-2">
            <CreditCard className="w-5 h-5 text-brand-secondary" />
            <span className="text-sm font-bold uppercase tracking-wider text-theme-text-primary">
              QRISku Checkout
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-theme-border/40 text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-border transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success Screen Overlay */}
        {isPaid ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px] bg-theme-card/95 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-primary/25 blur-lg animate-pulse" />
              <CheckCircle2 className="w-20 h-20 text-brand-primary relative z-10 animate-bounce" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-theme-text-primary flex items-center justify-center space-x-1">
                <span>Pembayaran Lunas</span>
                <Sparkles className="w-5 h-5 text-brand-primary" />
              </h3>
              <p className="text-xs sm:text-sm text-brand-primary font-bold">
                Transaksi QRISku Berhasil
              </p>
            </div>
            <p className="text-xs text-theme-text-secondary max-w-[250px] leading-relaxed">
              Jadwal lapangan futsal Anda telah dikonfirmasi oleh sistem. Selamat bertanding!
            </p>
            <div className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-xl px-4 py-2 text-xs font-bold inline-flex items-center space-x-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Tiket Booking Terbit</span>
            </div>
          </div>
        ) : (
          /* Payment Interface Screen */
          <div className="p-6 text-center flex flex-col items-center space-y-6">
            
            {/* Merchant Info */}
            <div className="space-y-0.5">
              <h2 className="text-base font-extrabold text-theme-text-primary uppercase tracking-wide">
                KICKTIME COURT ACADEMY
              </h2>
              <p className="text-[10px] text-theme-text-secondary font-semibold">
                NMID: ID10202688940 - Merchant: A01
              </p>
            </div>

            {/* Countdown timer */}
            <div className="flex items-center space-x-2 bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
              <Clock className="w-4 h-4" />
              <span>Batas Waktu Bayar: {formatTime(timeLeft)}</span>
            </div>

            {/* Static QR Code Box (Loaded from public/qris.png) */}
            <div className="relative p-2 bg-white rounded-2xl shadow-inner border border-theme-border flex items-center justify-center max-w-[240px]">
              {/* QR Image */}
              <img 
                src="/qris.png" 
                alt="QRISku Code" 
                className="w-full h-auto max-h-[220px] object-contain rounded-xl relative z-10"
              />
            </div>

            {/* Price Tag */}
            <div className="space-y-0.5 bg-theme-card/65 border border-theme-border w-full py-3 rounded-2xl">
              <p className="text-[10px] text-theme-text-secondary uppercase tracking-wider font-bold">Total Pembayaran</p>
              <h3 className="text-xl sm:text-2xl font-black text-brand-primary">
                Rp {booking.amount?.toLocaleString("id-ID") || "50.000"}
              </h3>
            </div>

            {/* Simulated actions */}
            <div className="w-full space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSimulatePayment}
                disabled={isProcessing || timeLeft <= 0}
                className="w-full py-3 rounded-2xl bg-brand-primary text-theme-bg font-extrabold text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] hover:bg-brand-primary/95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center space-x-1.5"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-theme-bg border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Pembayaran...</span>
                  </>
                ) : (
                  <span>Simulasi Bayar Instan (QRISku)</span>
                )}
              </button>
              
              <button
                type="button"
                onClick={onClose}
                disabled={isProcessing}
                className="w-full py-2.5 rounded-2xl bg-theme-border/30 hover:bg-theme-border/50 text-theme-text-secondary hover:text-theme-text-primary text-xs font-bold tracking-wide transition-colors cursor-pointer"
              >
                Bayar Nanti (Simpan di Booking Saya)
              </button>
            </div>
            
          </div>
        )}

        {/* Footer info banner */}
        <div className="bg-theme-card/45 border-t border-theme-border/60 py-3 text-center">
          <p className="text-[9px] text-theme-text-secondary uppercase tracking-widest font-bold">
            Dicetak otomatis oleh GOR KickTime System
          </p>
        </div>
      </div>
    </div>
  );
}
