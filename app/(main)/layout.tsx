import type { Metadata } from "next";

import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Studio Home Page",
  description: "Studio Home Web Shop for Shoes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}
