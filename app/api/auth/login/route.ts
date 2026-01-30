"use server";

import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    // Fetch user by username
    const [rows]: any = await pool.query(
      "SELECT * FROM users WHERE username = ? LIMIT 1",
      [username]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" });
    }

    const user = rows[0];

    // Compare hashed password
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json({ message: "Invalid password" });
    }

    // Successful login
    return NextResponse.json({
      message: `Welcome, ${user.first_name}!`,
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" });
  }
}
