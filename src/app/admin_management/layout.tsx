import HotelHeader from "@/components/layout/hotel_header";
import HotelSidebarAdmin from "@/components/layout/hotel_sidebar_admin";
import { SelectedServiceProvider } from "@/context/selectedService.context";
import { ToolbarProvider } from "@/context/toolbar.context";
import type { Metadata } from "next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <div>
        <ToastContainer />
        <ToolbarProvider>
          <SelectedServiceProvider>
            <div className="relative min-h-[100vh]">
              {/* <HotelHeader /> */}
              <HotelSidebarAdmin />
              <main className="md:container md:max-w-[1290px] m-auto px-3 py-4 text-sm text-[var(--color-menu-icon-)]">
                {children}
              </main>
            </div>
          </SelectedServiceProvider>
        </ToolbarProvider>
      </div>
  );
}
