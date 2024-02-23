import Link from "next/link";

import { BiSolidAddToQueue } from "react-icons/bi";

import ProductCard from "@/components/shared/ProductCard";
import { Slider } from "@/components/shared/Slider";
import { getServerSession } from "next-auth";
import { Product as IProduct } from "@prisma/client";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/products", {
    cache: "no-cache",
  });

  const session = await getServerSession();
  const products: IProduct[] = await data.json();

  const totalSales = products.reduce((acc, product) => acc + product.sales, 0);

  console.log(totalSales);

  const averageSales = totalSales / products.length;

  return (
    <>
      <Slider />
      <section className="flex flex-col gap-5 appContainer py-10 xl:py-16">
        <div className="flex justify-between">
          <h2 className="text-3xl md:text-5xl font-semibold">Products</h2>

          {session?.user.email && (
            <Link
              href="/products/create"
              className="flex items-center justify-center gap-2 text-xl bg-black text-white px-4 rounded-xl border border-black hover:text-black hover:bg-transparent transition-colors"
            >
              <BiSolidAddToQueue className="transition-colors" />
              Add product
            </Link>
          )}
        </div>
        <div className="flex gap-6 lg:gap-10 flex-wrap">
          {products.length >= 1 ? (
            products.map((product, index: number) => (
              <ProductCard
                key={index}
                product={product}
                averageSales={averageSales}
              />
            ))
          ) : (
            <h3 className="text-xl font-bold">No products found</h3>
          )}
        </div>
      </section>
    </>
  );
}
