import type { Metadata } from "next";

import '@/app/styles/style.css';
import '@/app/styles/globals.css';
import { ToolbarProvider } from "@/context/toolbar.context";
import { AuthProvider } from "@/context/auth.context";
import { SelectedServiceProvider } from "@/context/selectedService.context";

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
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
