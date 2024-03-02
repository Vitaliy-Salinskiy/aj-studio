import { User } from "@prisma/client";

import { AdminTable } from "@/components/shared/Tables/AdminTable";
import { UserColumn } from "@/components/shared/Tables/user/UserColumn";

const Page = async () => {
  const usersData = await fetch("http://localhost:3000/api/users");
  const users = await usersData.json();

  const data = users.map((user: User) => {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  });

  return (
    <div>
      <AdminTable columns={UserColumn} data={data} />
    </div>
  );
};

export default Page;
