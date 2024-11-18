import type { Metadata } from "next";

import '@/app/styles/style.css';
import '@/app/styles/globals.css';
import { ToolbarProvider } from "@/context/toolbarContext";
import { AuthProvider } from "@/context/authContext";

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
          <ToolbarProvider>
            {children}
          </ToolbarProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
