import React, { useEffect, useState } from 'react'
import Custom_Slider from '../../Common/Slider/Customslider'
import { SwiperSlide } from "swiper/react";
import { Common_Service } from '../../../Services/Common/CommonService';
const img_URL = import.meta.env.VITE_IMG_URL
const Brand_Slider = () => {
  const {UseFetchProductService} = Common_Service();
  const [BrandList, setBrandList] = useState([])
  const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
  const FetchBranlist = async ()=>{
    const OBJ ={
      ClientId:ClientID,
      Type:'BindBrandImage'
    }
    const result = await UseFetchProductService(OBJ);
    //console.log(result);
    
    if(Array.isArray(result)){
      setBrandList(result);
    }else{
      setBrandList([]);
    }
    
  }

  useEffect(()=>{
    FetchBranlist()
  }, [])

  return (
    <div className='container Brand-slider'>
      <div className='sw-brand'>
      <Custom_Slider shownavigation={false} cardNo={6} sliderName={'Brand'}>
            {BrandList.map((itm, idx)=> 
            <SwiperSlide>
                <div className="brand-item wow fadeInLeft border-1" key={idx}>
                  <img src={`${import.meta.env.VITE_PUBLIC_CART_IMAGE}App${itm?.BrandURL}`} alt="brand"/>
                </div>
                </SwiperSlide>
            )}
      </Custom_Slider>
      
      </div>
      </div>
  )
}

export default Brand_Slider
