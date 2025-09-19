import React, { useEffect, useState} from 'react'
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
const Dashborad = () => {
    const {user_common_api} = UserAuthentication();
    const CookieId = Cookies.get('user_id');
    const [DashboardData, setDashboardData] = useState([])
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
    const [useinfoData, setuserData] = useState([])

    // dashboard data fetching
    const FetchUserDashboard = async ()=>{
        const OBJ ={
            Para:JSON.stringify({ClientId:ClientID, Actionmode:'GettordercountMember'}),
            procName:'SalesOrder'
        }
        const result = await user_common_api(OBJ);
        if(Array.isArray(result)){
            setDashboardData(result)
        }else{
            setDashboardData([]) 
        }

    }
    // fetching user info
    const FetchUserInfo = async ()=>{
        const OBJ = { 
            procName: 'UpdateProfile',
            Para:JSON.stringify({ClientId:"2009", Actionmode:"GetProfile"})
        }
        const result = await user_common_api(OBJ);
        if(Array.isArray(result)){
            setuserData(result)
        }else{
            setuserData([]) 
        }
    }


    useEffect(()=>{
        FetchUserInfo()
        FetchUserDashboard()
    }, [])

  return (
    <div className="my-acount-content account-dashboard">
                        <div className="box-account-title">
                            <p className="hello-name display-sm fw-medium">
                                Hello {localStorage.getItem('UserName')}!
                                <span>(not <span className="name"></span>?</span>
                                <a href="index.html" className="text-decoration-underline link">Log Out</a>
                                <span>)</span>
                            </p>
                            <p className="notice text-sm">
                                Today is a great day to check your account page. You can check <Link
                                    to="/account/orderslist" className="text-primary text-decoration-underline">your
                                    last orders</Link> or
                                have a look to <Link to="/wishlist"
                                    className="text-primary text-decoration-underline">your
                                    wishlist</Link> . Or maybe you can start to shop 
                                <Link to="/" className="text-primary text-decoration-underline ms-1"> our
                                    latest
                                    offers</Link> ?
                            </p>
                        </div>
                        <div className="content-account">
                            <ul className="box-check-list flex-sm-nowrap">
                                <li>
                                    <a  className="box-check text-center">
                                        <div className="icon">
                                            <i className="icon-order"></i>
                                            <span className="count-number text-sm text-white fw-medium">{DashboardData[0]?.Processing}</span>
                                        </div>
                                        <div className="text">
                                            <div className=" link name-type text-xl fw-medium">Processed</div>
                                            <p className="sub-type text-sm"> Your order is on the way now!
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                                                <li>
                                    <a  className="box-check text-center">
                                        <div className="icon">
                                            <i className="icon-order"></i>
                                            <span className="count-number text-sm text-white fw-medium">{DashboardData[0]?.Shipped}</span>
                                        </div>
                                        <div className="text">
                                            <div className=" link name-type text-xl fw-medium">Shipped</div>
                                            <p className="sub-type text-sm"> Your order is on the way now!
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a  className="box-check text-center">
                                        <div className="icon">
                                            <i className="icon-order"></i>
                                            <span className="count-number text-sm text-white fw-medium">{DashboardData[0]?.Delivered}</span>
                                        </div>
                                        <div className="text">
                                            <div className=" link name-type text-xl fw-medium">Delivered</div>
                                            <p className="sub-type text-sm"> Package delivered safely at your doorstep.
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a  className="box-check text-center">
                                        <div className="icon">
                                            <i className="icon-order"></i>
                                            <span className="count-number text-sm text-white fw-medium">{DashboardData[0]?.Cancelled}</span>
                                        </div>
                                        <div className="text">
                                            <div className=" link name-type text-xl fw-medium">Cancelled</div>
                                            <p className="sub-type text-sm"> Order was cancelled as per your request.
                                            </p>
                                        </div>
                                    </a>
                                </li>
                                {/* <li>
                                    <a href="wish-list.html" className="box-check text-center">
                                        <div className="icon">
                                            <i className="icon-heart"></i>
                                            <span className="count-number text-sm text-white fw-medium">1</span>
                                        </div>
                                        <div className="text">
                                            <div className="link name-type text-xl fw-medium">Wishlist</div>
                                            <p className="sub-type text-sm">Check your wishlist</p>
                                        </div>
                                    </a>
                                </li> */}
                            </ul>
                            <div className="banner-account">
                                <div className="image">
                                    <img src={`${import.meta.env.BASE_URL}/assets/Images/banner/account-1.jpg`} data-src="images/banner/account-1.jpg" alt=""
                                        className="lazyload"/>
                                </div>
                                <div className="banner-content-right">
                                    <div className="banner-title">
                                        <p className="display-md fw-medium">
                                            Free Shipping
                                        </p>
                                        <p className="text-md">
                                            for all orders over $300.00
                                        </p>
                                    </div>
                                    <div className="banner-btn">
                                        <Link to="/" className="tf-btn animate-btn">
                                            Shop Now
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="banner-account banner-acc-countdown bg-linear d-flex align-items-center">
                                <div className="banner-content-left">
                                    <div className="banner-title">
                                        <p className="sub text-md fw-medium">
                                            SUMMER SALE
                                        </p>
                                        <p className="display-xl fw-medium">
                                            50% OFF
                                        </p>
                                        <p className="sub text-md fw-medium">
                                            WITH PROMOTE CODE: 12D34E
                                        </p>
                                    </div>
                                    <div className="banner-btn">
                                        <a href="shop-default.html" className="tf-btn btn-white animate-btn animate-dark">
                                            Shop Now
                                        </a>
                                    </div>
                                </div>
                                <div className="banner-countdown">
                                    <div className="wg-countdown-2">
                                        <span className="js-countdown" data-timer="46556"
                                            data-labels="Days,Hours,Mins,Secs"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}

export default Dashborad
