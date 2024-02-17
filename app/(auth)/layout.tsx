import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/");
    return null;
  }

  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
