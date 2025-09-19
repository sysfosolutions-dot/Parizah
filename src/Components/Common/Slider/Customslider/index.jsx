import React from 'react'
import { Swiper,  } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Pagination } from 'swiper/modules';
// import {Top_Picks} from '../../../../Data/Home/HomePageData'
const Custom_Slider = ({ children, shownavigation = false, cardNo, mobileCard, sliderName }) => {

    
  return (
    <>
      <Swiper
      className={sliderName === "IconBox" ? `Icon_Box` :sliderName === "Review"  ?  `Review_Slider` : ``}
      spaceBetween={20}
      slidesPerView={2}
      modules={[Pagination]}
      pagination={{ clickable: true }}
      observer={true}
    breakpoints={{
      1024: { slidesPerView: cardNo },
      768: { slidesPerView: 2 },
      360: { slidesPerView: mobileCard},
    }}
    navigation={{
        clickable: true,
        nextEl: '.nav-next-cls-header',
        prevEl: '.nav-prev-cls-header',
      }}
  >
      {shownavigation && <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-cls-header"></div>}
      {shownavigation &&  <div  className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-cls-header"></div>}
        {children}
  </Swiper>

    </>
  )
}

export default Custom_Slider

