import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

import AuthProvider from "@/context/AuthProvider";
import { EdgeStoreProvider } from "@/context/EdgeStoreProvider";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Next App",
  description: "Studio Web Shop for Shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body className={inter.className}>
        <AuthProvider>
          <EdgeStoreProvider>
            <Toaster />
            {children}
          </EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
