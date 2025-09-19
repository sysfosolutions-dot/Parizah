import React, { useEffect, useState } from 'react'
import Banner_Container from '../../Components/Home/Banner/Banner'
import LatestDrop_Container from '../../Components/Home/LatestDrop'
import Sustainable_Fashion from './SustainableFashion'
import Limited_Deal from './LimitedDeal'
import {Top_Picks} from '../../Data/Home/HomePageData'
import Effortless_Chic from './EffortlessChic/Effortless_Chic'
import Brand_Slider from './Brands'
import Customer_Review from './Review'
import Icon_Box from './IconBox'
import { Common_Service } from '../../Services/Common/CommonService'



const Home_Container = () => {
  return (
    <div>
      <Banner_Container/>
      <LatestDrop_Container Top_Picks={Top_Picks} sliderPage={'HomePage'}/>
      <Sustainable_Fashion/>
      <Limited_Deal LimitedDeal={Top_Picks} sliderPage={'HomePage'}/>
      <Effortless_Chic/>
      <Brand_Slider/>
      <Customer_Review/>
      <Icon_Box/>
    </div>
  )
}

export default Home_Container
