import { revalidatePath } from "next/cache";

import { deleteProductFromCart } from "@/lib/requests";

export const POST = async (
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
