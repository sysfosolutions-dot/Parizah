import React, { useContext, useEffect, useState } from "react";
import { categories } from "../../Data/MenuData/Menudata";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import OutsideClickHandler from "react-outside-click-handler";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountContext from "../../Context/Account";
import { Common_Service } from "../../Services/Common/CommonService";
import ShoppingCartContext from "../../Context/Shopping_Cart";
import CollectionContext from "../../Context/Collection";
import ProductContext from "../../Context/Products";
import SearchModal from "../../Components/Common/Modal/SearchModal";
import { useSweetAlert } from "../../Context/SweetAlert";

const Header = () => {
  const img_URL = import.meta.env.VITE_IMG_URL;
  const Img_URL = import.meta.env.BASE_URL;
  const {
    isLogin,
    LoginDrawerOpen,
    setLoginDrawerOpen,
    Currency,
    setcurrency,
    CompanyDetails,
  } = useContext(AccountContext);
  const { isCartOpen, setIsCartOpen, cartItems } =
    useContext(ShoppingCartContext);
  const { WishListData, FetchWishlist } = useContext(CollectionContext);
  const { bannerData } = useContext(ProductContext);
  const { showAlert } = useSweetAlert();
  const [open, setOpen] = useState(false);
  const [OpenMenu, setOpenMenu] = useState(0);
  const [childMenu, setchildMenu] = useState("no_list");
  const navigate = useNavigate();
  const [ActiveTab, setActiveTab] = useState(1);
  const [menuList, setmenuList] = useState([]);
  const { UseCommonService } = Common_Service();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [openCurrency, setOpenCurrency] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const handleSelect = (language) => setSelectedLanguage(language);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const formattedCategories = menuList
    .filter((cat) => cat.ParentCategory === null)
    .map((parent) => ({
      ...parent,
      children: menuList.filter(
        (child) => child.ParentCategory === parent.CategoryName
      ),
    }));

  const toggleDrawer = (state) => () => {
    setOpen(!open);
  };

  const toggleDropdown = (ID) => {
    if (ID === OpenMenu) {
      setOpenMenu(0);
    } else {
      setOpenMenu(ID);
    }
  };

  const openChildMenu = (menu) => {
    if (childMenu === menu) {
      setchildMenu("no_list");
    } else {
      setchildMenu(menu);
    }
  };

  const get_Menus = async () => {
    const OBJ = {
      Para: JSON.stringify({
        SearchBy: "ProductCategory.CategoryName",
        Criteria: "",
        Status: "Active",
        ActionMode: "Search",
      }),
      procName: "productcategory",
    };

    const result = await UseCommonService(OBJ);

    if (Array.isArray(result)) {
      // ✅ Show all categories unless ProductCount is explicitly 0
      const filtered = result.filter(
        (cat) =>
          cat?.ProductCount === undefined ||
          cat?.ProductCount === null ||
          Number(cat?.ProductCount) > 0
      );

      setmenuList(filtered);
    }
  };

  const GoToprofile = () => {
    navigate("/account");
  };

  const GotoWishlistPage = async () => {
    setOpen(!open);
    if (isLogin) {
      navigate("/wishlist");
    } else {
      const confirm = await showAlert(
        "Not logged in yet.",
        "Click Here To Login"
      );
      console.log(confirm);

      if (confirm) {
      }
    }
  };

  useEffect(() => {
    get_Menus();
  }, []);

  return (
    <header id="header" className="header-default">
      <div className="container">
        <div className="row wrapper-header align-items-center">
          <div className="col-md-4 col-3 d-xl-none">
            <div
              className="mobile-menu"
              data-bs-toggle="offcanvas"
              aria-controls="mobileMenu"
              onClick={toggleDrawer(true)}
            >
              <i className="icon icon-categories1"></i>
            </div>
          </div>
          <div className="col-xl-2 col-md-4 col-6 text-xxl-center">
            <Link to="/" className="logo-header">
              {/* <img
                src={`${import.meta.env.VITE_PUBLIC_COMPANY_LOGO
                  }/assets/CompanyLogo/Parizah_Logo.png`}
                alt="logo"
                className="logo"
              /> */}
              <img
                src={`${import.meta.env.VITE_PUBLIC_COMPANY_LOGO}${
                  CompanyDetails && CompanyDetails[0]?.CompanyLogo
                }`}
                alt="logo"
                className="logo"
              />
            </Link>
          </div>
          <div className="col-xxl-5 col-xl-6 d-none d-xl-block">
            <nav className="box-navigation text-center">
              <ul className="box-nav-menu justify-content-start">
                <li className="menu-item">
                  <Link to="/" className="item-link">
                    Home
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/about" className="item-link">
                    About Us
                  </Link>
                </li>
                {formattedCategories.map((parent) => (
  <li
    key={parent.CategoryId}
    className="menu-item relative"
    onMouseEnter={() => setIsShopOpen(parent.CategoryName)}
    onMouseLeave={() => setIsShopOpen(null)}
  >
    <a href="#" className="item-link">
      {parent.CategoryName} <i className="icon icon-arr-down"></i>
    </a>

    {isShopOpen === parent.CategoryName && (
      <div className="sub-menu mega-menu mega-shop block">
        <div className="wrapper-sub-menu">
          <div className="mega-menu-item">
            <ul className="menu-list">
              {parent.children.map((child) => (
                <li key={child.CategoryId}>
                  <Link
                    to={`/collection/${parent.CategoryName}?cate=${child.CategoryId}`}
                    className="menu-link-text link"
                    onClick={() => {
                      setIsShopOpen(null);
                      window.scrollTo(0, 0);
                    }}
                  >
                    {child.CategoryName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </li>
))}


                <li className="menu-item px-0">
                  <Link to="/contact-us" className="item-link">
                    Contact Us
                  </Link>
                </li>
                <li className="menu-item px-0">
                  <Link to="/blogs" className="item-link">
                    Blog
                  </Link>
                </li>
                {/* <li className="menu-item position-relative">
      <a href="#" className="item-link">
        Blog <i className="icon icon-arr-down"></i>
      </a>

      <div className="sub-menu sub-menu-style-3">
        <ul className="menu-list mt-0">
          <li>
            <div className="menu-heading">Blogs</div>
          </li>
          <li><a href="blog-list-01.html" className="menu-link-text link">Blog List 1</a></li>
          <li><a href="blog-list-02.html" className="menu-link-text link">Blog List 2</a></li>
          <li><a href="blog-grid-01.html" className="menu-link-text link">Blog Grid 1</a></li>
          <li><a href="blog-grid-02.html" className="menu-link-text link">Blog Grid 2</a></li>
          <li><a href="blog-single.html" className="menu-link-text link">Single Blog</a></li>
        </ul>

        <div className="wrapper-sub-blog">
          <div className="menu-heading">Recent Posts</div>
          <ul className="list-recent-blog">
            <li className="item">
              <a href="blog-single.html" className="img-box">
                <img src={`${img_URL}/blog/recent-1.jpg`} alt="img-recent-blog" />
              </a>
              <div className="content">
                <a href="blog-single.html" className="fw-medium text-sm link title">
                  The Power of Monochrome: Styling One Color
                </a>
                <span className="text-xxs text-grey date-post">Sep 19 2025</span>
              </div>
            </li>

            <li className="item">
              <a href="blog-single.html" className="img-box">
                <img src={`${img_URL}/blog/recent-2.jpg`} alt="img-recent-blog" />
              </a>
              <div className="content">
                <a href="blog-single.html" className="fw-medium text-sm link title">
                  10 Must-Have Accessories for Every Season
                </a>
                <span className="text-xxs text-grey date-post">Sep 19 2025</span>
              </div>
            </li>

            <li className="item">
              <a href="blog-single.html" className="img-box">
                <img src={`${img_URL}/blog/recent-3.jpg`} alt="img-recent-blog" />
              </a>
              <div className="content">
                <a href="blog-single.html" className="fw-medium text-sm link title">
                  How to Elevate Your Look with Layering
                </a>
                <span className="text-xxs text-grey date-post">Sep 19 2025</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </li> */}
              </ul>
            </nav>
          </div>

          <div className="col-xxl-5 col-xl-4 col-md-4 col-3">
            <ul className="nav-icon d-flex justify-content-end align-items-center">
              <li
                className="nav-account"
                onClick={() =>
                  !isLogin
                    ? setLoginDrawerOpen(!LoginDrawerOpen)
                    : GoToprofile()
                }
              >
                <span className="UserName">Afzal Ansari</span>
                <a data-bs-toggle="offcanvas" className="nav-icon-item">
                  <i className="icon icon-user"></i>
                  {isLogin ? (
                    <span
                      className="count-box p-0"
                      style={{
                        width: "7px",
                        height: "7px",
                        background: "#7c8c47",
                      }}
                    ></span>
                  ) : null}
                </a>
              </li>
              <SearchModal />
              <li className="nav-wishlist">
                <Link
                  to="/wishlist"
                  className="nav-icon-item"
                  onClick={() => {
                    isLogin
                      ? FetchWishlist()
                      : showAlert(
                        "Not logged in yet.",
                        "Login required to access this feature."
                      );
                  }}
                >
                  <i className="icon icon-heart"></i>
                  {WishListData[0]?.WishListCount && (
                    <span className="count-box">
                      {WishListData[0]?.WishListCount}
                    </span>
                  )}
                </Link>
              </li>
              <li
                className="nav-cart"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <a data-bs-toggle="offcanvas" className="nav-icon-item">
                  <i className="icon icon-cart"></i>
                  <span className="count-box">{cartItems.length}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <List sx={{ width: 300 }}>
            <div className="canvas-mb">
              <button
                className="icon-close icon-close-popup"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                onClick={toggleDrawer(false)}
              ></button>
              <div className="mb-canvas-content">
                <div className="mb-body">
                  <div className="mb-content-top">
                    {/* <ul className="nav-ul-mb" id="wrapper-menu-navigation">
                        <li className="nav-mb-item">
                            <Link to="/" className="collapsed mb-menu-link" 
                                aria-expanded="true" aria-controls="dropdown-menu-home">
                                <span>Home</span>
                           </Link>
                        </li>
                        <li className="nav-mb-item">
                            <a  className="collapsed mb-menu-link" onClick={()=> toggleDropdown(1)}
                                aria-expanded="true" aria-controls="dropdown-menu-shop">
                                <span>Shop</span>
                                <span className="btn-open-sub"></span>
                            </a>
                            <div id="dropdown-menu-shop" className={`${OpenMenu === 1 ? 'show' : ''} collapse`}>
                                <ul className="sub-nav-menu">
                                    <li><div  className="sub-nav-link" onClick={()=> openChildMenu('Men')} aria-expanded="true"
                                            aria-controls="sub-shop-layout">
                                            <span>Men</span>
                                            {OpenMenu === 1 ?<span className="btn-open-sub"></span> : null}
                                        </div>
                                        <div id="sub-shop-layout" className={childMenu === "Men" ?  'show' : 'collapse'}>
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="shop-default.html" className="sub-nav-link">Kurta pajma</a></li>
                                                <li><a href="shop-default.html" className="sub-nav-link">Nehru Jacket</a></li>
                                                <li><a href="shop-default.html" className="sub-nav-link">Serwani</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="sub-nav-link collapsed" onClick={()=> openChildMenu('Women')}
                                            aria-controls="sub-shop-list">
                                            <span>Women</span>
                                            <span className="btn-open-sub"></span>
                                        </div>
                                        <div id="sub-shop-list" className={childMenu === "Women" ?  'show' : 'collapse'}>
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><Link to="/collection" className="sub-nav-link">Saree</Link></li>
                                                <li><Link to="/collection" className="sub-nav-link">Kurta & Suits</Link></li>
                                                <li><Link to="/collection" className="sub-nav-link">Lehnga <span className="demo-label">Hot</span></Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="sub-nav-link collapsed"
                                            onClick={()=> openChildMenu('kids')}
                                            aria-controls="sub-shop-styles">
                                            <span>Kids</span>
                                            <span className="btn-open-sub"></span>
                                        </div>
                                        <div id="sub-shop-styles" className={childMenu === "kids" ?  'show' : 'collapse'}>
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="product-style-01.html" className="sub-nav-link">
                                                        Boys Wear</a></li>
                                                <li><a href="product-style-02.html" className="sub-nav-link">
                                                        Girls Wear</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-mb-item">
                            <a href="#dropdown-menu-product" className="collapsed mb-menu-link" data-bs-toggle="collapse"
                                aria-expanded="true" aria-controls="dropdown-menu-product">
                                <span>Products</span>
                                <span className="btn-open-sub"></span>
                            </a>
                            <div id="dropdown-menu-product" className="collapse">
                                <ul className="sub-nav-menu">
                                    <li>
                                        <a href="#sub-product-layout" className="sub-nav-link collapsed"
                                            data-bs-toggle="collapse" aria-expanded="true"
                                            aria-controls="sub-product-layout">
                                            <span>Product Layouts</span>
                                            <span className="btn-open-sub"></span>
                                        </a>
                                        <div id="sub-product-layout" className="collapse">
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="product-detail.html" className="sub-nav-link">Product
                                                        Single</a></li>
                                                <li><a href="product-right-thumbnail.html" className="sub-nav-link">Product
                                                        Right Thumbnail</a></li>
                                                <li><a href="product-detail.html" className="sub-nav-link">Product
                                                        Left Thumbnail</a></li>

                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#sub-product-detail" className="sub-nav-link collapsed"
                                            data-bs-toggle="collapse" aria-expanded="true"
                                            aria-controls="sub-product-detail">
                                            <span>Product Details</span>
                                            <span className="btn-open-sub"></span>
                                        </a>
                                        <div id="sub-product-detail" className="collapse">
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="product-inner-zoom.html" className="sub-nav-link">Product Inner
                                                        Zoom</a></li>
                                                <li><a href="product-inner-circle-zoom.html"
                                                        className="sub-nav-link">Product Inner Circle Zoom</a>
                                                </li>
                                          
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#sub-product-feature" className="sub-nav-link collapsed"
                                            data-bs-toggle="collapse" aria-expanded="true"
                                            aria-controls="sub-product-feature">
                                            <span>Products Features</span>
                                            <span className="btn-open-sub"></span>
                                        </a>
                                        <div id="sub-product-feature" className="collapse">
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="product-together.html" className="sub-nav-link">Buy
                                                        Together</a></li>
                                                <li><a href="product-countdown-timer.html"
                                                        className="sub-nav-link">Countdown Timer</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li>
                                        <a href="#sub-product-desc" className="sub-nav-link collapsed"
                                            data-bs-toggle="collapse" aria-expanded="true"
                                            aria-controls="sub-product-desc">
                                            <span>Products Description</span>
                                            <span className="btn-open-sub"></span>
                                        </a>
                                        <div id="sub-product-desc" className="collapse">
                                            <ul className="sub-nav-menu sub-menu-level-2">
                                                <li><a href="product-description-vertical.html"
                                                        className="sub-nav-link">Product Description Vertical</a>
                                                </li>
                                                <li><a href="product-description-tab.html" className="sub-nav-link">Product
                                                        Description Tab</a></li>
                                                <li><a href="product-description-accordions.html"
                                                        className="sub-nav-link">Product Description
                                                        Accordions</a></li>
                                                <li><a href="product-description-side-accordions.html"
                                                        className="sub-nav-link">Product Description Side
                                                        Accordions</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="nav-mb-item">
                            <a href="#dropdown-menu-blog" className="collapsed mb-menu-link" data-bs-toggle="collapse"
                                aria-expanded="true" aria-controls="dropdown-menu-blog">
                                <span>Blog</span>
                                <span className="btn-open-sub"></span>
                            </a>
                            <div id="dropdown-menu-blog" className="collapse">
                                <ul className="sub-nav-menu">
                                    <li><a href="blog-list-01.html" className="sub-nav-link">Blog List 1</a>
                                    </li>
                                    <li><a href="blog-list-02.html" className="sub-nav-link">Blog List 2</a>
                                    </li>
                                    <li><a href="blog-grid-01.html" className="sub-nav-link">Blog Grid 1</a>
                                    </li>
                                    <li><a href="blog-grid-02.html" className="sub-nav-link">Blog Grid 2</a>
                                    </li>
                                    <li><a href="blog-single.html" className="sub-nav-link">Single Blog </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul> */}
                    <ul
                      className="sub-nav-menu nav-ul-mb"
                      id="wrapper-menu-navigation"
                    >
                      <li className="nav-mb-item" onClick={toggleDrawer(false)}>
                        <Link
                          to="/"
                          className="collapsed mb-menu-link"
                          aria-expanded="true"
                          aria-controls="dropdown-menu-home"
                        >
                          <span>Home</span>
                        </Link>
                      </li>
                      <li className="nav-mb-item" onClick={toggleDrawer(false)}>
                        <Link
                          to="/about"
                          className="collapsed mb-menu-link"
                          aria-expanded="true"
                          aria-controls="dropdown-menu-home"
                        >
                          <span>About Us</span>
                        </Link>
                      </li>
                      <li className="nav-mb-item">
                        <a
                          className={`mb-menu-link ${OpenMenu === 1 ? "" : "collapsed"
                            }`}
                          onClick={() => toggleDropdown(1)}
                          aria-expanded="true"
                          aria-controls="dropdown-menu-shop"
                        >
                          <span>Shop</span>
                          <span className="btn-open-sub"></span>
                        </a>

                        <div
                          id="dropdown-menu-shop"
                          className={`${OpenMenu === 1 ? "show" : "collapse"}`}
                        >
                          <ul className="sub-nav-menu">
                            {formattedCategories.map((parent, index) => (
                              <li key={parent.CategoryId}>
                                <div
                                  className={`sub-nav-link ${childMenu === parent.CategoryName
                                    ? ""
                                    : "collapsed"
                                    }`}
                                  onClick={() =>
                                    openChildMenu(parent.CategoryName)
                                  }
                                  aria-expanded="true"
                                  aria-controls={`sub-menu-${index}`}
                                >
                                  <span>{parent.CategoryName}</span>
                                  <span className="btn-open-sub"></span>
                                </div>
                                <div
                                  id={`sub-menu-${index}`}
                                  className={
                                    childMenu === parent.CategoryName
                                      ? "show"
                                      : "collapse"
                                  }
                                >
                                  <ul className="sub-nav-menu sub-menu-level-2">
                                    {parent.children.map((child) => (
                                      <li key={child.CategoryId}>
                                        <Link
                                          to={`/collection/${parent.CategoryName}?cate=${child.CategoryId}`}
                                          className="sub-nav-link"
                                          onClick={() => setOpen(false)} // ✅ instantly closes drawer
                                        >
                                          {child.CategoryName}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                      <li className="nav-mb-item" onClick={toggleDrawer(false)}>
                        <Link
                          to="/contact-us"
                          className="collapsed mb-menu-link"
                          aria-expanded="true"
                          aria-controls="dropdown-menu-home"
                        >
                          <span>Contact Us</span>
                        </Link>
                      </li>
                      <li className="nav-mb-item" onClick={toggleDrawer(false)}>
                        <Link
                          to="/blogs"
                          className="collapsed mb-menu-link"
                          aria-expanded="true"
                          aria-controls="dropdown-menu-home"
                        >
                          <span>Blog</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="mb-other-content">
                    <div className="group-icon">
                      <Link
                        to="/wishlist"
                        onClick={() => GotoWishlistPage()}
                        className="site-nav-icon"
                      >
                        <i className="icon icon-heart"></i>
                        Wishlist
                      </Link>
                      <a
                        onClick={() => setLoginDrawerOpen(!LoginDrawerOpen)}
                        className="site-nav-icon"
                      >
                        <i className="icon icon-user"></i>
                        Login
                      </a>
                    </div>
                    <div className="mb-notice">
                      <a href="contact-us.html" className="text-need">
                        Need Help?
                      </a>
                    </div>
                    <div className="mb-contact">
                      <p>
                        Address: 609, 6th Floor Millennium Place Mall, Golf
                        City, Lucknow, Uttar Pradesh 226001
                      </p>
                    </div>
                    <ul className="mb-info">
                      <li>
                        Email:
                        <b className="fw-medium">clientcare@ecom.com</b>
                      </li>
                      <li>
                        Phone:
                        <b className="fw-medium">9999999999</b>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mb-bottom">
                  <div className="bottom-bar-language">
                    {/* <div className="tf-currencies"> */}
                    {/* <select className="image-select center style-default type-currencies">
                        <option selected data-thumbnail={`${Img_URL}assets/Images/country/us.png`}>
                          <img src={`${Img_URL}assets/Images/country/us.png`}/> USD
                        </option>
                        <option data-thumbnail="images/country/fr.png">
                          EUR
                        </option>
                        <option data-thumbnail="images/country/ger.png">
                          EUR
                        </option>
                        <option data-thumbnail="images/country/vn.png">
                          VND
                        </option>
                      </select> */}

                    {/* </div> */}
                    <div className="tf-currencies">
                      <OutsideClickHandler
                        onOutsideClick={() => setOpenCurrency(false)}
                      >
                        <div className="dropdown bootstrap-select image-select center style-default type-currencies">
                          <button
                            onClick={() => setOpenCurrency(!openCurrency)}
                            type="button"
                            className="btn dropdown-toggle btn-light"
                          >
                            <div className="filter-option">
                              <div className="filter-option-inner">
                                <div
                                  className="filter-option-inner-inner d-flex justify-content-end"
                                  style={{ width: "50px" }}
                                >
                                  <img
                                    src={`${import.meta.env.BASE_URL
                                      }/assets/Images/${Currency?.ImgURL}`}
                                    alt="flag"
                                  />
                                  <span>
                                    {" "}
                                    {Currency?.CurrencyShortName || "INR"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </button>
                          {openCurrency && (
                            <div
                              className="dropdown-menu show"
                              style={{
                                position: "absolute",
                                transform: "translate3d(0px, 20px, 0px)",
                                maxHeight: "213px",
                                overflow: "hidden",
                                minHeight: "148px",
                                left: "0px",
                                top: "20px",
                              }}
                            >
                              <div
                                className="inner show"
                                style={{
                                  maxHeight: "183px",
                                  overflowY: "auto",
                                  minHeight: "118px",
                                }}
                              >
                                <ul
                                  className="dropdown-menu inner show"
                                  style={{
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                  }}
                                >
                                  <li className="selected active">
                                    <a
                                      className="dropdown-item  selected"
                                      onClick={() => {
                                        setcurrency({
                                          Symbol: "₹",
                                          CurrencyShortName: "INR",
                                          ImgURL: "country/indian-flag.png",
                                        });
                                        setOpenCurrency(false);
                                      }}
                                    >
                                      <span className="text">
                                        <img
                                          src={`${Img_URL}/assets/Images/country/indian-flag.png`}
                                          alt="US"
                                        />
                                        INR
                                      </span>
                                    </a>
                                  </li>
                                  <li className="selected active">
                                    <a
                                      className="dropdown-item selected"
                                      onClick={() => {
                                        setcurrency({
                                          Symbol: "$",
                                          CurrencyShortName: "USD",
                                          ImgURL: "country/us.png",
                                        });
                                        setOpenCurrency(false);
                                      }}
                                    >
                                      <span className="text">
                                        <img
                                          src={`${Img_URL}/assets/Images/country/us.png`}
                                          alt="US"
                                        />{" "}
                                        USD
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => {
                                        setcurrency({
                                          Symbol: "€",
                                          CurrencyShortName: "EUR",
                                          ImgURL: "country/fr.png",
                                        });
                                        setOpenCurrency(false);
                                      }}
                                    >
                                      <span className="text">
                                        <img
                                          src={`${Img_URL}/assets/Images/country/fr.png`}
                                          alt="FR"
                                        />{" "}
                                        EUR
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => {
                                        setcurrency({
                                          Symbol: "€",
                                          CurrencyShortName: "EUR",
                                          ImgURL: "country/ger.png",
                                        });
                                        setOpenCurrency(false);
                                      }}
                                    >
                                      <span className="text">
                                        <img
                                          src={`${Img_URL}/assets/Images/country/ger.png`}
                                          alt="GER"
                                        />{" "}
                                        EUR
                                      </span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      className="dropdown-item"
                                      onClick={() => {
                                        setcurrency({
                                          Symbol: "₫",
                                          CurrencyShortName: "VND",
                                          ImgURL: "country/vn.png",
                                        });
                                        setOpenCurrency(false);
                                      }}
                                    >
                                      <span className="text">
                                        <img
                                          src={`${Img_URL}/assets/Images/country/vn.png`}
                                          alt="VN"
                                        />{" "}
                                        VND
                                      </span>
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </div>
                      </OutsideClickHandler>
                    </div>
                    <div className="tf-languages">
                      <select className="image-select center style-default type-languages">
                        <option>English</option>
                        <option>العربية</option>
                        <option>简体中文</option>
                        <option>اردو</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </List>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
