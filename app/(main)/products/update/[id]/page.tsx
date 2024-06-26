import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import ProductForm from "@/components/shared/ProductForm";

export const metadata: Metadata = {
  title: "Studio | Edit Product",
};

const page = async (url: any) => {
  const { id } = url.params;
  const session = await getServerSession();

  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`);

  const product = await data.json();

  if (product.error) {
    redirect("/");
  }

  return (
    <section>
      <div className="appContainer">
        <div className="pt-5 pb-10 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <ProductForm product={product} />
        </div>
      </div>
    </section>
  );
};

export default page;
