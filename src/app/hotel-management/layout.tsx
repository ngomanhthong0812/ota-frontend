import HotelHeader from "@/components/layout/hotel-header";
import HotelSidebar from "@/components/layout/hotel-sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ota App",
    description: "Ota App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <HotelHeader />
                <div className="flex">
                    <HotelSidebar />
                    {children}
                </div>
            </body>
        </html>
    )
}
