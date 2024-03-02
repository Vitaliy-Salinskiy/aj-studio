import { revalidatePath } from "next/cache";

import {
  clearCart,
  createOrder,
  getAllOrdersByUserId,
  updateOrder,
} from "@/lib/requests";
import { OrderStatus } from "@prisma/client";

export const GET = async (
  _request: Request,
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
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const body: { orderItems: string[] } = await request.json();
  const { orderItems } = body;

  if (!orderItems || !id) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    const order = await createOrder(id, orderItems);

    revalidatePath("/(main)/profile/orders");
    revalidatePath("/(main)/profile/cart");
    revalidatePath("/(main)/orders/[id]");

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

export const PUT = async (
  request: Request,
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
