import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import banner1 from "../assets/images/banner1.jpg"; // Adjust the path as necessary
import banner2 from "../assets/images/banner2.jpeg";
import banner3 from "../assets/images/banner3.png";
import bannervid from "../assets/bannervid.mp4";

const SliderCard = () => {
  return (
    <div className="relative mt-4 mb-5 mx-auto w-full lg:w-4/5 xl:w-3/4">
      {" "}
      {/* Adjusts for responsiveness */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        spaceBetween={30}
        slidesPerView={1}
        className="swiper progress-slide-carousel"
        autoplay={{
          delay: 7000, // Set delay to 7000ms to match video length
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-56 md:h-72 lg:h-96 w-full flex justify-center items-center">
            <video
              src={bannervid}
              autoPlay
              loop
              muted // Mute the video for autoplay without sound issues
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-56 md:h-72 lg:h-96 w-full flex justify-center items-center">
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={banner1}
              alt="Slide 2"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-indigo-50 rounded-2xl h-56 md:h-72 lg:h-96 w-full flex justify-center items-center">
            <img
              className="object-cover w-full h-full rounded-2xl"
              src={banner3}
              alt="Slide 3"
            />
          </div>
        </SwiperSlide>
        <div className="swiper-pagination !bottom-2 !top-auto !w-80 right-0 mx-auto bg-gray-30"></div>
      </Swiper>
    </div>
  );
};

export default SliderCard;
