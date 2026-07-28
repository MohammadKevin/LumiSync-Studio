"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ScheduleBoard from "./components/ScheduleBoard";
import CourtsSection from "./components/CourtsSection";
import LoginModal from "./components/LoginModal";
import Footer from "./components/Footer";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  timeSlot: string;
  studentName: string;
  studentClass: string;
  createdAt: string;
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
    createdAt: "2026-07-21T09:00:00Z",
  },
  {
    id: "mock-2",
    date: "2026-07-21",
    timeSlot: "17:00 - 18:00",
    studentName: "Dika Wijaya",
    studentClass: "10 IPS 3",
    createdAt: "2026-07-21T10:30:00Z",
  },
  {
    id: "mock-3",
    date: "2026-07-22",
    timeSlot: "16:00 - 17:00",
    studentName: "Rian Pratama",
    studentClass: "11 IPA 3",
    createdAt: "2026-07-21T11:00:00Z",
  },
];

export default function Home() {
  const router = useRouter();
  
  const [user, setUser] = useState<{ name: string; studentClass: string; studentId: string } | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState("2026-07-21");
  
  // Loading & Database Error states
  const [isLoading, setIsLoading] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  // Load state on mount
  useEffect(() => {
    // 1. Load user from localStorage
    const savedUser = localStorage.getItem("kicktime_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error parsing saved user", e);
      }
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
      // Set the database error message to display in the ScheduleBoard warning banner
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
  const handleLoginSuccess = (name: string, studentClass: string, studentId: string) => {
    const loggedInUser = { name, studentClass, studentId };
    setUser(loggedInUser);
    localStorage.setItem("kicktime_user", JSON.stringify(loggedInUser));
    setIsLoginModalOpen(false);
    showToast(`Halo ${name}, Anda berhasil masuk! Mengalihkan ke dashboard...`, "success");
    
    // Redirect to the dashboard page after a brief delay for toast visibility
    setTimeout(() => {
      router.push("/dashboard");
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("kicktime_user");
    showToast("Anda telah keluar dari akun siswa.", "info");
  };

  // Public Booking Trigger (Prompts Login)
  const handleSlotClick = (timeSlot: string) => {
    showToast("Silakan login sebagai siswa terlebih dahulu untuk melakukan booking lapangan.", "info");
    setIsLoginModalOpen(true);
  };

  const handleBookNowClick = () => {
    const el = document.getElementById("pilih-lapangan");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCourtBookClick = (courtId: string, courtName: string) => {
    showToast(`Silakan login sebagai siswa untuk booking ${courtName}.`, "info");
    setIsLoginModalOpen(true);
  };

  return (
    <>
      {/* Database Processing Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#07090e]/40 backdrop-blur-[2px]">
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

      {/* Floating Header Navbar */}
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onOpenLogin={() => setIsLoginModalOpen(true)} 
      />

      <main className="flex flex-col flex-1">
        {/* Hero Section */}
        <Hero onBookNowClick={handleBookNowClick} />

        {/* Courts Section (with maintenance guard) */}
        <CourtsSection onBookClick={handleCourtBookClick} />

        {/* Real-time Schedule Board (Read Only) */}
        <ScheduleBoard
          bookings={bookings}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          onSlotClick={handleSlotClick}
          timeSlots={TIME_SLOTS}
          readOnly={true}
          dbError={dbError}
        />
      </main>

      {/* Footer bar */}
      <Footer />

      {/* Mock Student Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
