import React from 'react'
import {iconBoxData} from '../../../Data/Home/HomePageData'
import Custom_Slider from '../../Common/Slider/Customslider'
import { SwiperSlide } from 'swiper/react'
const Icon_Box = () => {
  //console.log(iconBoxData);

  
  return (
    <div className="line-top flat-spacing-7 mt-5">
    <div className="container">
        <div className="mw-1 m-auto">
            <Custom_Slider shownavigation={false} cardNo={4} mobileCard={1} sliderName={'IconBox'}>
            {iconBoxData.map((itm, idx)=> 
            <SwiperSlide>
                   <div className="tf-icon-box style-3 wow fadeInLeft">
                        <div className="box-icon"> <i className={`icon ${itm?.icon} text-dark`}></i></div>
                        <div className="content"><div className="title text-uppercase">{itm?.title}</div></div>
                    </div>
              </SwiperSlide>
            )}
            </Custom_Slider>
        </div>
    </div>
</div>
  )
}

export default Icon_Box
