"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ExtendedOrderItem } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";

interface OrderItemProps {
  orderItem: ExtendedOrderItem;
  userId: string;
}

const OrderItem = ({ orderItem }: OrderItemProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleRemove = async () => {
    const res = await fetch(`/api/orders/item/${orderItem.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast({
        title: "Your cart",
        description: `Product was deleted successfully`,
      });
      router.refresh();
    } else {
      toast({
        title: "Your cart",
        description: "Something went wrong... Please try again later",
      });
    }
  };

  return (
    <div className={`flex flex-col border-gray-300 border-b pb-5`}>
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
          <Button
            className="border border-red-500 hover:bg-transparent hover:text-red-500"
            onClick={async () => await handleRemove()}
          >
            Remove from cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
