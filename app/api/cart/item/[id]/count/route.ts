import { countOrderItems } from "@/lib/requests";

export const GET = async (
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
    const count = await countOrderItems(id);

    return new Response(JSON.stringify(count));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Something went wrong" }), {
      status: 500,
    });
  }
};
