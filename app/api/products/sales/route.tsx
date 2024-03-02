import { getProductsSales } from "@/lib/requests";

export const GET = async () => {
  try {
    const data = await getProductsSales();

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
