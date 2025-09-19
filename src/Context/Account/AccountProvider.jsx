
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import AccountContext from ".";
import { useToast } from "../Tostify";
import { Product_Service } from "../../Services/Product/ProductService";

const AccountProvider = (props) => {

  const [clientId, setClientId] = useState(localStorage.getItem('ClientId') || '0')
  const [accountData, setAccountData] = useState();
  const [fetchData, setrefetchData] = useState(false);
  const [LoginDrawerOpen, setLoginDrawerOpen] = useState(false);
  const [RegisterDrawerOpen, setRegisterDrawerOpen] = useState(false);
  const [resetDrawer, setresetDrawer] = useState(false)
  const [regSuccess, setregSuccess] = useState(false);
  const [IsServerBusy, setServerBusy] = useState(false);
  const [LoginByRegister, setLoginByRegister] = useState(true);
  const [filterParentID, setfilterParentID] = useState('')
  const [CompanyDetails, setCompanyDetails] = useState([])
  const [useraddress, setuseraddress] = useState([])
  const [ShippingID, setShippingID] =useState(null);
  const {Custom_api_call} = Product_Service()
  const { showToast } = useToast();
  const [userRegData, setuserRegData] = useState([])
  const [Currency, setcurrency] = useState({Symbol:'₹', CurrencyName:'Indian (Rupee ₹)', ImgURL:'country/indian-flag.png'})
  const [isLogin, setisLogin] = useState(localStorage.getItem('isLogin') || false)

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLogin');
      setisLogin(loginStatus === 'true'); // Or whatever value you store
    };
  
    // Run on mount
    checkLoginStatus();
  
    // Listen to storage changes (multi-tab support)
    window.addEventListener('storage', checkLoginStatus);
  
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [isLogin]);

  const FetchCompanyDetails = async()=>{
    const OBJ ={
      procName:'Company',
      Para:JSON.stringify({ActionMode:'GetCompanyLogo'})
    }
    const result = await Custom_api_call(OBJ);
    if(Array.isArray(result)){
      setCompanyDetails(result);
    }else{
      setCompanyDetails([]);
    }

    
  }
 
useEffect(()=>{
  FetchCompanyDetails()
},[])


  return <AccountContext.Provider value={{ ...props, 
    CompanyDetails, 
    useraddress, 
    setuseraddress, 
    regSuccess,
    setregSuccess,
    setServerBusy,
    IsServerBusy, 
    resetDrawer, 
    setresetDrawer, 
    accountData, 
    setAccountData, 
    setrefetchData,
    ShippingID, 
    setShippingID,
    isLogin, 
    setisLogin,
    fetchData, 
    clientId, 
    setClientId, 
    Currency, 
    setcurrency,
    LoginDrawerOpen, 
    setLoginDrawerOpen, 
    RegisterDrawerOpen,
    setRegisterDrawerOpen,
    userRegData,
    setuserRegData,
    LoginByRegister, 
    setLoginByRegister,
    filterParentID, setfilterParentID
  
  }}>{props.children}</AccountContext.Provider>;
};

export default AccountProvider;
