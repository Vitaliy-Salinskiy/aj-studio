import { revalidatePath } from "next/cache";

import { getUserById, updateUser, updateUserImage } from "@/lib/requests";
import { IProfileForm } from "@/interfaces";

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

  const { dto }: { dto: IProfileForm } = body;

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
