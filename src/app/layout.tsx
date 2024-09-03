import type { Metadata } from "next";
import "./globals.css";
import ClientNavbar from "@/components/ClientNavbar";

export const metadata: Metadata = {
  title: "Next.js app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientNavbar />
        {children}
      </body>
    </html>
  );
}
