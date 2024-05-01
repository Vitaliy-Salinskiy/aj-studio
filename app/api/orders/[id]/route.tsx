import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import Stripe from "stripe";

import { clearCart, getAllOrdersByUserId, updateOrder } from "@/lib/requests";
import { OrderStatus } from "@prisma/client";
import { IStripeItem, IStripeMetaData } from "@/interfaces";

export const GET = async (
  _request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    const order = await getAllOrdersByUserId(id);

    return new Response(JSON.stringify(order), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const body: { orderItems: IStripeItem[]; metadata: IStripeMetaData } =
    await request.json();
  const { orderItems, metadata } = body;

  if (!orderItems || !id) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2024-04-10",
    typescript: true,
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [...orderItems],
      metadata: {
        userId: metadata.userId,
        itemsId: JSON.stringify(metadata.itemsId),
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/cart`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/profile/cart`,
    });

    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const body: { status: OrderStatus } = await request.json();
  const { status } = body;

  if (!status || !id) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    const order = await updateOrder(id, status);

    revalidatePath("/(main)/profile/orders");
    revalidatePath("/(main)/profile/cart");
    revalidatePath("/(main)/orders/[id]");
    revalidatePath("/(main)/admin/orders");

    if (order) {
      await clearCart(id);
    }

    return new Response(JSON.stringify({ order }));
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
