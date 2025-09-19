


import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const img_URL = import.meta.env.VITE_IMG_URL;

const Thumbnail_Slider = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [dataList, setDataList] = useState([])
  const {product_Details} = props


  // Create a ref for each image (array)
  const imageRefs = useRef([]);
  const handleMouseMove = (e, index) => {
    const img = imageRefs.current[index];
    if (!img) return;

    const { left, top, width, height } = img.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    img.style.transformOrigin = `${x * 100}% ${y * 100}%`;
    img.style.transform = 'scale(2.5)';
  };

  const handleMouseLeave = (index) => {
    const img = imageRefs.current[index];
    if (!img) return;

    img.style.transformOrigin = 'center center';
    img.style.transform = 'scale(1)';
  };

  return (
    <div className="col-md-6">
      <div className="tf-product-media-wrap sticky-top">
        <div className="product-thumbs-slider">

          {/* Thumbnails */}
          <Swiper
            onSwiper={setThumbsSwiper}
            direction="vertical"
            slidesPerView={4}
            spaceBetween={10}
            modules={[Navigation, Thumbs]}
            breakpoints={{
              0: {
                direction: 'horizontal',
                slidesPerView: 3,
              },
              768: {
                direction: 'horizontal',
                slidesPerView: 4,
              },
              1024: {
                direction: 'vertical',
                slidesPerView: 4,
              },
            }}
            className="tf-product-media-thumbs other-image-zoom"
          >
            {product_Details.map((item, i) => (
              <SwiperSlide key={i}>
                <img
                  src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${item?.ImageValue}`}
                  alt={`Product ${i}`}
                />
              </SwiperSlide>
            ))}
          </Swiper> 

          {/* Main gallery */}
          <div className="flat-wrap-media-product">
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              navigation={{
                nextEl: '.thumbs-next',
                prevEl: '.thumbs-prev',
              }}
              modules={[Navigation, Thumbs]}
              className="tf-product-media-main"
            >
              {product_Details.map((item, index) => (
                <SwiperSlide key={index}>
                  <Link to="#" className="item">
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid #eee',
                      }}
                    >
                      <img
                        ref={(el) => (imageRefs.current[index] = el)}
                        src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${item?.ImageValue}`}
                        alt={`Product ${item?.ImageValue}`}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={() => handleMouseLeave(index)}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation arrows */}
            <div className="swiper-button-next nav-swiper thumbs-next"></div>
            <div className="swiper-button-prev nav-swiper thumbs-prev"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Thumbnail_Slider;
