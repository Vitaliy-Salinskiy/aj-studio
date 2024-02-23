import { addItemToWishlist } from "@/lib/requests";

export const POST = async (request: Request) => {
  const body: { userId: string; productId: string } = await request.json();

  const { productId, userId } = body;

  if (!productId || !userId) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const wishlist = await addItemToWishlist(productId, userId);

    return new Response(JSON.stringify(wishlist), { status: 201 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
