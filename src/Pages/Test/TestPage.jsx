import React, { useState } from 'react';
const TestPage = () => {
const product = {
  name: "Printed T-shirt",
  defaultImage: `${import.meta.env.BASE_URL}assets/Images/products/fashion/product-26.jpg`,
  price: 120,
  colors: [
    {
      name: "White",
      img: `${import.meta.env.BASE_URL}assets/Images/products/fashion/product-26.jpg`,
      bgClass: "bg-white",
    },
    {
      name: "Grey",
      img: `${import.meta.env.BASE_URL}assets/Images/products/fashion/women-grey-1.jpg`,
      bgClass: "bg-grey-4",
    },
    {
      name: "Black",
      img: `${import.meta.env.BASE_URL}assets/Images/products/fashion/women-black-6.jpg`,
      bgClass: "bg-dark",
    },
  ],
};





const [activeImage, setActiveImage] = useState(product.defaultImage);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const handleSwatchHover = (imgSrc, index) => {
    setActiveImage(imgSrc);
    setActiveColorIndex(index);
  };

  return (
     <section class="flat-spacing-3">
      <div class="container">
            <div className='col-3'>
    <div className='hover-sw-nav wrap-pos-nav sw-over-product'>
    <div className='swiper tf-swiper wrap-sw-over'>
        <div className="swiper-wrapper">
            <div className='swiper-slide'>
                  <div className="card-product style-2 card-product-size">
      <div className="card-product-wrapper">
          <a href="product-detail.html" class="product-img">
                    <img class="img-product lazyload"
                            data-src={activeImage}
                            src={activeImage} alt="image-product"/>
                    <img class="img-hover lazyload"
                            data-src={activeImage}
                            src={activeImage} alt="image-product"/>
            </a>
        {/* Swatches */}
    
      </div>

      <div className="card-product-info">
        <a href="product-detail.html" className="name-product link fw-medium text-md">
          {product.name}
        </a>
        <p className="price-wrap fw-medium">
          <span className="price-new">${product.price}</span>
        </p>
            <ul className="list-color-product">
          {product.colors.map((color, index) => (
            <li
              key={index}
              className={`list-color-item color-swatch hover-tooltip tooltip-bot ${activeColorIndex === index ? 'active' : ''}`}
              onMouseOver={() => handleSwatchHover(color.img, index)}
              onClick={() => handleSwatchHover(color.img, index)}
            >
              <span className="tooltip color-filter">{color.name}</span>
              <span className={`swatch-value ${color.bgClass}`}></span>
              <img src={color.img} alt={color.name} style={{ display: 'none' }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
            </div>
        </div>
    </div>
    </div> 
            </div>
    </div>
    </section>
  );
};

export default TestPage
