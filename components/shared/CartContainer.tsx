"use client";

import { useEffect, useState } from "react";

import OrderItem from "@/components/shared/CartItem";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ExtendedOrderItem, IStripeItem, IStripeMetaData } from "@/interfaces";

import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface CartExtendedOrderItem extends ExtendedOrderItem {
  isRemoved: boolean;
}

interface CartContainerProps {
  ordersItems: ExtendedOrderItem[];
  userId: string;
}

const CartContainer = ({ ordersItems, userId }: CartContainerProps) => {
  const [totals, setTotals] = useState({ discount: 0, total: 0 });
  const [isDisabled, setIsDisabled] = useState(false);
  const { toast } = useToast();

  const [transformedOrdersItems, setTransformedOrdersItems] = useState<
    CartExtendedOrderItem[]
  >([]);

  useEffect(() => {
    setTransformedOrdersItems(
      ordersItems.map((item) => ({ ...item, isRemoved: false }))
    );
  }, [ordersItems]);

  useEffect(() => {
    const newTotals = transformedOrdersItems
      .filter((item: CartExtendedOrderItem) => !item.isRemoved)
      .reduce(
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
  }, [transformedOrdersItems]);

  const handleChange = (id: string): void => {
    setTransformedOrdersItems((prev) =>
      prev
        .filter((item: CartExtendedOrderItem) => !item.isRemoved)
        .map((item) =>
          item.id === id ? { ...item, isRemoved: !item.isRemoved } : item
        )
    );
  };

  const handleOrderCreate = async () => {
    const stipeItems: IStripeItem[] = transformedOrdersItems
      .filter((item: CartExtendedOrderItem) => !item.isRemoved)
      .map((item: CartExtendedOrderItem) => {
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
      });

    const metadata: IStripeMetaData = {
      userId,
      itemsId: transformedOrdersItems
        .filter((item: CartExtendedOrderItem) => !item.isRemoved)
        .map((item: CartExtendedOrderItem) => item.id),
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
      <div className="flex flex-col-reverse gap-5">
        {transformedOrdersItems.filter((item) => !item.isRemoved).length > 0 ? (
          transformedOrdersItems
            .filter((item: CartExtendedOrderItem) => !item.isRemoved)
            .map((item: any, index: number) => (
              <OrderItem
                setIsRemoved={handleChange}
                orderItem={item}
                userId={userId}
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled}
                key={index + item}
              />
            ))
        ) : (
          <p className="text-3xl text-center min-h-80 flex items-center justify-center">
            Your cart is empty
          </p>
        )}
      </div>
      {transformedOrdersItems.filter((item) => !item.isRemoved).length > 0 && (
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
