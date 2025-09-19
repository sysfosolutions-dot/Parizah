import React, { useState, useContext, useRef, useEffect   } from 'react';
import Cookies from "js-cookie";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ShoppingCartContext from '../../../../Context/Shopping_Cart';
import { Product_Service } from '../../../../Services/Product/ProductService';
import { useNavigate } from 'react-router-dom';


const QuickADDTo_Cart = (props) => {
       const {productdata} = props
       const [modal, setModal] = useState(false);
       const [slider_Data, setslider_Data] = useState([]);
       const [productDetailsData, setproductDetailsData] = useState([]);
       const {AddToCart, isBuyitNow, setIsBuyitNow} = useContext(ShoppingCartContext);
       const [Qty, setQty] = useState(1);
       const [ColorSizeList, setColorSizeList] = useState([]);
       const [VariationList, setVariationList] = useState([]);
       const [Color, setColor] = useState([]);
       const navigate = useNavigate()
       const [Size, setSize] = useState([]);
       const [ActiveColor, setActiveColor] = useState(null);
       const [ActiveSize, setActiveSize] = useState(null);
       const [Changedproduct, setChangedproduct] = useState({productId:'', variationID:''});
       const [IsproductChanged, setIsproductChanged] = useState(false)
       const imageRefs = useRef([]);
       const {UseFetchProduct_Details, Custom_api_call} = Product_Service();
       const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
      //  //console.log(productdata);
       
    const toggle = () =>{
        setModal(!modal);
        if(!modal){
            setQty(1)
        }
    } 
    
    const FetchProduct_Details = async ()=>{
      const CookieId = Cookies.get('user_id');
          const OBJ ={
            ProductId:!IsproductChanged ?  productdata?.ProductId : Changedproduct?.productId,
            ProductVariantId:!IsproductChanged ? productdata?.PVDId || productdata?.ProductVariantDetailId : Changedproduct?.variationID,
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

// Buy it Now

const buyItNow = ()=>{
  setIsBuyitNow(true);
  AddToCart(productDetailsData, Qty);
  navigate('/checkout')
}
 

useEffect(() => {
    if (modal && productdata?.ProductId && productdata?.PVDId || modal && productdata?.ProductId && productdata?.ProductVariantDetailId ) {
        FetchProduct_Details();
    }
}, [modal, productdata]);

useEffect(() => {
  if (IsproductChanged) {
    FetchProduct_Details();
  }
}, [IsproductChanged]);
  return (
    <>
         <a onClick={toggle}  className="box-icon hover-tooltip tooltip-left"> 
            <span className="icon icon-cart2"></span> 
            <span className="tooltip">Add to Cart</span>
                              </a>
     <Modal isOpen={modal} toggle={toggle}  size="md" className='popup-quickadd py-0'>

    <div className="modal-dialog modal-dialog-centered py-0 mt-0">
        <div className="modal-content px-2 py-0">
            <span className="icon-close icon-close-popup" onClick={toggle}></span>
            <div className="main-product-quickadd card-product">
                <div className="item-product-info">
                    <div className="product-img">
                        <img className="img-product lazyload" 
                            data-src="images/products/fashion/product-40.jpg"
                            src={import.meta.env.VITE_PUBLIC_PRODUCT_IMG + productdata?.ProductImage} alt="image-product"/>
                    </div>
                    <div className="content-box">
                        <a href="product-detail.html" className="name-product link text-lg">{productdata?.CategoryName}</a>
                        <div className="price-show-badge">
                            <div className="price-wrap">
                                <span className="price-new">${productdata?.ProductPrice}</span>
                                <span className="price-old">${productdata?.UsualPrice}</span>
                            </div>
                            <span className="on-sale-item">{(
                            ((productDetailsData[0]?.UsualPrice -
                              productDetailsData[0]?.ProductPrice) /
                              productDetailsData[0]?.UsualPrice) *
                            100
                          ).toFixed(0)}% Off</span>
                          
                        </div>
                    </div>
                </div>
                <div className="item-product-variant">
                    <div className="quickadd-variant-color">
                        <div className="variant-label text-md">Color: <span className="variant-value">{ActiveColor}</span></div>
                        <ul className="list-color-product">
                             {Color.map((itm, idx)=> <li onClick={() => CheckVariation({ type: "color", name: itm })} className={`${ActiveColor === itm ? 'active' : ''} list-color-item color-swatch hover-tooltip tooltip-bot border border-1`}>
                                <span className="tooltip color-label">{ActiveColor}</span>
                                <span className="swatch-value "  style={{background:itm}}></span>
                                <img className="lazyload" data-src="images/products/fashion/product-40.jpg"
                                    src="images/products/fashion/product-40.jpg" alt="image-product"/>
                            </li>)}

                        </ul>
                    </div>
                    <div className="quickadd-variant-size variant-picker-item">
                        <div className="variant-label text-md">Size: <span
                                className="variant-value value-currentSize">{ActiveSize}</span></div>
                        <div className="list-size variant-picker-values">
                           {Size.map((itm, idx)=> <button key={idx}  onClick={() => CheckVariation({ type: "size", name: itm })} 
                                    className={`${ActiveSize === itm ? 'active text-uppercase' : 'text-uppercase'} size-btn`} data-size="small">{itm}</button>)}
                        </div>
                    </div>

                </div>
                <div className="item-product-quantity">
                    <div className="label text-md">Quantity</div>
                    <div className="wg-quantity">
                        <button className="btn-quantity minus-btn" onClick={()=> Qty > 1 ? setQty(Qty - 1) : null}>-</button>
                        <input className="quantity-product font-4" type="text" name="number" value={Qty} readOnly/>
                        <button className="btn-quantity plus-btn" onClick={()=> setQty(Qty + 1) }>+</button>
                    </div>
                </div>
                <div className="item-product-group-btn">
                    <a onClick={() => Add_To_Cart()} className="tf-btn animate-btn atc">Add to
                        cart</a>
                    <a href="wish-list.html" className="box-icon"><i className="icon icon-heart"></i></a>
                    {/* <a href="javascript:void(0);" className="box-icon btn-compare"><i className="icon icon-compare"></i></a> */}
                    <a onClick={()=> buyItNow()} className="tf-btn btn-primary animate-btn w-100">Buy It Now</a>
                </div>
                <a href="checkout.html" className="tf-btn btn-line-dark payment-link">More payment options</a>
            </div>
        </div>
    </div>

    </Modal>
    </>
  )
}

export default QuickADDTo_Cart
