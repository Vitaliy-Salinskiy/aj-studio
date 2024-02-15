"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { MdAddShoppingCart } from "react-icons/md";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = () => {
  const { data: session } = useSession();

  const [activeColor, setActiveColor] = useState();

  const router = useRouter();

  const handleAddToCart = () => {
    if (session === null) {
      router.push("/api/auth/signin?callbackUrl=/");
    }
  };

  return (
    <div className="w-full sm:w-[calc(100%/2-24px)] lg:w-[calc(100%/3-24px)] xl:w-[calc(100%/4-40px)] flex flex-col gap-[32px]">
      <div className="h-[282px] bg-own-lime rounded-3xl flex justify-center items-center">
        <Image src="/shoe-1.png" alt="shoe-1" width={275} height={282} />
      </div>
      <div>
        <h3>Nike air</h3>
        <p className="text-own-light-red text-[19px] flex gap-[6px] mt-[8px]">
          $200 <span className="line-through text-black">$300</span>
        </p>
        <div className="flex justify-between items-center mt-[13px]">
          <Badge className="text-own-light-blue bg-own-opacity-blue hover:bg-own-opacity-blue text-[10px]">
            Colors
          </Badge>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div
                key={i}
                className="w-[11px] h-[11px] rounded-full bg-black border-double border-white border-2"
              />
            ))}
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="w-full mt-[15px] bg-own-gray rounded-full flex gap-[11px] text-own-dark-blue hover:bg-own-gray"
        >
          <MdAddShoppingCart className="text-[#677585]" /> Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
