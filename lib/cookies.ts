import { NextResponse, type NextRequest } from "next/server";

const COOKIE_NAME = "auth_token";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setTokenCookie(res: NextResponse, token: string) {
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    maxAge: MAX_AGE,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
}

export function clearTokenCookie(res: NextResponse) {
  res.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
}

export function getTokenCookie(req: NextRequest): string | undefined {
  return req.cookies.get(COOKIE_NAME)?.value;
}
