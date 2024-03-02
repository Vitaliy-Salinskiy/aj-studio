import { getAllOrders } from "@/lib/requests";

export const GET = async () => {
  try {
    const orders = await getAllOrders();

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
