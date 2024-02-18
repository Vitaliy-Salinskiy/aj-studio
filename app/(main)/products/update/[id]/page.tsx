import { Metadata } from "next";

import ProductForm from "@/components/shared/ProductForm";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
  title: "Edit Product Page",
};

const page = async (url: any) => {
  const { id } = url.params;
  const session = await getServerSession();

  const data = await fetch(`http://localhost:3000/api/products/${id}`, {
    cache: "no-cache",
  });

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
