import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

// GET: Retrieve all bookings
export async function GET() {
  try {
    const rows = await query(
      "SELECT id, date, time_slot AS timeSlot, student_name AS studentName, student_class AS studentClass, status, amount, created_at AS createdAt FROM bookings"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET bookings error:", error);
    return NextResponse.json({ error: "Gagal mengambil data booking dari database." }, { status: 500 });
  }
}

// POST: Create a new booking
export async function POST(req: Request) {
  try {
    const { date, timeSlot, studentName, studentClass } = await req.json();

    if (!date || !timeSlot || !studentName || !studentClass) {
      return NextResponse.json({ error: "Parameter input tidak lengkap." }, { status: 400 });
    }

    // 1. Conflict Check: check if date and slot are already booked
    const existing: any = await query(
      "SELECT id FROM bookings WHERE date = ? AND time_slot = ?",
      [date, timeSlot]
    );

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "Slot waktu ini sudah dipesan oleh siswa lain." },
        { status: 409 }
      );
    }

    // 2. Insert new booking
    const id = `booking-${Date.now()}`;
    await query(
      "INSERT INTO bookings (id, date, time_slot, student_name, student_class, status, amount) VALUES (?, ?, ?, ?, ?, 'Menunggu Pembayaran', 50000)",
      [id, date, timeSlot, studentName, studentClass]
    );

    const newBooking = {
      id,
      date,
      timeSlot,
      studentName,
      studentClass,
      status: "Menunggu Pembayaran",
      amount: 50000,
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("POST booking error:", error);
    return NextResponse.json({ error: "Gagal menambahkan booking ke database." }, { status: 500 });
  }
}

// DELETE: Cancel a booking
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID booking diperlukan untuk pembatalan." }, { status: 400 });
    }

    // Delete query
    await query("DELETE FROM bookings WHERE id = ?", [id]);

    return NextResponse.json({ message: "Booking berhasil dibatalkan." });
  } catch (error) {
    console.error("DELETE booking error:", error);
    return NextResponse.json({ error: "Gagal membatalkan booking di database." }, { status: 500 });
  }
}
