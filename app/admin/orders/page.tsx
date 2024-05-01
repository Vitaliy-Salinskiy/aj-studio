import { AdminTable } from "@/components/shared/Tables/AdminTable";

import { OrderColumn } from "@/components/shared/Tables/order/OrdersColumn";
import { ExtendedOrder } from "@/interfaces";
import { getDiscountPrice } from "@/utils";

const Page = async () => {
  const ordersData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`
  );
  const orders = await ordersData.json();

  const data = orders.map((order: ExtendedOrder) => {
    return {
      id: order.id,
      status: order.status,
      email: order.user.email,
      price: order.orderItems.reduce(
        (acc, item) =>
          acc +
          Number(
            getDiscountPrice(
              item.product.price,
              item.product.discount,
              item.quantity
            )
          ),
        0
      ),
    };
  });

  return (
    <div>
      <AdminTable columns={OrderColumn} data={data} />
    </div>
  );
};

export default Page;
