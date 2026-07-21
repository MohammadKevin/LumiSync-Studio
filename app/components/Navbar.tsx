"use client";

import React from "react";
import { Activity, LogIn, LogOut, Calendar, User, LayoutDashboard } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  user: { name: string; studentClass: string; studentId: string } | null;
  onLogout: () => void;
  onOpenLogin: () => void;
  onOpenMyBookings?: () => void;
  isDashboard?: boolean;
}

export default function Navbar({ user, onLogout, onOpenLogin, onOpenMyBookings, isDashboard = false }: NavbarProps) {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    // If we are on dashboard and trying to scroll to hero, or on home page, handle correctly
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-theme-border backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div 
            onClick={() => isDashboard ? router.push("/dashboard") : scrollToSection("hero")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-brand-primary/10 p-2 rounded-lg border border-brand-primary/30 group-hover:bg-brand-primary/20 transition-all duration-300">
              <Activity className="h-6 w-6 text-brand-primary animate-pulse" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-wider font-heading">
              KICK<span className="text-brand-primary font-extrabold">TIME</span>
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {!isDashboard ? (
              <>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="text-sm font-medium text-theme-text-secondary hover:text-brand-primary transition-colors duration-200 cursor-pointer"
                >
                  Beranda
                </button>
                <button
                  onClick={() => scrollToSection("schedule")}
                  className="text-sm font-medium text-theme-text-secondary hover:text-brand-primary transition-colors duration-200 cursor-pointer"
                >
                  Jadwal Lapangan
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => router.push("/dashboard")}
                  className="text-sm font-medium text-brand-primary hover:text-brand-primary transition-colors duration-200 cursor-pointer flex items-center space-x-1"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard Siswa</span>
                </button>
                <button
                  onClick={() => scrollToSection("schedule")}
                  className="text-sm font-medium text-theme-text-secondary hover:text-brand-primary transition-colors duration-200 cursor-pointer"
                >
                  Jadwal Lapangan
                </button>
              </>
            )}
            
            {/* Show Booking Saya modal link only if logged in AND not on dashboard page */}
            {user && !isDashboard && onOpenMyBookings && (
              <button
                onClick={onOpenMyBookings}
                className="text-sm font-medium text-theme-text-secondary hover:text-brand-primary transition-colors duration-200 flex items-center space-x-1 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-brand-primary" />
                <span>Booking Saya</span>
              </button>
            )}
          </nav>

          {/* Auth Button / User Status */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* Dashboard button shortcut if logged in but on public homepage */}
                {!isDashboard && (
                  <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-brand-primary/10 hover:bg-brand-primary/20 text-brand-primary border border-brand-primary/30 text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden sm:inline">Ke Dashboard</span>
                  </button>
                )}

                {/* Profile Display */}
                <div className="flex flex-col items-end text-right">
                  <span className="text-sm font-semibold text-theme-text-primary flex items-center space-x-1">
                    <User className="w-3.5 h-3.5 text-brand-primary" />
                    <span>{user.name}</span>
                  </span>
                  <span className="text-xs text-brand-primary font-medium bg-brand-primary/10 px-2 py-0.5 rounded-full border border-brand-primary/20">
                    Kelas {user.studentClass}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary/95 text-theme-bg font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transform hover:-translate-y-0.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login Siswa</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
