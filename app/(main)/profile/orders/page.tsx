import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import Order from "@/components/shared/Order";
import { ExtendedOrder } from "@/interfaces";

const page = async () => {
  const session = await getServerSession(options);

  const data = await fetch(
    `http://localhost:3000/api/orders/${session?.user.id}`
  );

  const orders: ExtendedOrder[] = await data.json();

  console.log(orders);

  return (
    <section>
      <div className="flex flex-col gap-4">
        {orders && orders.length > 0 ? (
          orders.map((order) => <Order key={order.id} order={order} />)
        ) : (
          <p className="text-3xl text-center min-h-80 flex items-center justify-center">
            Orders are empty
          </p>
        )}
      </div>
    </section>
  );
};

export default page;
