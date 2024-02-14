import { Slider } from "@/components/shared/Slider";
import { getAllProducts } from "@/lib/requests";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <>
      <Slider />
    </>
  );
}
