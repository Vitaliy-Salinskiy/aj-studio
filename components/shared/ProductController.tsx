"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "@prisma/client";
import { useSession } from "next-auth/react";

import { MdOutlineBookmarkAdd } from "react-icons/md";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { OrderItemDto } from "@/interfaces";
import { getDiscountPrice } from "@/utils";

interface ProductControllerProps {
  product: IProduct;
}

const ProductController = ({ product }: ProductControllerProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]);
  const [discountPrice, setDiscountPrice] = useState<string>();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setDiscountPrice(
      getDiscountPrice(product.price, product.discount, quantity)
    );
  }, [quantity, product.discount, product.price]);

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
    const dto: OrderItemDto = {
      productId: product.id,
      color: selectedColor,
      quantity,
    };

    const res = await fetch(`/api/cart/item/${session?.user.id}`, {
      method: "POST",
      body: JSON.stringify({ dto }),
    });

    if (res.ok) {
      toast({
        title: "Added to cart",
        description: "Product added to cart successfully",
      });
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      router.refresh();
    } else {
      toast({
        title: "Added to cart",
        description: "Something went wrong",
      });
    }
  };

  const handleWishlist = async (): Promise<void> => {
    const data = {
      userId: session?.user.id,
      productId: product.id,
    };

    const res = await fetch("/api/wishlist", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (res.ok) {
      toast({
        title: "Added to wishlist",
        description: "Product added to wishlist successfully",
      });
    } else {
      toast({
        title: "Added to wishlist",
        description: "Product already in wishlist",
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
        Price:{" "}
        {product.discount > 0 && (
          <span className="text-own-light-red">
            {!discountPrice
              ? getDiscountPrice(product.price, product.discount)
              : discountPrice}
            $
          </span>
        )}{" "}
        <span className={`${product.discount > 0 ? "line-through" : ""}`}>
          {product.price * quantity}$
        </span>
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

          <Button
            className="ml-auto border h-12 w-12 rounded-lg border-black hover:bg-black transition-colors hover:text-red-500 flex justify-center items-center cursor-pointer p-0 bg-transparent text-black"
            onClick={() => handleWishlist()}
          >
            <MdOutlineBookmarkAdd className="text-xl transition-colors duration-100" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductController;
