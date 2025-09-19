import React from 'react'
import { whyChooseData } from "../../../Data/Aboutus/AboutPageData"; // Adjust the path as needed


const WhyChoose_Container = () => {
   
  return (
    <section className="flat-spacing-3">
    <div className="container">
      <div className="flat-title-2 text-center">
        <p className="display-md-2 fw-medium">{whyChooseData.title}</p>
        <p className="text-md text-main">
          {whyChooseData.description}
        </p>
      </div>

      <div className="row">
        <div className="col-xl-7 col-md-6">
          <ul className="list-esd d-md-flex flex-md-column justify-content-md-center h-100">
            {whyChooseData.features.map((item, index) => (
              <li className="item" key={index}>
                <h6>{item.title}</h6>
                <p className="text-md text-main bgBackground">{item.content}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-xl-5 col-md-6">
          <div className="image radius-16 overflow-hidden w-100 h-100">
            <img
              src={whyChooseData.image}
              alt="About Vineta"
              className="lazyload w-100 h-100 object-fit-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default WhyChoose_Container
