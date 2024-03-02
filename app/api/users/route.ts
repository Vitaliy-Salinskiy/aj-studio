import { createUser, getAllUsers } from "@/lib/requests";

export const POST = async (request: Request) => {
  const dto = await request.json();

  if (!dto) return new Response("Invalid data", { status: 400 });

  const newUser = await createUser(dto);

  if (!newUser) return new Response("Failed to create user", { status: 500 });

  return new Response(JSON.stringify(newUser));
};

export const GET = async (_request: Request) => {
  try {
    const users = await getAllUsers();

    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch users", { status: 500 });
  }
};
