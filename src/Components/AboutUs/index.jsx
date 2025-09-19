import React from 'react'
import Welcome_Container from './Welcome/Welcome'
import WhyChoose_Container  from './WhyChoose/WhyChoose'
import Feature_Container from './Features/Features'
import Testimonial_Container from './Testimonial/Testimonial'
import Breadcrumb_Container from '../Common/Breadcrumb/Index'

const AboutUs_Container = () => {
  return (
    <div>
      <Breadcrumb_Container/>
      <Welcome_Container/>
      <WhyChoose_Container/>
      <Feature_Container/> 
      <Testimonial_Container/>
    </div>
  )
}

export default AboutUs_Container
