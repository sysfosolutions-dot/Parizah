import React, { useContext, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Cookies from "js-cookie";
import ProductContext from '../../../../Context/Products';
import { Product_Service } from '../../../../Services/Product/ProductService';

const SearchModal = () => {
    const [searchValue, setsearchValue] = useState('')
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');
    const [modal, setModal] = useState(false);
     const toggle = () => setModal(!modal);
     const {NewArrivals} = useContext(ProductContext);
    const {Custom_api_call} = Product_Service();
     const Searchproduct = async ()=>{
        const CookieId = Cookies.get('user_id');
        const OBJ ={
            procName:'FetchProductPagination',
            Para:JSON.stringify({ClientId:ClientID,  CategoryId:'0', ProductName:searchValue, FilterBy:'Priority', Pagination:0})
        }
        const result = await Custom_api_call(OBJ)
    }



  return (
    <>
    <li className="nav-search" onClick={toggle}>
            <a  className="nav-icon-item"> <i className="icon icon-search"></i></a></li>
    <Modal isOpen={modal} toggle={toggle}  className="modal-fullscreen rounded-0  popup-search type-search-product show" >
        <ModalBody className='  type-search-product py-0 ps-0'>
                <div class="modal-content">
                <div class="header">
                    <button class="icon-close icon-close-popup" onClick={toggle} data-bs-dismiss="modal"></button>
                </div>
                <div class="container-3">
                    <div class="row justify-content-center">
                        <div class="col-lg-8">
                            <div class="looking-for-wrap">
                                <div class="heading">What are you looking for?</div>
                                <form class="form-search">
                                    <fieldset class="text">
                                        <input type="text" placeholder="Search" class="" name="text" tabindex="0"
                                            onChange={(e)=>  setsearchValue(e.target.value)} aria-required="true" required=""/>
                                    </fieldset>
                                    <button class="" type="button" onClick={Searchproduct}>
                                        <i class="icon icon-search"></i>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xl-8">
                            <div class="top-title">
                                <div class="title">Products</div>
                                <a class="link" href="shop-fullwidth.html">View all</a>
                            </div>
                            <div class="tf-grid-layout tf-col-2 md-col-3 xl-col-4">
                                {/* <div class="card-product style-3 card-product-size">
                                    <div class="card-product-wrapper">
                                        <a href="product-detail.html" class="product-img">
                                            <img class="img-product lazyload"
                                                data-src="images/products/fashion/product-25.jpg"
                                                src="images/products/fashion/product-25.jpg" alt="image-product"/>
                                            <img class="img-hover lazyload"
                                                data-src="images/products/fashion/product-24.jpg"
                                                src="images/products/fashion/product-24.jpg" alt="image-product"/>
                                        </a>
                                        <ul class="list-product-btn">
                                            <li>
                                                <a href="javascript:void(0);" class="box-icon hover-tooltip wishlist">
                                                    <span class="icon icon-heart2"></span>
                                                    <span class="tooltip">Add to Wishlist</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);"
                                                    class="btn-quickview box-icon hover-tooltip quickview">
                                                    <span class="icon icon-view"></span>
                                                    <span class="tooltip">Quick View</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);"
                                                    class="box-icon hover-tooltip compare btn-compare">
                                                    <span class="icon icon-compare"></span>
                                                    <span class="tooltip">Add to Compare</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="product-btn-main">
                                            <a href="#shoppingCart" data-bs-toggle="offcanvas" class="btn-main-product">
                                                <span class="icon icon-cart2"></span>
                                                <span class="text-md fw-medium">
                                                    Add to Cart
                                                </span>
                                            </a>
                                        </div>
                                        <ul class="size-box">
                                            <li class="size-item text-xs text-white">XS</li>
                                            <li class="size-item text-xs text-white">M</li>
                                            <li class="size-item text-xs text-white">XL</li>
                                        </ul>

                                    </div>
                                    <div class="card-product-info">
                                        <a href="product-detail.html" class="name-product link fw-medium text-md">Midi
                                            Knit
                                            Dress</a>
                                        <p class="price-wrap fw-medium">
                                            <span class="price-new">$40.00</span>
                                        </p>
                                    </div>
                                </div> */}
                                {NewArrivals.length > 0 ? 
                                NewArrivals.map((itm, idx)=> <div class="card-product style-3">
                                    <div class="card-product-wrapper">
                                        <a href="product-detail.html" class="product-img">
                                            <img class="img-product lazyload"
                                                data-src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${itm?.ProductImage}`}
                                                src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${itm?.ProductImage}`} alt="image-product"/>
                                            <img class="img-hover lazyload"
                                                data-src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${itm?.ProductImage}`}
                                                src={`${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${itm?.ProductImage}`} alt="image-product"/>
                                        </a>
                                        <ul class="list-product-btn">
                                            <li>
                                                <a href="javascript:void(0);" class="box-icon hover-tooltip wishlist">
                                                    <span class="icon icon-heart2"></span>
                                                    <span class="tooltip">Add to Wishlist</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);"
                                                    class="btn-quickview box-icon hover-tooltip quickview">
                                                    <span class="icon icon-view"></span>
                                                    <span class="tooltip">Quick View</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="javascript:void(0);"
                                                    class="box-icon hover-tooltip compare btn-compare">
                                                    <span class="icon icon-compare"></span>
                                                    <span class="tooltip">Add to Compare</span>
                                                </a>
                                            </li>
                                        </ul>
                                        <div class="product-btn-main">
                                            <a href="#shoppingCart" data-bs-toggle="offcanvas" class="btn-main-product">
                                                <span class="icon icon-cart2"></span>
                                                <span class="text-md fw-medium">
                                                    Add to Cart
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="card-product-info">
                                        <a href="product-detail.html" class="name-product link fw-medium text-md">Crop
                                           ₹{itm.ProductName}</a>
                                        <p class="price-wrap fw-medium">
                                            <span class="price-new">₹{itm?.ProductPrice}</span>
                                        </p>
                                    </div>
                                </div>) : null}

                            </div>
                        </div>
                        <div class="col-xl-4">
                            <div class="top-title">
                                <div class="title">Articals</div>
                                <a class="link" href="blog-list-01.html">View all</a>
                            </div>
                            <ul class="list-articals">
                                <li class="item hover-img">
                                    <a href="blog-single.html" class="img-box img-style">
                                        <img class="lazyload" data-src="images/blog/articals-1.jpg"
                                            src="images/blog/articals-1.jpg" alt=""/>
                                    </a>
                                    <div class="content">
                                        <a href="blog-single.html" class="link title">Top 5 Fashion Trends You Can't
                                            Miss
                                            This Season</a>
                                        <span class="date-post">12 Jun, 2025</span>
                                    </div>
                                </li>
                                <li class="item hover-img">
                                    <a href="blog-single.html" class="img-box img-style">
                                        <img class="lazyload" data-src="images/blog/articals-2.jpg"
                                            src="images/blog/articals-2.jpg" alt=""/>
                                    </a>
                                    <div class="content">
                                        <a href="blog-single.html" class="link title">How to Style Your Wardrobe Staples
                                            for
                                            Every Occasion</a>
                                        <span class="date-post">15 Jun, 2025</span>
                                    </div>
                                </li>
                                <li class="item hover-img">
                                    <a href="blog-single.html" class="img-box img-style">
                                        <img class="lazyload" data-src="images/blog/articals-3.jpg"
                                            src="images/blog/articals-3.jpg" alt=""/>
                                    </a>
                                    <div class="content">
                                        <a href="blog-single.html" class="link title">Sustainable Fashion: How to Build
                                            an
                                            Eco-Friendly Closet</a>
                                        <span class="date-post">17 Jun, 2025</span>
                                    </div>
                                </li>
                                <li class="item hover-img">
                                    <a href="blog-single.html" class="img-box img-style">
                                        <img class="lazyload" data-src="images/blog/articals-4.jpg"
                                            src="images/blog/articals-4.jpg" alt=""/>
                                    </a>
                                    <div class="content">
                                        <a href="blog-single.html" class="link title">Accessorize Like a Pro: Elevate
                                            Your
                                            Outfits with These Key Pieces</a>
                                        <span class="date-post">19 Jun, 2025</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </ModalBody>
    </Modal>
        </>
  )
}

export default SearchModal
