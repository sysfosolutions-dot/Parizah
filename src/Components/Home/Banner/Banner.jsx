import React, { useContext, useEffect, useState } from 'react'
import {Banner_SliderData} from '../../../Data/Home/HomePageData'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Product_Service } from '../../../Services/Product/ProductService';
import ProductContext from '../../../Context/Products';

const Banner_Container = () => {
    const {Custom_api_call} = Product_Service();
    const {bannerData} = useContext(ProductContext);
    const img_URL = import.meta.env.VITE_PUBLIC_Banner;

  return (
    <div  className="tf-slideshow slider-fashion-2">
     <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        observer:true
        slidesPerView={3}
        breakpoints={{
            768: { slidesPerView: 3 },
            360: { slidesPerView: 1.5 },
          }}
        loop={true}
        >
        {bannerData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="wg-cls style-abs asp-1 hover-img fs-cls">
                      <a href={item.link} className="image img-style d-block">
                                  <img src={img_URL+item.BannerImage} alt={item.Title} loading="lazy" className='h-auto' />
                        </a>
                        <div className="content">
                              <Link  to={`/collection/${item.Title}?cate=${item?.CategoryId}`} className="tf-btn btn-white hover-icon-2 hover-dark">
                                    {item.Title}
                                    <i className="icon-arrow-right icon"></i>
                                </Link>
                            </div>
                                        </div>
                                </SwiperSlide>
                                ))}
                              
                                                    
                                        </Swiper>
                                        </div>
  )
}

export default Banner_Container
