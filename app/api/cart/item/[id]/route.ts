import { revalidatePath } from "next/cache";

import { OrderItemDto } from "@/interfaces";
import { createOrderItem, getOrdersItemsByUserId } from "@/lib/requests";
import { OrderItem } from "@prisma/client";
import { NextResponse } from "next/server";

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const body: { dto: OrderItemDto } = await request.json();

  const { id } = params;
  const { dto } = body;

  if (!dto || !id) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  try {
    const res = await createOrderItem(dto, id);

    revalidatePath("/(main)/", "layout");
    revalidatePath("/(main)/profile/cart");

    return new Response(JSON.stringify({ orderItem: res }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
): Promise<Response> => {
  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ message: "Invalid request" }), {
        status: 400,
      });
    }

    const ordersItems = await getOrdersItemsByUserId(id);

    return new Response(JSON.stringify(ordersItems), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
