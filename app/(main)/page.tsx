import ProductCard from "@/components/shared/ProductCard";
import { Slider } from "@/components/shared/Slider";
import { IProduct } from "@/interfaces";

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    cache: "no-cache",
  });

  const products: IProduct[] = await data.json();

  console.log(products);

  return (
    <>
      <Slider />
      <section className="flex flex-col gap-5 appContainer py-10 xl:py-16">
        <h2 className="text-3xl md:text-5xl font-semibold">Products</h2>
        <div className="flex gap-6 lg:gap-10 flex-wrap">
          {products.length >= 1 ? (
            products.map((product, index: number) => (
              <ProductCard key={index} product={product} />
            ))
          ) : (
            <h3 className="text-xl font-bold">No products found</h3>
          )}
        </div>
      </section>
    </>
  );
}
