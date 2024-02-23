import { MdAddShoppingCart } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product as IProduct } from "@prisma/client";

interface ProductCardProps {
  product: IProduct;
  isShrink?: boolean;
  averageSales?: number;
}

const ProductCard = ({
  product,
  isShrink = false,
  averageSales,
}: ProductCardProps) => {
  let tags = [];
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

  if (
    new Date().getTime() - new Date(product.createdAt).getTime() <
    oneDayInMilliseconds
  ) {
    tags.push("NEW");
  }

  if (averageSales && averageSales + 2 > product.sales) {
    tags.push("HOT");
  }

  return (
    <div
      className={`w-full sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-27px)] ${
        isShrink ? "" : "xl:w-[calc(100%/4-30px)]"
      } flex flex-col gap-[32px]`}
    >
      <div className="h-[282px] bg-own-lime rounded-3xl flex justify-center items-center relative overflow-hidden">
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
                      tag === "HOT" ? "bg-[#E76300]" : "bg-[#0077FF]"
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
        <p className="text-own-light-red text-[19px] flex gap-[6px] mt-[8px]">
          {product.price}$ <span className="line-through text-black">$300</span>
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
          {/* <Link href={`https://buy.stripe.com/test_28o03d3zX7U49UYbII`}> */}
          <Button className="text-[20px] font-normal w-full h-auto py-3 mt-[15px] bg-own-gray rounded-full flex gap-[8px] text-own-dark-blue hover:bg-own-gray">
            <MdAddShoppingCart className="text-[#677585] text-[18px]" /> Add to
            cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
