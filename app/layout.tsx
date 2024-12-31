import type { Metadata } from "next";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import ClientLayout from "./ClientLayout";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Todo Hive",
  description: "Best way to organize your work and todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body>
          <ClientLayout>{children}</ClientLayout>
          <Toaster />
        </body>
      </UserProvider>
    </html>
  );
}
