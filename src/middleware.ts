import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export const middleware = async (request: NextRequest) => {
    const token = request.cookies.get('access_token')?.value;

    let decodedToken: any = null;

    // Decode token nếu có
    if (token) {
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);
            decodedToken = payload; // Giải mã token
        } catch (error) {
            console.error("Invalid token:", error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect logic
    if (token && (request.nextUrl.pathname === '/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (token && (request.nextUrl.pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (!token && (request.nextUrl.pathname.startsWith('/hotel_management'))) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (decodedToken?.role !== "Admin" && (request.nextUrl.pathname.startsWith('/admin_management'))) {
        return NextResponse.redirect(new URL('/hotel_management', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/hotel_management/:path*',
        '/admin_management/:path*',
        '/login',
        '/register',
    ],
};
