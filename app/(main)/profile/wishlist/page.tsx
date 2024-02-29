import { getServerSession } from "next-auth";
import { Product as IProduct } from "@prisma/client";
import type { Metadata } from "next";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedWishlist } from "@/interfaces";
import ProductCard from "@/components/shared/ProductCard";
import { cardColors } from "@/constants";

export const metadata: Metadata = {
  title: "Studio | Wishlist Page",
  description: "Wishlist Page",
};

const page = async () => {
  const session = await getServerSession(options);

  const productsData = await fetch("http://localhost:3000/api/products");
  const wishlistData = await fetch(
    `http:/localhost:3000/api/wishlist/${session?.user.id}`
  );

  const products: IProduct[] = await productsData.json();
  const wishlistItems: ExtendedWishlist[] = await wishlistData.json();

  const totalSales = products.reduce((acc, product) => acc + product.sales, 0);
  const averageSales = (totalSales / products.length) * 1.25;

  return (
    <section className="flex gap-6 lg:gap-10 flex-wrap">
      {wishlistItems.length > 0 ? (
        wishlistItems.map((item, index) => (
          <ProductCard
            product={item.product}
            key={item.id}
            isShrink={true}
            averageSales={averageSales}
            color={cardColors[index % cardColors.length]}
          />
        ))
      ) : (
        <p className="w-full text-3xl text-center min-h-80 flex items-center justify-center">
          No items in wishlist
        </p>
      )}
    </section>
  );
};

export default page;
