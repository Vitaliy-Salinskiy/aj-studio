import { NextRequest, NextResponse } from "next/server";

import { addItemToWishlist, removeItemFromWishlist } from "@/lib/requests";

export const POST = async (request: NextRequest) => {
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

export const DELETE = async (request: NextRequest) => {
  const body: { userId: string; productId: string } = await request.json();

  const { productId, userId } = body;

  console.log(productId, userId);

  if (!productId || !userId) {
    return NextResponse.json("Invalid request", { status: 400 });
  }

  try {
    await removeItemFromWishlist(productId, userId);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
};
