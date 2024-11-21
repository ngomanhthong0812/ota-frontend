import HotelHeader from "@/components/layout/hotel_header";
import HotelSidebar from "@/components/layout/hotel_sidebar";
import { SelectedServiceProvider } from "@/context/selectedService.context";
import { ToolbarProvider } from "@/context/toolbar.context";
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
                <ToolbarProvider>
                    <SelectedServiceProvider>
                        <div>
                            <HotelHeader />
                            <div className="flex">
                                <HotelSidebar />
                                <main className="container-body ml-[210px] mt-[50px] w-[100%] p-3 text-sm text-[var(--color-menu-icon-)]">
                                    {children}
                                </main>
                            </div>
                        </div>
                    </SelectedServiceProvider>
                </ToolbarProvider>
            </body>
        </html >
    )
}
