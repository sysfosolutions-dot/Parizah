
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import ShoppingCartContext from ".";
import { Product_Service } from "../../Services/Product/ProductService";
import { useToast } from "../../Context/Tostify/index";
import { CollectionService } from "../../Services/Collection/CollectionService";
import AccountContext from "../Account";


const Collection_Provider = (props) => {
    const [fetchData, setfetchdata] = useState(false)
    const { showToast } = useToast();
    const [Payload, sePayload] = useState({});
    const [TotalPage, setTotalPage] = useState([])
    const [W_TotalPage, setW_TotalPage] = useState();
    const [currentW_Page, setcurrentW_Page] = useState(1) 
    const [CollectionData, setCollectionData] = useState([]);
    const [CollectionLoader, setCollectionLoader] = useState(true)
    const [WishListData, setWishListData] = useState([])
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0')
    const {Custom_api_call} = Product_Service()
    const {UseFetchCollection_Product} = CollectionService();
    const {isLogin} = useContext(AccountContext);


    const FetchCollection = async ()=>{
      setCollectionLoader(true)
        const result = await UseFetchCollection_Product(Payload);
       
        if(Array.isArray(result)){
          setCollectionData(result);    
          setTotalPage( result[0]?.TotalPages);
          setCollectionLoader(false);
        }else{
          setCollectionData([]);
           setCollectionLoader(false);
        }
    }

    const addto_WishList = async(data)=>{
      const cookieID = Cookies.get('user_id')
      const  {ProductId, PVDId, ListType} = data
      const OBJ ={
        Para:JSON.stringify({ClientId:ClientID, CookieId:cookieID,  ProductId:ProductId, PVDId:PVDId, ActionMode:'AddToWishList'}), 
        procName : "AddToWishList"
      }
      const result = await Custom_api_call(OBJ);
      if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.Msg, 'success');
        if(ListType === "HomePage") {
          FetchWishlist();
        }else if(ListType === "Collection"){
          FetchCollection();
          FetchWishlist();
        }else if(ListType ==='Details'){
          FetchWishlist();
        }
      }else{
        showToast(result[0]?.Msg, 'error')
      }

    }

    const RemoveFrom_WishList = async(ID)=>{
      const OBJ ={
        Para:JSON.stringify({WishListId:ID, ActionMode:'Delete'}), 
        procName : "AddToWishList"
      }
      const result = await Custom_api_call(OBJ);
      if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.Msg, 'success');
        if(WishListData.length === 1){
          setW_TotalPage( W_TotalPage - 1)
        }
        FetchWishlist();
        FetchCollection();
      }else{
        showToast(result[0]?.Msg, 'error');
      }

    }

    const FetchWishlist = async()=>{
      const cookieID = Cookies.get('user_id')
      const OBJ ={
        Para:JSON.stringify({CookieId:cookieID, ClientId:ClientID, PageNumber:currentW_Page, ActionMode:'GetWishListData'}),
        procName:'AddToWishList'
      }
      const result = await Custom_api_call(OBJ);
      if(Array.isArray(result)){
        setWishListData(result);
        setW_TotalPage(result[0]?.TotalPages)
      }else{
        setWishListData([]);
      }
    }




    useEffect(()=>{
            FetchCollection();
    }, [fetchData])

    useEffect(()=>{
      if(isLogin){
            FetchWishlist();
      }
      
    }, [currentW_Page, isLogin])






  return <ShoppingCartContext.Provider value={
    { ...props, 
      fetchData, 
      setfetchdata, 
      Payload, 
      sePayload, 
      CollectionData, 
      setCollectionData,
      addto_WishList,
      RemoveFrom_WishList, 
      TotalPage,
      setTotalPage, 
      FetchWishlist,
      WishListData, 
      setWishListData,
      W_TotalPage, 
      setW_TotalPage,
      currentW_Page,
      setcurrentW_Page,
      CollectionLoader, setCollectionLoader
    }}>{props.children}</ShoppingCartContext.Provider>;
};

export default Collection_Provider;
