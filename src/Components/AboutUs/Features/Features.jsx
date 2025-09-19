import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { styleCuratedData } from "../../../Data/Aboutus/AboutPageData"; // Adjust the path as needed

const Feature_Container = () => {
   
  return (
    <section className="flat-spacing-3 pt-0">
    <div className="container">
      <div className="flat-title-2 d-xl-flex justify-content-xl-between">
        <div className="box-title">
          <p className="display-md-2 fw-medium">Style Curated Just for You</p>
          <p className="text-xl">Style Curated Just for You</p>
        </div>
        <div className="box-text">
          <p className="text-md">
            Our skilled stylists have thoughtfully assembled seasonal outfits that are both <br className="d-none d-xl-block" />
            trendy and timeless. With a variety of looks, they’re here to inspire your next <br className="d-none d-xl-block" />
            fashion-forward ensemble.
          </p>
        </div>
      </div>

      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        speed={800}
        pagination={{ clickable: true, el: ".sw-pagination-iconbox" }}
        breakpoints={{
          575: { slidesPerView: 2, spaceBetween: 12 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {styleCuratedData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="tf-icon-box style-border">
              <div className="box-icon">
                <i className={`icon ${item.icon}`}></i>
              </div>
              <div className="content">
                <h6>{item.title}</h6>
                <p className="text-sm text-main text-line-clamp-4">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center"></div>
    </div>
  </section>
  )
}

export default Feature_Container
