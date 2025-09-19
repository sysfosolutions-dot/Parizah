import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import CollectionContext from '../../Context/Collection'
import AccountContext from '../../Context/Account';
import ShoppingCartContext from '../../Context/Shopping_Cart';
import QuickView_Modal from '../../Components/Common/Modal/QuickView';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Page_NotFound from '../404';
const Wishlist_Page = () => {
  const {WishListData, RemoveFrom_WishList, FetchWishlist, W_TotalPage, setW_TotalPage, setcurrentW_Page} = useContext(CollectionContext);
  const {Currency} =useContext(AccountContext);
  const [TotalPage, setTotalPage] = useState(1);
  const {AddToCart} = useContext(ShoppingCartContext);

  const handleChangePage = (event, newPage) => {
        //console.log(event);
        setcurrentW_Page(newPage);
        setW_TotalPage(newPage)
  };




  return (
    <>
       <section className="tf-page-title">
            <div className="container">
                <div className="box-title text-center">
                    <h4 className="title">My Wishlist</h4>
                    <div className="breadcrumb-list">
                        <a className="breadcrumb-item" href="index.html">Home</a>
                        <div className="breadcrumb-item dot"><span></span></div>
                        <div className="breadcrumb-item current">Wishlist</div>
                    </div>
                </div>
            </div>
        </section>
      <section className="flat-spacing-13 pb-0">
            <div className="container">
                <div className="wrapper-wishlist tf-grid-layout tf-col-2 lg-col-3 xl-col-4">
                    {WishListData.map((itm, idx)=> <div className={`${itm?.ISStock === "0" ? 'out-of-stock' : ''} card-product style-wishlist style-3 card-product-size`}>
                        <i className="icon icon-close remove" onClick={()=> { RemoveFrom_WishList(itm?.WishListId); FetchWishlist()}}></i>
                        <div className="card-product-wrapper">
                            <Link to={`/product/${itm?.ProductName}/${itm?.ProductId}/${itm?.PVDId}`}  className="product-img">
                                <img className="img-product lazyload" 
                                    src={import.meta.env.VITE_PUBLIC_PRODUCT_IMG + itm?.ProductImage } alt="image-product"/>
                                <img className="img-hover lazyload" 
                                    src={import.meta.env.VITE_PUBLIC_PRODUCT_IMG + itm?.ProductImage }  alt="image-product"/>
                            </Link>
                            <ul className="list-product-btn">
                                <li>
                                    <a onClick={()=> AddToCart()}  className="box-icon hover-tooltip">
                                        <span className="icon icon-cart2"></span>
                                        <span className="tooltip">Add to Cart</span>
                                    </a>
                                </li>
                                <li>
                                    <QuickView_Modal productIdx={itm} />

                                </li>
                                {/* <li>
                                    <a href="#compare" data-bs-toggle="modal" aria-controls="compare"
                                        className="box-icon hover-tooltip compare">
                                        <span className="icon icon-compare"></span>
                                        <span className="tooltip">Add to Compare</span>
                                    </a>
                                </li> */}
                            </ul>
                        </div>
                        <div className="card-product-info">
                            <a href="product-detail.html" className="name-product link fw-medium text-md">{itm?.ProductName}</a>
                            <p className="price-wrap fw-medium">
                                <span className="price-new">{Currency?.Symbol}{itm?.ProductPrice}</span>
                                <span className="price-old">{Currency?.Symbol}150.00</span>
                            </p>
                            <ul className="list-color-product">
                                <li className="list-color-item hover-tooltip tooltip-bot color-swatch active">
                                    <span className="tooltip color-filter">Grey</span>
                                    <span className="swatch-value bg-grey-4"></span>
                                    <img className=" lazyload" data-src="images/products/fashion/product-19.jpg"
                                        src="images/products/fashion/product-19.jpg" alt="image-product"/>
                                </li>
                                <li className="list-color-item color-swatch hover-tooltip tooltip-bot">
                                    <span className="tooltip color-filter">Black</span>
                                    <span className="swatch-value bg-dark"></span>
                                    <img className=" lazyload" data-src="images/products/fashion/product-9.jpg"
                                        src="images/products/fashion/product-9.jpg" alt="image-product"/>
                                </li>
                                <li className="list-color-item color-swatch hover-tooltip tooltip-bot line">
                                    <span className="tooltip color-filter">White</span>
                                    <span className="swatch-value bg-white"></span>
                                    <img className=" lazyload" data-src="images/products/fashion/product-4.jpg"
                                        src="images/products/fashion/product-4.jpg" alt="image-product"/>
                                </li>
                            </ul>
                        </div>
                    </div>)}
                </div>
            </div>
            </section>
           {WishListData.length > 0 ? <div className="wg-pagination my-5">
                <Stack spacing={2}>
                  <Pagination
                    count={W_TotalPage}
                    onChange={handleChangePage}
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        backgroundColor: "#fff",
                        color: "#000",
                        borderRadius: "20px",
                        border:"1px solid rgba(0, 0, 0, 0.2)",
                        "&:hover": {
                          backgroundColor: "#cce5ff",
                        },
                      },
                      "& .Mui-selected": {
                        backgroundColor: "#000 !important",
                        color: "#fff",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "#115293",
                        },
                      },
                    }}
                  />
                </Stack>
              </div> : <Page_NotFound/>}                         
    </> 
  )
}

export default Wishlist_Page
