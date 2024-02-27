import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "@/app/api/auth/[...nextauth]/options";
import ProfileForm from "@/components/shared/ProfileForm";

const page = async () => {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/sign-in");
  }

  const userData = await fetch(
    `http://localhost:3000/api/users/${session?.user.id}`
  );

  const user = await userData.json();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <section>
      <ProfileForm profileData={user} />
    </section>
  );
};

export default page;
