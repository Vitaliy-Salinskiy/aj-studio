"use client";

import { useEffect, useState } from "react";

import OrderItem from "@/components/shared/OrderItem";
import { Button } from "@/components/ui/button";
import { ExtendedOrderItem } from "@/interfaces";

interface CartContainerProps {
  ordersItems: ExtendedOrderItem[];
  userId: string;
}

const CartContainer = ({ ordersItems, userId }: CartContainerProps) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(
      ordersItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      )
    );
  }, [ordersItems]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        {ordersItems.length > 0 ? (
          ordersItems
            .reverse()
            .map((item: any, index: number) => (
              <OrderItem orderItem={item} userId={userId} key={index + item} />
            ))
        ) : (
          <p className="text-3xl text-center min-h-80 flex items-center justify-center">
            Your cart is empty
          </p>
        )}
      </div>
      {ordersItems.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-[29px] font-bold">Total: {total}$</h2>
          <Button className="bg-black hover:bg-black transition-transform active:scale-95 duration-200">
            Make an order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
