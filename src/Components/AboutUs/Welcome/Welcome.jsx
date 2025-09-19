import React from 'react'
import { AboutPageSection } from "../../../Data/Aboutus/AboutPageData"; // Adjust the path as needed


const Welcome_Container = () => {
   
  return (
    <section className="pb-0 pt-8 bg-light-brown">
      <div className="container">
        <div className="flat-title-2 d-xl-flex justify-content-xl-between">
          <div className="box-title">
            <p className="display-lg-2 fw-medium">{AboutPageSection.title}</p>
            <p className="text-xl">{AboutPageSection.subtitle}</p>
          </div>
          <div className="box-text">
            <p
              className="text-md"
              dangerouslySetInnerHTML={{ __html: AboutPageSection.description }}
            />
          </div>
        </div>
        <div className="image radius-16 overflow-hidden banner-about">
          <img
            src={AboutPageSection.image}
            alt={AboutPageSection.imageAlt}
            className="w-100 h-100 object-fit-cover lazyload"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}

export default Welcome_Container
