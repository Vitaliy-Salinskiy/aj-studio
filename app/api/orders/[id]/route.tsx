import { revalidatePath } from "next/cache";

import { clearCart, createOrder, getAllOrders } from "@/lib/requests";

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
    const order = await getAllOrders(id);

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
