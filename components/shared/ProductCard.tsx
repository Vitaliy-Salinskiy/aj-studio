import { MdAddShoppingCart } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/interfaces";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="w-full sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-27px)] xl:w-[calc(100%/4-30px)] flex flex-col gap-[32px]">
      <div className="h-[282px] bg-own-lime rounded-3xl flex justify-center items-center">
        <Image src={product.imageUrl} alt="shoe-1" width={275} height={282} />
      </div>
      <div>
        <h3>{product.name}</h3>
        <p className="text-own-light-red text-[19px] flex gap-[6px] mt-[8px]">
          {product.price} <span className="line-through text-black">$300</span>
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
          <Button className="w-full mt-[15px] bg-own-gray rounded-full flex gap-[11px] text-own-dark-blue hover:bg-own-gray">
            <MdAddShoppingCart className="text-[#677585]" /> Add to cart
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
