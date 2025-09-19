
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ShoppingCartContext from ".";
import { Product_Service } from "../../Services/Product/ProductService";
import { useToast } from "../../Context/Tostify/index";


const ShoppingCart_Provider = (props) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isBuyitNow, setIsBuyitNow]  =useState(false)
    const { showToast } = useToast();
    const {UseAddTo_Cart, UseFetchCart_Details, UseDeleteProduct_Cart, UseUpdate_Cart} = Product_Service();

// setting Cookie here 

useEffect(() => {
  const checkAndSetUserCookie = () => {
    const existingUserId = Cookies.get("user_id");
    if (!existingUserId) {
      const newUserId = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      Cookies.set("user_id", newUserId, { expires: 30 });
    } else {
      //console.log("Existing user ID found:", existingUserId);
    }
  };

  checkAndSetUserCookie();
}, []);

  useEffect(()=>{
    FetchCartData()
  },[isCartOpen])



    // Add Product to the Cart
    const AddToCart = async (payload, Qty)=>{
      const cookie_ID = Cookies.get('user_id')
      const clientId = localStorage.getItem('ClientId')
      //console.log(payload[0], cookie_ID); 
      const OBJ = {
        ClientId:clientId || null,
        CookieId:cookie_ID || null,
        ImagePath:`APP/ProductImages/${payload[0]?.VDefaultImage}`,
        ProductId:payload[0]?.ProductId,
        ProductPackageOptions:'NA',
        ProductVariantId:payload[0]?.ProductVariantDetailId,
        Quantity:String(Qty),
        Remark:'Direct'
      }
      const result = await UseAddTo_Cart(OBJ);
     if(result[0]?.StatusCode === 1){
      showToast(result[0]?.Msg, 'success');
      if(!isBuyitNow) setIsCartOpen(true);
       setIsBuyitNow(false);
     }else{

      showToast(result[0]?.Msg, 'error');
     }    
    }

    // Fetching Cart  Data 
    const FetchCartData = async ()=>{
      const existingUserId = Cookies.get("user_id");
      const OBJ ={ ClientId : " ", CookieId : existingUserId }
      const result = await UseFetchCart_Details(OBJ);
      if(Array.isArray(result)){
        setCartItems(result);
      }
      //console.log(result);
      
    }

    // Deleting Product from Cart
    const DeleteProduct = async (ID)=>{      
      const Obj ={CartId:ID}
      const result  = await UseDeleteProduct_Cart(Obj);
      //console.log(result);
      if(result[0]?.StatusCode === 1){
        FetchCartData();
        showToast(result[0]?.Msg , 'success');

      }
     
      
    }

 //update product cart
    const Update_productCart = async (data)=> {
      const {CartId, Qty} = data
      const OBJ ={
        Para:JSON.stringify({CartId:CartId, Quantity:Qty, ActionMode:'UpdateCart'}),
        procName:'AddToCart'
      }
      const result = await UseUpdate_Cart(OBJ);
      if(result[0]?.StatusCode === 1){
        showToast(result[0]?.Msg, 'success');
        FetchCartData()
      }
    }
   

  return <ShoppingCartContext.Provider value={{ ...props, isCartOpen, cartItems, setIsCartOpen, AddToCart, DeleteProduct, FetchCartData, Update_productCart, isBuyitNow, setIsBuyitNow}}>{props.children}</ShoppingCartContext.Provider>;
};

export default ShoppingCart_Provider;
