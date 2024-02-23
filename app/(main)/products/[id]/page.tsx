import { Product as IProduct } from "@prisma/client";
import { redirect } from "next/navigation";
import Image from "next/image";

import ProductController from "@/components/shared/ProductController";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = await fetch(`http://localhost:3000/api/products/${id}`);
  const product: IProduct = await data.json();

  if (!product.id) {
    redirect("/");
  }

  return { title: product.name };
}

const page = async (url: any) => {
  const { id } = url.params;
  const data = await fetch(`http://localhost:3000/api/products/${id}`);
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
            <ProductController product={product} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
