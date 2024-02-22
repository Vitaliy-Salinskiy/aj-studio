import { revalidatePath } from "next/cache";

import { createOrder } from "@/lib/requests";

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

    revalidatePath(`/(main)/profile/cart`);

    return new Response(JSON.stringify({ order }));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
