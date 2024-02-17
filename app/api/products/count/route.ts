import { getProductsCount } from "@/lib/requests";

export const GET = async () => {
  const data = await getProductsCount();

  return new Response(JSON.stringify(data));
};
