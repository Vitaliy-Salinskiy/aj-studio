import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Product as IProduct } from "@prisma/client";

import { options } from "@/app/api/auth/[...nextauth]/options";
import OwnedProduct from "@/components/shared/OwnedProduct";

export const metadata: Metadata = {
  title: "Studio | Your products",
  description: "Your products page",
};

const page = async () => {
  const session = await getServerSession(options);

  const data = await fetch(
    `http://localhost:3000/api/users/${session?.user.id}/products`
  );

  const products: IProduct[] = await data.json();

  return (
    <section>
      <div className="flex flex-col gap-2">
        {products.map((product: IProduct) => (
          <OwnedProduct key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default page;
