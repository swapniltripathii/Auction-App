import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules"; 
import "swiper/css";
import "swiper/css/pagination";

const SliderCard = () => {
  return (
    <div className="w-full relative mt-24"> {/* Margin to create space below the navbar */}
      <Swiper
        modules={[Pagination, Autoplay]} 
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        spaceBetween={30}
        slidesPerView={1}
        className="swiper progress-slide-carousel"
        autoplay={{ delay: 3000, disableOnInteraction: false }} 
      >
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">
              Slide 1
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">
              Slide 2
            </span>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-96 flex justify-center items-center">
            <span className="text-3xl font-semibold text-indigo-600">
              Slide 3
            </span>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-100"></div>
      </Swiper>
    </div>
  );
};

export default SliderCard;
