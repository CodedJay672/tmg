"use client";

import { useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Carousel = ({ slides }: { slides: string[] }) => {
  const prevRef = useRef<HTMLDivElement | null>(null);
  const nextRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="relative">
      <Swiper
        pagination={{ dynamicBullets: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop
        className="w-full h-28 lg:h-40 rounded-xl"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <Image
              src={slide}
              alt="tmg"
              sizes="(min-width: 100vw)"
              fill
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        ref={prevRef}
        className="absolute top-0 left-0 z-10 group h-full flex-center hover:bg-dark-200/20 hover:shadow-2xs transition-all"
      >
        <ChevronLeftIcon
          size={44}
          className="text-dark-100/10 group-hover:text-dark-100/75 transition-all"
        />
      </div>
      <div
        ref={nextRef}
        className="absolute top-0 right-0 z-10 h-full group flex-center hover:bg-dark-200/20 hover:shadow-2xs"
      >
        <ChevronRightIcon
          size={40}
          className="text-dark-100/10 group-hover:text-dark-100/75 transition-all"
        />
      </div>
    </div>
  );
};

export default Carousel;
