import { createProduct, getAllProducts } from "@/lib/requests";
import { revalidatePath } from "next/cache";

export const GET = async () => {
  const products = await getAllProducts();

  return new Response(JSON.stringify(products));
};

export const POST = async (request: Request) => {
  const { dto, userId } = await request.json();

  if (!dto || !userId) return new Response("Invalid data", { status: 400 });

  const newProduct = await createProduct(dto, userId);

  if (!newProduct)
    return new Response("Failed to create product", { status: 500 });

  revalidatePath("/products/create");
  revalidatePath("/");

  return new Response(JSON.stringify(newProduct));
};
