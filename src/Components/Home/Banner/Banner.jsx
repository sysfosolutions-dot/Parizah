import React, { useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import ProductContext from '../../../Context/Products';

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade"; // 👈 Required for fade effect

const Banner_Container = () => {
  const { bannerData } = useContext(ProductContext);
  const img_URL = import.meta.env.VITE_PUBLIC_Banner;

  return (
    <div className="container m-0 p-0"> 
      <div className="tf-slideshow slider-fashion-2">
        <Swiper
          modules={[Pagination, Autoplay, EffectFade]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          effect="fade"        // 👈 Fade transition
          speed={1000}         // 👈 Transition duration (1s)
          autoplay={{
            delay: 2000,       // 3 sec autoplay
            disableOnInteraction: false,
          }}
          // pagination={{ clickable: true }}
          Pagination={true}
          className="w-100"
        >
          {bannerData.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="card border-0">
                <div className="position-relative">
                  <a href={item.link} className="d-block">
                    <img
                      src={img_URL + item.BannerImage}
                      alt={item.Title}
                      className="img-fluid w-100"
                      style={{ height: "500px", objectFit: "cover" }}
                      loading="lazy"
                    />
                  </a>
                  <div className="card-img-overlay d-flex align-items-end justify-content-center">
                    <Link
                      to={`/collection/${item.Title}?cate=${item?.CategoryId}`}
                      className="btn btn-light px-4 py-2 shadow"
                    >
                      {item.Title} <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Banner_Container;
