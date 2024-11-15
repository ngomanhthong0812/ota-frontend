import type { Metadata } from "next";

import '@/app/styles/style.css';
import '@/app/styles/globals.css';
import { ToolbarProvider } from "@/context/toolbarContext";

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
          {children}
        </ToolbarProvider>
      </body>
    </html>
  )
}
