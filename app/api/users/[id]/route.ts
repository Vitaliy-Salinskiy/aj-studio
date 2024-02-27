import { revalidatePath, revalidateTag } from "next/cache";
import { User as IUser } from "@prisma/client";

import { getUserById, updateUser, updateUserImage } from "@/lib/requests";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    const user = await getUserById(id);

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch user", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const body = await request.json();

  const { image } = body;

  if (!id || !image) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    const updatedUser = await updateUserImage(id, image);

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    revalidatePath("/(main)/", "layout");
    revalidatePath("/(main)/profile", "layout");
    ``;
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const body = await request.json();

  const { dto }: { dto: Partial<IUser> } = body;

  if (!id || !dto) {
    return new Response("Invalid data", { status: 400 });
  }

  try {
    const updatedUser = await updateUser(id, dto);

    if (!updatedUser) {
      return new Response("User not found", { status: 404 });
    }

    revalidatePath("/(main)/", "layout");
    revalidatePath("/(main)/profile", "layout");

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};
