import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
    "/checkout",
    "/orders",
    "/profile",
    "/cart",
    "/wishlist"
]
const authRoutes = [
    "/login",
    "/signup",
    "/forget-password",
    "/reset-password",
    "/verifyCode"
]

export default function proxy(request: NextRequest) {
    const {pathname} = request.nextUrl
    const token = request.cookies.get("token")?.value || null

    const isAuthenticated= !!token

    const isProtectedRoute = protectedRoutes.some(
        route => pathname === route || pathname.startsWith(`${route}/`)
    )

    const isAuthRoute = authRoutes.some(
        route => pathname === route || pathname.startsWith(`${route}/`)
    )

    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        "/checkout/:path*",
        "/cart/:path*",
        "/wishlist/:path*",
        "/orders/:path*",
        "/profile/:path*",
        "/login",
        "/signup",
        "/forget-password",
        "/reset-password",
        "/verifyCode"
    ]
}