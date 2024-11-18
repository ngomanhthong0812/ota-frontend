import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    const token = request.cookies.get('access_token')?.value;
    if (token && (request.nextUrl.pathname === '/login')) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    if (token && (request.nextUrl.pathname === '/register')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Nếu không có token và người dùng truy cập các trang quản lý, chuyển hướng đến login
    if (!token && (request.nextUrl.pathname.startsWith('/hotel_management') || request.nextUrl.pathname.startsWith('/staff_management'))) {
        return NextResponse.redirect(new URL('/login', request.url)); // Chuyển hướng đến trang login
    }

    return NextResponse.next();

}
export const config = {
    matcher: [
        '/hotel_management/:path*',
        '/staff_management/:path*',
        '/login',
        '/register',
    ],
};