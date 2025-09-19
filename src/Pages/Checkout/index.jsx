import React, { useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import Addresses_Container from '../../Components/Account/Addresses';
import { FaTrashAlt } from "react-icons/fa";
import {Checkout_Values} from '../../Utils/Forms/Validation/intialvalues'
import {Checkout_Validation} from '../../Utils/Forms/Validation/FieldValidation'
import ShoppingCartContext from '../../Context/Shopping_Cart';
import AccountContext from '../../Context/Account';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useToast } from '../../Context/Tostify';
import { useNavigate } from 'react-router-dom';
import Breadcrumb_Container from '../../Components/Common/Breadcrumb/Index';
import { useSweetAlert } from '../../Context/SweetAlert';

const Checkout_Page = () => {
   const  {user_common_api, PlaceOrderApi} = UserAuthentication();
   const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
   const {FetchCartData, cartItems, setCartItems} = useContext(ShoppingCartContext);
   const [submitloader, setsubmitloader] = useState(false)
   const {Currency} = useContext(AccountContext);
   const {showAlert} = useSweetAlert();
   const navigate = useNavigate()
   const [addressList, setaddressList] = useState([]);
   const [ShippingID, setShippingID] = useState(null)
   const [reloadlist, setreloadlist] = useState(false)
   const [CouponAmount, setCouponAmount] = useState(0);
   const [CouponCode, setCouponCode] = useState(null)
   const {showToast } = useToast();

   const FetchUserAddress = async ()=> {
    FetchCartData()
    const OBJ ={
      para :JSON.stringify({ClientId:ClientID, ActionMode:"Select"}),
      procName:"DeliveryAddress"
    }
    const result = await user_common_api(OBJ);
    if(Array.isArray(result)){
      setaddressList(result)
    }else{
      setaddressList([])
    }

    
  }

  const CheckCoupon = async (data)=>{
    const {Coupon} = data
    const CookieID = Cookies.get('user_id');
    const OBJ ={ 
        procName: 'Coupon',
        Para:JSON.stringify({ActionMode:"GetCouponDic", OrderAmount :cartItems[0]?.GrandTotal, CouponCode :Coupon, CookieId:CookieID, MemberId:ClientID})
    }
    const result = await user_common_api(OBJ)
    if(result[0]?.StatusCode === '1'){
         showToast(result[0]?.Msg, 'Success');
         setCouponAmount(result[0]?.CouponAmount);
         setCouponCode(Coupon)
    }else{
        showToast(result[0]?.Msg ,'error')
    }
  }

  const placeOrder = async (data) => {
    setsubmitloader(true)
    const {Coupon, PaymentMethod} = data
    const CookieID = Cookies.get('user_id');
      const OBJ = {
      CookieId:CookieID,
      ClientId:ClientID,
      EPIN:'',
      OrderType:PaymentMethod,
      AddressId:ShippingID,
      Comment:'Hello I am Afzal',
      VoucherCode:Coupon,
    }

    if(PaymentMethod === 'Online Payment'){
        showAlert('Payment Option', 'Only Cash on Delivery Available');
        return setsubmitloader(false);
    }
    const result = await PlaceOrderApi(OBJ);
    if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.Msg, 'success');
        navigate(`/checkout/${result[0]?.OrderNumber}`)
    }else{
        showToast(result[0]?.Msg, 'error')
    }

  }



