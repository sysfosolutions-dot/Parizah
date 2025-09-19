import React, { useContext, useEffect,useState  } from 'react'
import ShoppingCartContext from '../../Context/Shopping_Cart';
import {normalizeSizeColor} from '../../Utils/Opration'
import AccountContext from '../../Context/Account';
import { useNavigate } from 'react-router-dom';
import ProductContext from '../../Context/Products';
import Product_Slider from '../Common/Slider/Product_Slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { testimonialData } from '../../Data/Aboutus/AboutPageData';
import Breadcrumb_Container from '../Common/Breadcrumb/Index';
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import Page_NotFound from '../../Pages/404';
import { useSweetAlert } from '../../Context/SweetAlert';

const Cart_Container = () => {
    const navigate = useNavigate();
    const {showAlert} = useSweetAlert();
    const  {isCartOpen, setIsCartOpen, DeleteProduct, FetchCartData, cartItems, Update_productCart} = useContext(ShoppingCartContext);
    const {Currency, isLogin, LoginDrawerOpen, setLoginDrawerOpen } = useContext(AccountContext);
    const {NewArrivals} = useContext(ProductContext);
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

        const unauthorized = async()=>{
            const confirm = await  showAlert("Not logged in yet.",  'Login required to access this feature.');
            if(confirm?.isConfirmed){
            setLoginDrawerOpen(!LoginDrawerOpen)
            }
        }


    
        useEffect(()=>{
            FetchCustomerView()
        }, [])





  return (
    <div>
        {cartItems.length > 0 ? <>
        <Breadcrumb_Container/>
        <div className="flat-spacing-24">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-4 col-sm-8">
                        <div className="tf-cart-head text-center">
                            <p className="text-xl-3 title text-dark-4">Shop above <span className="fw-medium">{Currency?.Symbol}10,000</span> and enjoy 
                                <span className="fw-medium"> Free Shipping</span>
                            </p>
                            <div className="progress-sold tf-progress-ship">
                                <div className="value" style={{width: `${Math.min((cartItems[0]?.GrandTotal / 10000) * 100, 100)}%`}} data-progress="30">
                                    <i className="icon icon-car"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flat-spacing-2 pt-0 mt_15">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="tf-page-cart-main">
                            <form className="form-cart">
                                <table className="table-page-cart">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (<>
                                            {cartItems.map((itm, idx) => <tr className="tf-cart-item file-delete" key={idx}>
                                            <td className="tf-cart-item_product">
                                                <a href="product-detail.html" className="img-box">
                                                    <img src={import.meta.env.VITE_PUBLIC_CART_IMG+itm?.ProductImage} alt="img-product"/>
                                                </a>
                                                <div className="cart-info">
                                                    <a href="product-detail.html"
                                                        className="name text-md link fw-medium">{itm?.ProductName}</a>
                                                    <div className="variants">{normalizeSizeColor(itm?.ProductVariation)}</div>
                                                    <span className="remove-cart cursor-pointer remove" onClick={()=> DeleteProduct(itm?.CartId)}>Remove</span>
                                                </div>
                                            </td>
                                            <td className="tf-cart-item_price text-center" data-cart-title="Price">
                                                <span className="cart-price price-on-sale text-md fw-medium">{Currency?.Symbol}{itm?.ProductPrice}</span>
                                            </td>
                                            <td className="tf-cart-item_quantity" data-cart-title="Quantity">
                                                <div className="wg-quantity">
                                                    <span className="btn-quantity btn-decrease" onClick={()=> itm?.Quantity  > 1 ?  Update_productCart({CartId: itm?.CartId, Qty:itm?.Quantity - 1}) : null}>-</span>
                                                    <input className="quantity-product" type="text" name="number" value={itm?.Quantity}/>
                                                    <span className="btn-quantity btn-increase" onClick={()=> Update_productCart({CartId: itm?.CartId, Qty:itm?.Quantity + 1})}>+</span>
                                                </div>
                                            </td>
                                            <td className="tf-cart-item_total text-center" data-cart-title="Total">
                                                <div className="cart-total total-price text-md fw-medium">{Currency?.Symbol}{itm?.Total}</div>
                                            </td>
                                        </tr>)}
                                        </>) : (<>
                                        
                                            <tr>
                                                <td colSpan={4} classNameName='text-center'>
                                                Cart is Empty
                                                </td>
                                            </tr>
                                        </>)}
                                    </tbody>
                                </table>
                                {/* <div className="check-gift">
                                    <input type="checkbox" className="tf-check" id="checkGift"/>
                                    <label for="checkGift" className="label text-dark-4">Add gift wrap. Only <span
                                            className="fw-medium">$10.00.</span> (You can choose or not)</label>
                                </div>
                                <div className="box-ip-discount">
                                    <div className="discount-ip">
                                        <input className="value-discount" type="text" placeholder="Discount code"/>
                                        <button type="button" className="tf-btn radius-6 btn-out-line-dark-2">Apply</button>
                                    </div>
                                </div> */}
                                <div className="cart-note">
                                    <label for="note" className="text-md fw-medium">Special instructions for seller</label>
                                    <textarea id="note"></textarea>
                                </div>
                            </form>
                            <div className="fl-iconbox wow fadeInUp">
                                <div dir="ltr" className="swiper tf-swiper sw-auto" data-swiper='{
                                    "slidesPerView": 1,
                                    "spaceBetween": 12,
                                    "speed": 800,
                                    "preventInteractionOnTransition": false, 
                                    "touchStartPreventDefault": false,
                                    "slidesPerGroup": 1,
                                    "pagination": { "el": ".sw-pagination-iconbox", "clickable": true },
                                    "breakpoints": {
                                        "575": { "slidesPerView": 2, "spaceBetween": 12, "slidesPerGroup": 2}, 
                                        "768": { "slidesPerView": 3, "spaceBetween": 24, "slidesPerGroup": 3},
                                        "1200": { "slidesPerView": "auto", "spaceBetween": 24}
                                    }
                                }'>
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div
                                                className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                                                <div className="box-icon">
                                                    <i className="icon icon-shipping"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title text-uppercase">Free Shipping</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div
                                                className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                                                <div className="box-icon">
                                                    <i className="icon icon-gift"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title text-uppercase">Gift Package</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div
                                                className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                                                <div className="box-icon">
                                                    <i className="icon icon-return"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title text-uppercase">Ease Returns</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div
                                                className="tf-icon-box justify-content-center justify-content-sm-start style-3">
                                                <div className="box-icon">
                                                    <i className="icon icon-support"></i>
                                                </div>
                                                <div className="content">
                                                    <div className="title text-uppercase text-nowrap">ONE YEAR WARRANTY
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div
                                    className="d-flex d-xl-none sw-dot-default sw-pagination-iconbox justify-content-center">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="tf-page-cart-sidebar">
                            {/* <form className="cart-box shipping-cart-box">
                                <div className="text-lg title fw-medium">Shipping estimates</div>
                                <fieldset className="field">
                                    <label for="country" className="text-sm">Country</label>
                                    <input type="text" id="country" placeholder="United State"/>
                                </fieldset>
                                <fieldset className="field">
                                    <label for="state" className="text-sm">State/Province</label>
                                    <input type="text" id="state" placeholder="State/Province"/>
                                </fieldset>
                                <fieldset className="field">
                                    <label for="code" className="text-sm">Zipcode</label>
                                    <input type="text" id="code" placeholder="41000"/>
                                </fieldset>
                                <button type="button" className="tf-btn btn-dark2 animate-btn w-100">Estimate</button>
                            </form> */}
                            <form className="cart-box checkout-cart-box">
                                <div className="cart-head">
                                    <div className="total-discount text-xl fw-medium">
                                        <span>Total:</span>
                                        <span className="total">{Currency?.Symbol}{cartItems[0]?.GrandTotal}</span>
                                    </div>
                                    <p className="text-sm text-dark-4">Taxes and shipping calculated at checkout</p>
                                </div>
                                <div className="check-agree">
                                    <input type="checkbox" className="tf-check" id="check-agree"/>
                                    <label for="check-agree" className="label text-dark-4">I agree with <a
                                            href="term-and-condition.html"
                                            className="text-dark-4 fw-medium text-underline link">term and
                                            conditions</a></label>
                                </div>
                                <div className="checkout-btn" onClick={()=> {isLogin ?  navigate('/checkout') : unauthorized()}}>
                                    <button type="button" className="tf-btn btn-dark2 animate-btn w-100">Checkout</button>
                                </div>
                                <div className="cart-imgtrust">
                                    <p className="text-center text-sm text-dark-1">We accept</p>
                                    <div className="cart-list-social">
                                        <div className="payment-card">
                                            <img src={`${import.meta.env.BASE_URL}assets/Images/payment/Visa.png`} alt=""/>
                                        </div>
                                        <div className="payment-card">
                                            <img src={`${import.meta.env.BASE_URL}assets/Images/payment/DinersClub.png`} alt=""/>
                                        </div>
                                        <div className="payment-card">
                                            <img src={`${import.meta.env.BASE_URL}assets/Images/payment/Mastercard.png`} alt=""/>
                                        </div>
                                        <div className="payment-card">
                                            <img src={`${import.meta.env.BASE_URL}assets/Images/payment/Stripe.png`} alt=""/>
                                        </div>

                                    </div>
                                </div>
                            </form>
                            {/* <div className="cart-box testimonial-cart-box">
                                <div dir="ltr" className="swiper tf-swiper" data-swiper='{
                                    "slidesPerView": 1,
                                    "spaceBetween": 12,
                                    "speed": 800,
                                    "preventInteractionOnTransition": false, 
                                    "touchStartPreventDefault": false,
                                    "pagination": { "el": ".sw-pagination-tes", "clickable": true },
                                    "navigation": {
                                        "clickable": true,
                                        "nextEl": ".nav-next-tes",
                                        "prevEl": ".nav-prev-tes"
                                    }
                                    }'>
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="box-testimonial-main">
                                                <span className="quote icon-quote5"></span>
                                                <div className="content">
                                                    <div className="list-star-default">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>

                                                    <p className="text-review text-md text-main">"Stylish, comfortable, and
                                                        perfect for any occasion! My new favorite fashion destination."
                                                    </p>
                                                    <div className="box-author">
                                                        <div className="img">
                                                            <img src="images/avatar/avt-1.png" alt="author"/>
                                                        </div>
                                                        <span className="name text-sm fw-medium">Vineta P.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="box-testimonial-main">
                                                <span className="quote icon-quote5"></span>
                                                <div className="content">
                                                    <div className="list-star-default">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>

                                                    <p className="text-review text-md text-main">"Trendy, versatile, and
                                                        fits perfectly! My go-to place for stylish outfits."</p>
                                                    <div className="box-author">
                                                        <div className="img">
                                                            <img src="images/avatar/blog-author-3.jpg" alt="author"/>
                                                        </div>
                                                        <span className="name text-sm fw-medium">Themesflat</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="box-testimonial-main">
                                                <span className="quote icon-quote5"></span>
                                                <div className="content">
                                                    <div className="list-star-default">
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                        <i className="icon-star"></i>
                                                    </div>

                                                    <p className="text-review text-md text-main">"Chic, affordable, and
                                                        always on point! I’m obsessed with their collections!"</p>
                                                    <div className="box-author">
                                                        <div className="img">
                                                            <img src="images/avatar/blog-author-2.jpg" alt="author"/>
                                                        </div>
                                                        <span className="name text-sm fw-medium">Henry P.</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box-nav-swiper">
                                        <div className="swiper-button-prev nav-swiper nav-prev-tes"></div>
                                        <div className="swiper-button-next nav-swiper nav-next-tes"></div>
                                    </div>
                                </div>
                            </div> */}
                            <div>
                                <div>
                                    <Swiper
                                        modules={[Pagination]}
                                        spaceBetween={24}
                                        speed={800}
                                        pagination={{ clickable: true }}
                                        breakpoints={{
                                              576: { slidesPerView: 1 },
                                              768: { slidesPerView: 1 },
                                              992: { slidesPerView: 1 },
                                        }}
                                        className='cart-box testimonial-cart-box'
                                          >
                                            {ReviewList.map((item, index) => (
                                              <SwiperSlide key={index}>
                                                {/* <div className="box-testimonial-quote text-center px-3 ">
                                                  <div className="list-star-default justify-content-center mb-3">
                                                    {[...Array(item.stars)].map((_, i) => (
                                                      <i key={i} className="icon-star text-green"></i>
                                                    ))}
                                                  </div>
                                                  <p className="text-xl-2 lh-xl-32">"{item.quote}"</p>
                                                  <div className="box-author mt-4">
                                                    <div className="avt">
                                                      <img src={item.image} alt={item.author} />
                                                    </div>
                                                    <p className="text-md lh-xl-26 fw-medium mt-2">
                                                      {item.author}
                                                    </p>
                                                  </div>
                                                </div> */}
                                                   <div class="swiper-slide">
                                            <div class="box-testimonial-main">
                                                <span class="quote icon-quote5"></span>
                                                <div class="content">
                                                    <div class="list-star-default">
                                                       {[...Array(5)].map((_, i) => (
                                             <i key={i} className={i < item?.Rating ? "icon-star" : "icon-star text-muted"}></i>
                                            ))}
                                                    </div>

                                                    <p class="text-review text-md text-main">{item?.Comment}</p>
                                                    <div class="box-author">
                                                        <div class="img">
                                                            <img src={`${import.meta.env.BASE_URL}assets/Images/avatar/user_icon.png`} alt="author"/>
                                                        </div>
                                                        <span class="name text-sm fw-medium">{item?.Name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                              </SwiperSlide>
                                            ))}
                                          </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="flat-spacing pt-0 px-0 px-md-5">
            <div class="container">
                <div class="flat-title wow fadeInUp mb_5">
                    <h4 class="title">You May Also Like</h4>
                </div>
            </div>
            <Product_Slider data={NewArrivals} ListType={'HomePage'}/>
        </section>
        
        </> : 
        <div className='py-3'>
            <Page_NotFound/>
        </div>
        }
    </div>
    
  )
}

export default Cart_Container
