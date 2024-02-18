import Image from "next/image";

import { IoArrowForwardOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

interface SliderItemProps {
  title: string;
  boldTitle: string;
  description: string;
  image: string;
  color: string;
}

export const SliderItem = ({
  title,
  boldTitle,
  description,
  image,
  color,
}: SliderItemProps) => {
  return (
    <>
      <div className="flex h-full w-full items-center justify-center lg:justify-between">
        <div className="mt-[44px] flex-1 text-center lg:text-left flex flex-col justify-center items-center lg:items-stretch lg:justify-stretch">
          <h2 className="max-w-[233px] sm:max-w-[315px] md:max-w-[440px] text-[28px] sm:text-[38px] md:text-[52px] leading-[125%] text-black">
            {title} <span className="font-bold">{boldTitle}</span>
          </h2>
          <p className="text-base md:text-[20px] leading-[30px] text-own-dark-blue mt-[5px] md:mt-[9px] hidden md:flex">
            {description}
          </p>
          <Button className="w-[60%] lg:w-fit rounded-full flex gap-2 md:gap-[13px] text-base md:text-[20px] leading-[120%] bg-black text-own-gold hover:bg-black mt-[27px] pl-[16px] md:pl-[25px] pr-[14px] md:pr-[23px] py-[12px] md:py-[17px] h-auto">
            Discover
            <IoArrowForwardOutline />
          </Button>
        </div>
        <div className="hidden lg:flex w-[45%] h-[calc(100%-40px)] relative mt-auto">
          <Image
            src={image}
            alt={title + description + image}
            fill
            className="z-20"
          />
          <p
            className="absolute right-0 top-1/2 -translate-y-1/2 font-bold text-[354px] z-10 hidden 2xl:block tracking-tight"
            style={{ color: color }}
          >
            Hot
          </p>
        </div>
      </div>
    </>
  );
};
