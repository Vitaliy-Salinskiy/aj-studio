import { Metadata } from "next";

import ProductForm from "@/components/shared/ProductForm";

export const metadata: Metadata = {
  title: "Create Product Page",
};

const page = () => {
  return (
    <section>
      <div className="appContainer">
        <div className="pt-5 pb-10 flex flex-col gap-2">
          <h1 className="text-own-dark-blue text-3xl font-bold">
            Create Product
          </h1>
          <ProductForm />
        </div>
      </div>
    </section>
  );
};

export default page;
