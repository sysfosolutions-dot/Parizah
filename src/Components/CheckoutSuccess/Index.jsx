import React, { useContext, useEffect, useState } from 'react'
import CheckoutSuccess_Page from '../../Pages/CheckoutSuccess/Index'
import { Link } from 'react-router-dom';
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import { useParams } from 'react-router-dom';
import AccountContext from '../../Context/Account';
function CheckoutSuccess_Container() {
     const  {user_common_api} = UserAuthentication();
     const [orderSuccesDetailsData, setorderSuccesDetailsData] = useState([]);
     const {Currency} = useContext(AccountContext)
     const [ProductDetails, setproductDetails] = useState([])
     const param = useParams();


  const FetchPaymentStatus = async()=>{
    const OBJ ={
      procName: 'GetORderSuccessDetail',
      Para:JSON.stringify({OrderNumber:param?.id, ActionMode:"GetPaymentStatus"})
    }
    const result = await user_common_api(OBJ);
    if(result[0]?.PaymentStatus === "Success"){
      Order_SuccessDetail()
      Product_Details()
    }  
  }

  const Order_SuccessDetail  = async()=>{
    const OBJ ={
      procName: 'GetORderSuccessDetail',
      Para:JSON.stringify({OrderNumber:param?.id, ActionMode:"ShippingDetails"})
    }
    const result = await user_common_api(OBJ);
    if(Array.isArray(result)){
      setorderSuccesDetailsData(result);
    }else{
      setorderSuccesDetailsData([])
    }
    
  }

    const Product_Details  = async()=>{
    const OBJ ={
      procName: 'GetORderSuccessDetail',
      Para:JSON.stringify({OrderNumber:param?.id, ActionMode:"ProductDetails"})
    }
    const result = await user_common_api(OBJ);
    if(Array.isArray(result)){
      setproductDetails(result)
    }else{
      setproductDetails([])
    }
    
  }

  useEffect(()=>{
    FetchPaymentStatus()
  }, [])

  return (
  <>
      {/* Page Title */}
      <div className="flat-spacing pb-0">
        <div className="container">
          <div className="title-success-order text-center">
            <img className="icon" src={import.meta.env.BASE_URL+"assets/Images/section/success.svg"} alt="" />
            <div className="box-title">
              <h3 className="title">Thank you for your order!</h3>
              <p className="text-md text-main">
                You are awesome, {orderSuccesDetailsData[0]?.ClintName}! Thank you so much for your purchase.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="flat-spacing-29">
        <div className="container">
          <div className="row">
            <div className="col-xl-8">
              <div className="tf-main-success">
                <div className="box-progress-order">
                  <div className="order-progress-item order-code text-center">
                    <div className="title text-sm fw-medium">Order number</div>
                    <div className="text-md fw-medium code">#{orderSuccesDetailsData[0]?.OrderNumber}</div>
                  </div>
                  <div className="order-progress-item order-date text-center">
                    <div className="title text-sm fw-medium">Order date</div>
                    <div className="text-md fw-medium date">{orderSuccesDetailsData[0]?.OrderDate}</div>
                  </div>
                  <div className="order-progress-item order-total text-center">
                    <div className="title text-sm fw-medium">Order total</div>
                    <div className="text-md fw-medium total">{Currency.Symbol}{ProductDetails[0]?.GrandTotal}</div>
                  </div>
                  <div className="order-progress-item payment-method text-center">
                    <div className="title text-sm fw-medium">
                      Payment method
                    </div>
                    <div className="text-md fw-medium metod">
                      {orderSuccesDetailsData[0]?.PaymentMode}
                    </div>
                  </div>
                </div>

                <div className="box-timeline-order">
                  <div className="timeline-item active text-center">
                    <div className="box-icon">
                      <span className="icon icon-confirm"></span>
                    </div>
                    <div className="content">
                      <div className="title fw-medium text-md">Confirmed</div>
                      <span className="date fw-medium text-sm text-main">
                        {orderSuccesDetailsData[0]?.OrderDate}
                      </span>
                    </div>
                  </div>
                  <div className="line-time"></div>
                  <div className="timeline-item text-center">
                    <div className="box-icon">
                      <span className="icon icon-shipped"></span>
                    </div>
                    <div className="content">
                      <div className="title fw-medium text-md">Shipped</div>
                      <span className="date fw-medium text-sm text-main">
                        -
                      </span>
                    </div>
                  </div>
                  <div className="line-time"></div>
                  <div className="timeline-item text-center">
                    <div className="box-icon">
                      <span className="icon icon-location"></span>
                    </div>
                    <div className="content">
                      <div className="title fw-medium text-md">Delivered</div>
                      <span className="date fw-medium text-sm text-main">
                       -
                      </span>
                    </div>
                  </div>
                </div>

                <div className="map-order">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.816539408052!2d80.98723257521965!3d26.782117376725314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd09c000001d%3A0x9f0b6f25a99fca59!2sSysfo%20Software%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1747390996420!5m2!1sen!2sin"
                    width="100%"
                    height="499"
                    style={{ border: "none" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Order Map"
                  ></iframe>
                </div>

                <div className="box-ship-address">
                  <div className="row justify-content-between">
                    <div className="col-12 col-sm-5">
                      <div className="ship-address-item">
                        <div className="text-lg fw-medium title">
                            Shipping address
                        </div>
                        <ul className="list-address">
                            <li dangerouslySetInnerHTML={{ __html: orderSuccesDetailsData[0]?.ShippingAddress }} />         
                        </ul>
                      </div>
                    </div>
                    <div className="col-12 col-sm-5">
                      <div className="ship-address-item billing mb-0">
                        <div className="text-lg fw-medium title">
                          Billing address
                        </div>
                        <ul className="list-address">
                           <li dangerouslySetInnerHTML={{ __html: orderSuccesDetailsData[0]?.BillingAddress}} />     
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="fl-order-testimonial">
                  <div dir="ltr" className="swiper tf-swiper">
                    <div className="swiper-wrapper">
                      <div className="swiper-slide">
                        <div className="box-order-tes text-center">
                          <span className="icon icon-quote3"></span>
                          <div className="content">
                            <div className="title text-md text-uppercase fw-medium">
                              HAPPY CUSTOMERS
                            </div>
                            <p className="note text-xl text-main">
                              "I’ve never felt more confident in my wardrobe!
                              Every piece I’ve bought from here is high-quality,
                              trendy, and fits perfectly. The entire shopping
                              experience has been seamless from start to finish.
                              Thank you for making fashion so easy!"
                            </p>
                          </div>
                          <span className="author font-2 text-md fw-semibold">
                            Vineta P
                          </span>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-order-tes text-center">
                          <span className="icon icon-quote3"></span>
                          <div className="content">
                            <div className="title text-md text-uppercase fw-medium">
                              HAPPY CUSTOMERS
                            </div>
                            <p className="note text-xl text-main">
                              I’ve never been happier with my wardrobe! Every
                              piece I’ve bought is stylish, high-quality, and
                              fits like a glove. The shopping process is so
                              smooth and stress-free from beginning to end.
                              Truly makes fashion effortless and fun!
                            </p>
                          </div>
                          <span className="author font-2 text-md fw-semibold">
                            David P
                          </span>
                        </div>
                      </div>
                      <div className="swiper-slide">
                        <div className="box-order-tes text-center">
                          <span className="icon icon-quote3"></span>
                          <div className="content">
                            <div className="title text-md text-uppercase fw-medium">
                              HAPPY CUSTOMERS
                            </div>
                            <p className="note text-xl text-main">
                              Shopping here has completely transformed my style!
                              Every item I’ve received is beautiful, well-made,
                              and fits me perfectly. From browsing to delivery,
                              the entire process was quick and easy. I finally
                              enjoy getting dressed every day!
                            </p>
                          </div>
                          <span className="author font-2 text-md fw-semibold">
                            Henry P
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="sw-dot-default style-sm sw-pagination-tes justify-content-center"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4">
              <div className="tf-page-cart-sidebar sidebar-order-success">
                <div className="cart-box order-box">
                  <div className="title text-lg fw-medium">Order Details</div>
                  <ul className="list-order-product">
                    {ProductDetails.map((item, idx) => (
                      <li className="order-item" key={idx}>
                        <figure className="img-product">
                          <img src={import.meta.env.VITE_PUBLIC_CART_IMG+item.ProductImage} alt="product" />
                          <span className="quantity">{item?.Quantity}</span>
                        </figure>
                        <div className="content">
                          <div className="info">
                            <p className="name text-sm fw-medium">
                              {item.ProductName}
                            </p>
                            <span className="variant">{item.variant}</span>
                          </div>
                          <span className="price text-sm fw-medium">
                            {Currency?.Symbol}{item.ProductPrice}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <ul className="list-total">
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Sub Total:</span>
                      <span className="price-sub fw-medium">{Currency.Symbol}{ProductDetails[0]?.SubTotal}</span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Discount:</span>
                      <span className="price-discount fw-medium">
                        {Currency.Symbol}{ProductDetails[0]?.DiscountedPrice}
                      </span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Shipping:</span>
                      <span className="price-ship fw-medium">{Currency.Symbol}{ProductDetails[0]?.ShippingCost}</span>
                    </li>
                    <li className="total-item text-sm d-flex justify-content-between">
                      <span>Tax:</span>
                      <span className="price-tax fw-medium">{Currency.Symbol}{ProductDetails[0]?.TaxAmount}</span>
                    </li>
                  </ul>

                  <div className="subtotal text-lg fw-medium d-flex justify-content-between">
                    {ProductDetails[0]?.GrandTotal ? <span>Grand Total:</span> : null}
                    {ProductDetails[0]?.GrandTotal ? <span className="total-price-order">{Currency.Symbol}{ProductDetails[0]?.GrandTotal}</span> : null}
                  </div>
                </div>

                <div className="cart-box">
                  <form className="feedback-box">
                    <h6 className="title">Give us a feedback</h6>
                    <p className="text text-main text-sm">
                      Let us know what you think about the shopping experience,
                      and get a gift coupon for the next shopping.
                    </p>

                    <fieldset className="tf-field style-2 style-3 mb_16">
                      <input
                        className="tf-field-input tf-input"
                        id="name"
                        placeholder=" "
                        type="text"
                        name="name"
                      />
                      <label className="tf-field-label" htmlFor="name">
                        Name
                      </label>
                    </fieldset>

                    <fieldset className="tf-field style-2 style-3 mb_16">
                      <input
                        className="tf-field-input tf-input"
                        id="email"
                        placeholder=" "
                        type="email"
                        name="email"
                      />
                      <label className="tf-field-label" htmlFor="email">
                        Email
                      </label>
                    </fieldset>

                    <div className="box-exp mb_16">
                      <p className="mb_6 text-main text-sm">
                        How was your experience?
                      </p>
                      <div className="list-exp">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <label
                            key={num}
                            htmlFor={`exp${num}`}
                            className="check-exp"
                          >
                            <input
                              type="radio"
                              id={`exp${num}`}
                              className="tf-check-rounded"
                              name="checkExperience"
                              defaultChecked={num === 1}
                            />
                            <span className="text-exp text-sm">{num}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <fieldset className="mb_16">
                      <textarea
                        className="style-2"
                        id="desc"
                        placeholder="Share your exprience..."
                      ></textarea>
                    </fieldset>

                    <button className="tf-btn btn-dark2 w-100 animate-btn">
                      send
                    </button>
                  </form>

                  <div className="box-share-social">
                    <h6 className="title">Share the love</h6>
                    <div className="tf-social-icon style-large">
                      <Link
                        to="https://www.facebook.com/"
                        className="social-item social-facebook"
                      >
                        <i className="icon icon-fb"></i>
                      </Link>
                      <Link 
                        target='_blank'
                        to="https://www.instagram.com/"
                        className="social-item social-instagram"
                      >
                        <i className="icon icon-instagram"></i>
                      </Link>
                      <Link 
                        target='_blank'
                        to="https://x.com/" className="social-item social-x">
                        <i className="icon icon-x"></i>
                      </Link>
                      <Link
                        target='_blank'
                        to="https://www.snapchat.com/"
                        className="social-item social-snapchat"
                      >
                        <i className="icon icon-snapchat"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default CheckoutSuccess_Container