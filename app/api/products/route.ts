import { createProduct, getAllProducts } from "@/lib/requests";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  try {
    const products = await getAllProducts();

    return new Response(JSON.stringify(products));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};

export const POST = async (request: Request) => {
  const { dto, userId } = await request.json();

  if (!dto || !userId) return new Response("Invalid data", { status: 400 });

  try {
    const newProduct = await createProduct(dto, userId);

    if (!newProduct)
      return new Response("Failed to create product", { status: 500 });

    revalidatePath("/(main)/", "layout");

    return new Response(JSON.stringify(newProduct));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
