import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Define protected paths
  const isProtectedPath =
    path.startsWith("/dashboard") ||
    path.startsWith("/api/profiles") ||
    path.startsWith("/api/tweets") ||
    path.startsWith("/api/preferences");

  // Allow all requests to pass through for now
  // NextAuth will handle session validation in the components/API routes
  if (isProtectedPath) {
    // Check if user has a session token (cookie)
    const sessionToken = request.cookies.get("next-auth.session-token") ||
                         request.cookies.get("__Secure-next-auth.session-token");

    // If no session token and trying to access protected route, redirect to signin
    if (!sessionToken && path.startsWith("/dashboard")) {
      const url = new URL("/auth/signin", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/profiles/:path*",
    "/api/tweets/:path*",
    "/api/preferences/:path*",
  ],
};
