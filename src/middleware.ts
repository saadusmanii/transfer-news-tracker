import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: ["/dashboard/:path*", "/api/profiles/:path*", "/api/tweets/:path*", "/api/preferences/:path*"],
};
