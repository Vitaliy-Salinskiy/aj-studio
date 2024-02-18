import Image from "next/image";

import { MdOutlineBookmarkAdd } from "react-icons/md";

import { IProduct } from "@/interfaces";
import { Button } from "@/components/ui/button";

const page = async (url: any) => {
  const { id } = url.params;
  const data = await fetch(`http://localhost:3000/api/products/${id}`);
  const product: IProduct = await data.json();

  console.log(product);

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
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Colors</h3>
              <div className="flex gap-1.5">
                {product.colors.map((color, i) => (
                  <div
                    style={{ backgroundColor: color }}
                    key={i}
                    className="w-[24px] h-[24px] rounded-full border-double border-white border-4 cursor-pointer"
                  />
                ))}
              </div>
            </div>
            <h2 className="text-2xl font-semibold">
              Price: <span>{product.price}$</span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-5 w-full mt-auto">
              <div className="flex text-xl border border-black rounded-lg w-[120px] h-[50px]">
                <div className="cursor-pointer h-full flex-1 w-1/3  flex justify-center items-center select-none">
                  -
                </div>
                <div className="h-full flex-2 w-1/3 flex justify-center items-center">
                  1
                </div>
                <div className="cursor-pointer h-full w-1/3 flex justify-center items-center select-none">
                  +
                </div>
              </div>

              <div className="flex w-full gap-3 md:gap-5">
                <div className="w-[calc(100%-56px)]">
                  <Button className="text-white bg-black hover:bg-black w-full h-[50px]">
                    Add to Cart
                  </Button>
                </div>

                <div className="ml-auto border h-12 w-12 rounded-lg border-black hover:bg-black transition-colors hover:text-red-500 flex justify-center items-center cursor-pointer">
                  <MdOutlineBookmarkAdd className="text-xl transition-colors duration-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
