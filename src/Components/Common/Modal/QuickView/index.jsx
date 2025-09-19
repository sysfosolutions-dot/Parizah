import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import Cookies from "js-cookie";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Product_Service } from '../../../../Services/Product/ProductService';
import ShoppingCartContext from '../../../../Context/Shopping_Cart';
import AccountContext from '../../../../Context/Account';
const img_URL = import.meta.env.VITE_IMG_URL
function QuickView_Modal(props) {
    const {productIdx} = props
    //console.log(productIdx);
    const [modal, setModal] = useState(false);
    const [slider_Data, setslider_Data] = useState([]);
    const [productDetailsData, setproductDetailsData] = useState([]);
    const {AddToCart} = useContext(ShoppingCartContext);
    const [Qty, setQty] = useState(1);
    const [ColorSizeList, setColorSizeList] = useState([]);
    const [VariationList, setVariationList] = useState([]);
    const [Color, setColor] = useState([]);
    const [Size, setSize] = useState([]);
    const [ActiveColor, setActiveColor] = useState(null);
    const [ActiveSize, setActiveSize] = useState(null);
    const [Changedproduct, setChangedproduct] = useState({productId:'', variationID:''});
    const [IsproductChanged, setIsproductChanged] = useState(false)
    const imageRefs = useRef([]);
    const {UseFetchProduct_Details, Custom_api_call} = Product_Service();
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
    const {Currency} = useContext(AccountContext)
    const toggle = () => setModal(!modal);
    
    const FetchProduct_Details = async ()=>{
      const CookieId = Cookies.get('user_id');
          const OBJ ={
            ProductId:!IsproductChanged ?  productIdx?.ProductId : Changedproduct?.productId,
            ProductVariantId:!IsproductChanged ? productIdx?.PVDId : Changedproduct?.variationID,
            CookieId:CookieId,
            ClientId:ClientID || "0",
          }
        const result = await UseFetchProduct_Details(OBJ);
        if(Array.isArray(result)){
            setproductDetailsData(result);
            const Data = result.map((itm)=>  JSON.parse(itm?.SideImage));
            setslider_Data(Data[0]);
                  const parts = result[0]?.ProductVariation.split(",");
                  let color = "";
                  let size = "";
                  parts.forEach((part) => {
                    const [key, value] = part.split(":");
                    if (key.toLowerCase() === "color") {
                      color = value;
                    } else if (key.toLowerCase() === "size") {
                      size = value;
                    }
                  }); 
                setActiveColor(color);
                setActiveSize(size);
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
          setIsproductChanged(false)
        }else{
            setproductDetailsData([])
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

  // normalize data

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
    currentVariation = normalizeVariation(`Color:${name},Size:${ActiveSize}`);
    setActiveColor(name); // ✅ update active color
  } else {
    currentVariation = normalizeVariation(`Color:${ActiveColor},Size:${name}`);
    setActiveSize(name); // ✅ update active size
  }

  const DATAlist = VariationList[0].filter(
    (itm) => normalizeVariation(itm.ProductVariation) === currentVariation
  );

  if (DATAlist.length > 0) {
    setChangedproduct({
      productId: DATAlist[0]?.ProductId,
      variationID: DATAlist[0]?.ProductVariantDetailId,
    });
    setIsproductChanged(true);
  }
};


// Add to Cart 

  // Adding Product to Cart 
  const Add_To_Cart = ()=>{
    AddToCart(productDetailsData, Qty);
  }


useEffect(() => {
    if (modal && productIdx?.ProductId && productIdx?.PVDId ) {
        FetchProduct_Details();
    }
}, [modal, productIdx]);

useEffect(() => {
  if (IsproductChanged) {
    FetchProduct_Details();
  }
}, [IsproductChanged]);

  return (
    <div>
          <div data-bs-toggle="modal" onClick={toggle} className="hover-tooltip box-icon quickview">
              <span className="icon icon-view"></span>
              <span className="tooltip" >
                    Quick View
                </span>
        </div>
      <Modal isOpen={modal} toggle={toggle}  size="xl" className='py-0'>
        <ModalBody className=' py-0 ps-0'>
        <div className="modal-dialog modal-dialog-centered my-0">
            <div className="modal-content flex-md-row">
                <span className="icon-close icon-close-popup" onClick={toggle}></span>
                <div className="tf-product-media-wrap quick-view-modal col-5">
                       <div dir="ltr" className="swiper tf-single-slide h-100">
                    <Swiper
                          
                                  navigation={{
                                    nextEl: '.thumbs-next',
                                    prevEl: '.thumbs-prev',
                                  }}
                                  modules={[Navigation, Thumbs]}
                                  className="tf-product-media-main h-100"
                                >
                                  {slider_Data.map((item, index) => (
                                    <SwiperSlide key={index}>
                                      <Link to="#" className="item h-100">
                                        <div
                                          style={{
                                            width: '100%',
                                            height: '100%',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            border: '1px solid #eee',
                                          }}
                                        >
                                          <img
                                            ref={(el) => (imageRefs.current[index] = el)}
                                            src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${item?.ImageValue}`}
                                            alt={`Product ${item?.ImageValue}`}

                                            style={{
                                              width: '100%',
                                              height: '100%',
                                              objectFit: 'cover',
                                              transition: 'transform 0.3s ease',
                                            }}
                                          />
                                        </div>
                                      </Link>
                                    </SwiperSlide>
                                  ))}
                                </Swiper>
                        <div className="swiper-button-prev nav-swiper arrow-1 nav-prev-cls single-slide-prev"></div>
                        <div className="swiper-button-next nav-swiper arrow-1 nav-next-cls single-slide-next"></div>
                    </div>
                                  
                </div>
                <div className="tf-product-info-wrap p-4 col-7  ">
                    <div className="tf-product-info-inner">
                        <div className="tf-product-heading">
                            <h6 className="product-name"><a className="link" href="product-detail.html">{productDetailsData[0]?.ProductName}</a>
                            </h6>
                            <div className="product-price">
                                <h6 className="price-new price-on-sale">{Currency.Symbol}{productDetailsData[0]?.ProductPrice}</h6>
                                <h6 className="price-old">{Currency.Symbol}{productDetailsData[0]?.UsualPrice}</h6>
                                <span className="badge-sale">{(
                            ((productDetailsData[0]?.UsualPrice -
                              productDetailsData[0]?.ProductPrice) /
                              productDetailsData[0]?.UsualPrice) *
                            100
                          ).toFixed(0)}% Off</span>
                            </div>
                        </div>
                        <div className="tf-product-variant">
                            <div className="variant-picker-item variant-color">
                                <div className="variant-picker-label">
                                    Color:<span className="variant-picker-label-value value-currentColor">{ActiveColor}</span>
                                </div>
                                {/* <div className="variant-picker-values">
                                    {Color.map((itm, idx)=> <div onClick={() => CheckVariation({ type: "color", name: itm })}  key={idx} className={`${ActiveColor === itm ? 'active' : ''} hover-tooltip color-btn`} data-color="orange">
                                        <span className="check-color" style={{background:itm}}></span>
                                        <span className="tooltip">{itm}</span>
                                    </div>)}
                                </div> */}
                                  <div className="variant-picker-values">
                          {Color.map((itm, idx) => (
                            <div
                              onClick={() =>
                                CheckVariation({ type: "color", name: itm })
                              }
                              key={idx}
                              className={`hover-tooltip tooltip-bot color-btn ${
                                ActiveColor === itm ? "active" : ""
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
                                    <div>Size:<span className="variant-picker-label-value value-currentSize">{ActiveSize}</span>
                                     {productDetailsData[0]?.IsStock === 0 ? (
                                  <p className="bg-danger  px-3 rounded text-white">
                            Out of Stack
                          </p>
                        ) : null}
                                    </div>
                                </div>
                                <div className="variant-picker-values py-3">
                                    {Size.map((itm, idx)=> <span key={idx}  onClick={() => CheckVariation({ type: "size", name: itm })} 
                                    className={`${ActiveSize === itm ? 'active text-uppercase' : 'text-uppercase'} size-btn`} data-size="small">{itm}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="tf-product-total-quantity">
                            <div className="group-btn">
                                <div className="wg-quantity">
                                    <button className="btn-quantity minus-btn" onClick={()=> Qty > 1 ? setQty(Qty - 1) : null}>-</button>
                                    <input className="quantity-product font-4" type="text" name="number" value={Qty}/>
                                    <button className="btn-quantity plus-btn" onClick={()=> setQty(Qty + 1)}>+</button>
                                </div>
                                <a   onClick={() => Add_To_Cart()} data-bs-toggle="offcanvas" className="tf-btn hover-primary">Add to
                                    cart</a>
                            </div>
                            <a href="checkout.html" className="tf-btn w-100 animate-btn paypal btn-primary">Buy It Now</a>
                            <a href="checkout.html" className="more-choose-payment link">More payment options</a>
                        </div>
                        <Link to={`/product/${productDetailsData[0]?.ProductType}/${productDetailsData[0]?.ProductId}/${productDetailsData[0]?.ProductVariantDetailId}`} className="view-details link">View full details <i
                                className="icon icon-arrow-right"></i></Link>
                    </div>
                </div>
            </div>
        </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default QuickView_Modal;