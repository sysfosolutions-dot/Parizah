import React from 'react'
import { Link } from 'react-router-dom'
const img_URL = import.meta.env.VITE_IMG_URL
const Effortless_Chic = () => {
  return (
    <div className="s-banner-colection flat-spacing-6">
    <div className="container">
        <div className="banner-content tf-grid-layout tf-col-2 hover-overlay-2">
            <div className="image img-hv-overlay">
                <img src={`${img_URL}/banner/fashion-2.jpg`} data-src={`${img_URL}/banner/fashion-2.jpg`}
                    alt="images/banner/fashion-2.jpg" className="lazyload"/>
            </div>
            <div className="box-content ">
                <div className="box-title-banner wow fadeInUp">
                    <p className="title display-md fw-medium">
                        Effortless Chic
                    </p>
                    <p className="sub text-lg">
                        Achieve effortless style with pieces made for <br/> everyday wear
                    </p>
                </div>
                <div className="box-btn-banner wow fadeInUp">
                    <Link to="/" className="tf-btn animate-btn">
                        Explore Now
                    </Link>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default Effortless_Chic
