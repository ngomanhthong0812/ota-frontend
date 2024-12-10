import { Toaster } from "sonner";

export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <div>
                {children}
                <Toaster />
                </div>
    );
}
