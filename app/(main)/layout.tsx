import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Studio | Home Page",
  description: "Studio Home Web Shop for Shoes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/item/${session?.user.id}/count`
  );
  const productsCount = await data.json();

  return (
    <div>
      <Header
        productsCount={session?.user.id ? productsCount : 0}
        session={session}
      />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
