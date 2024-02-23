import { getWishedItemsByUserId } from "@/lib/requests";

export const GET = async (
  _request: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return new Response("Invalid request", { status: 400 });
  }

  try {
    const wishedItems = await getWishedItemsByUserId(id);

    return new Response(JSON.stringify(wishedItems), { status: 200 });
  } catch (error) {
    return new Response("Something went wrong", { status: 500 });
  }
};
