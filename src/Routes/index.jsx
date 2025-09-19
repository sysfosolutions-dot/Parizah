import React, { useContext } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home_Page from '../Pages/Home'
import APP_Layout from '../Layout'
import Product_details from '../Pages/Product_Details'
import AboutUs from '../Pages/AboutUs'
import Collection_page from '../Pages/Collections'
import Cart_Page from '../Pages/Cart'
import Server_Busy from '../Pages/ServerBusy'
import Contactus_container from '../Components/Contactus/index'
import TermsAndConditions_Container from '../Components/TermsAndConditions/Index'
import PrivacyPolicy_Container from '../Components/PrivacyPolicy/Index'
import Account_Page from '../Pages/Account'
import AccountContext from '../Context/Account'
import Wishlist_Page from '../Pages/Wishlist'
import AboutUs_Page from '../Pages/AboutUs'
import Checkout_Page from '../Pages/Checkout'
import Blog_Page from '../Pages/Blog'
import BlogDetails_Pages from '../Pages/blogDetailPage'
import CheckoutSuccess_Page from '../Pages/CheckoutSuccess/Index'
import Innvoice_Page from '../Pages/Invoice'
import TestPage from '../Pages/Test/TestPage'
import Data_NotFound from '../Pages/DataNotFount'
import Category_page from '../Pages/CategoryPage/Index'
const BASE_URL = import.meta.env.BASE_URL
const APP_Routes = () => {
  const { isLogin, LoginDrawerOpen, setLoginDrawerOpen} = useContext(AccountContext);
  // //console.log(BASE_URL);
  
  return (
    <BrowserRouter basename={BASE_URL}>
        <Routes>
            <Route element={<APP_Layout/>}>
                <Route path="/" element={<Home_Page/>}/>
                <Route path="/about" element={<AboutUs_Page/>} />
                <Route path="/product/:productname/:p_id/:v_id" element={<Product_details/>}/>
                <Route path="/collection/:categoryName" element={<Collection_page/>}/>
                <Route path="/cart" element={<Cart_Page/>}/>
                <Route path="/wishlist" element={isLogin ? <Wishlist_Page/> : <Navigate to="/"/>}/>
                <Route path="/contact-us" element={<Contactus_container/>}/>
                <Route path="/blogs" element={<Blog_Page/>}/>
                <Route path="blogs/:blogid" element={<BlogDetails_Pages/>}/>
                <Route path="/terms-and-conditions" element={<TermsAndConditions_Container />}/>
                <Route path="/privacy-policy" element={<PrivacyPolicy_Container />}/>
                <Route path="/account" element={isLogin ? <Account_Page/> : <Navigate to="/"/>}/>
                <Route path="/checkout" element={isLogin ? <Checkout_Page/> : <Navigate to="/"/>}/>
                <Route path="/checkout/:id" element={isLogin ? <CheckoutSuccess_Page/> : <Navigate to="/"/>}/>
                <Route path="/account/:tabname" element={isLogin ? <Account_Page/> : <Navigate to="/"/>}/>
                <Route path="/datanotfound" element={isLogin ? <Data_NotFound/> : <Navigate to="/"/>}/>
                <Route path="/category" element={isLogin ? <Category_page /> : <Navigate to="/"/>}/>
            </Route>
                <Route path="/invoice/:invoiceId" element={isLogin ? <Innvoice_Page/> : <Navigate to="/"/>}/>
             {/* 404 Not Found */}
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/connectionfail" element={<Server_Busy/>} />
            <Route path="/demo" element={<TestPage/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default APP_Routes
