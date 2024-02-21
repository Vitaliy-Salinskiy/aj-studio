"use client";

import { ExtendedOrderItem } from "@/interfaces";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface OrderItemProps {
  orderItem: ExtendedOrderItem;
}

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const router = useRouter();

  console.log(orderItem);
  return (
    <div className="flex flex-col border-gray-300 border-b pb-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 flex-[3]">
          <Image
            src={orderItem.product.imageUrl}
            alt={orderItem.id}
            width={100}
            height={100}
            className="bg-[#FAFAFB]"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-base">{orderItem.product.name}</h3>
            <div className="flex items-center gap-1.5">
              Color:
              <div
                style={{ backgroundColor: orderItem.color }}
                className="w-2.5 h-2.5 rounded-full"
              ></div>
            </div>
            <p>Qyt: {orderItem.quantity}</p>
          </div>
        </div>

        <h4 className="font-bold flex-1">
          ${orderItem.product.price * orderItem.quantity}
        </h4>

        <div className="flex flex-col gap-2">
          {!orderItem.orderId ? (
            <Button className="border border-black bg-transparent hover:bg-black text-black hover:text-white">
              Confirm an order
            </Button>
          ) : (
            <Button
              onClick={() => router.push(`/orders/${orderItem.orderId}`)}
              className="border border-black bg-transparent hover:bg-black text-black hover:text-white"
            >
              View Order
            </Button>
          )}
          {orderItem.orderId && (
            <Button className="border border-red-500 hover:bg-transparent hover:text-red-500">
              Cancel Order
            </Button>
          )}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default OrderItem;
