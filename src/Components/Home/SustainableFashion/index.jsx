import React from 'react'
import { Link } from 'react-router-dom'
const img_URL = import.meta.env.VITE_IMG_URL
const Sustainable_Fashion = () => {
    
  return (
    <section className="s-banner-with-text banner-text-fashion flat-spacing-3 pt-4">
    <div className="container">
      <div className="row flex-wrap-reverse">
        <div className="col-md-5">
          <div className="content-banner type-left wow fadeInUp">
            <div className="box-title-banner">
              <h4>Sustainable Fashion</h4>
              <p className="text-md text-main">
              Sustainable fashion focuses on designing, producing, and consuming clothing in ways that are environmentally friendly and socially responsible. It aims to reduce waste and pollution, use resources efficiently, and promote ethical labor practices, ensuring style and sustainability go hand in hand for a better future.
              </p>
            </div>
            <div className="box-btn-banner">
              <Link to="/" className="tf-btn animate-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="image-banner">
            <div className="image image-2 hover-shine hover-img">
              <div className="shine-item img-style wow fadeInRight" data-wow-delay="0.1s">
                <img
                  src={`${img_URL}/banner/Sustainable-Fashion_1.png`}
                  data-src={`${img_URL}/banner/Sustainable-Fashion_1.jpg`}
                  alt=""
                  className="lazyload"
                />
              </div>
            </div>

            <div className="image image-1 hover-shine hover-img">
              <div className="shine-item img-style wow fadeInRight">
                <img
                  src={`${img_URL}/banner/Sustainable-Fashion_2.jpg`}
                  data-src={`${img_URL}/banner/Sustainable-Fashion_1.jpg`}
                  alt=""
                  className="lazyload"
                />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
  )
}

export default Sustainable_Fashion
