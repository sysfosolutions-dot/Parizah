import React, { useContext, useState } from 'react'
import AccountContext from '../../Context/Account';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import { useToast } from '../../Context/Tostify';
import ShoppingCartContext from '../../Context/Shopping_Cart';
import CollectionContext from '../../Context/Collection';
import { useSweetAlert } from '../../Context/SweetAlert';
const img_URL = import.meta.env.BASE_URL
const Footer = () => {
     const {user_common_api} = UserAuthentication();
     const { showToast } = useToast();
     const navigate = useNavigate();
     const {showAlert} = useSweetAlert()
     const [openTodo, setopenTodo] = useState(null)
     const { isLogin, setLoginDrawerOpen, CompanyDetails} = useContext(AccountContext);
     const {WishListData, FetchWishlist} = useContext(CollectionContext)
     const {isCartOpen, setIsCartOpen, cartItems } = useContext(ShoppingCartContext);
     const NewsletterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
        const User_Subscribe = async(data)=>{
           const OBJ ={
            procName: 'Subscribes',
            Para:JSON.stringify({ActionMode:"Insert", EmailId:data?.email})
           }
           const result = await user_common_api(OBJ);
           if(Array.isArray(result)){
            showToast(result[0]?.Msg, 'success')
           }else{
            showToast(result[0]?.Msg, 'error')
           }
        }

const GoToprofile =()=>{
    navigate('/account') 
}

  return (
    <>
    <footer id="footer" className="footer-default xl-pb-70">
    <div className="footer-top">
        <div className="container">
            <div className="footer-top-wrap">
                <div className="footer-logo">
                    <Link to="/">
                        <img src={`${import.meta.env.VITE_PUBLIC_COMPANY_LOGO}${CompanyDetails && CompanyDetails[0]?.CompanyLogo}`} className="logo" alt="logo"/>
                    </Link>
                </div>
                <ul className="tf-social-icon style-large">
                    <li>
                        <Link to="https://www.facebook.com/"  target='_blank' className="social-item social-facebook">
                            <i className="icon icon-fb"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://www.instagram.com/" target='_blank' className="social-item social-instagram">
                            <i className="icon icon-instagram"></i>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://in.linkedin.com/" target='_blank' className="social-item social-linkedin"><i
                                className="icon icon-linkedin"></i></Link>
                    </li>
                    <li>
                        <Link to="https://x.com/" target='_blank' className="social-item social-x">
                            <i className="icon icon-x"></i>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div className="footer-body">
        <div className="container">
            <div className="row-footer">
                <div className={`footer-col-block s1  ${openTodo === 's1' ? 'open' : ''}`} onClick={()=> setopenTodo('s1')}>
                    <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                        Business Contact
                    </div>
                    <div className={`tf-collapse-content d-md-block  ${openTodo === 's1' ? 'd-block' : 'd-none'}`}>
                        <div className="footer-contact">
                            <ul className="footer-info">
                                <li className="item">
                                    <span className="box-icon">
                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.1869 1.73431C9.06854 0.61592 7.58155 0 5.99993 0C4.4183 0 2.93129 0.61592 1.81292 1.73431C0.694534 2.85273 0.0786133 4.33969 0.0786133 5.92129C0.0786133 9.12084 3.10388 11.7821 4.72917 13.2118C4.95504 13.4105 5.15008 13.582 5.30547 13.7272C5.50016 13.9091 5.75006 14 5.9999 14C6.24979 14 6.49964 13.9091 6.69435 13.7272C6.84975 13.582 7.04479 13.4105 7.27065 13.2118C8.89594 11.7821 11.9212 9.12084 11.9212 5.92129C11.9212 4.33969 11.3053 2.85273 10.1869 1.73431ZM6.72897 12.5961C6.49816 12.7991 6.29885 12.9744 6.13451 13.1279C6.05902 13.1984 5.94078 13.1984 5.86526 13.1279C5.70095 12.9744 5.50161 12.7991 5.2708 12.596C3.74283 11.2519 0.898656 8.75001 0.898656 5.92131C0.898656 3.1085 3.18704 0.820124 5.99987 0.820124C8.81268 0.820124 11.1011 3.1085 11.1011 5.92131C11.1011 8.75001 8.25694 11.2519 6.72897 12.5961Z"
                                                fill="#0D0D0D" />
                                            <path
                                                d="M6.00008 3.08887C4.56122 3.08887 3.39062 4.25943 3.39062 5.69829C3.39062 7.13715 4.56122 8.30772 6.00008 8.30772C7.43894 8.30772 8.6095 7.13715 8.6095 5.69829C8.6095 4.25943 7.43894 3.08887 6.00008 3.08887ZM6.00008 7.48759C5.01343 7.48759 4.21072 6.68489 4.21072 5.69826C4.21072 4.71164 5.01343 3.90894 6.00008 3.90894C6.98673 3.90894 7.7894 4.71164 7.7894 5.69826C7.7894 6.68489 6.98673 7.48759 6.00008 7.48759Z"
                                                fill="#0D0D0D" />
                                        </svg>
                                    </span>
                                    <a target="_blank"
                                        href="https://www.google.com/maps?q=123Yarranst,Punchbowl,NSW2196,Australia">
                                            {CompanyDetails && CompanyDetails[0]?.Address}
                                    </a>
                                </li>
                                <li className="item">
                                    <span className="box-icon">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.6666 9.4091L10.9841 8.4641C10.7324 8.12417 10.3574 7.89649 9.93972 7.82996C9.522 7.76343 9.09484 7.86335 8.74998 8.10827L8.09081 8.59243C7.13399 7.73698 6.36526 6.69214 5.83331 5.5241L6.49248 5.04577C6.837 4.79478 7.06794 4.41741 7.13464 3.99641C7.20135 3.5754 7.09838 3.14513 6.84831 2.79993L6.18331 1.86077C5.93339 1.51663 5.55703 1.28582 5.13698 1.21909C4.71693 1.15236 4.28757 1.25518 3.94331 1.50493L2.91664 2.23993C2.58681 2.47798 2.33009 2.80349 2.17547 3.17972C2.02086 3.55595 1.9745 3.96792 2.04164 4.3691C2.33803 6.09644 3.02915 7.73206 4.06118 9.14856C5.0932 10.5651 6.43827 11.7242 7.99164 12.5358C8.30603 12.696 8.65376 12.78 9.00664 12.7808C9.46814 12.7804 9.91756 12.6333 10.29 12.3608L11.3108 11.6666C11.4837 11.5428 11.6302 11.3858 11.7419 11.2048C11.8535 11.0238 11.9281 10.8224 11.9612 10.6123C11.9943 10.4023 11.9853 10.1877 11.9347 9.98113C11.8842 9.77457 11.793 9.58012 11.6666 9.4091ZM10.7975 10.9433L9.78248 11.6666C9.58631 11.8098 9.35413 11.8954 9.11199 11.914C8.86984 11.9325 8.62732 11.8832 8.41164 11.7716C6.97557 11.0225 5.73227 9.95129 4.779 8.6418C3.82572 7.33231 3.18832 5.82004 2.91664 4.22327C2.87745 3.98261 2.90577 3.73579 2.99846 3.51026C3.09114 3.28473 3.24455 3.08933 3.44164 2.94577L4.45664 2.21077C4.6131 2.09841 4.80765 2.05252 4.99783 2.08312C5.188 2.11373 5.35834 2.21833 5.47164 2.3741L6.15998 3.3191C6.27119 3.47659 6.31717 3.67098 6.28831 3.8616C6.27352 3.95579 6.24012 4.04608 6.19004 4.12721C6.13996 4.20834 6.07421 4.27867 5.99664 4.3341L5.05164 5.02243C4.97248 5.07857 4.91486 5.16007 4.88834 5.25342C4.86182 5.34678 4.86798 5.44639 4.90581 5.53577C5.52168 7.06896 6.5077 8.42575 7.77581 9.48493C7.85256 9.54453 7.94697 9.57689 8.04414 9.57689C8.14132 9.57689 8.23573 9.54453 8.31248 9.48493L9.25748 8.80243C9.41322 8.68947 9.60729 8.64263 9.79741 8.67214C9.98754 8.70164 10.1583 8.80508 10.2725 8.95993L10.9608 9.9166C11.072 10.0741 11.118 10.2685 11.0891 10.4591C11.0752 10.5552 11.0422 10.6475 10.9921 10.7306C10.942 10.8137 10.8759 10.886 10.7975 10.9433Z"
                                                fill="#0D0D0D" />
                                        </svg>
                                    </span>
                                    <a target='_blank' href="tel:+918318753610">  {CompanyDetails && CompanyDetails[0]?.ContactNo}</a>
                                </li>
                                <li className="item">
                                    <span className="box-icon">
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M11.8125 2.625H2.1875C1.8394 2.625 1.50556 2.76328 1.25942 3.00942C1.01328 3.25556 0.875 3.5894 0.875 3.9375V10.0625C0.875 10.4106 1.01328 10.7444 1.25942 10.9906C1.50556 11.2367 1.8394 11.375 2.1875 11.375H11.8125C12.1606 11.375 12.4944 11.2367 12.7406 10.9906C12.9867 10.7444 13.125 10.4106 13.125 10.0625V3.9375C13.125 3.5894 12.9867 3.25556 12.7406 3.00942C12.4944 2.76328 12.1606 2.625 11.8125 2.625ZM11.5675 3.5L7.28 7.07438C7.20139 7.13985 7.10231 7.17571 7 7.17571C6.89769 7.17571 6.79861 7.13985 6.72 7.07438L2.4325 3.5H11.5675ZM11.8125 10.5H2.1875C2.07147 10.5 1.96019 10.4539 1.87814 10.3719C1.79609 10.2898 1.75 10.1785 1.75 10.0625V4.06875L6.16 7.74375C6.39584 7.94019 6.69307 8.04776 7 8.04776C7.30693 8.04776 7.60416 7.94019 7.84 7.74375L12.25 4.06875V10.0625C12.25 10.1785 12.2039 10.2898 12.1219 10.3719C12.0398 10.4539 11.9285 10.5 11.8125 10.5Z"
                                                fill="#0D0D0D" />
                                        </svg>
                                    </span>
                                    <a target='_blank' href={`mailto:${CompanyDetails && CompanyDetails[0]?.EmailId}`}> {CompanyDetails && CompanyDetails[0]?.EmailId}</a>
                                </li>
                            </ul>
                            <a target='_blank' href="https://www.google.com/maps/place/Sysfo+Software+Solutions+Pvt.+Ltd./@26.7821174,80.9872326,17z/data=!3m2!4b1!5s0x399be4adb18dd617:0x4537e193946834b1!4m16!1m9!4m8!1m0!1m6!1m2!1s0x399bfd09c000001d:0x9f0b6f25a99fca59!2s609,+6th+Floor+Millennium+Place+Mall,+Golf+City,+Lucknow,+Uttar+Pradesh+226001!2m2!1d80.9898075!2d26.7821174!3m5!1s0x399bfd09c000001d:0x9f0b6f25a99fca59!8m2!3d26.7821174!4d80.9898075!16s%2Fg%2F1tpb9d0x?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoASAFQAw%3D%3D"
                                className="tf-btn btn-line-dark fw-normal">
                                <span className="text-sm text-transform-none">
                                    Get direction
                                </span>
                                <i className="icon-arrow-top-left fs-8"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`footer-inner-wrap footer-col-block s2 ${openTodo === 's2' ? 'open' : ''}`} onClick={()=> setopenTodo('s2')}>
                    <div className="footer-heading footer-heading-mobile text-xl fw-medium">
                        Subscribe Newsletter
                    </div>
                    <div className={`tf-collapse-content d-md-block ${openTodo === 's2' ? 'd-block' : 'd-none '}`}>
                        <div className="footer-newsletter">
                            <p>
                                We invite you to register to read the latest news, offers and events about
                                our company. We promise not spam your inbox.
                            </p>
                            <Formik
      initialValues={{ email: '' }}
      validationSchema={NewsletterSchema}
      onSubmit={(values, { resetForm }) => {
        // //console.log('Form Data:', values);
        User_Subscribe(values)
        // yahan aap API call kar sakte ho
        resetForm();
      }}
    >
      {() => (
        <Form className="form-newsletter">
          <div className="subscribe-content">
            <fieldset className="email">
              <Field
                type="email"
                name="email"
                className="subscribe-email"
                placeholder="Email address"
                aria-required="true"
              />
              <ErrorMessage name="email" component="div" className="text-danger text-xs mt-1" />
            </fieldset>

            <div className="button-submit">
              <button type="submit" className="subscribe-button animate-btn">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_5296_3345)">
                    <path
                      d="M17.7938 8.50229L17.7931 8.50162L14.1192 4.84537C13.8439 4.57147 13.3988 4.57249 13.1248 4.84776C12.8508 5.123 12.8519 5.56818 13.1271 5.84212L15.5938 8.29687H0.703125C0.314789 8.29687 0 8.61166 0 9C0 9.38833 0.314789 9.70312 0.703125 9.70312H15.5938L13.1272 12.1579C12.8519 12.4318 12.8509 12.877 13.1248 13.1522C13.3988 13.4275 13.844 13.4285 14.1192 13.1546L17.7932 9.49837L17.7938 9.4977C18.0692 9.22285 18.0683 8.77623 17.7938 8.50229Z"
                      fill="white" />
                  </g>
                  <defs>
                    <clipPath id="clip0_5296_3345">
                      <rect width="18" height="18" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
                        </div>
                    </div>
                </div>
                <div className={`footer-inner-wrap s3 ${openTodo === 's3' || 's4' ? 'open' : ''}`} >
                    <div className="footer-col-block inner-col" onClick={()=> setopenTodo('s3')}>
                        <div className="footer-heading footer-heading-mobile text-xl fw-medium">About Us</div>
                        <div className={`tf-collapse-content d-md-block ${openTodo === 's3' ? 'd-block' : 'd-none'}`}>
                            <ul className="footer-menu-list">
                                <li>
                                    <Link to="/about-us">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/contact-us">Contact Us</Link>
                                </li>
                                <li>
                                    <Link to="/">Our Store</Link>
                                </li>
                                {/* <li>
                                    <a href="about-us.html">Our Story</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                    <div className="footer-col-block inner-col" onClick={()=> setopenTodo('s4')}>
                        <div className="footer-heading footer-heading-mobile text-xl fw-medium">Resource</div>
                        <div className={`tf-collapse-content d-md-block ${openTodo === 's4' ? 'd-block' : 'd-none'}`}>
                            <ul className="footer-menu-list">
                                <li>
                                    <Link to="/privacy-policy">Privacy Policies</Link>
                                </li>
                                <li>
                                    <Link to="/terms-and-conditions">Terms & Conditions</Link>
                                </li>
                                {/* <li>
                                    <a href="return-and-refund.html">Returns & Refunds</a>
                                </li>
                                <li>
                                    <a href="faq.html">FAQ’s</a>
                                </li>
                                <li>
                                    <a href="shipping.html">Shipping</a>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="footer-bottom">
        <div className="container">
            <div className="footer-bottom-wrap">
                <p className="text-dark">Copyright © 2025 by <span className="fw-medium">Sysfo Software Solutions.</span> All Rights
                    Reserved.</p>
                <ul className="tf-payment">
                    <li className="item"><img src={`${img_URL}assets/Images/payment/EximBank.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/ApplePay.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/DinersClub.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/Discover.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/GooglePay.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/Mastercard-2.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/Mastercard.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/Shop.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/UnionPay.png`} alt="payment"/></li>
                    <li className="item"><img src={`${img_URL}assets/Images/payment/Visa.png`} alt="payment"/></li>
                </ul>
            </div>
        </div>
    </div>
    </footer>
    {/* <!-- toolbar --> */}
    <div className="tf-toolbar-bottom">
        <div className="toolbar-item">
            <Link to="/">
                <div className="toolbar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.21534 1H3.08153C1.93379 1 1 1.93379 1 3.08153V7.21534C1 8.36309 1.93379 9.29688 3.08153 9.29688H7.21534C8.36309 9.29688 9.29688 8.36309 9.29688 7.21534V3.08153C9.29688 1.93379 8.36309 1 7.21534 1ZM7.89062 7.21534C7.89062 7.58768 7.58768 7.89062 7.21534 7.89062H3.08153C2.70919 7.89062 2.40625 7.58768 2.40625 7.21534V3.08153C2.40625 2.70919 2.70919 2.40625 3.08153 2.40625H7.21534C7.58768 2.40625 7.89062 2.70919 7.89062 3.08153V7.21534Z"
                            fill="black" />
                        <path
                            d="M16.8906 1H12.8125C11.6494 1 10.7031 1.94627 10.7031 3.10938V7.1875C10.7031 8.35061 11.6494 9.29688 12.8125 9.29688H16.8906C18.0537 9.29688 19 8.35061 19 7.1875V3.10938C19 1.94627 18.0537 1 16.8906 1ZM17.5938 7.1875C17.5938 7.5752 17.2783 7.89062 16.8906 7.89062H12.8125C12.4248 7.89062 12.1094 7.5752 12.1094 7.1875V3.10938C12.1094 2.72167 12.4248 2.40625 12.8125 2.40625H16.8906C17.2783 2.40625 17.5938 2.72167 17.5938 3.10938V7.1875Z"
                            fill="black" />
                        <path
                            d="M7.21534 10.7031H3.08153C1.93379 10.7031 1 11.6369 1 12.7847V16.9185C1 18.0662 1.93379 19 3.08153 19H7.21534C8.36309 19 9.29688 18.0662 9.29688 16.9185V12.7847C9.29688 11.6369 8.36309 10.7031 7.21534 10.7031ZM7.89062 16.9185C7.89062 17.2908 7.58768 17.5938 7.21534 17.5938H3.08153C2.70919 17.5938 2.40625 17.2908 2.40625 16.9185V12.7847C2.40625 12.4123 2.70919 12.1094 3.08153 12.1094H7.21534C7.58768 12.1094 7.89062 12.4123 7.89062 12.7847V16.9185Z"
                            fill="black" />
                        <path
                            d="M16.8906 10.7031H12.8125C11.6494 10.7031 10.7031 11.6494 10.7031 12.8125V16.8906C10.7031 18.0537 11.6494 19 12.8125 19H16.8906C18.0537 19 19 18.0537 19 16.8906V12.8125C19 11.6494 18.0537 10.7031 16.8906 10.7031ZM17.5938 16.8906C17.5938 17.2783 17.2783 17.5938 16.8906 17.5938H12.8125C12.4248 17.5938 12.1094 17.2783 12.1094 16.8906V12.8125C12.1094 12.4248 12.4248 12.1094 12.8125 12.1094H16.8906C17.2783 12.1094 17.5938 12.4248 17.5938 12.8125V16.8906Z"
                            fill="black" />
                    </svg>
                </div>
                <div className="toolbar-label">Home</div>
            </Link>
        </div>
        <div className="toolbar-item" onClick={()=> !isLogin ? setLoginDrawerOpen(true) : GoToprofile()}>
            <a  onClick={()=> !isLogin ? setLoginDrawerOpen(true) : GoToprofile()}>
                <div className="toolbar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M12.6849 6.28659C12.6849 7.00267 12.4004 7.68943 11.8941 8.19578C11.3877 8.70212 10.701 8.98659 9.98488 8.98659C9.2688 8.98659 8.58204 8.70212 8.07569 8.19578C7.56934 7.68943 7.28488 7.00267 7.28488 6.28659C7.28488 5.5705 7.56934 4.88375 8.07569 4.3774C8.58204 3.87105 9.2688 3.58659 9.98488 3.58659C10.701 3.58659 11.3877 3.87105 11.8941 4.3774C12.4004 4.88375 12.6849 5.5705 12.6849 6.28659ZM14.3515 6.28659C14.3515 6.86003 14.2386 7.42785 14.0192 7.95764C13.7997 8.48743 13.4781 8.96881 13.0726 9.37429C12.6671 9.77977 12.1857 10.1014 11.6559 10.3209C11.1261 10.5403 10.5583 10.6533 9.98488 10.6533C9.41144 10.6533 8.84362 10.5403 8.31383 10.3209C7.78404 10.1014 7.30266 9.77977 6.89718 9.37429C6.4917 8.96881 6.17005 8.48743 5.95061 7.95764C5.73116 7.42785 5.61821 6.86003 5.61821 6.28659C5.61821 5.12848 6.07827 4.0178 6.89718 3.19889C7.71609 2.37998 8.82677 1.91992 9.98488 1.91992C11.143 1.91992 12.2537 2.37998 13.0726 3.19889C13.8915 4.0178 14.3515 5.12848 14.3515 6.28659ZM3.83488 17.7049C3.83488 16.2183 4.48488 15.0616 5.55571 14.2524C6.64738 13.4283 8.20571 12.9491 9.98738 12.9491C11.7699 12.9491 13.3282 13.4283 14.419 14.2524C15.4907 15.0608 16.1407 16.2191 16.1407 17.7049C16.1407 17.9259 16.2285 18.1379 16.3848 18.2942C16.5411 18.4505 16.753 18.5383 16.974 18.5383C17.1951 18.5383 17.407 18.4505 17.5633 18.2942C17.7196 18.1379 17.8074 17.9259 17.8074 17.7049C17.8074 15.6633 16.8849 14.0258 15.424 12.9224C13.9824 11.8341 12.0474 11.2824 9.98738 11.2824C7.92738 11.2824 5.99238 11.8341 4.55155 12.9224C3.08988 14.0258 2.16821 15.6641 2.16821 17.7049C2.16821 17.9259 2.25601 18.1379 2.41229 18.2942C2.56857 18.4505 2.78053 18.5383 3.00155 18.5383C3.22256 18.5383 3.43452 18.4505 3.5908 18.2942C3.74708 18.1379 3.83488 17.9259 3.83488 17.7049Z"
                            fill="black" />
                    </svg>
                </div>
                <div className="toolbar-label">Account</div>
            </a>
        </div>
        <div className="toolbar-item">
            <a href="shop-default.html">
                <div className="toolbar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M1.875 8.479C1.875 8.134 2.155 7.854 2.5 7.854C2.845 7.854 3.125 8.134 3.125 8.479V15.5623C3.125 16.5982 3.96417 17.4373 5 17.4373H15C16.0358 17.4373 16.875 16.5982 16.875 15.5623V8.479C16.875 8.134 17.155 7.854 17.5 7.854C17.845 7.854 18.125 8.134 18.125 8.479V15.5623C18.125 17.2882 16.7258 18.6873 15 18.6873H5C3.27417 18.6873 1.875 17.2882 1.875 15.5623V8.479Z"
                            fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M10 11.1875C10.8292 11.1875 11.6233 11.5167 12.21 12.1025C12.7958 12.6892 13.125 13.4833 13.125 14.3125V18.0625C13.125 18.4075 12.845 18.6875 12.5 18.6875C12.155 18.6875 11.875 18.4075 11.875 18.0625V14.3125C11.875 13.815 11.6775 13.3383 11.3258 12.9867C10.9742 12.635 10.4975 12.4375 10 12.4375C9.5025 12.4375 9.02583 12.635 8.67417 12.9867C8.3225 13.3383 8.125 13.815 8.125 14.3125V18.0625C8.125 18.4075 7.845 18.6875 7.5 18.6875C7.155 18.6875 6.875 18.4075 6.875 18.0625V14.3125C6.875 13.4833 7.20417 12.6892 7.79 12.1025C8.37667 11.5167 9.17083 11.1875 10 11.1875Z"
                            fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M7.45325 1.9375V6.625C7.45325 8.385 6.02492 9.8125 4.26492 9.8125C3.27242 9.8125 2.33492 9.355 1.72408 8.57333C1.11325 7.79083 0.897416 6.77167 1.13742 5.80833L1.79992 3.15917C2.07158 2.07333 3.04658 1.3125 4.16492 1.3125H6.82825C7.17325 1.3125 7.45325 1.5925 7.45325 1.9375ZM6.20325 2.5625H4.16492C3.61992 2.5625 3.14492 2.93333 3.01325 3.46167L2.35075 6.11167C2.20325 6.70083 2.33575 7.325 2.70908 7.80417C3.08325 8.2825 3.65742 8.5625 4.26492 8.5625C5.33492 8.5625 6.20325 7.695 6.20325 6.625V2.5625Z"
                            fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M13.1716 1.3125H15.835C16.9533 1.3125 17.9283 2.07333 18.2 3.15917L18.8625 5.80833C19.1025 6.77167 18.8866 7.79083 18.2758 8.57333C17.665 9.355 16.7275 9.8125 15.735 9.8125C13.975 9.8125 12.5466 8.385 12.5466 6.625V1.9375C12.5466 1.5925 12.8266 1.3125 13.1716 1.3125ZM13.7966 2.5625V6.625C13.7966 7.695 14.665 8.5625 15.735 8.5625C16.3425 8.5625 16.9166 8.2825 17.2908 7.80417C17.6641 7.325 17.7966 6.70083 17.6491 6.11167L16.9866 3.46167C16.855 2.93333 16.38 2.5625 15.835 2.5625H13.7966Z"
                            fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M6.82153 1.3125H13.1715C13.3374 1.3125 13.4965 1.37833 13.614 1.49583C13.7315 1.61333 13.7965 1.7725 13.7965 1.93833L13.7924 6.47167C13.7907 8.3175 12.294 9.8125 10.449 9.8125H9.5407C7.69403 9.8125 6.19653 8.31583 6.19653 6.46917V1.9375C6.19653 1.5925 6.47653 1.3125 6.82153 1.3125ZM7.44653 2.5625V6.46917C7.44653 7.625 8.38403 8.5625 9.5407 8.5625H10.449C11.6049 8.5625 12.5415 7.62667 12.5424 6.47083L12.5465 2.5625H7.44653Z"
                            fill="black" />
                    </svg>
                </div>
                <div className="toolbar-label">Shop</div>
            </a>
        </div>
        <div className="toolbar-item">
            <Link  to="/wishlist"
            onClick={() => {isLogin ?  FetchWishlist() : showAlert("Not logged in yet.",  'Click Here to Login')}}
            >
                <div className="toolbar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_4013_1872)">
                            <path
                                d="M18.3932 3.30791C16.218 1.13334 12.6795 1.13334 10.5049 3.30791L9.99983 3.8127L9.49504 3.30791C7.32046 1.13304 3.78163 1.13304 1.60706 3.30791C-0.523361 5.43833 -0.537195 8.81527 1.57498 11.1632C3.50142 13.3039 9.18304 17.9289 9.4241 18.1246C9.58775 18.2576 9.78467 18.3224 9.9804 18.3224C9.98688 18.3224 9.99335 18.3224 9.99953 18.3221C10.202 18.3315 10.406 18.2621 10.575 18.1246C10.816 17.9289 16.4982 13.3039 18.4253 11.1629C20.5371 8.81527 20.5233 5.43833 18.3932 3.30791ZM17.1125 9.98174C15.6105 11.6503 11.4818 15.0917 9.99953 16.313C8.51724 15.092 4.38944 11.6509 2.88773 9.98203C1.41427 8.34433 1.40044 6.01199 2.85564 4.55679C3.59885 3.81388 4.57488 3.44213 5.5509 3.44213C6.52693 3.44213 7.50295 3.81358 8.24616 4.55679L9.3564 5.66703C9.48856 5.79919 9.65516 5.87807 9.82999 5.90574C10.1137 5.96667 10.4216 5.88749 10.6424 5.66732L11.7532 4.55679C13.2399 3.07067 15.6582 3.07097 17.144 4.55679C18.5992 6.01199 18.5854 8.34433 17.1125 9.98174Z"
                                fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_4013_1872">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <div className="toolbar-count">{WishListData[0]?.WishListCount || 0}</div>
                </div>
                <div className="toolbar-label">Wishlist</div>
            </Link>
        </div>
        <div className="toolbar-item">
            <a onClick={() => setIsCartOpen(!isCartOpen)} data-bs-toggle="offcanvas">
                <div className="toolbar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M4.70906 7.42985L4.0424 16.699H15.8641L15.1974 7.42985H4.70906ZM16.7491 5.76318H3.15823L2.38073 16.5798C2.36436 16.8082 2.39521 17.0374 2.47134 17.2533C2.54748 17.4692 2.66727 17.6671 2.82325 17.8347C2.97923 18.0022 3.16805 18.1358 3.37795 18.2272C3.58785 18.3186 3.81431 18.3657 4.04323 18.3657H15.8641C16.0931 18.3657 16.3196 18.3185 16.5296 18.2271C16.7395 18.1357 16.9284 18.002 17.0844 17.8344C17.2404 17.6667 17.3601 17.4687 17.4362 17.2527C17.5123 17.0368 17.5431 16.8074 17.5266 16.579L16.7491 5.76318Z"
                            fill="black" />
                        <path fillRule="evenodd" clipRule="evenodd"
                            d="M9.38996 3.86652C9.17153 3.86641 8.95523 3.90936 8.75342 3.99292C8.55162 4.07649 8.36826 4.19901 8.21385 4.3535C8.05944 4.50799 7.93701 4.6914 7.85355 4.89325C7.77009 5.0951 7.72724 5.31143 7.72746 5.52985V6.10068C7.72746 6.3217 7.63966 6.53366 7.48338 6.68994C7.3271 6.84622 7.11514 6.93402 6.89412 6.93402C6.67311 6.93402 6.46115 6.84622 6.30487 6.68994C6.14859 6.53366 6.06079 6.3217 6.06079 6.10068V5.52985C6.06068 5.09263 6.14672 4.65967 6.31399 4.2557C6.48125 3.85174 6.72647 3.48469 7.03564 3.17553C7.3448 2.86637 7.71185 2.62115 8.11581 2.45388C8.51977 2.28661 8.95273 2.20057 9.38996 2.20068H10.5275C11.412 2.2009 12.2603 2.55246 12.8857 3.17802C13.5111 3.80359 13.8625 4.65194 13.8625 5.53652V6.10068C13.8625 6.3217 13.7747 6.53366 13.6184 6.68994C13.4621 6.84622 13.2501 6.93402 13.0291 6.93402C12.8081 6.93402 12.5961 6.84622 12.4399 6.68994C12.2836 6.53366 12.1958 6.3217 12.1958 6.10068V5.53652C12.1958 5.09397 12.02 4.66954 11.7072 4.35653C11.3943 4.04353 10.97 3.86757 10.5275 3.86735"
                            fill="black" />
                    </svg>
                    <div className="toolbar-count">{cartItems?.length || 0}</div>
                </div>
                <div className="toolbar-label">Cart</div>
            </a>
        </div>
    </div>
    {/* <!-- /toolbar  --> */}
    </>
  )
}

export default Footer
