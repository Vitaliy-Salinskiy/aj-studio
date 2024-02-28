"use client";

import Image from "next/image";
import Link from "next/link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { OrderStatus } from "@prisma/client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtendedOrder } from "@/interfaces";
import { formatDate } from "@/utils";
import { statusColors } from "@/constants";

interface OrderProps {
  order: ExtendedOrder;
}

const Order = ({ order }: OrderProps) => {
  const lastStatus = order.status[order.status.length - 1];

  return (
    <div className="flex flex-col gap-5 p-6 border border-gray-300 relative">
      <div className="flex justify-between">
        <div className="flex items-center justify-between gap-4">
          <h3 className="font-medium">
            Order ID:{" "}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger>
                  <CopyToClipboard text={order.orderNumber}>
                    <span className="font-normal text-blue-600 hover:underline cursor-pointer transition-all">
                      {order.orderNumber}
                    </span>
                  </CopyToClipboard>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
          </h3>
          <hr className="w-px h-full bg-gray-300" />
          <h3 className="font-medium">
            Order Date:{" "}
            <span className="font-normal">{formatDate(order.createdAt)}</span>
          </h3>
        </div>
        <p
          style={{ background: statusColors[OrderStatus[lastStatus]] }}
          className="text-white text-xs py-2 px-5 rounded-md  font-bold md:static absolute left-1/2 -translate-x-1/2 md:translate-x-0 -top-4"
        >
          {OrderStatus[lastStatus]}
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {order &&
          order.orderItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-3 px-4 bg-gray-200"
            >
              <div className="flex items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    objectFit="cover"
                  />
                  <h3 className="font-normal overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {item.product.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <h4 className="text-[14px] hidden sm:block">
                  qty: {item.quantity}
                </h4>
                <h3 className="font-medium text-base">
                  {item.product.price * item.quantity}$
                </h3>
              </div>
            </div>
          ))}
      </div>
      <div>
        <Link
          className="bg-black py-2 px-5 text-white transition-colors hover:bg-transparent border border-black hover:text-black rounded-md text-sm"
          href={`/orders/${order.id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Order;
