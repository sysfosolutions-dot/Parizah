import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import CollectionContext from '../../Context/Collection';
import { Slider, Typography, Box, Drawer } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Product_Service } from '../../Services/Product/ProductService';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Cookies from "js-cookie";
import ShoppingCartContext from '../../Context/Shopping_Cart';
import QuickADDTo_Cart from '../../Components/Common/Modal/QuickAddtoCart';
import AccountContext from '../../Context/Account';
import Page_NotFound from '../404';
import { useSweetAlert } from '../../Context/SweetAlert';
import QuickView_Modal from '../../Components/Common/Modal/QuickView';
import CollectionFilter from '../../Components/Sekeleton/Collection/CollectionFilter';
import CardSkeleton from '../../Components/Sekeleton/Collection/CardSkeleton';


const Collection_page = () => {
  const img_URL = import.meta.env.VITE_PUBLIC_PRODUCT_IMG;
  const location = useLocation();
  const [searchParams, setSearchParam] = useSearchParams();
  const navigate = useNavigate();
  const menuRef = useRef();
  const { Custom_api_call } = Product_Service();

  const [pageNo, setpageNo] = useState(0);
  const [ActiveColor, setActiveColor] = useState('');
  const [ActiveSize, setActiveSize] = useState('');
  const [Activebrand, setActiveBrand] = useState('');
  const [ActiveCategoryName, setActiveCategoryName] = useState('');
  const param = useParams();
  const { AddToCart } = useContext(ShoppingCartContext);
  const { Currency, isLogin } = useContext(AccountContext);
  const {
    fetchData,
    setfetchdata,
    sePayload,
    CollectionData,
    addto_WishList,
    RemoveFrom_WishList,
    TotalPage,
    WishListData,
    CollectionLoader,
  } = useContext(CollectionContext);

  const [CategoryList, setCategoryList] = useState([]);
  const [value, setValue] = useState(0);
  const [pricerange, setPriceRange] = useState({ minprice: 0, maxprice: 0 });
  const [filteredprice, setfilteredprice] = useState({ minprice: 0, maxprice: 0 });
  const [FilterLoader, setFilterloader] = useState(false);
  const [BrandList, setBrandList] = useState([]);
  const [ColorList, setColorList] = useState([]);
  const [SizeList, setSizeList] = useState([]);
  const [OpenFilterDrawer, setopenFilterDrawer] = useState(false);
  const [isChecked, setisChecked] = useState(searchParams.get("cate"));
  const [isBrandChecked, setisBrandChecked] = useState(searchParams.get("brand"));
  const [expanddrop_down, setexpanddrop_down] = useState(false);
  const [SortValue, setSortValue] = useState({ showValue: 'Best selling', Value: 'Priority' });
  const [ClientID] = useState(localStorage.getItem('ClientId') || '0');
  const { showAlert } = useSweetAlert();
  const isMobile = window.innerWidth <= 768;
  const [Grid, setGrid] = useState('tf-col-3');
  const [activeImage, setActiveImage] = useState(null);
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const handleSwatchHover = (imgSrc, index) => {
    setActiveImage(imgSrc);
    setActiveColorIndex(index);
  };

  useEffect(() => {
    if (isMobile) setGrid('tf-col-2');
  }, []);

  // ✅ Fetch filters (brands, colors, sizes)
  
  // ✅ Fetch filters (brands, colors, sizes)
  const FetchCollection_Filter = async () => {
    try {
      setFilterloader(true);
      let CatgoryID = searchParams.get('cate');
      const CategoyValues = Array.from(searchParams.entries());
      if (CategoyValues.length > 0) {
        const [firstKey, firstValue] = CategoyValues[0];
        CatgoryID = firstValue;
      }

      const OBJ = {
        Para: JSON.stringify({ CategoryId: CatgoryID, ActionMode: 'ProductFilter' }),
        procName: 'ProductFilter ',
      };
      const result = await Custom_api_call(OBJ);
      if (Array.isArray(result)) {
        // ✅ Filter out categories with ProductCount = 0
        const allCategories = JSON.parse(result[0]?.CategoryFilter || '[]');
        const filteredCategories = allCategories.filter(cat => Number(cat?.ProductCount) > 0);
        setCategoryList(filteredCategories);

        setBrandList(JSON.parse(result[0]?.Brand || '[]'));

        const colors = new Set();
        const sizes = new Set();
        const variations = JSON.parse(result[0]?.ProductVariation || '[]');
        variations.forEach((obj) => {
          const parts = obj.ProductVariation.split(',');
          parts.forEach((part) => {
            const [keyRaw, valueRaw] = part.split(':');
            if (!keyRaw || !valueRaw) return;
            const key = keyRaw.trim().toLowerCase();
            const value = valueRaw.trim();
            if (key === 'color') colors.add(value);
            if (key === 'size') sizes.add(value);
          });
        });

        setColorList(Array.from(colors));
        const uniqueSizes = Array.from(
          new Map(Array.from(sizes).map((itm) => [itm.toLowerCase(), itm])).values()
        );
        setSizeList(uniqueSizes);
        setPriceRange({
          minprice: Math.round(Number(result[0]?.MinPrice || 0)),
          maxprice: Math.round(Number(result[0]?.MaxPrice || 1000)),
        });
        setValue([
          Math.round(Number(result[0]?.MinPrice || 0)),
          Math.round(Number(result[0]?.MaxPrice || 1000)),
        ]);
      }
    } finally {
      setFilterloader(false);
    }
  };


  const handleChange = (e, newValue) => setValue(newValue);
  const handleSliderCommit = (e, newValue) => setfilteredprice({ minprice: newValue[0], maxprice: newValue[1] });

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) setexpanddrop_down(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleChangePage = (event, newPage) => setpageNo(newPage - 1);

  const ApplyFilters = (str, VALUE) => {
    setpageNo(0);
    const searchParams = new URLSearchParams(window.location.search);
    const currentValue = searchParams.get(str);
    if (currentValue === String(VALUE)) {
      searchParams.delete(str);
      if (str === 'color') setActiveColor('');
      if (str === 'size') setActiveSize('');
      if (str === 'brand') setActiveBrand('');
      if (str === 'cate') setActiveCategoryName('');
    } else {
      searchParams.set(str, VALUE);
      if (str === 'color') setActiveColor(VALUE);
      if (str === 'size') setActiveSize(VALUE);
      if (str === 'brand') setActiveBrand(VALUE);
      if (str === 'cate') setActiveCategoryName(VALUE);
    }
    setSearchParam(searchParams);
  };

  // ✅ SOFT REFRESH — fetch new data when category changes
  const [lastCategory, setLastCategory] = useState(null);
  useEffect(() => {
    const category = searchParams.get('cate');
    if (category && category !== lastCategory) {
      setLastCategory(category);
      FetchCollection_Filter();
      setfetchdata((prev) => !prev); // re-fetch products
    }
  }, [searchParams]);

  // ✅ Fetch product data (no reloads)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const COLOR = searchParams.get('color');
    const SIZE = searchParams.get('size');
    const BRAND = searchParams.get('brand');
    const CatgoryID = searchParams.get('cate');
    const Brand = BrandList.find((itm) => itm?.BrandName === BRAND);
    setActiveColor(COLOR);
    setActiveSize(SIZE);
    setActiveBrand(BRAND);

    const CookieID = Cookies.get('user_id');
    if (CatgoryID) {
      setfetchdata(!fetchData);
      sePayload({
        ClientId: ClientID,
        BrandId: Brand?.BrandId,
        MinPrice: filteredprice?.minprice || 0,
        MaxPrice: filteredprice?.maxprice || 0,
        Color: COLOR || '',
        Size: SIZE || '',
        FilterCategoryId: '0',
        CategoryId: CatgoryID,
        CookieId: CookieID,
        FilterBy: SortValue?.Value,
        Pagination: pageNo,
        ProductName: '',
      });
    }
  }, [location, pageNo, SortValue, filteredprice]);

  useEffect(() => {
    FetchCollection_Filter();
  }, []);


  return (
    <div>
      {/* <!-- Title Page --> */}
      <section className="tf-page-title">
        <div className="container">
          <div className="box-title text-center">
            {/* <h4 className="title">{subcate}</h4> */}
            <div className="breadcrumb-list">
              <a className="breadcrumb-item" href="index.html">
                Home
                
              </a>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <a className="breadcrumb-item" href="shop-collection-list.html">
                Collections
              </a>
              <div className="breadcrumb-item dot">
                <span></span>
              </div>
              <div className="breadcrumb-item ">{param?.categoryName}</div>
              {/* <div className="breadcrumb-item dot">
                <span></span>
              </div> */}
              {/* {subcate ? (
                <div className="breadcrumb-item current">{subcate}</div>
              ) : null} */}
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Title Page --> */}
      <section className="flat-spacing-24">
        <div className="container">
          <div className="row">
            <div className="col-xl-3">
              <div className="canvas-sidebar sidebar-filter canvas-filter left">
                <div className="canvas-wrapper">
                  <div className="canvas-header d-flex d-xl-none">
                    <span className="title" >Filter</span>
                    <span className="icon-close icon-close-popup close-filter"></span>
                  </div>
                  {FilterLoader ? <>
                    <CollectionFilter />
                  </> : <div className="canvas-body">
                    <div className="widget-facet">
                      <div
                        className="facet-title text-xl fw-medium"
                        data-bs-target="#availability"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="availability"
                      >
                        <span>Collections</span>
                        <span className="icon icon-arrow-up"></span>
                      </div>
                      <div id="availability" className="collapse show">
                        <span className="reset-link text-decoration-underline" onClick={() => {
                          const newParams = new URLSearchParams(window.location.search);
                          newParams.set("cate", String(CategoryList[0]?.ParentCategoryId));
                          setSearchParam(newParams);
                          setisChecked('')
                        }}>Reset</span>
                        <ul className="collapse-body filter-group-check current-scrollbar">
                          {CategoryList &&
                            CategoryList.map((itm, idx) => {
                              return (
                                <li className="list-item" key={idx}>
                                  <input
                                    type="radio"
                                    name="availability"
                                    className="tf-check"
                                    checked={isChecked === String(itm?.FilterCategoryId)}
                                    id={itm?.FilterCategoryId}
                                    onChange={() => {
                                      ApplyFilters("cate", itm?.FilterCategoryId);
                                      setisChecked(String(itm?.FilterCategoryId));
                                    }
                                    }
                                  />
                                  <label
                                    htmlFor={itm?.FilterCategoryId}
                                    className="label"
                                  >
                                    <span>{itm?.CategoryName}</span>&nbsp;
                                    <span className="count">
                                      ({itm?.ProductCount})
                                    </span>
                                  </label>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                    <div className="widget-facet">
                      <div
                        className="facet-title text-xl fw-medium"
                        data-bs-target="#price"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="price"
                      >
                        <span>Price</span>
                        <span className="icon icon-arrow-up"></span>
                      </div>
                      <div id="price" className="collapse show">
                        <div className="collapse-body widget-price filter-price show">
                          <span className="reset-price">Reset</span>
                          <div
                            className="price-val-range"
                            id="price-value-range"
                            data-min="0"
                            data-max="500"
                          ></div>
                          <div className="box-value-price">
                            <Box width={300} mx="auto">
                              <Slider
                                value={value}
                                onChange={handleChange}
                                onChangeCommitted={handleSliderCommit}
                                valueLabelDisplay="auto"
                                min={pricerange?.minprice}
                                max={pricerange?.maxprice}
                                sx={{
                                  color: "#ff6f61", // slider color
                                }}
                              />
                              <Typography gutterBottom>
                                Price Range: ₹{value[0]} - ₹{value[1]}
                              </Typography>
                            </Box>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="widget-facet">
                      <div
                        className="facet-title text-xl fw-medium"
                        data-bs-target="#color"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="color"
                      >
                        <span>Color</span>
                        <span className="icon icon-arrow-up"></span>
                      </div>
                      <div id="color" className="collapse show">
                        <div className="collapse-body filter-color-box flat-check-list">
                          {ColorList.map((item, idx) => (
                            <div
                              className={`${ActiveColor === item ? "active" : ""
                                } check-item color-item color-check `}
                              key={idx}
                              onClick={() => ApplyFilters("color", item)}
                            >
                              <span
                                className="color"
                                style={{
                                  background: item,
                                  border: "1px solid #cac5c5",
                                }}
                              ></span>
                              <span className="color-text">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="widget-facet">
                      <div
                        className="facet-title text-xl fw-medium"
                        data-bs-target="#size"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="size"
                      >
                        <span>Size</span>
                        <span className="icon icon-arrow-up"></span>
                      </div>
                      <div id="size" className="collapse show">
                        <div className="collapse-body filter-size-box flat-check-list">
                          {SizeList.map((itm, idx) => (
                            <div
                              className={`${ActiveSize &&
                                  ActiveSize.toLowerCase() === itm.toLowerCase()
                                  ? "active"
                                  : ""
                                } check-item size-item size-check`}
                              key={idx}
                              onClick={() => ApplyFilters("size", itm)}
                            >
                              <span className="size text-uppercase">{itm}</span>
                              &nbsp;
                              {/* <span className="count">(10)</span> */}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="widget-facet">
                      <div
                        className="facet-title text-xl fw-medium"
                        data-bs-target="#brand"
                        role="button"
                        data-bs-toggle="collapse"
                        aria-expanded="true"
                        aria-controls="brand"
                      >
                        <span>Brand</span>
                        <span className="icon icon-arrow-up"></span>
                      </div>
                      <div id="brand" className="collapse show">
                        <span className="reset-link text-decoration-underline" onClick={() => {
                          const newParams = new URLSearchParams(window.location.search);
                          newParams.delete('brand')
                          newParams.set("cate", String(CategoryList[0]?.ParentCategoryId));
                          setSearchParam(newParams);
                          setisBrandChecked('')
                        }}>Reset</span>
                        <ul className="collapse-body filter-group-check current-scrollbar">
                          {BrandList?.map((itm, idx) => (
                            <li className="list-item" key={idx}>
                              <input
                                type="radio"
                                name="brand"
                                checked={isBrandChecked == itm?.BrandName}
                                className="tf-check"
                                id={idx}
                              />
                              <label
                                htmlFor={idx}
                                className="label"
                                onClick={() => {
                                  ApplyFilters("brand", itm?.BrandName);
                                  setisBrandChecked(String(itm?.BrandName));
                                }
                                }
                              >
                                <span>{itm?.BrandName}</span>&nbsp;
                                <span className="count">
                                  ({itm?.BrandCount})
                                </span>
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>}
                </div>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="tf-shop-control">
                <div className="tf-group-filter">
                  <button
                    id="filterShop"
                    className="tf-btn-filter d-flex d-xl-none"
                    onClick={() => setopenFilterDrawer(true)}
                  >
                    <span className="icon icon-filter"></span>
                    <span className="text">Filter</span>
                  </button>
                  <div
                    ref={menuRef}
                    className={`tf-dropdown-sort position-relative ${expanddrop_down ? "show" : ""
                      }`}
                    onClick={() => setexpanddrop_down(!expanddrop_down)}
                    data-bs-toggle="dropdown"
                    aria-expanded={true}
                  >
                    <div className="btn-select">
                      <span className="text-sort-value">
                        {SortValue?.showValue}
                      </span>
                      <span className="icon icon-arr-down"></span>
                    </div>
                    <div
                      className={`dropdown-menu  collection-filter ${expanddrop_down ? "show" : ""
                        }`}
                      data-popper-placement="bottom-start"
                    >
                      <div
                        className="select-item"
                        data-sort-value="a-z"
                        onClick={() =>
                          setSortValue({
                            showValue: "Alphabetically, A-Z",
                            Value: "A-Z",
                          })
                        }
                      >
                        <span className="text-value-item">
                          Alphabetically, A-Z
                        </span>
                      </div>
                      <div
                        className="select-item"
                        data-sort-value="z-a"
                        onClick={() =>
                          setSortValue({
                            showValue: "Alphabetically, Z-A",
                            Value: "Z-A",
                          })
                        }
                      >
                        <span className="text-value-item">
                          Alphabetically, Z-A
                        </span>
                      </div>
                      <div
                        className="select-item"
                        data-sort-value="price-low-high"
                        onClick={() =>
                          setSortValue({
                            showValue: "Price, low to high",
                            Value: "LowToHigh",
                          })
                        }
                      >
                        <span className="text-value-item">
                          Price, low to high
                        </span>
                      </div>
                      <div
                        className="select-item"
                        data-sort-value="price-high-low"
                        onClick={() =>
                          setSortValue({
                            showValue: "Price, High to low",
                            Value: "HighToLow",
                          })
                        }
                      >
                        <span className="text-value-item">
                          Price, high to low
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="tf-control-layout">
                  <li
                    className={`tf-view-layout-switch sw-layout-list list-layout ${Grid === "list" ? "active" : ""
                      }`}
                    onClick={() => setGrid("list")}
                  >
                    <div className="item icon-list">
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                  <li
                    className={`tf-view-layout-switch sw-layout-2 ${Grid === "tf-col-2" ? "active" : ""
                      }`}
                    onClick={() => setGrid("tf-col-2")}
                  >
                    <div className="item icon-grid-2">
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                  <li
                    className={`tf-view-layout-switch sw-layout-3 ${Grid === "tf-col-3" ? "active" : ""
                      }`}
                    onClick={() => setGrid("tf-col-3")}
                  >
                    <div className="item icon-grid-3">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                  <li
                    className={`tf-view-layout-switch sw-layout-4 ${Grid === "tf-col-4" ? "active" : ""
                      }`}
                    onClick={() => setGrid("tf-col-4")}
                  >
                    <div className="item icon-grid-4">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </li>
                </ul>
              </div>
              <div
                className="tf-list-layout wrapper-shop"
                id="listLayout"
                style={{ display: Grid === "list" ? "" : "none" }}
              >
                {CollectionData.length > 0 ? (
                  <>
                    {CollectionData.map((itm, index) => (
                      <div
                        className="card-product style-list py-3"
                        data-availability="In stock"
                      >
                        <div className="card-product-wrapper">
                          <Link
                            to={`/product/${itm?.CategoryName.replace(/ /g, "-")}/${itm?.ProductId}/${itm?.PVDId}`}
                            className="product-img"
                          >
                           
                            <img
                              className="img-product lazyload"
                              src={`${img_URL}/${ itm?.ProductImage}`}
                              alt={itm?.ProductName || "product image"}
                              loading="lazy"
                            />

                           
                            {itm?.HoverImage && itm?.HoverImage !== itm?.ProductImage ? (
                              <img
                                className="img-hover lazyload"
                                src={`${img_URL}/${itm?.HoverImage}`}
                                alt={`${itm?.ProductName || "product image"} hover`}
                                loading="lazy"
                              />
                            ) : null}
                          </Link>
                          <ul className="list-product-btn">
                            <li>
                              <QuickADDTo_Cart productdata={itm} />
                            </li>
                            <li className="wishlist">
                              <a
                                onClick={() => {
                                  isLogin && itm?.Wishlisted === "0"
                                    ? addto_WishList({
                                      ProductId: itm?.ProductId,
                                      PVDId: itm?.ProductVariantDetailId,
                                      ListType: "Collection",
                                    })
                                    : isLogin && itm?.Wishlisted != "0"
                                      ? RemoveFrom_WishList(itm?.Wishlisted)
                                      : showAlert(
                                        "Not logged in yet.",
                                        "Login required to access this feature."
                                      );
                                }}
                                className="box-icon hover-tooltip tooltip-left"
                              >
                                {WishListData?.some(
                                  (item) =>
                                    item?.PVDId === itm?.ProductVariantDetailId
                                ) ? (
                                  <FaHeart color="red" size={25} />
                                ) : (
                                  <CiHeart size={36} />
                                )}
                                <span className="tooltip">
                                  {itm?.Wishlisted === "0"
                                    ? "Add to Wishlist "
                                    : "Remove from Wishlist"}
                                </span>
                              </a>
                            </li>
                            <li>
                              <a
                                href="#quickView"
                                data-bs-toggle="modal"
                                className="box-icon quickview hover-tooltip tooltip-left"
                              >
                                <span className="icon icon-view"></span>
                                <span className="tooltip">Quick View</span>
                              </a>
                            </li>
                          </ul>
                          <ul className="size-box">
                            {itm?.Size &&
                              JSON.parse(itm?.Size).map((sizeObj, idx) => (
                                <li
                                  className="size-item text-xs text-white text-uppercase"
                                  key={idx}
                                >
                                  {" "}
                                  {sizeObj?.Name.replace("Size:", "")}
                                </li>
                              ))}
                            {!itm?.Size && (
                              <li className="size-item text-xs text-white text-uppercase">
                                {" "}
                                No Size
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="card-product-info">
                          <div className="info-list">
                            <a
                              href="product-detail.html"
                              className="name-product link fw-medium text-md"
                            >
                              {itm?.ProductName}
                            </a>
                            <p className="price-wrap fw-medium text-md">
                              <span className="price-new">
                                {Currency?.Symbol}
                                {itm?.ProductPrice}
                              </span>
                              <span className="price-old">
                                {Currency?.Symbol}
                                {itm?.UsualPrice}
                              </span>
                            </p>
                            <ul className="list-color-product">
                              {itm?.Color &&
                                JSON.parse(itm?.Color).map((ColorObj, idx) => (
                                  <li
                                    key={idx}
                                    className="list-color-item color-swatch hover-tooltip tooltip-bot active"
                                  >
                                    <span className="tooltip color-filter">
                                      {ColorObj?.Name.replace("Color:", "")}
                                    </span>
                                    <span
                                      className="swatch-value"
                                      style={{
                                        background: ColorObj?.Name.replace(
                                          "Color:",
                                          ""
                                        ),
                                      }}
                                    ></span>
                                    <img
                                      className=" lazyload"
                                      data-src={`${img_URL}/products/fashion/product-22.jpg`}
                                      src={`${img_URL}/products/fashion/product-22.jpg" alt="image-product`}
                                    />
                                  </li>
                                ))}
                            </ul>
                            <ul className="size-box">
                              {itm?.Size &&
                                JSON.parse(itm?.Size).map((sizeObj, idx) => (
                                  <li
                                    className="size-item text-xs  text-uppercase fs-6"
                                    key={idx}
                                  >
                                    {" "}
                                    {sizeObj?.Name.replace("Size:", "")}
                                  </li>
                                ))}
                              {!itm?.Size && (
                                <li className="size-item text-xs  text-uppercase">
                                  {" "}
                                  No Size
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="list-product-btn">
                            <QuickADDTo_Cart productdata={itm} />
                            <a
                              onClick={() => {
                                isLogin && itm?.Wishlisted === "0"
                                  ? addto_WishList({
                                    ProductId: itm?.ProductId,
                                    PVDId: itm?.ProductVariantDetailId,
                                    ListType: "Collection",
                                  })
                                  : isLogin && itm?.Wishlisted != "0"
                                    ? RemoveFrom_WishList(itm?.Wishlisted)
                                    : showAlert(
                                      "Not logged in yet.",
                                      "Login required to access this feature."
                                    );
                              }}
                              className="box-icon hover-tooltip tooltip-left"
                            >
                              {WishListData?.some(
                                (item) =>
                                  item?.PVDId === itm?.ProductVariantDetailId
                              ) ? (
                                <FaHeart color="red" size={25} />
                              ) : (
                                <CiHeart size={36} />
                              )}
                              <span className="tooltip">
                                {itm?.Wishlisted === "0"
                                  ? "Add to Wishlist "
                                  : "Remove from Wishlist"}
                              </span>
                            </a>
                            <QuickView_Modal productIdx={itm} />
                            {/* <a
                        href="#compare"
                        data-bs-toggle="modal"
                        aria-controls="compare"
                        className="box-icon compare hover-tooltip"
                      >
                        <span className="icon icon-compare"></span>
                        <span className="tooltip">Add to Compare</span>
                      </a> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <> </>
                )}
              </div>
              <div
                className={`wrapper-shop tf-grid-layout ${Grid === "list" ? "d-none" : Grid
                  }`}
              >
                {CollectionLoader ? (<>
                  <CardSkeleton />
                </>) : !CollectionLoader && CollectionData.length > 0 ? (
                  <>
                    {CollectionData.map((itm, idxx) => (
                      <div
                        key={idxx}
                        className="card-product grid card-product-size"
                        data-availability="In stock"
                        data-brand="Vineta"
                      >
                        <div className="card-product-wrapper">
                          <Link
                            to={`/product/${itm?.CategoryName.replace(/ /g, "-")}/${itm?.ProductId}/${itm?.PVDId}`}
                            className="product-img"
                          >
                            {/* <img
                              className="img-product lazyload"
                              data-src={activeColorIndex === idxx ? `${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${activeImage}` : `${img_URL}/${itm?.ProductImage}`}
                              src={activeColorIndex === idxx ? `${import.meta.env.VITE_PUBLIC_PRODUCT_IMG}${activeImage}` : `${img_URL}/${itm?.ProductImage}`}
                              alt="image-product"
                            /> */}
                               <img
                              className="img-product lazyload"
                              data-src={`${img_URL}/${itm?.ProductImage}`}
                              src={`${img_URL}/${itm?.ProductImage}`}
                              alt="image-product"
                            />
                            <img
                              className="img-hover lazyload"
                              data-src={`${img_URL}/${itm?.ProductImage}`}
                              src={`${img_URL}/${itm?.ProductImage}`}
                              alt="image-product"
                            />
                          </Link>
                          <ul className="list-product-btn">
                            <li>
                              <QuickADDTo_Cart productdata={itm} />
                            </li>
                            <li className="wishlist">
                              <a
                                onClick={() => {
                                  isLogin && itm?.Wishlisted === "0"
                                    ? addto_WishList({
                                      ProductId: itm?.ProductId,
                                      PVDId: itm?.ProductVariantDetailId,
                                      ListType: "Collection",
                                    })
                                    : isLogin && itm?.Wishlisted != "0"
                                      ? RemoveFrom_WishList(itm?.Wishlisted)
                                      : showAlert(
                                        "Not logged in yet.",
                                        "Login required to access this feature."
                                      );
                                }}
                                className="box-icon hover-tooltip tooltip-left"
                              >
                                {WishListData?.some(
                                  (item) =>
                                    item?.PVDId === itm?.ProductVariantDetailId
                                ) ? (
                                  <FaHeart color="red" size={25} />
                                ) : (
                                  <CiHeart size={36} />
                                )}
                                <span className="tooltip">
                                  {itm?.Wishlisted === "0"
                                    ? "Add to Wishlist "
                                    : "Remove from Wishlist"}
                                </span>
                              </a>
                            </li>
                            <li>
                              <QuickView_Modal productIdx={itm} />
                            </li>
                          </ul>
                          <ul className="size-box">
                            {itm?.Size &&
                              JSON.parse(itm?.Size).map((sizeObj, idx) => (
                                <li
                                  className="size-item text-xs text-white text-uppercase"
                                  key={idx}
                                >
                                  {" "}
                                  {sizeObj?.Name.replace("Size:", "")}
                                </li>
                              ))}
                            {!itm?.Size && (
                              <li className="size-item text-xs text-white text-uppercase">
                                {" "}
                                No Size
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="card-product-info">
                          <a
                            href="product-detail.html"
                            className="name-product link fw-medium text-md"
                          >
                            {itm?.ProductName}
                          </a>
                          <p className="price-wrap fw-medium">
                            <span className="price-new">
                              {Currency?.Symbol}
                              {itm?.ProductPrice}
                            </span>
                            <del className="price-new text-del">
                              {Currency?.Symbol}
                              {itm?.UsualPrice}
                            </del>
                          </p>
                          <ul className="list-color-product">
                            {itm?.Color &&
                              JSON.parse(itm?.Color).map((ColorObj, idx) => (
                                <li
                                  key={idx}
                                  className="list-color-item color-swatch hover-tooltip tooltip-bot active"
                                  onMouseOver={() => handleSwatchHover(ColorObj.imagepath, idxx)}
                                  onClick={() => handleSwatchHover(ColorObj.imagepath, idxx)}
                                >
                                  <span className="tooltip color-filter">
                                    {ColorObj?.Name.replace("Color:", "")}
                                  </span>
                                  <span
                                    className="swatch-value"
                                    style={{
                                      background: ColorObj?.Name.replace(
                                        "Color:",
                                        ""
                                      ),
                                    }}
                                  ></span>
                                  <img
                                    className=" lazyload"
                                    data-src={`${img_URL}/products/fashion/product-22.jpg`}
                                    src={`${img_URL}/products/fashion/product-22.jpg" alt="image-product`}
                                  />
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (<>
                  <Page_NotFound />
                </>)

                }
              </div>
              <div className="wg-pagination mt-5">
                <Stack spacing={2}>
                  <Pagination
                    count={TotalPage}
                    onChange={handleChangePage}
                    size="large"
                    sx={{
                      "& .MuiPaginationItem-root": {
                        backgroundColor: "#fff",
                        color: "#000",
                        borderRadius: "20px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
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
              </div>
            </div>
          </div>
        </div>
      </section>
      <Drawer anchor="left"
        slotProps={{
          paper: {
            className: ' offcanvas-end popup-style-1 popup-login'
          }
        }}
        open={OpenFilterDrawer} onClose={() => setopenFilterDrawer(false)}>
        <div className="canvas-header popup-header">
          <span className="title">Filter</span>
          <button className="icon-close icon-close-popup bg-transparent border-0 text-dark" aria-label="Close" onClick={() => setopenFilterDrawer(false)}></button>
        </div>
        <Box className="canvas-wrapper">
          <div className="canvas-body">
            <div className="widget-facet">
              <div
                className="facet-title text-xl fw-medium"
                data-bs-target="#availability"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="availability"
              >
                <span>Collections</span>
                <span className="icon icon-arrow-up"></span>
              </div>
              <div id="availability" className="collapse show">
                <span className="reset-link text-decoration-underline" onClick={() => {
                  const newParams = new URLSearchParams(window.location.search);
                  newParams.set("cate", String(CategoryList[0]?.ParentCategoryId));
                  setSearchParam(newParams);
                  setisChecked('')
                }}>Reset</span>
                <ul className="collapse-body filter-group-check current-scrollbar mt-4">
                  {CategoryList &&
                    CategoryList.map((itm, idx) => {
                      return (
                        <li className="list-item" key={idx}>
                          <input
                            type="radio"
                            name="availability"
                            className="tf-check"
                            checked={isChecked === String(itm?.FilterCategoryId)}
                            id={itm?.FilterCategoryId}
                            onChange={() => {
                              ApplyFilters("cate", itm?.FilterCategoryId);
                              setisChecked(String(itm?.FilterCategoryId));
                            }
                            }
                          />
                          <label
                            htmlFor={itm?.FilterCategoryId}
                            className="label"
                          >
                            <span>{itm?.CategoryName}</span>&nbsp;
                            <span className="count">
                              ({itm?.ProductCount})
                            </span>
                          </label>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title text-xl fw-medium"
                data-bs-target="#price"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="price"
              >
                <span>Price</span>
                <span className="icon icon-arrow-up"></span>
              </div>
              <div id="price" className="collapse show">
                <div className="collapse-body widget-price filter-price show">
                  <span className="reset-price">Reset</span>
                  <div
                    className="price-val-range"
                    id="price-value-range"
                    data-min="0"
                    data-max="500"
                  ></div>
                  <div className="box-value-price">
                    <Box width={300} mx="auto">
                      <Slider
                        value={value}
                        onChange={handleChange}
                        onChangeCommitted={handleSliderCommit}
                        valueLabelDisplay="auto"
                        min={pricerange?.minprice}
                        max={pricerange?.maxprice}
                        sx={{
                          color: "#ff6f61", // slider color
                        }}
                      />
                      <Typography gutterBottom>
                        Price Range: ₹{value[0]} - ₹{value[1]}
                      </Typography>
                    </Box>
                  </div>
                </div>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title text-xl fw-medium"
                data-bs-target="#color"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="color"
              >
                <span>Color</span>
                <span className="icon icon-arrow-up"></span>
              </div>
              <div id="color" className="collapse show">
                <div className="collapse-body filter-color-box flat-check-list">
                  {ColorList.map((item, idx) => (
                    <div
                      className={`${ActiveColor === item ? "active" : ""
                        } check-item color-item color-check `}
                      key={idx}
                      onClick={() => ApplyFilters("color", item)}
                    >
                      <span
                        className="color"
                        style={{
                          background: item,
                          border: "1px solid #cac5c5",
                        }}
                      ></span>
                      <span className="color-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title text-xl fw-medium"
                data-bs-target="#size"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="size"
              >
                <span>Size</span>
                <span className="icon icon-arrow-up"></span>
              </div>
              <div id="size" className="collapse show">
                <div className="collapse-body filter-size-box flat-check-list">
                  {SizeList.map((itm, idx) => (
                    <div
                      className={`${ActiveSize &&
                          ActiveSize.toLowerCase() === itm.toLowerCase()
                          ? "active"
                          : ""
                        } check-item size-item size-check`}
                      key={idx}
                      onClick={() => ApplyFilters("size", itm)}
                    >
                      <span className="size text-uppercase">{itm}</span>
                      &nbsp;
                      {/* <span className="count">(10)</span> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="widget-facet">
              <div
                className="facet-title text-xl fw-medium"
                data-bs-target="#brand"
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="true"
                aria-controls="brand"
              >
                <span>Brand</span>
                <span className="icon icon-arrow-up"></span>
              </div>
              <div id="brand" className="collapse show">
                <span className="reset-link text-decoration-underline" onClick={() => {
                  const newParams = new URLSearchParams(window.location.search);
                  newParams.delete('brand')
                  newParams.set("cate", String(CategoryList[0]?.ParentCategoryId));
                  setSearchParam(newParams);
                  setisBrandChecked('')
                }}>Reset</span>
                <ul className="collapse-body filter-group-check current-scrollbar mt-4">
                  {BrandList?.map((itm, idx) => (
                    <li className="list-item" key={idx}>
                      <input
                        type="radio"
                        name="brand"
                        checked={isBrandChecked == itm?.BrandName}
                        className="tf-check"
                        id={idx}
                      />
                      <label
                        htmlFor={idx}
                        className="label"
                        onClick={() => {
                          ApplyFilters("brand", itm?.BrandName);
                          setisBrandChecked(String(itm?.BrandName));
                        }
                        }
                      >
                        <span>{itm?.BrandName}</span>&nbsp;
                        <span className="count">
                          ({itm?.BrandCount})
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Box>
      </Drawer>
    </div>
  );
}

export default Collection_page
