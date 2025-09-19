import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { Navigation } from 'swiper/modules';

import "swiper/css";
import 'swiper/css/navigation';
import "swiper/css/pagination";
import { testimonialData } from "../../../Data/Aboutus/AboutPageData";
const Testimonial_Container = () => {
   
  return (
    <section className="flat-spacing-15 pt-0">
    <div className="container">
      <Swiper
      
        modules={[Pagination]}
        spaceBetween={24}
        speed={800}
        pagination={{ clickable: true }}
        breakpoints={{
          576: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          992: { slidesPerView: 2 },
        }}
      >
        {testimonialData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="box-testimonial-quote text-center px-3 ">
              <div className="list-star-default justify-content-center mb-3">
                {[...Array(item.stars)].map((_, i) => (
                  <i key={i} className="icon-star text-green"></i>
                ))}
              </div>
              <p className="text-xl-2 lh-xl-32">"{item.quote}"</p>
              <div className="box-author mt-4">
                <div className="avt">
                  <img src={item.image} alt={item.author} />
                </div>
                <p className="text-md lh-xl-26 fw-medium mt-2">
                  {item.author}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
  )
}

export default Testimonial_Container
