// middleware.ts
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/", "/((?!non-protected).*)"],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const session = await auth();

  if (pathname === "/post") {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
};
