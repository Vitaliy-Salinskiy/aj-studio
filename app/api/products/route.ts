import { getProductsCount } from "@/lib/requests";

export const GET = async (request: Request) => {
  const data = await getProductsCount();

  return new Response(JSON.stringify(data));
};
