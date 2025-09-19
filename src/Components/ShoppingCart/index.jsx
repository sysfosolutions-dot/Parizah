import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Box, Drawer, List } from "@mui/material";
import ShoppingCartContext from '../../Context/Shopping_Cart';
import {normalizeSizeColor} from '../../Utils/Opration'
import AccountContext from '../../Context/Account';
import { useToast } from '../../Context/Tostify';


const Shopping_Cart = () => {
  const  {isCartOpen, setIsCartOpen, DeleteProduct, FetchCartData, cartItems, Update_productCart} = useContext(ShoppingCartContext);
  const {Currency, isLogin} = useContext(AccountContext)
  const { showToast } = useToast();
  //console.log(cartItems);
  
   useEffect(()=>{
    FetchCartData()
   },[]) 


  return (
    <Drawer anchor="right" 
    slotProps={{
        paper: {
          className: 'popup-shopping-cart popup-style-1'
        }
      }}
    open={isCartOpen} onClose={()=> setIsCartOpen(false)}>
    <Box  className="canvas-wrapper">
            <div className="popup-header">
                <span className="title">Shopping cart</span>
                <span className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" onClick={()=> setIsCartOpen(false)}></span>
            </div>
            <div className='wrap'>
                <div className="tf-mini-cart-threshold">
                    <div className="text">
                        Spend <span className="fw-medium">$100</span> more to get <span className="fw-medium">Free
                            Shipping</span>
                    </div>
                    <div className="tf-progress-bar tf-progress-ship">
                        <div className="value" style={{width: '0%'}}data-progress="75">
                            <i className="icon icon-car"></i>
                        </div>
                    </div>
                </div>
                <div className="tf-mini-cart-wrap">
                    <div className="tf-mini-cart-main">
                    <div className="tf-mini-cart-sroll">
                            <div className="tf-mini-cart-items">
                                {cartItems.length > 0 ? (<>{cartItems.map((itm, idx)=> <div className="tf-mini-cart-item file-delete" key={idx}>
                                    <div className="tf-mini-cart-image">
                                        <a href="product-detail.html">
                                            <img className="lazyload" data-src="images/products/fashion/women-1.jpg"
                                                src={`${import.meta.env.VITE_PUBLIC_CART_IMAGE}${itm?.ProductImage}`} alt="img-product"/>
                                        </a>
                                    </div>
                                    <div className="tf-mini-cart-info">
                                        <div className="d-flex justify-content-between">
                                            <p className="title link text-md fw-medium" >{itm?.ProductName}</p>
                                            <i className="icon icon-close remove fs-12" onClick={()=> DeleteProduct(itm?.CartId)}></i>
                                        </div>
                                        <div className="info-variant">
                                            <p>{normalizeSizeColor(itm?.ProductVariation)}</p>
                                            {/* <select className="text-xs">
                                                <option value="White / L">White / L</option>
                                                <option value="White / M">White / M</option>
                                                <option value="Black / L">Black / L</option>
                                            </select> */}
                                            {/* <i className="icon-pen edit"></i> */}
                                        </div>
                                        {/* <p className="price-wrap text-sm fw-medium">
                                            <span className="new-price text-primary">₹{itm?.ProductPrice}</span>
                                            <span
                                                className="old-price text-decoration-line-through text-dark-1">{itm?.UsualPrice}</span>
                                        </p> */}
                                        <p className="price-wrap text-sm fw-medium">
                                        <span className="new-price text-primary">{Currency?.Symbol}{itm?.ProductPrice}</span>
                                        <span className="old-price  text-dark-1"> X  {itm?.Quantity}</span>
                                        </p>
                                        <p className="price-wrap text-sm fw-medium">
                                            <span className="new-price text-primary">Total : </span>
                                            <span className="old-price  text-dark-1">{Currency?.Symbol}{itm?.Total}</span>
                                        </p>
                                        <div className="wg-quantity small"> 
                                            <button className="btn-quantity minus-btn" onClick={()=> itm?.Quantity  > 1 ?  Update_productCart({CartId: itm?.CartId, Qty:itm?.Quantity - 1}) : null}>-</button>
                                            <input className="quantity-product font-4" type="text" name="number" value={itm?.Quantity}/>
                                            <button className="btn-quantity plus-btn" onClick={()=> Update_productCart({CartId: itm?.CartId, Qty:itm?.Quantity + 1})}>+</button>
                                       </div>
                                    </div>
                                    
                                </div>)}</>) : (<>
                                    <div>
                                        <p className='px-2 text-center'>Cart is Empty</p>
                                    </div>
                                </>)}
                            </div>
                            {/* <div className="tf-minicart-recommendations">
                                <div
                                    className="tf-minicart-recommendations-heading d-flex justify-content-between align-items-end">
                                    <div className="tf-minicart-recommendations-title text-md fw-medium">You may also
                                        like</div>
                                    <div className="d-flex gap-10">
                                        <div
                                            className="swiper-button-prev nav-swiper arrow-1 size-30 nav-prev-also-product">
                                        </div>
                                        <div
                                            className="swiper-button-next nav-swiper arrow-1 size-30 nav-next-also-product">
                                        </div>
                                    </div>
                                </div>
                                <div dir="ltr" className="swiper tf-swiper" data-swiper='{
                                            "slidesPerView": 1,
                                            "spaceBetween": 10,
                                            "speed": 800,
                                            "observer": true,
                                            "observeParents": true,
                                            "slidesPerGroup": 1,
                                            "navigation": {
                                                "clickable": true,
                                                "nextEl": ".nav-next-also-product",
                                                "prevEl": ".nav-prev-also-product"
                                            }
                                        }'>
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="tf-mini-cart-item line radius-16">
                                                <div className="tf-mini-cart-image">
                                                    <a href="product-detail.html">
                                                        <img className="lazyload"
                                                            data-src="images/products/fashion/product-1.jpg"
                                                            src={`${import.meta.env.VITE_DAYNAMIC_IMG_URL}/products/fashion/product-1.jpg`}
                                                            alt="img-product"/>
                                                    </a>
                                                </div>
                                                <div className="tf-mini-cart-info justify-content-center">
                                                    <a className="title link text-md fw-medium"
                                                        href="product-detail.html">Polo T-Shirt</a>
                                                    <p className="price-wrap text-sm fw-medium">
                                                        <span className="new-price text-primary">$130.00</span>
                                                        <span
                                                            className="old-price text-decoration-line-through text-dark-1">$150.00</span>
                                                    </p>
                                                    <a href="#"
                                                        className="tf-btn animate-btn d-inline-flex bg-dark-2 w-max-content">Add
                                                        to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="tf-mini-cart-item line radius-16">
                                                <div className="tf-mini-cart-image">
                                                    <a href="product-detail.html">
                                                        <img className="lazyload"
                                                            data-src="images/products/fashion/product-2.jpg"
                                                            src={`${import.meta.env.VITE_DAYNAMIC_IMG_URL}/products/fashion/product-2.jpg`}
                                                            alt="img-product"/>
                                                    </a>
                                                </div>
                                                <div className="tf-mini-cart-info justify-content-center">
                                                    <a className="title link text-md fw-medium"
                                                        href="product-detail.html">Short Sleeve Sweat</a>
                                                    <p className="price-wrap text-sm fw-medium">
                                                        <span className="new-price text-primary">$100.00</span>
                                                        <span
                                                            className="old-price text-decoration-line-through text-dark-1">$115.00</span>
                                                    </p>
                                                    <a href="#"
                                                        className="tf-btn animate-btn d-inline-flex bg-dark-2 w-max-content">Add
                                                        to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="tf-mini-cart-item line radius-16">
                                                <div className="tf-mini-cart-image">
                                                    <a href="product-detail.html">
                                                        <img className="lazyload"
                                                            data-src="images/products/fashion/product-3.jpg"
                                                            src="images/products/fashion/product-3.jpg"
                                                            alt="img-product"/>
                                                    </a>
                                                </div>
                                                <div className="tf-mini-cart-info justify-content-center">
                                                    <a className="title link text-md fw-medium"
                                                        href="product-detail.html">Crop T-shirt</a>
                                                    <p className="price-wrap text-sm fw-medium">
                                                        <span className="new-price text-primary">$80.00</span>
                                                        <span
                                                            className="old-price text-decoration-line-through text-dark-1">$100.00</span>
                                                    </p>
                                                    <a href="#"
                                                        className="tf-btn animate-btn d-inline-flex bg-dark-2 w-max-content">Add
                                                        to cart</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="tf-mini-cart-bottom">
                        {/* <div className="tf-mini-cart-tool">
                            <div className="tf-mini-cart-tool-btn btn-add-gift">
                                <i className="icon icon-gift2"></i>
                                <div className="text-xxs">Add gift wrap</div>
                            </div>
                            <div className="tf-mini-cart-tool-btn btn-add-note">
                                <i className="icon icon-note"></i>
                                <div className="text-xxs">Order note</div>
                            </div>
                            <div className="tf-mini-cart-tool-btn btn-coupon">
                                <i className="icon icon-coupon"></i>
                                <div className="text-xxs">Coupon</div>
                            </div>
                            <div className="tf-mini-cart-tool-btn btn-estimate-shipping">
                                <i className="icon icon-car"></i>
                                <div className="text-xxs">Shipping</div>
                            </div>
                        </div> */}
                        <div className="tf-mini-cart-bottom-wrap">
                            <div className="tf-cart-totals-discounts">
                                <div className="tf-cart-total text-xl fw-medium">Grand Total:</div>
                                {cartItems[0]?.GrandTotal ? <div className="tf-totals-total-value text-xl fw-medium">{Currency?.Symbol}{cartItems[0]?.GrandTotal}/-</div> : null}
                            </div>
                            {/* <div className="tf-cart-tax text-sm opacity-8">Taxes and shipping calculated at checkout
                            </div> */}
                            <div className="tf-cart-checkbox">
                                {/* <div className="tf-checkbox-wrapp">
                                    <input className="" type="checkbox" id="CartDrawer-Form_agree" name="agree_checkbox"/>
                                    <div>
                                        <i className="icon-check"></i>
                                    </div>
                                </div> */}
                                {/* <label for="CartDrawer-Form_agree" className="text-sm">
                                    I agree with the
                                    <a href="term-and-condition.html" title="Terms of Service" className="fw-medium">terms
                                        and conditions</a>
                                </label> */}
                            </div>
                            <div className="tf-mini-cart-view-checkout">
                                <Link to="/checkout"
                                    onClick={()=>{isLogin  ? setIsCartOpen(!isCartOpen) : showToast('Login First', 'error')}}
                                    className="tf-btn animate-btn d-inline-flex bg-dark-2 w-100 justify-content-center"><span>Check
                                        out</span></Link>
                                <Link onClick={()=> setIsCartOpen(false)} to="/cart" className="tf-btn btn-out-line-dark2 w-100 justify-content-center">View cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </Box>
  </Drawer>
  )
}

export default Shopping_Cart
