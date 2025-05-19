import { NextResponse } from "next/server";
import { verifyPassword, signToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { setTokenCookie } from "@/lib/cookies";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  const user = await db.user.findUnique({ where: { email } });
  if (!user || !(await verifyPassword(password, user.password))) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  const token = signToken({ userId: user.id });
  const res = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
  setTokenCookie(res, token);
  return res;
}
