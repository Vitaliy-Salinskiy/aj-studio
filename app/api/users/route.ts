import { createUser } from "@/lib/requests";

export const POST = async (request: Request) => {
  const dto = await request.json();

  if (!dto) return new Response("Invalid data", { status: 400 });

  const newUser = await createUser(dto);

  if (!newUser) return new Response("Failed to create user", { status: 500 });

  return new Response(JSON.stringify(newUser));
};
