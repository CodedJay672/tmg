import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ContextProvider from "@/context/ContextProvider";
import { Toaster } from "sonner";
import QueryProvider from "@/lib/queries/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TGM Procurement",
  description:
    "TGM Procurement specializes in selling heavy duty machines at affordable prices",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <ContextProvider>
            {children}
            <Toaster richColors position="top-right" />
          </ContextProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
