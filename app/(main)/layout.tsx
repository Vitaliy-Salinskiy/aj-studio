import type { Metadata } from "next";

import Header from "@/components/shared/Header";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const metadata: Metadata = {
  title: "Studio Home Page",
  description: "Studio Home Web Shop for Shoes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await fetch("http://localhost:3000/api/products/count", {
    cache: "no-cache",
  });
  const productsCount = await data.json();
  const session = await getServerSession(options);

  return (
    <div>
      <Header productsCount={productsCount} session={session} />
      <main>{children}</main>
    </div>
  );
}
