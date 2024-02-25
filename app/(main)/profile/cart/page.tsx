import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import CartContainer from "@/components/shared/CartContainer";
import { ExtendedOrderItem } from "@/interfaces";

export const metadata: Metadata = {
  title: "Studio | Cart Page",
  description: "Cart Page",
};

const page = async () => {
  const session = await getServerSession(options);
  const res = await fetch(
    `http://localhost:3000/api/orders/item/${session?.user.id}`
  );
  const ordersItems: ExtendedOrderItem[] = await res.json();

  return <CartContainer ordersItems={ordersItems} userId={session?.user.id!} />;
};

export default page;
