import { getAllProducts } from "@/lib/requests";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <div>
      <h1>
        {products
          ? products.map((product) => (
              <div key={product.id}>
                <h1>{product.title}</h1>
              </div>
            ))
          : "No products found"}
      </h1>
    </div>
  );
}
