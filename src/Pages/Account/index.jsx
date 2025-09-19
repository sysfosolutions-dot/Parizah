import React, { useContext, useEffect, useState } from 'react'
import { Slider, Typography, Box, Drawer  } from '@mui/material';
import Dashborad from '../../Components/Account/Dashboard'
import { Navigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import My_Orders from '../../Components/Account/myOrders';
import WishList_Container from '../../Components/Account/MyWishlist'
import Addresses_Container from '../../Components/Account/Addresses';
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import AccountContext from '../../Context/Account';
import { useToast } from '../../Context/Tostify';
import AccountDetails from '../../Components/Account/ActDetails';
import { useSweetAlert } from '../../Context/SweetAlert';
import CollectionContext from '../../Context/Collection';


const Account_Page = () => {
  const param = useParams();
  const [ClientID, setClientId] = useState(localStorage.getItem('ClientId') || "0");
  const {FetchUser_Address} = UserAuthentication();
  const {isLogin, setisLogin} = useContext(AccountContext);
  const [OpenUserMenuDrawer, setOpenUserMenuDrawer] = useState(false)
  const {setCollectionData, setWishListData} = useContext(CollectionContext);
  const {ShowConfirmAlert} = useSweetAlert()
  const [AddressData, setAddressData] = useState([]);
  const {tabname} = param;
  const {showToast} = useToast();


// Fetching UserDetails 
const FetchingUserDetails = async()=>{
    const OBJ ={
        para:JSON.stringify({ClientId:ClientID, ActionMode:'Select'}),
        procName:'DeliveryAddress'
    }
    const result = await FetchUser_Address(OBJ);
    if(Array.isArray(result)){
        setAddressData(result)
    }
}


// 

const LogoutUser = async ()=>{
    const confirm = await  ShowConfirmAlert("Please Confirm to logout");
    if(confirm){
        localStorage.clear();
        setCollectionData([]);
        setWishListData([]);
        setisLogin(false);
        showToast('Logout successful.', 'success')
    }

}


  useEffect(()=>{
    if(tabname === "addresses")  FetchingUserDetails()
  },[tabname])
  
  return (
    <div>
           {/* <!-- Title Page --> */}
        <section className="tf-page-title">
            <div className="container">
                <div className="box-title text-center">
                    <h4 className="title">My Account</h4>
                    <div className="breadcrumb-list">
                        <a className="breadcrumb-item" href="index.html">Home</a>
                        <div className="breadcrumb-item dot"><span></span></div>
                        <div className="breadcrumb-item current">Account</div>
                    </div>
                </div>
            </div>
        </section>
        {/* <!-- /Title Page --> */}
          <div className="flat-spacing-13">
            <div className="container-7">
                {/* <!-- sidebar-account --> */}
                <div className="btn-sidebar-mb d-lg-none">
                    <button     onClick={()=> setOpenUserMenuDrawer(true)}>
                        <i className="icon icon-sidebar"></i>
                    </button>
                </div>
                {/* <!-- /sidebar-account --> */}

                {/* <!-- Section-acount --> */}
                <div className="main-content-account">
                    <div className="sidebar-account-wrap sidebar-content-wrap sticky-top d-lg-block d-none">
                        <ul className="my-account-nav">
                            <li>
                                <Link to="/account"
                                    className={`text-sm link fw-medium my-account-nav-item ${tabname === undefined ? 'active' : ''}`}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/account/orderslist" className={`text-sm link fw-medium my-account-nav-item ${tabname === "orderslist" ? 'active' : ''}`}>My
                                    Orders</Link>
                            </li>
                            <li>
                                <Link to="/account/wishlist" className={`text-sm link fw-medium my-account-nav-item ${tabname === "wishlist" ? 'active' : ''}`}>My
                                    Wishlist</Link>
                            </li>
                            <li>
                                <Link to="/account/addresses" className={`text-sm link fw-medium my-account-nav-item ${tabname === "addresses" ? 'active' : ''}`}>Addresses</Link>
                            </li>
                            <li>
                                <Link to="/account/actdetails"
                                    className={`text-sm link fw-medium my-account-nav-item ${tabname === "actdetails" ? 'active' : ''}`}>Account Details</Link>
                            </li>
                            <li onClick={LogoutUser}>
                                <a  className="text-sm link fw-medium my-account-nav-item">Log
                                    Out</a>
                            </li>
                        </ul>
                    </div>
                     <Drawer anchor="left" 
                                  slotProps={{
                                      paper: {
                                        className: ' offcanvas-end popup-style-1 popup-login'
                                      }
                                    }}
                                  open={OpenUserMenuDrawer} onClose={()=> setOpenUserMenuDrawer(false)}>
                                     <div className="canvas-header popup-header">
                                <span className="title">SIDEBAR ACCOUNT</span>
                                <button className="icon-close icon-close-popup bg-transparent border-0 text-dark"  aria-label="Close" onClick={()=> setOpenUserMenuDrawer(false)}></button>
                            </div>
                                   <Box className="sidebar-account-wrap mobile-account-siderbar sidebar-content-wrap sticky-top">
                                         <ul className="my-account-nav">
                            <li>
                                <Link to="/account"
                                    className={`text-sm link fw-medium my-account-nav-item ${tabname === undefined ? 'active' : ''}`}>Dashboard</Link>
                            </li>
                            <li>
                                <Link to="/account/orderslist" className={`text-sm link fw-medium my-account-nav-item ${tabname === "orderslist" ? 'active' : ''}`}>My
                                    Orders</Link>
                            </li>
                            <li>
                                <Link to="/account/wishlist" className={`text-sm link fw-medium my-account-nav-item ${tabname === "wishlist" ? 'active' : ''}`}>My
                                    Wishlist</Link>
                            </li>
                            <li>
                                <Link to="/account/addresses" className={`text-sm link fw-medium my-account-nav-item ${tabname === "addresses" ? 'active' : ''}`}>Addresses</Link>
                            </li>
                            <li>
                                <Link to="/account/actdetails"
                                    className={`text-sm link fw-medium my-account-nav-item ${tabname === "actdetails" ? 'active' : ''}`}>Account Details</Link>
                            </li>
                            <li onClick={LogoutUser}>
                                <a  className="text-sm link fw-medium my-account-nav-item">Log
                                    Out</a>
                            </li>
                        </ul>
                                  </Box>
                          </Drawer>
                  {tabname === undefined ? <Dashborad/> :tabname === "wishlist" ? <Navigate to="/wishlist"/> :tabname === "addresses" ? <Addresses_Container userAddress={AddressData}/> :tabname === "actdetails" ?  <AccountDetails/>  : <My_Orders/>}
                   
                </div>
                {/* <!-- /Account --> */}
            </div>
        </div>
    </div>
  )
}

export default Account_Page
