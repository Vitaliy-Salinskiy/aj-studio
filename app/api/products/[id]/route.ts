import { getProductById, updateProduct } from "@/lib/requests";
import { revalidatePath } from "next/cache";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const product = await getProductById(id);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json(product);
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const { dto } = await request.json();

  if (!dto || !id) {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }

  const updatedProduct = updateProduct(id, dto);

  if (!updatedProduct) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  revalidatePath("/(main)", "layout");
  revalidatePath("/(main)/products/[id]", "page");
  revalidatePath("/(main)/products/update/[id]", "page");
  revalidatePath("/(main)/profile/wishlist", "page");
  revalidatePath("/(main)/profile/cart", "page");

  return Response.json(updatedProduct);
};
