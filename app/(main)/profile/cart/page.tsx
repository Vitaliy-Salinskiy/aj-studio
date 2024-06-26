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
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cart/item/${session?.user.id}`
  );
  const ordersItems: ExtendedOrderItem[] = await res.json();

  const filteredOrdersItems = ordersItems.filter(
    (item) => item.status !== "REMOVED"
  );

  return (
    <CartContainer
      ordersItems={filteredOrdersItems}
      userId={session?.user.id!}
    />
  );
};

export default page;
