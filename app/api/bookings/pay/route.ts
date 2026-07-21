import { NextResponse } from "next/server";
import { query } from "@/app/lib/db";

// POST: Simulate QRIS payment verification
export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID booking diperlukan untuk memverifikasi pembayaran." }, { status: 400 });
    }

    // Update the booking status to "Lunas" (Paid)
    const result: any = await query(
      "UPDATE bookings SET status = 'Lunas' WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Jadwal booking tidak ditemukan." }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true,
      message: "Pembayaran QRISku terverifikasi. Status booking diperbarui menjadi Lunas." 
    });
  } catch (error) {
    console.error("POST pay error:", error);
    return NextResponse.json({ error: "Gagal memperbarui status pembayaran di database." }, { status: 500 });
  }
}
