"use client";

import Image from "next/image";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { IoArrowForwardOutline } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { SliderItem } from "@/components/shared/SliderItem";
import { slidesList } from "@/constants";

export const Slider = () => {
  return (
    <section className="max-w-[1545px] mx-auto h-[320px] md:h-[440px] relative">
      <Swiper
        modules={[Navigation, Scrollbar, A11y]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="flex h-full"
        slidesPerView={1.15}
        centeredSlides
        initialSlide={1}
        defaultValue={2}
        slideActiveClass="scale-100"
        slideNextClass="!scale-[0.97]"
        slidePrevClass="!scale-[0.97]"
        navigation={{
          nextEl: ".my-custom-next-button",
          prevEl: ".my-custom-prev-button",
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {slidesList.map((slide, index) => (
          <SwiperSlide
            key={index}
            style={{ backgroundColor: slide.color }}
            className="z-20 rounded-[38px] lg:pl-[74px] px-5 lg:pr-[34px] transition-all duration-700"
          >
            <SliderItem {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="my-custom-next-button w-[60px] h-[60px] bg-white absolute right-[58px] top-1/2 -translate-y-1/2 z-20 rounded-full justify-center items-center text-[22px] font-normal drop-shadow-xl shadow-black hidden xl:flex">
        <FaArrowRight />
      </div>
      <div className="my-custom-prev-button w-[60px] h-[60px] bg-white absolute left-[58px] top-1/2 -translate-y-1/2 z-20 rounded-full justify-center items-center text-[22px] font-normal drop-shadow-xl shadow-black hidden xl:flex">
        <FaArrowLeft />
      </div>
    </section>
  );
};
