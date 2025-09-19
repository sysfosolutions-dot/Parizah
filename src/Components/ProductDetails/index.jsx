import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Thumbnail_Slider from "../Common/Slider/ThumbnailSlider";
import { Progress } from "reactstrap";
import { Product_Service } from "../../Services/Product/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import SizeGuide from "../Common/Modal/SizeGuide";
import { useLocation } from "react-router-dom";
import { useToast } from "../../Context/Tostify";
import ShoppingCartContext from "../../Context/Shopping_Cart/index";
import {userReview_Values} from '../../Utils/Forms/Validation/intialvalues'
import {userReview_Validation} from '../../Utils/Forms/Validation/FieldValidation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AccountContext from "../../Context/Account";
import { UserAuthentication } from "../../Services/Authentication/UserAuthentication";
import { Calculating_Ratings } from "../../Utils/Opration";
import Product_Slider from "../Common/Slider/Product_Slider";
import CollectionContext from "../../Context/Collection";
import { useSweetAlert } from "../../Context/SweetAlert";
import Breadcrumb_Container from "../Common/Breadcrumb/Index";
const img_URL = import.meta.env.VITE_IMG_URL;
const ProductDetails_Container = () => {
  const {UseFetchProduct_Details, Custom_api_call} = Product_Service();
  const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0')
  const [product_Detail, setproduct_Detail]  = useState([]);
  const [relatedProduct, setrelatedProduct] = useState([])
  const { showToast } = useToast();
  const {AddToCart, setIsBuyitNow} = useContext(ShoppingCartContext);
  const {FetchWishlist} = useContext(CollectionContext)
  const {isLogin, Currency} = useContext(AccountContext)
  const [slider_Data, setslider_Data] = useState([]);
  const [VariationList, setVariationList] = useState([]);
  const [P_reviewList, setP_reviewList]  = useState([]);
  const [ReviewCount, setReviwCount] = useState({})
  const [selectedColor, setselectedColor] = useState('');
  const [selectedSize, setselectedSize] = useState('');
  const [accordian, setaccordian] = useState('')
  const [Color, setColor] = useState([]);
  const [Size, setSize] = useState([]);
  const [ColorSizeList, setColorSizeList] = useState([])
  const [Qty, setQty] = useState(1)
  const param = useParams();
  const {user_CreateReview, Addto_WishList} = UserAuthentication();
  const {showAlert} = useSweetAlert()
  const navigate = useNavigate();

  const initialValues = {
    selectedVariant: ColorSizeList.length > 0 ? `${selectedColor}-${selectedSize}` : '', // e.g. 'Red-M'
    quantity: 1,
  };



  
  // Fetch Product Details
  const Fetch_ProductDetails = async ()=>{
    const CookieId = Cookies.get('user_id');
    const OBJ ={
      ProductId:param?.p_id,
      ProductVariantId:param?.v_id,
      CookieId:CookieId,
      ClientId:ClientID || "0",
    }
    const result  = await UseFetchProduct_Details(OBJ);
    if(Array.isArray(result)){
      setproduct_Detail(result);
      const Data = result.map((itm)=>  JSON.parse(itm?.SideImage)) 
      setslider_Data(Data[0]);
      const parts = result[0]?.ProductVariation.split(',');
      let color = '';
      let size = '';
      parts.forEach(part => {
      const [key, value] = part.split(':');
      if (key.toLowerCase() === 'color') {
        color = value;
      } else if (key.toLowerCase() === 'size') {
        size = value;
      }
      }); 
      setselectedColor(color) 
      setselectedSize(size)
      const variation = result.map((itm)=>  JSON.parse(itm?.VariationList));
      setVariationList(variation)
      let ColorSize_Data = variation[0].map((itm)=> itm?.ProductVariation)
      ColorSize_Data = ColorSize_Data.map(item => {
        const obj = {};
        item.split(',').forEach(pair => {
          const [key, value] = pair.split(':');
          obj[key] = value;
        });
        return obj;
      });   
      //console.log( ColorSize_Data);
      UpdatePriceInSizeColor(ColorSize_Data, variation[0])
      const uniqueColorNames = [...new Set(ColorSize_Data.map(item => item.Color))];   
      const uniqueSizeNames = [...new Set(ColorSize_Data.map(item => item.Size))];  
      setColor(uniqueColorNames);
      setSize(uniqueSizeNames);
      setP_reviewList(result[0]?.Review != "-" ? JSON.parse(result[0]?.Review) : [])
      setReviwCount(result[0]?.Review != "-" ? Calculating_Ratings(JSON.parse(result[0]?.Review)) : [] )
      Fetching_RelatedProducts()
    }
  }

  // updating color Size and price
  const UpdatePriceInSizeColor = (DATA, VariationListData)=>{
    const updatedColorSizeArray = DATA.map(({ Color, Size }) => {
      const match = VariationListData.find((item) => {
        const variation = item.ProductVariation.toLowerCase();
        return (
          variation.includes(`color:${Color.toLowerCase()}`) &&
          variation.includes(`size:${Size.toLowerCase()}`)
        );
      });
    
      return {
        Color,
        Size,
        ProductPrice: match ? parseFloat(match.ProductPrice) : null
      };
    });
  //console.log(updatedColorSizeArray);
  setColorSizeList(updatedColorSizeArray);
  }


  // Fetching Related Products 
  const Fetching_RelatedProducts = async()=>{
    const CookieId = Cookies.get('user_id');
    const OBJ = {
      Para:JSON.stringify({ClientId:ClientID, CookieId:CookieId, ProductId:param?.p_id, Type:'RelatedProducts'}),
      procName:'GetProductByType'
    }
    const result = await Custom_api_call(OBJ);
    if(Array.isArray(result)){
      setrelatedProduct(result)
    }else{
      setrelatedProduct([])
    }

    
  }


  const normalizeVariation = (variationStr) => {
    return variationStr
      .split(",")
      .map(s => s.trim())
      .sort()
      .join(",");
  };

  
  const CheckVariation = async (data) => {
    const { type, name } = data;
  
    let currentVariation;
    if (type === "color") {
      currentVariation = normalizeVariation(`Color:${name},Size:${selectedSize}`);
    } else {
      currentVariation = normalizeVariation(`Color:${selectedColor},Size:${name}`);
    }
  
    const DATAlist = VariationList[0].filter((itm) =>
      normalizeVariation(itm.ProductVariation) === currentVariation
    );
  
    if (DATAlist.length > 0) {
      navigate(
        `/product/${param?.productname}/${DATAlist[0]?.ProductId}/${DATAlist[0]?.ProductVariantDetailId}`
      );
    }
  };

  // checkProduct By Color and Size
  
  const CheckProductBySizeColor = (data)=>{    
    const {color, size} = data;
    let filteredData = VariationList[0].filter((itm) =>  {
       return itm.ProductVariation  === `Color:${color},Size:${size}`
    }
    );
    if(filteredData.length === 0){
      filteredData = VariationList[0].filter((itm) =>  {
        return itm.ProductVariation  === `Size:${size},Color:${color}`
     });
    }
    if(filteredData.length > 0 ){
      navigate(
        `/product/${param?.productname}/${filteredData[0]?.ProductId}/${filteredData[0]?.ProductVariantDetailId}`
      );
    }
    //console.log(filteredData);
   
  }



  // Adding Product to Cart 
  const Add_To_Cart = ()=>{
    AddToCart(product_Detail, Qty)
  }

// Add Review 
const AddReview = async (values , { resetForm })=> {
    const {Name, Email, Comment, Rating} = values
    const OBJ ={ProductId:product_Detail[0]?.ProductId, ProductVariantId:product_Detail[0]?.ProductVariantDetailId, Comment, Email, Name, Rating, UserId:ClientID}
     const result =  await user_CreateReview(OBJ);
     if(result[0]?.StatusCode === "1"){
      showToast(result[0]?.Msg, 'success');
      Fetch_ProductDetails();
      resetForm();
     }else{
      showToast(result[0]?.Msg, 'error')
     }
}

// Add WishList

const ADD_ToWishList = async()=>{
  const CookieId = Cookies.get('user_id');
  const OBJ ={
    Para:JSON.stringify({ClientId:ClientID, CookieId:CookieId, ProductId:product_Detail[0]?.ProductId, PVDId:product_Detail[0]?.ProductVariantDetailId, ActionMode:'AddToWishList'}),
    procName:'AddToWishList'
  }
  const result = await Addto_WishList(OBJ);
  if(result[0]?.StatusCode === "1"){
    showToast(result[0]?.Msg, 'success');
    FetchWishlist();
    Fetch_ProductDetails();
  }else{
    showToast(result[0]?.Msg, 'error')
  }
}

// removing items
const RemoveItem_FromWishList = async(ID)=>{
  const CookieId = Cookies.get('user_id');
  const OBJ ={
    Para:JSON.stringify({ WishListId:ID, ActionMode:'Delete'}),
    procName:'AddToWishList'
  }
  const result = await Addto_WishList(OBJ);
  if(result[0]?.StatusCode === "1"){
    showToast(result[0]?.Msg, 'success');
    Fetch_ProductDetails()
  }else{
    showToast(result[0]?.Msg, 'error')
  }
}

const openinfoTab = (infoTab)=>{
  if(accordian === infoTab ){
      setaccordian('')
  }else{
    setaccordian(infoTab)
  }
}


const handleShare = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url)
    .then(() => {
      showToast("🔗 URL copied to clipboard!", 'success');
    })
    .catch((err) => {
      console.error("Copy failed:", err);
    });
  }

