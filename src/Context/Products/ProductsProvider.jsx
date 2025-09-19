
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import ProductContext from ".";
import { Common_Service } from "../../Services/Common/CommonService";
import { Product_Service } from "../../Services/Product/ProductService";
import { useToast } from "../Tostify";

const Products_Provider = (props) => {
    const {UseFetchProductService} =  Common_Service();
     const {Custom_api_call} = Product_Service();
    const [NewArrivals, setNewArrivals] = useState([]);
    const [bannerData, setbannerData] = useState([]);
    const { showToast } = useToast();

    const Fetch_NewProducts =  async ()=>{
        const OBJ={ClientId : "0", CookieId:'', Type:'BestSellers'}
        const result  = await UseFetchProductService(OBJ);
        if(Array.isArray(result)){
            setNewArrivals(result)
        }
        
      }
  const FetchHome_Banner = async()=>{
    const OBJ ={
      Para:JSON.stringify({ActionMode:'BannerForSite'}),
      procName : "Banners"
    }
    const result = await Custom_api_call(OBJ);
    if(Array.isArray(result)){
      setbannerData(result)
    }
    //console.log(result);
    
  }
   

  
    
      useEffect(()=>{
        Fetch_NewProducts()
        FetchHome_Banner()
      }, [])

  return <ProductContext.Provider value={{ ...props, NewArrivals, bannerData, setbannerData, setNewArrivals}}>{props.children}</ProductContext.Provider>;
};

export default Products_Provider;
