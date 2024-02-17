import type { Metadata } from "next";

import Header from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Studio Home Page",
  description: "Studio Home Web Shop for Shoes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetch("http://localhost:3000/api/products/count");
  const productsCount = await data.json();

  return (
    <div>
      <Header productsCount={productsCount} />
      <main>{children}</main>
    </div>
  );
}