const buyItNow = ()=>{
  setIsBuyitNow(true);
  AddToCart(product_Detail, Qty);
  navigate('/checkout')
}  

  useEffect(()=>{
    Fetch_ProductDetails()
  }, [param])


  return (
    <>
      {/* <!-- Product Main --> */}
      <Breadcrumb_Container pageName={product_Detail[0]?.ProductName}/> 
      <section className="pt-5">
        <div className="tf-main-product section-image-zoom">
          <div className="container">
            <div className="row">
              <Thumbnail_Slider product_Details={slider_Data} />
              <div className="col-md-6">
                <div className="tf-zoom-main"></div>
                <div className="tf-product-info-wrap other-image-zoom">
                  <div className="tf-product-info-list">
                    <div className="tf-product-heading">
                      <h5 className="product-name fw-medium">
                        {product_Detail[0]?.ProductName}
                      </h5>
                      {product_Detail[0]?.Reviews != "0" ? <div className="product-rate">
                        <div className="list-star">
                          <i className="icon icon-star"></i>
                          <i className="icon icon-star"></i>
                          <i className="icon icon-star"></i>
                          <i className="icon icon-star"></i>
                          <i className="icon icon-star"></i>
                        </div>
                        <span className="count-review">({product_Detail[0]?.Reviews})</span>
                      </div> : null}
                      <div className="product-price">
                        <div className="display-sm price-new price-on-sale">
                          {Currency?.Symbol}{product_Detail[0]?.ProductPrice}
                        </div>
                        <div className="display-sm price-old">
                          {Currency?.Symbol}{product_Detail[0]?.UsualPrice}
                        </div>
                        <span className="badge-sale">
                          {" "}
                          {(
                            ((product_Detail[0]?.UsualPrice -
                              product_Detail[0]?.ProductPrice) /
                              product_Detail[0]?.UsualPrice) *
                            100
                          ).toFixed(0)}
                          % Off
                        </span>
                      </div>
                      {product_Detail[0]?.StockLeft !== 0 ? (
                        <>
                          <div className="product-stock">
                            <svg
                              className="icon"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              {/* SVG Paths here */}
                            </svg>
                            {/* <span className="text-dark">
                          30 sold in last 24 hours
                        </span> */}
                          </div>
                          <div className="product-progress-sale">
                            <div className="title-hurry-up">
                              <span className="text-primary fw-medium">
                                HURRY UP!
                              </span>{" "}
                              Only{" "}
                              <span className="count">
                                {product_Detail[0]?.StockLeft}
                              </span>{" "}
                              items left!
                            </div>
                            <div className="progress-sold">
                              <Progress
                                className="progress-sold"
                                barStyle={{ backgroundColor: "#ff6f61" }}
                                style={{ height: "10px" }}
                                value={70}
                              />
                            </div>
                          </div>
                        </>
                      ) : null}
                    </div>
                    <div className="tf-product-variant">
                      <div className="variant-picker-item variant-color">
                        <div className="variant-picker-label">
                          Colors :
                          <span className="variant-picker-label-value value-currentColor">
                            {selectedColor}
                          </span>
                        </div>
                        <div className="variant-picker-values">
                          {Color.map((itm, idx) => (
                            <div
                              onClick={() =>
                                CheckVariation({ type: "color", name: itm })
                              }
                              key={idx}
                              className={`hover-tooltip tooltip-bot color-btn ${
                                selectedColor === itm ? "active" : ""
                              } `}
                              data-color={itm}
                            >
                              <span
                                className="check-color "
                                style={{ background: itm }}
                              ></span>
                              <span className="tooltip">{itm}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="variant-picker-item variant-size">
                        <div className="variant-picker-label">
                          <div>
                            Size:
                            <span className="variant-picker-label-value value-currentSize">
                              {selectedSize}
                            </span>
                          </div>
                          <a
                            href="#sizeGuide"
                            data-bs-toggle="modal"
                            className="size-guide link"
                          >
                            <SizeGuide />
                          </a>
                        </div>
                        {product_Detail[0]?.IsStock === 0 ? (
                          <p className="bg-danger d-inline px-3 rounded text-white">
                            Out of Stack
                          </p>
                        ) : null}
                        <div className="variant-picker-values">
                          {Size.map((itm, idx) => (
                            <span
                              key={idx}
                              onClick={() =>
                                CheckVariation({ type: "size", name: itm })
                              }
                              className={`size-btn text-uppercase ${
                                selectedSize === "Free Size" ? "freeSize" : ""
                              }  ${selectedSize === itm ? "active" : ""} `}
                              data-size="small"
                            >
                              {itm}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="tf-product-total-quantity">
                      <div className="group-btn">
                        <div className="wg-quantity">
                          <button
                            className="btn-quantity btn-decrease"
                            onClick={() => {
                              Qty > 1 ? setQty(Qty - 1) : null;
                            }}
                          >
                            -
                          </button>
                          <input
                            className="quantity-product"
                            type="text"
                            name="number"
                            value={Qty}
                          />
                          <button
                            className="btn-quantity btn-increase"
                            onClick={() => setQty(Qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <a
                          onClick={() => Add_To_Cart()}
                          className="tf-btn animate-btn btn-add-to-cart"
                        >
                          Add to cart
                        </a>
                      </div>
                      <a
                        onClick={()=> buyItNow()}
                        className="tf-btn btn-primary w-100 animate-btn"
                      >
                        Buy it now
                      </a>
                      <a
                        href="checkout.html"
                        className="more-choose-payment link"
                      >
                        More payment options
                      </a>
                    </div>
                    <div className="tf-product-extra-link">
                      <a
                        href="javascript:void(0);"
                        className="product-extra-icon link btn-add-wishlist"
                      >
                        <i
                          className={
                            product_Detail[0]?.Wishlisted === "0"
                              ? `icon add icon-heart d-block`
                              : `icon add icon-heart d-none`
                          }
                        ></i>
                        <span
                          onClick={() => {isLogin ?  ADD_ToWishList() :  showAlert("Not logged in yet.",  'Login required to access this feature.')}}
                          className={
                            product_Detail[0]?.Wishlisted === "0"
                              ? "add d-block"
                              : "add d-none"
                          }
                        >
                          Add to wishlist
                        </span>
                        <i
                          onClick={() =>
                            RemoveItem_FromWishList(
                              product_Detail[0]?.Wishlisted
                            )
                          }
                          className={
                            product_Detail[0]?.Wishlisted === "0"
                              ? `icon added icon-trash d-none`
                              : `icon added icon-trash d-block`
                          }
                        ></i>
                        <span
                          onClick={() =>
                            RemoveItem_FromWishList(
                              product_Detail[0]?.Wishlisted
                            )
                          }
                          className={
                            product_Detail[0]?.Wishlisted === "0"
                              ? "added d-none"
                              : "add d-block"
                          }
                        >
                          Remove from wishlist
                        </span>
                      </a>
                      {/* <a
                        href="#compare"
                        data-bs-toggle="modal"
                        className="product-extra-icon link"
                      >
                        <i className="icon icon-compare2"></i>Compare
                      </a> */}
                      {/* <a
                        href="#askQuestion"
                        data-bs-toggle="modal"
                        className="product-extra-icon link"
                      >
                        <i className="icon icon-ask"></i>Ask a question
                      </a> */}
                      <a
                        onClick={() => handleShare()}
                        className="product-extra-icon link"
                      >
                        <i className="icon icon-share"></i>Share
                      </a>
                    </div>

                    <div className="tf-product-trust-seal text-center">
                      <p className="text-md text-dark-2 text-seal fw-medium">
                        Guarantee Safe Checkout:
                      </p>
                      <ul className="list-card">
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/Visa.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/DinersClub.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/Mastercard.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/Stripe.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/PayPal.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/GooglePay.png`}
                            alt="card"
                          />
                        </li>
                        <li className="card-item">
                          <img
                            src={`${
                              import.meta.env.VITE_DAYNAMIC_IMG_URL
                            }/payment/ApplePay.png`}
                            alt="card"
                          />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <section className=" pt-5">
                <div className="container">
                  <div
                    className="widget-accordion wd-product-descriptions"
                    onClick={() => openinfoTab("description")}
                  >
                    <div
                      className="accordion-title collapsed"
                      data-bs-target="#description"
                      data-bs-toggle="collapse"
                      aria-expanded="true"
                      aria-controls="description"
                      role="button"
                    >
                      <span>Descriptions</span>
                      <span className="icon icon-arrow-down"></span>
                    </div>
                    <div
                      id="description"
                      className={
                        accordian === "description" ? `show` : `collapse`
                      }
                    >
                      <div className="accordion-body widget-desc">
                        <div className="item">
                          {product_Detail[0]?.LongDescription ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: product_Detail[0]?.LongDescription,
                              }}
                            />
                          ) : (
                            <p>Descriptions Not Available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion wd-product-descriptions">
                    <div
                      className="accordion-title collapsed"
                      onClick={() => openinfoTab("Matrial")}
                      aria-expanded="true"
                      aria-controls="material"
                      role="button"
                    >
                      <span>Materials</span>
                      <span className="icon icon-arrow-down"></span>
                    </div>
                    <div
                      id="material"
                      className={accordian === "Matrial" ? `show` : `collapse`}
                    >
                      <div className="accordion-body widget-material">
                        <div className="item">
                          {product_Detail[0]?.ShortDescription ? (
                            <p
                              dangerouslySetInnerHTML={{
                                __html: product_Detail[0]?.ShortDescription,
                              }}
                            />
                          ) : (
                            <p>Materials Details Not Available</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion wd-product-descriptions">
                    <div
                      className="accordion-title collapsed"
                      onClick={() => openinfoTab("return_policy")}
                      aria-expanded="true"
                      aria-controls="returnPolicies"
                      role="button"
                    >
                      <span>Return Policies</span>
                      <span className="icon icon-arrow-down"></span>
                    </div>
                    <div
                      id="returnPolicies"
                      className={
                        accordian === "return_policy" ? `show` : `collapse`
                      }
                    >
                      <div className="accordion-body">
                        <ul className="list-policies">
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M8.7 30.7h22.7c.3 0 .6-.2.7-.6l4-25.3c-.1-.4-.3-.7-.7-.8s-.7.2-.8.6L34 8.9l-3-1.1c-2.4-.9-5.1-.5-7.2 1-2.3 1.6-5.3 1.6-7.6 0-2.1-1.5-4.8-1.9-7.2-1L6 8.9l-.7-4.3c0-.4-.4-.7-.7-.6-.4.1-.6.4-.6.8l4 25.3c.1.3.3.6.7.6zm.8-21.6c2-.7 4.2-.4 6 .8 1.4 1 3 1.5 4.6 1.5s3.2-.5 4.6-1.5c1.7-1.2 4-1.6 6-.8l3.3 1.2-3 19.1H9.2l-3-19.1 3.3-1.2zM32 32H8c-.4 0-.7.3-.7.7s.3.7.7.7h24c.4 0 .7-.3.7-.7s-.3-.7-.7-.7zm0 2.7H8c-.4 0-.7.3-.7.7s.3.6.7.6h24c.4 0 .7-.3.7-.7s-.3-.6-.7-.6zm-17.9-8.9c-1 0-1.8-.3-2.4-.6l.1-2.1c.6.4 1.4.6 2 .6.8 0 1.2-.4 1.2-1.3s-.4-1.3-1.3-1.3h-1.3l.2-1.9h1.1c.6 0 1-.3 1-1.3 0-.8-.4-1.2-1.1-1.2s-1.2.2-1.9.4l-.2-1.9c.7-.4 1.5-.6 2.3-.6 2 0 3 1.3 3 2.9 0 1.2-.4 1.9-1.1 2.3 1 .4 1.3 1.4 1.3 2.5.3 1.8-.6 3.5-2.9 3.5zm4-5.5c0-3.9 1.2-5.5 3.2-5.5s3.2 1.6 3.2 5.5-1.2 5.5-3.2 5.5-3.2-1.6-3.2-5.5zm4.1 0c0-2-.1-3.5-.9-3.5s-1 1.5-1 3.5.1 3.5 1 3.5c.8 0 .9-1.5.9-3.5zm4.5-1.4c-.9 0-1.5-.8-1.5-2.1s.6-2.1 1.5-2.1 1.5.8 1.5 2.1-.5 2.1-1.5 2.1zm0-.8c.4 0 .7-.5.7-1.2s-.2-1.2-.7-1.2-.7.5-.7 1.2.3 1.2.7 1.2z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M36.7 31.1l-2.8-1.3-4.7-9.1 7.5-3.5c.4-.2.6-.6.4-1s-.6-.5-1-.4l-7.5 3.5-7.8-15c-.3-.5-1.1-.5-1.4 0l-7.8 15L4 15.9c-.4-.2-.8 0-1 .4s0 .8.4 1l7.5 3.5-4.7 9.1-2.8 1.3c-.4.2-.6.6-.4 1 .1.3.4.4.7.4.1 0 .2 0 .3-.1l1-.4-1.5 2.8c-.1.2-.1.5 0 .8.1.2.4.3.7.3h31.7c.3 0 .5-.1.7-.4.1-.2.1-.5 0-.8L35.1 32l1 .4c.1 0 .2.1.3.1.3 0 .6-.2.7-.4.1-.3 0-.8-.4-1zm-5.1-2.3l-9.8-4.6 6-2.8 3.8 7.4zM20 6.4L27.1 20 20 23.3 12.9 20 20 6.4zm-7.8 15l6 2.8-9.8 4.6 3.8-7.4zm22.4 13.1H5.4L7.2 31 20 25l12.8 6 1.8 3.5z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M5.9 5.9v28.2h28.2V5.9H5.9zM19.1 20l-8.3 8.3c-2-2.2-3.2-5.1-3.2-8.3s1.2-6.1 3.2-8.3l8.3 8.3zm-7.4-9.3c2.2-2 5.1-3.2 8.3-3.2s6.1 1.2 8.3 3.2L20 19.1l-8.3-8.4zM20 20.9l8.3 8.3c-2.2 2-5.1 3.2-8.3 3.2s-6.1-1.2-8.3-3.2l8.3-8.3zm.9-.9l8.3-8.3c2 2.2 3.2 5.1 3.2 8.3s-1.2 6.1-3.2 8.3L20.9 20zm8.4-10.2c-1.2-1.1-2.6-2-4.1-2.6h6.6l-2.5 2.6zm-18.6 0L8.2 7.2h6.6c-1.5.6-2.9 1.5-4.1 2.6zm-.9.9c-1.1 1.2-2 2.6-2.6 4.1V8.2l2.6 2.5zM7.2 25.2c.6 1.5 1.5 2.9 2.6 4.1l-2.6 2.6v-6.7zm3.5 5c1.2 1.1 2.6 2 4.1 2.6H8.2l2.5-2.6zm18.6 0l2.6 2.6h-6.6c1.4-.6 2.8-1.5 4-2.6zm.9-.9c1.1-1.2 2-2.6 2.6-4.1v6.6l-2.6-2.5zm2.6-14.5c-.6-1.5-1.5-2.9-2.6-4.1l2.6-2.6v6.7z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M35.1 33.6L33.2 6.2c0-.4-.3-.7-.7-.7H13.9c-.4 0-.7.3-.7.7s.3.7.7.7h18l.7 10.5H20.8c-8.8.2-15.9 7.5-15.9 16.4 0 .4.3.7.7.7h28.9c.2 0 .4-.1.5-.2s.2-.3.2-.5v-.2h-.1zm-28.8-.5C6.7 25.3 13 19 20.8 18.9h11.9l1 14.2H6.3zm11.2-6.8c0 1.2-1 2.1-2.1 2.1s-2.1-1-2.1-2.1 1-2.1 2.1-2.1 2.1 1 2.1 2.1zm6.3 0c0 1.2-1 2.1-2.1 2.1-1.2 0-2.1-1-2.1-2.1s1-2.1 2.1-2.1 2.1 1 2.1 2.1z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M20 33.8c7.6 0 13.8-6.2 13.8-13.8S27.6 6.2 20 6.2 6.2 12.4 6.2 20 12.4 33.8 20 33.8zm0-26.3c6.9 0 12.5 5.6 12.5 12.5S26.9 32.5 20 32.5 7.5 26.9 7.5 20 13.1 7.5 20 7.5zm-.4 15h.5c1.8 0 3-1.1 3-3.7 0-2.2-1.1-3.6-3.1-3.6h-2.6v10.6h2.2v-3.3zm0-5.2h.4c.6 0 .9.5.9 1.7 0 1.1-.3 1.7-.9 1.7h-.4v-3.4z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M30.2 29.3c2.2-2.5 3.6-5.7 3.6-9.3s-1.4-6.8-3.6-9.3l3.6-3.6c.3-.3.3-.7 0-.9-.3-.3-.7-.3-.9 0l-3.6 3.6c-2.5-2.2-5.7-3.6-9.3-3.6s-6.8 1.4-9.3 3.6L7.1 6.2c-.3-.3-.7-.3-.9 0-.3.3-.3.7 0 .9l3.6 3.6c-2.2 2.5-3.6 5.7-3.6 9.3s1.4 6.8 3.6 9.3l-3.6 3.6c-.3.3-.3.7 0 .9.1.1.3.2.5.2s.3-.1.5-.2l3.6-3.6c2.5 2.2 5.7 3.6 9.3 3.6s6.8-1.4 9.3-3.6l3.6 3.6c.1.1.3.2.5.2s.3-.1.5-.2c.3-.3.3-.7 0-.9l-3.8-3.6z"
                              ></path>
                            </svg>
                          </li>
                          <li>
                            <svg
                              viewBox="0 0 40 40"
                              width="35px"
                              height="35px"
                              color="#222"
                            >
                              <path
                                fill="currentColor"
                                d="M34.1 34.1H5.9V5.9h28.2v28.2zM7.2 32.8h25.6V7.2H7.2v25.6zm13.5-18.3a.68.68 0 0 0-.7-.7.68.68 0 0 0-.7.7v10.9a.68.68 0 0 0 .7.7.68.68 0 0 0 .7-.7V14.5z"
                              ></path>
                            </svg>
                          </li>
                        </ul>
                        <p className="text-center text-paragraph">
                          LT01: 70% wool, 15% polyester, 10% polyamide, 5%
                          acrylic 900 Grms/mt
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion wd-product-descriptions">
                    <div
                      className="accordion-title collapsed"
                      onClick={() => openinfoTab("Additional_info")}
                    >
                      <span>Additional Information</span>
                      <span className="icon icon-arrow-down"></span>
                    </div>
                    <div
                      id="addInformation"
                      className={
                        accordian === "Additional_info" ? `show` : `collapse`
                      }
                    >
                      <div className="accordion-body">
                        <table className="tb-info-product text-md">
                          <tbody>
                            <tr className="tb-attr-item">
                              <th className="tb-attr-label">Product Details</th>
                            </tr>
                            <tr className="tb-attr-item">
                              <th className="tb-attr-label">Color</th>
                              <td className="tb-attr-value">
                                <p>{selectedColor}</p>
                              </td>
                            </tr>
                            <tr className="tb-attr-item">
                              <th className="tb-attr-label">Brand</th>
                              <td className="tb-attr-value">
                                <p>{product_Detail[0]?.Brand}</p>
                              </td>
                            </tr>
                            <tr className="tb-attr-item">
                              <th className="tb-attr-label">Size</th>
                              <td className="tb-attr-value">
                                <p className="text-uppercase">{selectedSize}</p>
                              </td>
                            </tr>
                            <tr className="tb-attr-item">
                              <th className="tb-attr-label">SKU</th>
                              <td className="tb-attr-value">
                                <p>{product_Detail[0]?.ProductSKU}</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="widget-accordion wd-product-descriptions">
                    <div
                      className="accordion-title collapsed"
                      onClick={() => openinfoTab("Reviews")}
                    >
                      <span>Reviews</span>
                      <span className="icon icon-arrow-down"></span>
                    </div>
                    <div  className={accordian === "Reviews" ? `show` : `collapse`}>
                    {P_reviewList.length > 0 ? <div className="accordion-body wd-customer-review d-flex justify-content-between gap-5 flex-wrap flex-md-nowrap">
                        <div className="review-heading">
                          <h6 className="title my-3">Customer review</h6>
                          <div className="box-rate-review w-100 px-3">
                            <div className="rating-summary d-flex justify-content-between">
                              <ul className="list-star d-flex">
                                <li>
                                  <i className="icon icon-star"></i>
                                </li>
                                <li>
                                  <i className="icon icon-star"></i>
                                </li>
                                <li>
                                  <i className="icon icon-star"></i>
                                </li>
                                <li>
                                  <i className="icon icon-star"></i>
                                </li>
                                <li>
                                  <i className="icon icon-star"></i>
                                </li>
                                <li>
                                  <span className="count-star text-md">
                                    ({P_reviewList.length})
                                  </span>
                                </li>
                              </ul>
                              <span className="text-md rating-average">
                                {ReviewCount?.averageRating}/5.0
                              </span>
                            </div>
                            <div className="rating-breakdown">
                              <div className="rating-breakdown-item">
                                <div className="rating-score  d-flex">
                                  5 <i className="icon icon-star"></i>
                                </div>
                                <div className="rating-bar">
                                  <div
                                    className="value"
                                    style={{ width: "100%" }}
                                  ></div>
                                </div>
                                <span className="rating-count">
                                  {ReviewCount?.ratingCount?.five}
                                </span>
                              </div>
                              <div className="rating-breakdown-item">
                                <div className="rating-score  d-flex">
                                  4 <i className="icon icon-star"></i>
                                </div>
                                <div className="rating-bar">
                                  <div
                                    className="value"
                                    style={{ width: "50%" }}
                                  ></div>
                                </div>
                                <span className="rating-count">
                                  {ReviewCount?.ratingCount?.four}
                                </span>
                              </div>
                              <div className="rating-breakdown-item">
                                <div className="rating-score  d-flex">
                                  3 <i className="icon icon-star"></i>
                                </div>
                                <div className="rating-bar">
                                  <div
                                    className="value"
                                    style={{ width: "0%" }}
                                  ></div>
                                </div>
                                <span className="rating-count">
                                  {ReviewCount?.ratingCount?.three}
                                </span>
                              </div>
                              <div className="rating-breakdown-item">
                                <div className="rating-score  d-flex">
                                  2 <i className="icon icon-star"></i>
                                </div>
                                <div className="rating-bar">
                                  <div
                                    className="value"
                                    style={{ width: "0%" }}
                                  ></div>
                                </div>
                                <span className="rating-count">
                                  {ReviewCount?.ratingCount?.two}
                                </span>
                              </div>
                              <div className="rating-breakdown-item">
                                <div className="rating-score  d-flex">
                                  1 <i className="icon icon-star"></i>
                                </div>
                                <div className="rating-bar">
                                  <div
                                    className="value"
                                    style={{ width: "0%" }}
                                  ></div>
                                </div>
                                <span className="rating-count">
                                  {ReviewCount?.ratingCount?.one}
                                </span>
                              </div>
                            </div>
                            {!isLogin ? (
                              <button
                                className="tf-btn animate-btn mt-3 px-5 py-2"
                                onClick={() =>
                                  !isLogin
                                    ? showAlert("Not logged in yet.",  'Login required to access this feature.')
                                    : null
                                }
                              >
                                Write Review
                              </button>
                            ) : null}
                          </div>
                        </div>
                        <div className="review-section">
                          <ul className="review-list">
                            {P_reviewList.map((itm, idx) => (
                              <li className="review-item mt-3" key={idx}>
                                <div className="review-avt">
                                  <img
                                    src={`${
                                      import.meta.env.BASE_URL
                                    }/assets/Images/avatar/blog-author-1.jpg`}
                                    alt="avt"
                                  />
                                </div>
                                <div className="review-content w-100">
                                  <div className="review-info">
                                    <div className="review-meta">
                                      <span className="review-author fw-medium text-md">
                                        {itm?.Name}
                                      </span>
                                      <span className="review-date text-sm">
                                        {itm?.ReviewDate}
                                      </span>
                                    </div>
                                    <div className="list-star star-4">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}>
                                          {star <= itm.Rating ? (
                                            <i className="icon icon-star"></i>
                                          ) : (
                                            <i className="icon icon-star unactive-start"></i>
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text text-sm text-main-4">
                                    {itm?.Comment}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          {isLogin ? (
                            <Formik
                              initialValues={userReview_Values}
                              validationSchema={userReview_Validation}
                              onSubmit={AddReview}
                            >
                              {({ isSubmitting, values, setFieldValue }) => (
                                <Form className="form-review">
                                  <h6 className="title mb-4">Write a review</h6>
                                  <p className="note text-md text-main-4">
                                    Your email address will not be
                                    published.&nbsp;Required fields are
                                    marked&nbsp;*
                                  </p>
                                  <div className="box-rating mb-2">
                                    <span className="text-md">
                                      Your rating *
                                    </span>
                                    <div className="list-rating-check">
                                      {[5, 4, 3, 2, 1].map((star) => (
                                        <React.Fragment key={star}>
                                          <Field
                                            type="radio"
                                            id={`star${star}`}
                                            name="Rating"
                                            value={String(star)}
                                          />
                                          <label
                                            htmlFor={`star${star}`}
                                            title={`${star} stars`}
                                          />
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                  <ErrorMessage
                                    name="Rating"
                                    component="div"
                                    className="text-danger my-2"
                                  />
                                  <div className="group-2-ip">
                                    <Field
                                      name="Name"
                                      type="text"
                                      className=""
                                      placeholder="Name*"
                                      readOnly
                                    />
                                    <ErrorMessage name="Name" />

                                    <Field
                                      name="Email"
                                      type="email"
                                      className=""
                                      placeholder="Email *"
                                      readOnly
                                    />
                                    <ErrorMessage name="Email" />
                                  </div>
                                  <Field
                                    as="textarea"
                                    id="note"
                                    placeholder="Your review *"
                                    name="Comment"
                                  />
                                  <ErrorMessage
                                    name="Comment"
                                    component="div"
                                    className="text-danger my-2"
                                  />

                                  <div className="check-save mt-4 d-flex gap-2 align-items-center">
                                    <input
                                      type="checkbox"
                                      className="tf-check"
                                      id="checksave"
                                    />
                                    <label
                                      for="checksave"
                                      className="label text-md"
                                    >
                                      Save my name, email, and website in this
                                      browser for the next time I comment.
                                    </label>
                                  </div>
                                  <button
                                    type="submit"
                                    className="tf-btn animate-btn mt-3"
                                  >
                                    Submit
                                  </button>
                                </Form>
                              )}
                            </Formik>
                          ) : null}
                        </div>
                      </div>
                       : <div className="accordion-body wd-customer-review d-flex justify-content-between gap-5 flex-wrap flex-md-nowrap">
                      <div className="review-heading">
                          <h6 className="title my-3">Customer review</h6>
                          <div className="box-rate-review w-100 px-3">
                            <div className="rating-summary d-flex justify-content-between">
                              <p>No Reviews Found!</p>
                            </div>
                          
                          </div>
                        </div>
                         <div className="review-section">
                          <ul className="review-list">
                            {P_reviewList.map((itm, idx) => (
                              <li className="review-item mt-3" key={idx}>
                                <div className="review-avt">
                                  <img
                                    src={`${
                                      import.meta.env.BASE_URL
                                    }/assets/Images/avatar/blog-author-1.jpg`}
                                    alt="avt"
                                  />
                                </div>
                                <div className="review-content w-100">
                                  <div className="review-info">
                                    <div className="review-meta">
                                      <span className="review-author fw-medium text-md">
                                        {itm?.Name}
                                      </span>
                                      <span className="review-date text-sm">
                                        {itm?.ReviewDate}
                                      </span>
                                    </div>
                                    <div className="list-star star-4">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <span key={star}>
                                          {star <= itm.Rating ? (
                                            <i className="icon icon-star"></i>
                                          ) : (
                                            <i className="icon icon-star unactive-start"></i>
                                          )}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <p className="text text-sm text-main-4">
                                    {itm?.Comment}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ul>
                          {isLogin ? (
                            <Formik
                              initialValues={userReview_Values}
                              validationSchema={userReview_Validation}
                              onSubmit={AddReview}
                            >
                              {({ isSubmitting, values, setFieldValue }) => (
                                <Form className="form-review">
                                  <h6 className="title mb-4">Write a review</h6>
                                  <p className="note text-md text-main-4">
                                    Your email address will not be
                                    published.&nbsp;Required fields are
                                    marked&nbsp;*
                                  </p>
                                  <div className="box-rating mb-2">
                                    <span className="text-md">
                                      Your rating *
                                    </span>
                                    <div className="list-rating-check">
                                      {[5, 4, 3, 2, 1].map((star) => (
                                        <React.Fragment key={star}>
                                          <Field
                                            type="radio"
                                            id={`star${star}`}
                                            name="Rating"
                                            value={String(star)}
                                          />
                                          <label
                                            htmlFor={`star${star}`}
                                            title={`${star} stars`}
                                          />
                                        </React.Fragment>
                                      ))}
                                    </div>
                                  </div>
                                  <ErrorMessage
                                    name="Rating"
                                    component="div"
                                    className="text-danger my-2"
                                  />
                                  <div className="group-2-ip">
                                    <Field
                                      name="Name"
                                      type="text"
                                      className=""
                                      placeholder="Name*"
                                      readOnly
                                    />
                                    <ErrorMessage name="Name" />

                                    <Field
                                      name="Email"
                                      type="email"
                                      className=""
                                      placeholder="Email *"
                                      readOnly
                                    />
                                    <ErrorMessage name="Email" />
                                  </div>
                                  <Field
                                    as="textarea"
                                    id="note"
                                    placeholder="Your review *"
                                    name="Comment"
                                  />
                                  <ErrorMessage
                                    name="Comment"
                                    component="div"
                                    className="text-danger my-2"
                                  />

                                  <div className="check-save mt-4 d-flex gap-2 align-items-center">
                                    <input
                                      type="checkbox"
                                      className="tf-check"
                                      id="checksave"
                                    />
                                    <label
                                      for="checksave"
                                      className="label text-md"
                                    >
                                      Save my name, email, and website in this
                                      browser for the next time I comment.
                                    </label>
                                  </div>
                                  <button
                                    type="submit"
                                    className="tf-btn animate-btn mt-3"
                                  >
                                    Submit
                                  </button>
                                </Form>
                              )}
                            </Formik>
                          ) : null}
                        </div>
                      </div>}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {relatedProduct.length > 0 ? <section >
          <div className="container">
            <div className="flat-title wow fadeInUp">
              <h4 className="title">Related Products</h4>
            </div>
            <Product_Slider data={relatedProduct} />
          </div>
        </section>: null}
        <div className="tf-sticky-btn-atc show">
          <div className="container">
            <div className="tf-height-observer w-100 d-flex align-items-center">
              <div className="tf-sticky-atc-product d-flex align-items-center">
                <div className="tf-sticky-atc-img">
                  <img
                    className="lazyload"
                    data-src="images/products/fashion/thumbs/thumb-black2.jpg"
                    alt=""
                    src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${
                      product_Detail[0]?.VDefaultImage
                    }`}
                  />
                </div>
                <div className="tf-sticky-atc-title fw-5 d-xl-block d-none">
                  {" "}
                  {product_Detail[0]?.ProductName}
                </div>
              </div>
              <div className="tf-sticky-atc-infos">
                <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  onSubmit={(values) => {
                    const [color, size] = values.selectedVariant.split("-");
                    CheckProductBySizeColor({ color, size });
                    Add_To_Cart();
                  }}
                >
                  {({ values, setFieldValue }) => (
                    <Form className="">
                      <div className="tf-sticky-atc-variant-price text-center tf-select">
                        <Field
                          as="select"
                          name="selectedVariant"
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            setFieldValue("selectedVariant", selectedValue);
                            const [color, size] = selectedValue.split("-");
                            CheckProductBySizeColor({ color, size });
                          }}
                        >
                          <option value="">Select variant</option>
                          {ColorSizeList.map((itm, idx) => (
                            <option
                              key={idx}
                              value={`${itm.Color}-${itm.Size}`}
                            >
                              {itm.Color} / {itm.Size} - {Currency?.Symbol}{itm.ProductPrice}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <div className="tf-sticky-atc-btns">
                        <div className="tf-product-info-quantity">
                          <div className="wg-quantity">
                            <button
                              type="button"
                              className="btn-quantity minus-btn"
                              onClick={() => {
                                if (values.quantity > 1) {
                                  setFieldValue(
                                    "quantity",
                                    values.quantity - 1
                                  );
                                }
                              }}
                            >
                              -
                            </button>
                            <Field
                              type="text"
                              name="quantity"
                              className="quantity-product font-4"
                              value={values.quantity}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn-quantity plus-btn"
                              onClick={() =>
                                setFieldValue("quantity", values.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="tf-btn animate-btn d-inline-flex justify-content-center"
                        >
                          Add to cart
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section> 
      {/* <!-- /Product Main --> */}
    </>
  );
};

export default ProductDetails_Container;
