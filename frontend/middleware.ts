// middleware.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const config = {
  matcher: "/post/:path*",
};

export const middleware = auth((req) => {
  if (!req.auth) {
    const url = req.nextUrl.clone();
    url.pathname = "/api/auth/signin";
    return NextResponse.redirect(url);
  }
});
