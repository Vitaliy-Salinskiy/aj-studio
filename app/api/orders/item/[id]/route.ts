import { revalidatePath } from "next/cache";

import { OrderItemDto } from "@/interfaces";
import {
  createOrderItem,
  deleteProductFromCart,
  getOrdersItemsByUserId,
} from "@/lib/requests";

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

    revalidatePath("/(main)/");
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
) => {
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
    return error;
  }
};

export const DELETE = async (
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
    await deleteProductFromCart(id);

    revalidatePath("/(main)/");
    revalidatePath("/(main)/profile/cart");

    return new Response(
      JSON.stringify({ message: "Product was deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
