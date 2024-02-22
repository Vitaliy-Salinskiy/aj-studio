"use client";

import Image from "next/image";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SliderItem } from "@/components/shared/SliderItem";
import { slidesList } from "@/constants";
import { useState } from "react";

export const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [swiper, setSwiper] = useState<any>();

  return (
    <section className="max-w-[1875px] mx-auto h-[320px] md:h-[440px] relative">
      <Swiper
        slidesPerView={1.15}
        centeredSlides
        initialSlide={1}
        onSwiper={setSwiper}
        className="flex h-full relative"
        onSlideChange={(swiper) => {
          setActiveSlide(swiper.activeIndex);
          swiper.activeIndex === 1;
        }}
        slideActiveClass="scale-100"
        slideNextClass="!scale-[0.97]"
        slidePrevClass="!scale-[0.97]"
        modules={[Navigation, Scrollbar]}
        navigation={{
          nextEl: ".my-custom-next-button",
          prevEl: ".my-custom-prev-button",
        }}
        scrollbar={{ draggable: false }}
      >
        {slidesList.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{ backgroundColor: slide.bgColor }}
            className="z-20 rounded-[38px] lg:pl-[74px] px-5 lg:pr-[34px] transition-all duration-700"
          >
            <SliderItem {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-custom-next-button w-[60px] h-[60px] bg-white absolute right-[4%] top-1/2 -translate-y-1/2 z-20 rounded-full justify-center items-center text-[22px] font-normal drop-shadow-xl shadow-black hidden xl:flex cursor-pointer">
        <FaArrowRight />
      </div>
      <div className="my-custom-prev-button w-[60px] h-[60px] bg-white absolute left-[4%] top-1/2 -translate-y-1/2 z-20 rounded-full justify-center items-center text-[22px] font-normal drop-shadow-xl shadow-black hidden xl:flex cursor-pointer">
        <FaArrowLeft />
      </div>

      <div className="my-custom-pagination absolute bottom-12 z-10 left-1/2 -translate-x-1/2 gap-4 hidden xl:flex">
        {slidesList.map((_, i) => (
          <div
            className={`relative border-[3.5px] border-white h-20 w-20 select-none ${
              activeSlide === i ? "bg-[#FDC20B]" : "bg-[#FCD7B5]"
            } rounded-lg transition-all duration-300 cursor-pointer hover:scale-105 active:scale-90`}
            key={i}
            onClick={() => {
              setActiveSlide(i);
              swiper.slideTo(i);
            }}
          >
            <Image src="/shoe-2.png" fill alt="slider shoe" />
          </div>
        ))}
      </div>
    </section>
  );
};
