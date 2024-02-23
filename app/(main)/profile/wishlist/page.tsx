import { getServerSession } from "next-auth";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { ExtendedWishlist } from "@/interfaces";
import ProductCard from "@/components/shared/ProductCard";

const page = async () => {
  const session = await getServerSession(options);
  const data = await fetch(
    `http:/localhost:3000/api/wishlist/${session?.user.id}`,
    { cache: "no-cache" }
  );

  const items: ExtendedWishlist[] = await data.json();

  return (
    <section className="flex gap-6 lg:gap-10 flex-wrap">
      {items.length > 0 ? (
        items.map((item) => (
          <ProductCard product={item.product} key={item.id} isShrink={true} />
        ))
      ) : (
        <p>No items in wishlist</p>
      )}
    </section>
  );
};

export default page;
