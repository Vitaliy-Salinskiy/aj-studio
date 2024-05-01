import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { revalidatePath } from "next/cache";
import { clearCart, createOrder } from "@/lib/requests";

export const POST = async (req: NextRequest) => {
  const body = await req.text();

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
    typescript: true,
  });

  try {
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (error) {
      return NextResponse.json(
        { message: (error as Error).message, error },
        { status: 400 }
      );
    }

    const eventType = event.type;

    if (eventType === "checkout.session.completed") {
      const { id, metadata } = event.data.object;

      if (metadata) {
        try {
          const itemsId = JSON.parse(metadata.itemsId as string);

          const order = await createOrder(metadata.userId, itemsId);

          revalidatePath("/(main)/profile/orders");
          revalidatePath("/(main)/profile/cart");

          if (order) {
            await clearCart(metadata.userId);
          }

          return NextResponse.json({ success: true }, { status: 200 });
        } catch (error) {
          return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
          );
        }
      }
    }

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
