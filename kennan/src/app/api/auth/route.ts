import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "namli2024";
const COOKIE_NAME = "admin_session";
const COOKIE_VALUE = "authenticated";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { password, action } = body;

  // Logout
  if (action === "logout") {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return NextResponse.json({ success: true });
  }

  // Login
  if (password === ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7, // 7 gün
      path: "/",
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false, error: "Yanlış şifre" }, { status: 401 });
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  const authenticated = session?.value === COOKIE_VALUE;
  return NextResponse.json({ authenticated });
}
