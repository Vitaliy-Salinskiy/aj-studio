import { OrderItemDto } from "@/interfaces";
import { createOrderItem } from "@/lib/requests";

export const POST = async (request: Request) => {
  const body: { dto: OrderItemDto } = await request.json();

  const { dto } = body;

  if (!dto) {
    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  }

  const res = await createOrderItem(dto);

  return new Response(JSON.stringify({ orderItem: res }), { status: 200 });
};
