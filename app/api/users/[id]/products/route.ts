import { getOwnedProducts } from "@/lib/requests";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  console.log("fired");
  const { id } = params;

  if (!id) {
    return new Response("id is required", { status: 400 });
  }

  try {
    const products = await getOwnedProducts(id);

    if (!products) {
      return new Response("No products found", { status: 404 });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response((error as Error).message, { status: 500 });
  }
};
