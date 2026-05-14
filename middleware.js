import { NextResponse } from "next/server";

export function middleware(req) {

    const token = req.cookies.get("token")?.value;

    console.log("Token",token);
    const isProtectedRoute =
        req.nextUrl.pathname.startsWith("/Dashboard");

    if (isProtectedRoute && !token) {
        return NextResponse.redirect(
            new URL("/Login", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/Dashboard/:path*"]
};