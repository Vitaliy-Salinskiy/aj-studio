import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import Sidebar from "@/components/shared/Sidebar";
// import ChartsContainer from "@/components/shared/ChartsContainer";
import { Order, Product, User } from "@prisma/client";

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
  const users: User[] = await usersData.json();

  const productData = await fetch("http://localhost:3000/api/products");
  const product: Product[] = await productData.json();

  const ordersData = await fetch("http://localhost:3000/api/orders");
  const orders: Order[] = await ordersData.json();

  const salesData = await fetch("http://localhost:3000/api/products/sales");
  const sales = await salesData.json();

  const data = [
    { label: "Orders", value: orders.length },
    { label: "Users", value: users.length },
    { label: "Products", value: product.length },
    { label: "Sales", value: sales },
  ];

  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar {...{ session }} />
      <section className="py-8 pb-16 flex flex-col appContainer px-2 md:px-8">
        <div className="flex flex-wrap gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="w-[calc(100%/2-6px)] sm:w-[calc(100%/4-9px)] flex flex-col items-center justify-center py-3 rounded-md bg-white px-4"
              style={{ boxShadow: "0 2px 8px 2px rgba(0,0,0,0.2)" }}
            >
              <h3 className="text-own-dark-black font-bold text-xl">
                {item.value}
              </h3>

              <p className="text-own-light-gray">{item.label}</p>
            </div>
          ))}
        </div>
        {children}
        {/* <ChartsContainer
          orders={orders.length}
          product={product.length}
          users={users.length}
          sales={sales}
        /> */}
      </section>
    </div>
  );
}
