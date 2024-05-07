"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ExtendedOrderItem } from "@/interfaces";
import { useToast } from "@/components/ui/use-toast";
import { getDiscountPrice } from "@/utils";
import { Dispatch, SetStateAction, useState } from "react";

interface OrderItemProps {
  orderItem: ExtendedOrderItem;
  userId: string;
  isDisabled: boolean;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setIsRemoved: (id: string) => void;
}

const CartItem = ({
  orderItem,
  isDisabled,
  setIsDisabled,
  setIsRemoved,
}: OrderItemProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const [isRemovedBy, setIsRemovedBy] = useState<boolean>(false);

  const handleRemove = async () => {
    setIsDisabled(true);

    setIsRemovedBy(true);
    setIsRemoved(orderItem.id);

    const res = await fetch(`/api/cart/clear/${orderItem.id}`, {
      method: "POST",
    });

    if (res.ok) {
      router.refresh();
      toast({
        title: "Your cart",
        description: `Product was deleted successfully`,
      });
    } else {
      setIsRemoved(orderItem.id);
      toast({
        title: "Your cart",
        description: "Something went wrong... Please try again later",
      });
    }

    setTimeout(() => setIsDisabled(false), 125);
  };

  return (
    <div
      className={`flex flex-col border-gray-300 border-b pb-5 ${
        isRemovedBy && "hidden"
      }`}
    >
      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row justify-between items-center">
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

        <div className="flex flex-col md:flex-row flex-1 gap-4 md:gap-16 items-center">
          <h4 className="font-bold  flex gap-2">
            {orderItem.product.discount > 0 && (
              <span>
                {getDiscountPrice(
                  orderItem.product.price,
                  orderItem.product.discount,
                  orderItem.quantity
                )}
                $
              </span>
            )}
            <span
              className={`${
                orderItem.product.discount
                  ? "text-own-light-red line-through"
                  : ""
              }`}
            >
              {orderItem.product.price * orderItem.quantity}$
            </span>
          </h4>

          <div className="flex flex-col gap-2">
            <Button
              disabled={isDisabled}
              className="border border-red-500 hover:bg-transparent hover:text-red-500 disabled:opacity-75"
              onClick={async () => await handleRemove()}
            >
              Remove from cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
