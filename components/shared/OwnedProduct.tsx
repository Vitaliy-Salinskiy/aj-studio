"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Product as IProduct } from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { discountRate } from "@/constants";
import { useOrderStore } from "@/store/orderStore";
import { getDiscountPrice } from "@/utils";
import { useToast } from "@/components/ui/use-toast";

interface OwnedProductProps {
  product: IProduct;
}

const OwnedProduct = ({ product }: OwnedProductProps) => {
  const { isDisabled, setIsDisabled } = useOrderStore();
  const { toast } = useToast();

  const router = useRouter();

  const handleRemove = async () => {
    setIsDisabled();
    const res = await fetch(`/api/products/${product.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
      toast({
        title: "Operation success",
        description: "Product removed successfully",
      });
    } else {
      toast({
        title: "Operation failed",
        description: "Product remove failed",
      });
    }

    setIsDisabled();
  };

  const handleDiscountChange = async (e: string) => {
    setIsDisabled();
    const res = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      body: JSON.stringify({ dto: { discount: parseInt(e) } }),
    });

    if (res.ok) {
      router.refresh();
      toast({
        title: "Operation success",
        description: "Product removed successfully",
      });
    } else {
      toast({
        title: "Operation failed",
        description: "Product remove failed",
      });
    }

    setIsDisabled();
  };

  return (
    <div className={`flex flex-col border-gray-300 border-b pb-5`}>
      <div className="flex justify-between items-center">
        <div className="flex gap-4 flex-[3]">
          <Image
            src={product.imageUrl}
            alt={product.id}
            width={120}
            height={120}
            className="bg-[#FAFAFB]"
          />
          <div className="flex flex-col">
            <h3 className="font-bold text-base">{product.name}</h3>
            <div className="flex items-center gap-1.5">
              Price: <span className="font-semibold">{product.price}$</span>
            </div>
            <div className="flex items-center gap-1.5">
              Discount:{" "}
              <span className="font-semibold">{product.discount}%</span>
            </div>
            {product.discount > 0 && (
              <div className="flex items-center gap-1.5">
                Price with Discount:{" "}
                <span className="font-semibold text-own-light-red">
                  {getDiscountPrice(product.price, product.discount)}$
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              Sales: <span className="font-semibold">{product.sales}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-2">
            <Select
              onValueChange={handleDiscountChange}
              defaultValue={`${product.discount}`}
              disabled={isDisabled}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Discount" />
              </SelectTrigger>
              <SelectContent>
                {discountRate.map((rate) => (
                  <SelectItem value={`${rate}`}>{rate}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="border border-black bg-black hover:bg-transparent hover:text-black"
              onClick={() => router.push(`/products/${product.id}`)}
            >
              View Product
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              className="border border-black bg-black hover:bg-transparent hover:text-black"
              onClick={() => router.push(`/products/update/${product.id}`)}
            >
              Edit Product
            </Button>
            <Button
              className="border border-red-500 hover:bg-transparent hover:text-red-500"
              onClick={async () => await handleRemove()}
              disabled={isDisabled}
            >
              Remove from cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedProduct;
