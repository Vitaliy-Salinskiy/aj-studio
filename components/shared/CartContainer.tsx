"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OrderItem from "@/components/shared/CartItem";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ExtendedOrderItem, IStripeItem, IStripeMetaData } from "@/interfaces";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CartContainerProps {
  ordersItems: ExtendedOrderItem[];
  userId: string;
}

const CartContainer = ({ ordersItems, userId }: CartContainerProps) => {
  const [totals, setTotals] = useState({ discount: 0, total: 0 });
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const newTotals = ordersItems.reduce(
      (acc, item) => {
        const discountedPrice =
          item.product.price -
          (item.product.price * item.product.discount) / 100;
        return {
          discount: acc.discount + discountedPrice * item.quantity,
          total: acc.total + item.product.price * item.quantity,
        };
      },
      { discount: 0, total: 0 }
    );

    setTotals(newTotals);
  }, [ordersItems]);

  const handleOrderCreate = async () => {
    const stipeItems: IStripeItem[] = ordersItems.map(
      (item: ExtendedOrderItem) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.name,
              images: [item.product.imageUrl],
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        };
      }
    );

    const metadata: IStripeMetaData = {
      userId,
      itemsId: ordersItems.map((item: ExtendedOrderItem) => item.id),
    };

    const res = await fetch(`/api/orders/${userId}`, {
      method: "POST",
      body: JSON.stringify({
        orderItems: stipeItems,
        metadata,
      }),
    });

    if (res.ok) {
      const stripe = await stripePromise;

      const { sessionId } = await res.json();

      const result = await stripe?.redirectToCheckout({
        sessionId,
      });

      if (result?.error) {
        toast({
          title: "Order",
          description: "Something went wrong... Please try again later",
        });
      }
    } else {
      toast({
        title: "Order",
        description: "Something went wrong... Please try again later",
      });
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        {ordersItems.length > 0 ? (
          ordersItems
            // .reverse() // bug here
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
          <h2 className="text-[26px] sm:text-[29px] font-bold flex gap-2">
            Total:{" "}
            {Number(totals.discount.toFixed()) !== totals.total ? (
              <span>
                {totals.discount.toFixed()}${" "}
                <span className="text-own-light-red line-through">
                  {totals.total}$
                </span>
              </span>
            ) : (
              `${totals.total}$`
            )}
          </h2>
          <Button
            className="bg-black hover:bg-black transition-transform active:scale-95 duration-200"
            onClick={() => handleOrderCreate()}
          >
            Make an order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartContainer;
