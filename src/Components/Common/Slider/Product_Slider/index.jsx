import React, { useContext, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from 'react-router-dom';
import { Navigation } from "swiper/modules";
import QuickView_Modal from '../../Modal/QuickView';
import QuickADDTo_Cart from '../../Modal/QuickAddtoCart';
import CollectionContext from '../../../../Context/Collection';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useSweetAlert } from '../../../../Context/SweetAlert';
import AccountContext from '../../../../Context/Account';


const Product_Slider = (props) => {
    const {addto_WishList, WishListData} = useContext(CollectionContext);
    const {isLogin, Currency} = useContext(AccountContext)
    const {data, ListType} = props;
    const {showAlert} = useSweetAlert();
    const [activeImage, setActiveImage] = useState(null);
    const [activeColorIndex, setActiveColorIndex] = useState(null);
    
      const handleSwatchHover = (imgSrc, index) => {
        console.log(imgSrc, index);
        setActiveImage(imgSrc);
        setActiveColorIndex(index);
      };

  return (<>
      {data.length > 0 ? <Swiper
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          observer={true}
          breakpoints={{
          1024: { slidesPerView: 4 },
          768: { slidesPerView: 2 },
          360: { slidesPerView: 2 },
          }}
          navigation={{
          clickable: true,
          nextEl: '.nav-next-cls-header',
          prevEl: '.nav-prev-cls-header',
          }}
          >
        <div className="d-none d-xl-flex swiper-button-next nav-swiper nav-next-cls-header"></div>
        <div  className="d-none d-xl-flex swiper-button-prev nav-swiper nav-prev-cls-header"></div>
    {data.map((product, index) => {
  // Step 1: Parse sizes
  let parsedSizes = [];
  let parsedColor = [];

  try {
    parsedSizes = product.Size ? JSON.parse(product.Size) : [];
    parsedColor =  product.Color ? JSON.parse(product.Color) : [];
    console.log(parsedColor);
    
  } catch (err) {
    console.error("Invalid Size JSON", err);
  }

  return (
    <SwiperSlide key={index}>
      <div className="card-product card-product-size style-2">
        <div className="card-product-wrapper">
          <Link to={`/product/${product?.CategoryName.replace(/ /g, "-")}/${product?.ProductId}/${product?.PVDId} `} className="product-img">
            <img
              className="img-product lazyload"
              src={activeColorIndex === index ? `${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${activeImage}` : `${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${product?.ProductImage}`}
              data-src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${product?.ProductImage}`}
              alt="image-product"
            />
            <img
              className="img-hover lazyload"
              src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${product?.ProductImage}`}
              data-src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${product?.ProductImage}`}
              alt="image-product"
            />
          </Link>
          <div className="on-sale-wrap">
            <span className="on-sale-item">
              {((product.UsualPrice - product?.ProductPrice) / product.UsualPrice * 100).toFixed(0)}% Off
            </span>
          </div>

          <ul className="list-product-btn">
            <li>
              {/* <a href="#quickAdd" data-bs-toggle="modal" className="hover-tooltip box-icon">
                <span className="icon icon-cart2"></span>
                <span className="tooltip">Quick Add</span>
              </a> */}
              <QuickADDTo_Cart productdata={product}/>
            </li>
            <li className="wishlist">
              <a onClick={()=>isLogin ? addto_WishList(
                {
                    ProductId: product?.ProductId,
                    PVDId: product?.PVDId,
                    ListType:ListType,
                }
              ) : 
            showAlert("Not logged in yet.",  'Login required to access this feature.')

            
            } className="hover-tooltip box-icon">
                {/* <span className="icon icon-heart2 text-dark"></span> */}
                {WishListData?.some(item => item?.PVDId === product?.PVDId)
                  ? <FaHeart color='red' size={25} />
                    : <CiHeart size={36} />
                  }
                <span className="tooltip">Add to Wishlist</span>

              </a>
            </li>
            <li>
              <QuickView_Modal productIdx={product} />
            </li>
            {/* <li className="compare">
              <a href="#compare" data-bs-toggle="modal" className="hover-tooltip box-icon">
                <span className="icon icon-compare"></span>
                <span className="tooltip">Add to Compare</span>
              </a>
            </li> */}
          </ul>

          {/* ✅ Size Box */}
          <ul className="size-box">
            {parsedSizes.length > 0 ? (
              parsedSizes.map((s, i) => (
                <li key={i} className="size-item text-xs text-white">
                  {s.Name.replace("Size:", "").toUpperCase()}
                </li>
              ))
            ) : (
              <li className="size-item text-xs text-white">No Size</li>
            )}
          </ul>
        </div>

        <div className="card-product-info">
          <a href="product-detail.html" className="name-product link fw-medium text-md">
            {product.ProductName}
          </a>
          <p className="price-wrap fw-medium">
            <span className="price-new">{Currency?.Symbol}{product.ProductPrice} </span>
            <span className="price-old">{Currency?.Symbol}{product.UsualPrice}</span>
          </p>
          <ul className="list-color-product">
          {parsedColor.length > 0 ? (
              parsedColor.map((s, i) => (
                <li key={i} className="list-color-item hover-tooltip tooltip-bot color-swatch border border-1 border-secondary"
                   onMouseOver={() => handleSwatchHover(s.imagepath, index)}
                    onClick={() => handleSwatchHover(s.imagepath, index)}
                >
                <span className="tooltip color-filter">{s.Name.replace("Color:", "").toUpperCase()}</span>
                <span className="swatch-value" style={{background:s.Name.replace("Color:", "")}}></span>
                </li>
              ))
            ) : (
              <li className="size-item text-xs text-white">No Size</li>
            )}
          </ul>
        </div>
      </div>
    </SwiperSlide>
  );
})}

  </Swiper> : null}
  </>
  )
}

export default Product_Slider
