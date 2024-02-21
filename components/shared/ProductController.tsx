"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import { MdOutlineBookmarkAdd } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IProduct, OrderItemDto } from "@/interfaces";

interface ProductControllerProps {
  product: IProduct;
}

const ProductController = ({ product }: ProductControllerProps) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [quantity, setQuantity] = useState<number>(1);

  const handleQuantity = (type: "inc" | "dec") => {
    if (type === "inc") {
      setQuantity((prev) => prev + 1);
    } else {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = async (): Promise<void> => {
    console.log("Add to cart");
    const dto: OrderItemDto = {
      productId: product.id,
      userId: session?.user.id!,
      color: selectedColor,
      quantity,
    };

    const res = await fetch("/api/orders/item", {
      method: "POST",
      body: JSON.stringify({ dto }),
    });

    if (res.ok) {
      toast({
        title: "Added to cart",
        description: "Product added to cart successfully",
      });
    } else {
      toast({
        title: "Added to cart",
        description: "Something went wrong",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold">Colors</h3>
        <div className="flex gap-1.5">
          {product.colors.map((color, i) => (
            <div
              style={{ backgroundColor: color }}
              key={i}
              onClick={() => setSelectedColor(color)}
              className={`w-[24px] h-[24px] rounded-full border-double ${
                color === selectedColor ? "border-white border-4" : ""
              } cursor-pointer`}
            />
          ))}
        </div>
      </div>
      <h2 className="text-2xl font-semibold">
        Price: <span>{product.price * quantity}$</span>
      </h2>
      <div className="flex flex-col sm:flex-row gap-5 w-full mt-auto">
        <div className="flex text-xl border border-black rounded-lg w-[120px] h-[50px]">
          <div
            className="cursor-pointer h-full flex-1 w-1/3  flex justify-center items-center select-none"
            onClick={() => handleQuantity("dec")}
          >
            -
          </div>
          <div className="h-full flex-2 w-1/3 flex justify-center items-center">
            {quantity}
          </div>
          <div
            className="cursor-pointer h-full w-1/3 flex justify-center items-center select-none"
            onClick={() => handleQuantity("inc")}
          >
            +
          </div>
        </div>

        <div className="flex w-full gap-3 md:gap-5">
          <div className="w-[calc(100%-56px)]">
            <Button
              className="text-white bg-black hover:bg-black w-full h-[50px] disabled:opacity-90"
              disabled={!session?.user}
              onClick={() => handleAddToCart()}
            >
              Add to Cart
            </Button>
          </div>

          <div className="ml-auto border h-12 w-12 rounded-lg border-black hover:bg-black transition-colors hover:text-red-500 flex justify-center items-center cursor-pointer">
            <MdOutlineBookmarkAdd className="text-xl transition-colors duration-100" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductController;
