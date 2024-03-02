import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Sidebar from "@/components/shared/Sidebar";

export const metadata: Metadata = {
  title: "Studio | Admin Page",
  description: "Studio Admin Web Shop for Shoes",
};

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  const usersData = await fetch("http://localhost:3000/api/users");
  const users = await usersData.json();

  const productData = await fetch("http://localhost:3000/api/products");
  const product = await productData.json();

  const ordersData = await fetch("http://localhost:3000/api/orders");
  const orders = await ordersData.json();

  const salesData = await fetch("http://localhost:3000/api/products/sales");
  const sales = await salesData.json();

  return (
    <div className="flex">
      <Sidebar {...{ session }} />
      <section className="py-16 pb-32 flex flex-col appContainer">
        {children}
      </section>
    </div>
  );
}
