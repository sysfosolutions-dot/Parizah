import React, { useContext, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import Topbar from './TopBar'
import Shopping_Cart from '../Components/ShoppingCart'
import AccountContext from '../Context/Account'
import Login_Drawer from '../Components/Account/LoginSlider'
import Registration_Drawer from '../Components/Account/Registration'
import Register_Success from '../Components/Common/Modal/WelcomeModal'
import Reset_Drawer from '../Components/Account/ResetDrawer'
const APP_Layout = () => {
  const  {IsServerBusy} = useContext(AccountContext)

  return (
    <>
    {!IsServerBusy ? <div id="wrapper">
      <Topbar/>
        <Header/>
        <Outlet/>
        <Registration_Drawer/>
        <Login_Drawer/>
        <Reset_Drawer/>
        <Shopping_Cart />
        <Register_Success/>
      <Footer/>
      </div> : <>
        <div id="wrapper">
          <h1>connection lost</h1>
        </div>
      </>}
    </>
  )
}

export default APP_Layout