useEffect(()=>{
  FetchUserAddress()
},[reloadlist])

  return (
    <>
        <Breadcrumb_Container/>
     <div className="flat-spacing-13">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8">
                        <div className="tf-checkout-cart-main">
                            <div className="box-ip-payment">
                                {/* <div className="title">
                                    <div className="text-lg fw-medium mb_4">Address</div>
                                </div>
                                <div className="payment-method-box" id="payment-method-box">
                                    {addressList.map((itm, idx)=> <>
                                          {itm?.Type === "Shipping" ? <p className="text-sm text-main">Choose Shipping Address</p> : null}
                                    <div className="payment-item mb_16" key={idx}>
                                        <label htmlFor="delivery" className="payment-header collapsed" data-bs-toggle="collapse"
                                            data-bs-target="#delivery-payment" aria-controls="delivery-payment">
                                            <input type="radio" name="payment-method" className="tf-check-rounded"
                                                id="delivery"/>
                                            <span className="pay-title text-sm">{itm?.Type} Address</span>
                                        </label>
                                        <div>
                                            <div className='px-3'>
                                              <p>{itm?.FullName}</p>
                                              <p>{itm?.FlatHouseBuildingNo}{itm?.Locality}</p>
                                              <p>{itm?.CityName}, {itm?.StateName}, {itm?.CountryName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </>
                                    )}
                                </div> */}
                                <Addresses_Container userAddress={addressList} pageName={'checkout'} setreloadlist={setreloadlist} reloadlist={reloadlist} setShippingID={setShippingID} ShippingID={ShippingID}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <div className="tf-page-cart-sidebar">
                            <Formik
                                initialValues={Checkout_Values}
                                validationSchema={Checkout_Validation}
                                onSubmit={placeOrder}
                            >
                {({ isSubmitting, values, setFieldValue  }) => (
                            <Form className="cart-box order-box">
                                <div className="title text-lg fw-medium">In your cart</div>
                                <ul className="list-order-product">
                                    {cartItems.map((itm, idx)=> <li className="order-item">
                                        <figure className="img-product">
                                            <img src={import.meta.env.VITE_PUBLIC_CART_IMG+itm?.ProductImage} alt="product"/>
                                            <span className="quantity">{itm?.Quantity}</span>
                                        </figure>
                                        <div className="content">
                                            <div className="info">
                                                <p className="name text-sm fw-medium">{itm?.ProductName}</p>
                                                <span className="variant">{itm?.ProductVariation}</span>
                                            </div>
                                            <span className="price text-sm fw-medium">{Currency?.Symbol}{itm?.ProductPrice}</span>
                                        </div>
                                    </li>)}
                                </ul>
                                <ul className="list-total">
                                    <li className="total-item text-sm d-flex justify-content-between">
                                        <span>Sub Total:</span>
                                        <span className="price-sub fw-medium">{Currency?.Symbol}{cartItems[0]?.SubTotal}</span>
                                    </li>
                                    <li className="total-item text-sm d-flex justify-content-between">
                                        <span>Discount:</span>
                                        <span className="price-discount fw-medium">{Currency?.Symbol}{cartItems[0]?.TotalDiscount}</span>
                                    </li>
                                    <li className="total-item text-sm d-flex justify-content-between">
                                        <span>Shipping:</span>
                                        <span className="price-ship fw-medium">{Currency?.Symbol}{cartItems[0]?.ShippingCost}</span>
                                    </li>
                                    <li className="total-item text-sm d-flex justify-content-between">
                                        <span>Tax:</span>
                                        <span className="price-tax fw-medium">{Currency?.Symbol}{cartItems[0]?.TotalTax}</span>
                                    </li>
                                </ul>

                                {CouponAmount === 0 ? 
                                <div className="tf-field style-2 style-3 mt-2 d-flex justify-content-between align-items-center gap-2">
                                    <div className='flex-grow-1'>
                                        <Field className="tf-field-input tf-input"
                                         placeholder=" " type="text" name="Coupon"
                                         />
                                        <label className="tf-field-label" for="lastname">Coupon Code</label>    
                                    </div>
                                    <div>
                                <button type="button" onClick={()=> CheckCoupon(values)} className=" rounded-2 py-2 btn-dark2 animate-btn w-100 text-transform-none">
                                    Apply </button>
                                    </div>    
                                </div> : <>
                                    <div className="tf-field style-2 style-3 mt-2 py-2 d-flex justify-content-between align-items-center gap-2">
                                        <p>You Have Saved {Currency?.Symbol}{CouponAmount} </p>
                                        <p className='text-decoration-underline' onClick={()=> setCouponAmount(0)}><FaTrashAlt/> Remove Coupon</p>
                                    </div>
                                </>}
                                <div className="subtotal text-lg fw-medium d-flex justify-content-between py-2">
                                   {cartItems[0]?.GrandTotal ? <span>Grand Total:</span> : null}
                                    {cartItems[0]?.GrandTotal ? <span className="total-price-order">{Currency?.Symbol}{cartItems[0]?.GrandTotal - CouponAmount}</span> : null}
                                </div>
                                <div className="tf-field style-2 style-3 mt-2">
                                    <div className='d-flex gap-5 mt-2'>
                                           <div className='payment-method-btn'>
                                        <label className='d-flex gap-1'>
                                        <Field type="radio" name="PaymentMethod" value="Online Payment" />
                                        Online Payment
                                        </label>
                                    </div>
                                     <div className='payment-method-btn'> 
                                        <label className='d-flex gap-1'>
                                        <Field type="radio" name="PaymentMethod" value="COD" />
                                         Cash on Delivery
                                        </label>
                                    </div>
                                    </div>
                                    <ErrorMessage name="PaymentMethod" className='text-danger py-2' component="div"/>
                                </div>
                                <div className="btn-order mt-3">
                                    <button type="submit" 
                                        className="tf-btn btn-dark2 animate-btn w-100 text-transform-none">
                                            {submitloader ? <div class="spinner-border spinner-border-sm" role="status"></div> : null}
                                            Place order</button>
                                </div>
                            </Form>
                )}
                        </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Checkout_Page
