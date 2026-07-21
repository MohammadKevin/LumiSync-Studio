"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ScheduleBoard from "../components/ScheduleBoard";
import BookingModal from "../components/BookingModal";
import QRISPaymentModal from "../components/QRISPaymentModal";
import Footer from "../components/Footer";
import { 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Award, 
  Calendar as CalendarIcon, 
  Clock, 
  Trash2, 
  ShieldAlert, 
  Sparkles,
  HelpCircle,
  CreditCard
} from "lucide-react";

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

const TIME_SLOTS = [
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
  "18:00 - 19:00",
  "19:00 - 20:00",
  "20:00 - 21:00",
];

const INITIAL_MOCK_BOOKINGS: Booking[] = [
  {
    id: "mock-1",
    date: "2026-07-21",
    timeSlot: "15:00 - 16:00",
    studentName: "Farel Adnan",
    studentClass: "12 IPA 1",
    status: "Lunas",
    amount: 50000,
    createdAt: "2026-07-21T09:00:00Z",
  },
  {
    id: "mock-2",
    date: "2026-07-21",
    timeSlot: "17:00 - 18:00",
    studentName: "Dika Wijaya",
    studentClass: "10 IPS 3",
    status: "Menunggu Pembayaran",
    amount: 50000,
    createdAt: "2026-07-21T10:30:00Z",
  },
  {
    id: "mock-3",
    date: "2026-07-22",
    timeSlot: "16:00 - 17:00",
    studentName: "Rian Pratama",
    studentClass: "11 IPA 3",
    status: "Lunas",
    amount: 50000,
    createdAt: "2026-07-21T11:00:00Z",
  },
];

