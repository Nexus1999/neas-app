"use server";  // important! server-only

import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    return NextResponse.json({ db_time: rows });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message });
  }
}
