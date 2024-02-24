import { MdAddShoppingCart } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product as IProduct } from "@prisma/client";
import { getDiscountPrice } from "@/utils";

interface ProductCardProps {
  product: IProduct;
  isShrink?: boolean;
  averageSales?: number;
  color: string;
  url: any;
}

const ProductCard = async ({
  product,
  isShrink = false,
  averageSales,
  color,
  url,
}: ProductCardProps) => {
  let tags = [];
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (
    new Date().getTime() - new Date(product.createdAt).getTime() <
    oneDayInMilliseconds
  ) {
    tags.push("NEW");
  }

  if (averageSales && Math.floor(averageSales) < product.sales) {
    tags.push("HOT");
  }

  return (
    <div
      className={`w-full sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-27px)] ${
        isShrink ? "" : "xl:w-[calc(100%/4-30px)]"
      } flex flex-col gap-[32px]`}
    >
      <div
        className={`h-[282px] rounded-3xl flex justify-center items-center relative overflow-hidden`}
        style={{ backgroundColor: color }}
      >
        {product.discount > 0 && (
          <div
            className={`uppercase w-[64px] h-[31px] absolute bg-[#53A35F] top-0 right-0 text-white text-center flex justify-center pl-1.5 items-center rounded-es-[40px] z-[2] text-[10px] font-bold`}
          >
            -{product.discount}%
          </div>
        )}
        <Image src={product.imageUrl} alt="shoe-1" width={275} height={282} />
        <div className="absolute left-0 top-0 flex text-[#FFFEC8] text-[10px] font-bold">
          {tags.length > 0 &&
            tags.map((tag, i) => {
              if (i === 0) {
                return (
                  <div
                    className={`uppercase w-[59px] h-[31px]  ${
                      tag === "NEW" ? "bg-[#E76300]" : "bg-[#0077FF]"
                    } text-white text-center flex justify-start pl-4 items-center rounded-ee-[40px] z-[2]`}
                  >
                    {tag}
                  </div>
                );
              }

              if (i === 1) {
                return (
                  <div
                    className={`uppercase w-[74px] h-[31px] ${
                      tag === "HOT" ? "bg-[#0077FF]" : "bg-[#E76300]"
                    } text-white text-center flex justify-end pr-5 items-center rounded-ee-[26px] z-[1] -translate-x-[27px]`}
                  >
                    {tag}
                  </div>
                );
              }
            })}
        </div>
      </div>
      <div>
        <h3>{product.name}</h3>
        <p className="text-black text-[19px] flex gap-[6px] mt-[8px]">
          {product.discount > 0 && (
            <span className="text-own-light-red">
              {getDiscountPrice(product.price, product.discount)}$
            </span>
          )}
          <span className={`${product.discount > 0 ? "line-through" : ""}`}>
            {product.price}$
          </span>
        </p>
        <div className="flex justify-between items-center mt-[13px]">
          <Badge className="text-own-light-blue bg-own-opacity-blue hover:bg-own-opacity-blue text-[10px]">
            Colors
          </Badge>
          <div className="flex gap-2">
            {product.colors.map((color, i) => (
              <div
                style={{ backgroundColor: color }}
                key={i}
                className="w-[12px] h-[12px] rounded-full border-double border-white border-2"
              />
            ))}
          </div>
        </div>
        <Link href={`/products/${product.id}`}>
          <Button
            className={`text-[20px] w-full font-normal h-auto py-3 bg-own-gray rounded-full mt-[15px] flex gap-[8px] text-own-dark-blue hover:bg-own-gray`}
          >
            <MdAddShoppingCart className="text-[#677585] text-[18px]" />
            Add to cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
