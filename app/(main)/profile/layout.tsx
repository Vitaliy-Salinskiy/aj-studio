import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { options } from "@/app/api/auth/[...nextauth]/options";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profileTabs } from "@/constants";

export const metadata: Metadata = {
  title: "Studio | Profile Page",
  description: "Studio Home Web Shop for Shoes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(options);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <section>
      <div className="appContainer">
        <div className="flex flex-col gap-3 lg:py-10">
          <div>
            <h1 className="text-[44px] font-semibold">My Profile</h1>
          </div>

          <div className="flex gap-4">
            <div className="hidden xl:flex flex-col flex-1 border border-gray-300 h-fit">
              <div className="flex gap-3 p-5 items-center border-gray-300 border-b">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session?.user.image!} />
                  <AvatarFallback className="bg-black text-white">
                    {session?.user.name?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <p>Hello 👋 </p>
                  <h2>{session?.user.name}</h2>
                </div>
              </div>
              <div className="flex flex-col">
                {profileTabs.map((tab, index) => (
                  <Link
                    href={`${tab.path}`}
                    key={index}
                    className="flex items-center gap-3 pl-5 py-5 hover:text-white hover:bg-black transition-colors"
                  >
                    <tab.icons className="text-lg" />
                    <p>{tab.label}</p>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-[3]">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
