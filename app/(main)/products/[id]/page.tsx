import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";

import ProductController from "@/components/shared/ProductController";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { ExtendedWishlist } from "@/interfaces";
import { Product as IProduct } from "@prisma/client";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  );
  const product: IProduct = await data.json();

  if (!product.id) {
    redirect("/");
  }

  return { title: `Studio | ${product.name}` };
}

const page = async (url: any) => {
  const { id } = url.params;

  const session = await getServerSession(options);

  const wishlistData = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/wishlist/${session?.user.id}`
  );
  const wishlistItems: ExtendedWishlist[] = await wishlistData.json();

  const isWished = wishlistItems.some(
    (item: ExtendedWishlist) => item.productId === id
  );

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`
  );

  const product: IProduct = await data.json();

  if (!product.id) {
    redirect("/");
  }

  return (
    <section>
      <div className="appContainer py-5 lg:py-10">
        <div className="flex flex-col gap-5">
          <div className="min-h-[400px] max-h-[400px] w-full flex-1 relative rounded-xl overflow-hidden">
            <Image
              src={product.imageUrl}
              className="bg-slate-500/30"
              fill
              alt="product"
              objectFit="contain"
            />
          </div>
          <div className="lg:flex-1 flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">{product.name}</h1>
              <p className="text-base ">{product.description}</p>
            </div>
            <ProductController isWished={isWished} product={product} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
