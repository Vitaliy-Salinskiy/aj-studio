import ProductCard from "@/components/shared/ProductCard";
import { Slider } from "@/components/shared/Slider";
import { getAllProducts } from "@/lib/requests";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Slider />
      <section className="flex justify-between gap-6 xl:gap-10 flex-wrap appContainer py-10 xl:py-16">
        {[1, 2, 3, 4].map((_, i) => (
          <ProductCard key={i} />
        ))}
      </section>
    </>
  );
}
