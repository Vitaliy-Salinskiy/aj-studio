import { AdminTable } from "@/components/shared/Tables/AdminTable";

import { ProductColumn } from "@/components/shared/Tables/product/ProductColumn";
import { ExtendedProduct } from "@/interfaces";

const Page = async () => {
  const ordersData = await fetch("http://localhost:3000/api/products", {
    cache: "no-cache",
  });
  const orders = await ordersData.json();

  const data = orders.map((product: ExtendedProduct) => {
    return {
      id: product.id,
      name: product.name,
      email: product.User.email,
      price: product.price,
    };
  });

  return (
    <div>
      <AdminTable
        columns={ProductColumn}
        data={data}
        filter={{ placeholder: "Filter names...", field: "name" }}
      />
    </div>
  );
};

export default Page;