export default function Dashboard() {
  const router = useRouter();
  
  const [user, setUser] = useState<{ name: string; studentClass: string; studentId: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState("2026-07-21");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  
  // Loading, Redirecting and DB Error states
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Modals state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activePaymentBooking, setActivePaymentBooking] = useState<Booking | null>(null);

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Auth check & load state on mount
  useEffect(() => {
    // 1. Verify user session
    const savedUser = localStorage.getItem("kicktime_user");
    if (!savedUser) {
      // User is not logged in, redirect immediately to homepage
      router.replace("/");
      return;
    }

    try {
      setUser(JSON.parse(savedUser));
      setIsCheckingAuth(false);
    } catch (e) {
      console.error("Error parsing saved user", e);
      router.replace("/");
      return;
    }

    // 2. Fetch bookings from backend API
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    setDbError(null);
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      } else {
        throw new Error("API returned non-200 response");
      }
    } catch (e: any) {
      console.warn("Connection to MySQL failed. Falling back to simulated bookings.", e);
      setDbError("ECONNREFUSED (MySQL local offline)");
      setBookings(INITIAL_MOCK_BOOKINGS);
    } finally {
      setIsLoading(false);
    }
  };

  // Trigger Toast Notification
  const showToast = (message: string, type: "success" | "info" | "error" = "success") => {
    setToast({ message, type });
  };

  // Dismiss Toast automatically
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Auth Handlers
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("kicktime_user");
    showToast("Anda telah keluar dari akun siswa.", "info");
    router.replace("/");
  };

  // Booking Handlers
  const handleSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = async (name: string, studentClass: string, timeSlot: string) => {
    setIsLoading(true);
    try {
      // If database connection error exists, handle locally as mockup fallback
      if (dbError) {
        const simulatedBooking: Booking = {
          id: `booking-${Date.now()}`,
          date: selectedDate,
          timeSlot: timeSlot,
          studentName: name,
          studentClass: studentClass,
          status: "Menunggu Pembayaran",
          amount: 50000,
          createdAt: new Date().toISOString(),
        };
        const updated = [...bookings, simulatedBooking];
        setBookings(updated);
        setIsBookingModalOpen(false);
        // Launch Payment Modal for simulation checkout
        setActivePaymentBooking(simulatedBooking);
        setIsLoading(false);
        return;
      }

      // Normal API route handler path
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          timeSlot,
          studentName: name,
          studentClass,
        }),
      });

      if (res.status === 201) {
        const newBooking = await res.json();
        setBookings((prev) => [...prev, newBooking]);
        setIsBookingModalOpen(false);
        // Launch Payment Modal
        setActivePaymentBooking(newBooking);
      } else if (res.status === 409) {
        showToast("Slot waktu ini sudah dipesan oleh siswa lain.", "error");
      } else {
        const err = await res.json();
        showToast(err.error || "Gagal menyimpan booking.", "error");
      }
    } catch (e) {
      console.error("Booking failed:", e);
      showToast("Koneksi database terputus.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    setIsLoading(true);
    try {
      // Local mockup fallback if database connection error exists
      if (dbError) {
        const updated = bookings.filter((b) => b.id !== bookingId);
        setBookings(updated);
        showToast("(Simulasi) Booking berhasil dibatalkan.", "info");
        setIsLoading(false);
        return;
      }

      // Normal API route handler path
      const res = await fetch(`/api/bookings?id=${bookingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        showToast("Booking berhasil dibatalkan.", "info");
      } else {
        const err = await res.json();
        showToast(err.error || "Gagal membatalkan booking.", "error");
      }
    } catch (e) {
      console.error("Cancellation failed:", e);
      showToast("Koneksi database terputus.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Payment Verification Handler
  const handlePaymentSuccess = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "Lunas" } : b))
    );
    setActivePaymentBooking(null);
    showToast("Terima kasih! Pembayaran QRISku telah terverifikasi & terkonfirmasi.", "success");
  };

  // Filter bookings for the active user
  const getUserBookings = () => {
    if (!user) return [];
    return bookings.filter(
      (b) => b.studentName.toLowerCase() === user.name.toLowerCase() && 
             b.studentClass.toLowerCase() === user.studentClass.toLowerCase()
    );
  };

  const userBookings = getUserBookings();

  // Format full date helper
  const formatFullDate = (dateStr: string) => {
    const d = new Date(`${dateStr}T00:00:00`);
    const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const monthNames = [
      "Januari", "Februari", "Maret", "April", "Mei", "Juni", 
      "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];
    return `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}`;
  };

  // Render a clean landing redirect screen during auth verification
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-theme-bg flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-theme-text-secondary text-sm font-semibold tracking-wider uppercase">
            Memeriksa Sesi Siswa...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Database Processing Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090e]/45 backdrop-blur-[2px]">
          <div className="bg-theme-card border border-theme-border p-5 rounded-2xl flex flex-col items-center space-y-3 shadow-2xl">
            <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-bold text-theme-text-primary uppercase tracking-wider">Memproses Database...</span>
          </div>
        </div>
      )}

      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-24 right-4 z-[999] max-w-sm w-full animate-bounce">
          <div className={`p-4 rounded-2xl border shadow-2xl flex items-start space-x-3 ${
            toast.type === "success" 
              ? "bg-[#13221a] text-brand-primary border-brand-primary/20" 
              : toast.type === "error"
              ? "bg-[#291717] text-red-500 border-red-500/20"
              : "bg-[#181d29] text-brand-accent border-brand-accent/20"
          }`}>
            {toast.type === "error" ? (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            )}
            <div className="flex-1 text-xs sm:text-sm font-semibold leading-relaxed">
              {toast.message}
            </div>
          </div>
        </div>
      )}

      {/* Header Navbar */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenLogin={() => {}} 
        isDashboard={true}
      />

      <main className="flex-1 bg-theme-bg">
        {/* Dashboard Welcome Header */}
        <section className="bg-theme-card border-b border-theme-border/60 py-10 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-brand-primary/5 blur-[80px] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              
              {/* Profile Greeting */}
              <div className="flex items-center space-x-4">
                <div className="bg-brand-primary/10 p-4 rounded-2xl border border-brand-primary/20 shadow-inner">
                  <User className="w-8 h-8 text-brand-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-extrabold text-theme-text-primary">
                      Selamat Datang Kembali, {user?.name}!
                    </h1>
                    <Sparkles className="w-5 h-5 text-brand-primary animate-pulse hidden sm:inline" />
                  </div>
                  <p className="text-xs sm:text-sm text-theme-text-secondary mt-0.5">
                    Gunakan ruang kendali ini untuk menyewa lapangan futsal sekolah secara instan.
                  </p>
                </div>
              </div>

              {/* Quick Info Cards */}
              <div className="flex flex-wrap gap-4">
                <div className="glass-panel px-5 py-3 rounded-2xl border border-theme-border flex items-center space-x-3 text-left">
                  <Award className="w-5 h-5 text-brand-primary" />
                  <div>
                    <span className="text-[10px] text-theme-text-secondary uppercase tracking-wider block font-bold">Kelas Anda</span>
                    <span className="text-sm font-extrabold text-theme-text-primary">Kelas {user?.studentClass}</span>
                  </div>
                </div>

                <div className="glass-panel px-5 py-3 rounded-2xl border border-theme-border flex items-center space-x-3 text-left">
                  <CalendarIcon className="w-5 h-5 text-brand-secondary" />
                  <div>
                    <span className="text-[10px] text-theme-text-secondary uppercase tracking-wider block font-bold">Total Booking</span>
                    <span className="text-sm font-extrabold text-theme-text-primary">{userBookings.length} Aktif</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Dashboard Workspace */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Section: Interactive Booking Schedule (Takes 2 Columns) */}
            <div className="lg:col-span-2">
              <div className="glass-panel rounded-3xl border border-theme-border/60 overflow-hidden shadow-sm">
                <ScheduleBoard
                  bookings={bookings}
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  onSlotClick={handleSlotClick}
                  timeSlots={TIME_SLOTS}
                  readOnly={false}
                  dbError={dbError}
                />
              </div>
            </div>

            {/* Right Section: Inline Booking Manager Sidebar (Takes 1 Column) */}
            <div className="lg:col-span-1 space-y-6">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-theme-border/60 text-left relative overflow-hidden">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-theme-border/60 mb-6">
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-theme-text-primary">
                      Booking Saya
                    </h3>
                    <p className="text-[10px] sm:text-xs text-theme-text-secondary mt-0.5">
                      Jadwal milik kelas Anda ({user?.studentClass})
                    </p>
                  </div>
                  <span className="bg-brand-primary/10 text-brand-primary border border-brand-primary/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {userBookings.length} Jadwal
                  </span>
                </div>

                {/* List items */}
                {userBookings.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-theme-border/30 p-3.5 rounded-full border border-theme-border">
                      <CalendarIcon className="w-6 h-6 text-theme-text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-theme-text-primary">Belum Ada Booking</h4>
                      <p className="text-[11px] sm:text-xs text-theme-text-secondary max-w-[200px] mx-auto mt-1">
                        Pilih slot "Tersedia" di jadwal untuk melakukan booking.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Regulation Banner */}
                    <div className="bg-brand-primary/5 text-brand-primary border border-brand-primary/10 rounded-2xl p-4 flex items-start space-x-2.5">
                      <ShieldAlert className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" />
                      <p className="text-[11px] text-theme-text-secondary leading-normal">
                        Harap datang <span className="font-bold text-brand-primary">10 menit sebelum jam main</span>. Lapangan hanya disewa untuk bermain internal kelas.
                      </p>
                    </div>

                    {/* Bookings cards */}
                    <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                      {userBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="bg-theme-card/85 border border-theme-border hover:border-brand-primary/30 rounded-2xl p-4 flex flex-col justify-between gap-3.5 transition-all duration-300 shadow-sm"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1.5 bg-theme-border/50 px-2 py-0.5 rounded-lg border border-theme-border/80 w-max">
                                <Clock className="w-3.5 h-3.5 text-brand-primary" />
                                <span className="text-[11px] sm:text-xs font-bold text-theme-text-primary">
                                  {booking.timeSlot}
                                </span>
                              </div>
                              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase border ${
                                booking.status === "Lunas"
                                  ? "bg-brand-primary/10 text-brand-primary border-brand-primary/20"
                                  : "bg-amber-500/10 text-amber-500 border-amber-500/20 animate-pulse"
                              }`}>
                                {booking.status === "Lunas" ? "Lunas" : "Pending"}
                              </span>
                            </div>
                            <h4 className="text-xs sm:text-sm font-bold text-theme-text-primary flex items-center space-x-1.5">
                              <CalendarIcon className="w-3.5 h-3.5 text-theme-text-secondary" />
                              <span>{formatFullDate(booking.date)}</span>
                            </h4>
                          </div>

                          {/* Action Button conditionally rendered based on status */}
                          {booking.status === "Menunggu Pembayaran" ? (
                            <div className="flex gap-2">
                              <button
                                onClick={() => setActivePaymentBooking(booking)}
                                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-xl bg-brand-secondary hover:bg-brand-secondary/95 text-theme-bg font-extrabold text-xs tracking-wide transition-all duration-300 shadow-[0_0_10px_rgba(255,107,0,0.2)] hover:shadow-[0_0_15px_rgba(255,107,0,0.4)] cursor-pointer"
                              >
                                <CreditCard className="w-3.5 h-3.5" />
                                <span>Bayar Sekarang</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm("Apakah Anda yakin ingin membatalkan booking jadwal ini?")) {
                                    handleCancelBooking(booking.id);
                                  }
                                }}
                                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 hover:border-red-500 transition-all cursor-pointer"
                                title="Batalkan Booking"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                  if (confirm("Apakah Anda yakin ingin membatalkan booking jadwal ini?")) {
                                    handleCancelBooking(booking.id);
                                  }
                              }}
                              className="flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 border border-red-500/20 hover:border-red-500 text-xs font-bold transition-all duration-300 cursor-pointer w-full"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Batalkan Sewa</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Futsal Rules Quick Info Box */}
              <div className="glass-panel p-6 rounded-3xl border border-theme-border/60 text-left">
                <h4 className="text-xs sm:text-sm font-extrabold text-theme-text-primary mb-3 flex items-center space-x-1.5">
                  <HelpCircle className="w-4.5 h-4.5 text-brand-primary" />
                  <span>Tata Tertib Pemakaian GOR</span>
                </h4>
                <ol className="list-decimal pl-4.5 space-y-2 text-[10px] sm:text-xs text-theme-text-secondary leading-relaxed">
                  <li>Wajib memakai sepatu futsal (non-marking sole).</li>
                  <li>Dilarang membawa makanan berat ke area lapangan.</li>
                  <li>Sampah botol minuman wajib dibuang di tempatnya.</li>
                  <li>Siswa bertanggung jawab menjaga kebersihan & keamanan barang bawaan masing-masing.</li>
                </ol>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer bar */}
      <Footer />

      {/* Booking Form Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedDate={selectedDate}
        selectedTimeSlot={selectedTimeSlot}
        timeSlots={TIME_SLOTS}
        user={user}
        bookings={bookings}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* QRISku Payment Modal */}
      <QRISPaymentModal
        isOpen={activePaymentBooking !== null}
        onClose={() => setActivePaymentBooking(null)}
        booking={activePaymentBooking}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
}
