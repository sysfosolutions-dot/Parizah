import React, { useEffect, useState } from 'react'
import Custom_Slider from '../../Common/Slider/Customslider'
import { SwiperSlide } from 'swiper/react'
import { testimonialCard } from '../../../Data/Home/HomePageData'
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication'

const Customer_Review = () => {
    const [ReviewList, setReviewList] = useState([])
    const {user_common_api} = UserAuthentication();
    const FetchCustomerView = async()=>{
        const OBJ ={
            Para:JSON.stringify({ActionMode:'TopRewievs'}),
            procName:'GetProductReview'
        }
        const result =  await  user_common_api(OBJ);
        if(Array.isArray(result)){
            setReviewList(result);
        }else{
            setReviewList([]);
        }
    }

    useEffect(()=>{
        FetchCustomerView()
    }, [])


  return (
    <>
         {ReviewList.length > 0 ?<section className="flat-spacing-3 px-4">
    <div className="container">
        <div className="flat-title">
            <h4 className="title">Customer Reviews</h4>
        </div>
    </div>
    <Custom_Slider  cardNo={2.5} shownavigation = {false} mobileCard={1} sliderName={'Review'}>
            {ReviewList.map((itm, idx)=> 
            <SwiperSlide>
                 <div className="wg-testimonial style-row hover-img" key={itm}>
                                <div className="content">
                                    <div className="content-top">
                                        <div className="box-author">
                                            <p className="name-author text-sm fw-medium">{itm?.Name}</p>
                                            <div className="box-verified text-main">
                                                <i className="icon-verifi"></i>
                                                <p className="text-xs fst-italic">
                                                    Verified Buyer
                                                </p>
                                            </div>
                                        </div>
                                        <div className="list-star-default">
                                           {[...Array(5)].map((_, i) => (
                                             <i key={i} className={i < itm?.Rating ? "icon-star" : "icon-star text-muted"}></i>
                                            ))}
                                        </div>
                                        <p className="text-review text-sm text-main">
                                           {itm?.Comment}
                                        </p>
                                    </div>
                                    <span className="br-line d-block"></span>
                                    <div className="box-avt">
                                        <div className="avatar">
                                            <img src={import.meta.env.VITE_PUBLIC_PRODUCT_IMG +itm?.DefaultImage} alt="author"/>
                                        </div>
                                        <div className="box-price">
                                            <p className="name-item text-xs text-truncate">
                                                Item purchased: <a href="product-detail.html"
                                                    className="fw-medium text-sm link">{itm?.ProductName}</a>
                                            </p>
                                            <p className="price text-md fw-medium">
                                                ₹{itm?.ProductPrice}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="image img-style">
                                    <img src={import.meta.env.VITE_PUBLIC_PRODUCT_IMG +itm?.DefaultImage} data-src="images/testimonial/tes-fs1.jpg"
                                        alt="testimonial" className="lazyload"/>
                                </div>
                            </div>
                </SwiperSlide>
            )}
      </Custom_Slider>

    </section> : null}
    
    </>
  )
}

export default Customer_Review
