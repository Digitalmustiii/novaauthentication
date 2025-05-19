import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getTokenCookie, clearTokenCookie } from "@/lib/cookies";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
  const token = getTokenCookie(req as any);
  if (!token) return NextResponse.json({ user: null }, { status: 200 });

  const payload = verifyToken(token);
  if (!payload) {
    const res = NextResponse.json({ user: null });
    clearTokenCookie(res);
    return res;
  }

  const user = await db.user.findUnique({ where: { id: payload.userId } });
  return NextResponse.json({ user: user ? { id: user.id, name: user.name, email: user.email } : null });
}
