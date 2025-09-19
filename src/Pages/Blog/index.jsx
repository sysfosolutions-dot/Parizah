import React, { useEffect, useState } from 'react'
import { BlogsServie } from '../../Services/BlogSevice/BlogsServie';
import { FaUserAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Breadcrumb_Container from '../../Components/Common/Breadcrumb/Index';
import { Drawer, List, ListItem, ListItemText, IconButton, Box } from "@mui/material";

const Blog_Page = () => {
    const [bloglist, setbloglist] = useState([]);
    const [recentBlogg, setrecentBlog] = useState([]);
    const [pageNo, setpageNo] = useState(1);
    const [open, setOpen] = useState(false);
    const {UseBlogAPi_call} = BlogsServie()

    const fetchBlogList = async()=>{
        const OBJ ={
            Para:JSON.stringify({ PageNumber:pageNo ,ActionMode:"SelectWebsite"}),
            procName: 'BlogMaster',
        }
        const result = await UseBlogAPi_call(OBJ);
        if(Array.isArray(result)){
            const topThree = result.slice(0, 3);
            setbloglist(result);
            setrecentBlog(topThree)
        }else{
             setbloglist([]);
        }

        
    }

    
  const toggleDrawer = (state) => () => {
    setOpen(!open);
  };

    useEffect(()=>{
        fetchBlogList()
    },[])


  return (
   <>
   <Breadcrumb_Container/>
           <div className="btn-sidebar-mb d-lg-none">
            <button onClick={ toggleDrawer(true)}>
                <i className="icon icon-sidebar"></i>
            </button>
        </div>

        <section className="s-blog-list-v2 sec-blog">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="sidebar-blog d-lg-grid d-none sidebar-content-wrap type-left">
                            <div className="sb-item">
                                <p className="sb-title text-xl fw-medium">Categories</p>
                                <div className="sb-content">
                                    <ul className="category-blog-list">
                                        {bloglist.map((itm, idx)=> <li key={idx}>
                                            <a href="blog-single.html" className="text-md link">
                                                {itm?.BlogCategory}
                                            </a>
                                        </li>)}

                                    </ul>
                                </div>
                            </div>
                            <div className="sb-item">
                                <p className="sb-title text-xl fw-medium">Recent Posts</p>
                                <div className="sb-content">
                                    <ul className="recent-blog-list">
                                        {recentBlogg.map((itm, idx)=> <li className="hover-img" key={idx}>
                                            <div className="image">
                                                <a href="blog-single.html" className="img-style d-block">
                                                    <img  src={import.meta.env.VITE_PUBLIC_CART_IMAGE+itm?.ImagePath}
                                                        data-src="images/blog/recent-4.jpg" alt="" className="lazyload"/>
                                                </a>
                                            </div>
                                            <div className="post-content">
                                                <a href="blog-single.html" className="link text-md fw-medium">{itm?.Title}</a>
                                                <p className="entry_date">
                                                   {itm?.BlogDate}
                                                </p>
                                            </div>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="sb-item">
                                <div className="sb-banner hover-img">
                                    <div className="image img-style">
                                        <img src={import.meta.env.VITE_PUBLIC_CART_IMAGE+bloglist[1]?.ImagePath} data-src="images/blog/sb-banner.jpg"
                                            alt="banner" className="lazyload"/>
                                    </div>
                                    <div className="banner-content">
                                        <p className="title">
                                            Elevate <br/> Your Style
                                        </p>
                                        <Link to="/" className="tf-btn btn-white hover-primary">Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="s-content">
                            {bloglist && bloglist.map((itm, idx) => <div className="blog-item style-2 hover-img" key={idx}>
                                <div className="entry_image">
                                    <Link to={`/blogs/${itm?.BlogId}`} className="img-style">
                                        <img src={import.meta.env.VITE_PUBLIC_CART_IMAGE+itm?.ImagePath} data-src="images/blog/blog-v4-1.jpg" alt=""
                                            className="lazyload"/>
                                    </Link>
                                </div>
                                <div className="blog-content">
                                    <div className="entry-tag">
                                        <ul className="style-list">
                                            <li>
                                                <a href="#" className="type-life">
                                                   {itm?.BlogCategory}
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <Link to={`/blogs/${itm?.BlogId}`} className="entry_title d-block text-xl fw-medium link">
                                      {itm?.Title}
                                    </Link>
                                    <p className="entry_sub text-md text-main">
                                        {itm?.Description}
                                    </p>
                                    <ul className="entry-meta">
                                        <li className="entry_author">
                                            <div className="avatar">
                                                {/* <img src={itm?.ImagePath}
                                                    data-src="images/avatar/blog-author-1.jpg" alt="avatar"
                                                    className="lazyload"/> */}
                                                    <FaUserAlt />
                                            </div>
                                            <p className="entry_name text-md">
                                                Post by <span className="fw-medium"> {itm?.Name} </span>
                                            </p>
                                        </li>
                                        <li className="br-line"></li>
                                        <li className="entry_date">
                                            <p className="text-md">
                                                {itm?.BlogDate}
                                            </p>
                                        </li>
                                        <li className="br-line"></li>
                                        {/* <li className="entry_comment">
                                            <p className="text-md">
                                                3 comments
                                            </p>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                            )}
                            <ul className="wg-pagination">
                                <li className="active">
                                    <div className="pagination-item">1</div>
                                </li>
                                <li>
                                    <a href="#" className="pagination-item">2</a>
                                </li>
                                <li>
                                    <a href="#" className="pagination-item">3</a>
                                </li>
                                <li>
                                    <a href="#" className="pagination-item"><i className="icon-arr-right2"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
       
        </section>
         <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                          <Box sx={{ width: 300 }}>
                            <div className="offcanvas offcanvas-start canvas-filter canvas-sidebar canvas-sidebar-account show" id="mbAccount" aria-modal="true" role="dialog">
            <div className="canvas-wrapper">
                <div className="canvas-header">
                    <span className="title">SIDEBAR</span>
                    <button className="icon-close icon-close-popup" data-bs-dismiss="offcanvas" aria-label="Close" onClick={toggleDrawer(false)}></button>
                </div>
                <div className="canvas-body sidebar-mobile-append sidebar-blog"> 
                            <div className="sb-item">
                                <p className="sb-title text-xl fw-medium">Categories</p>
                                <div className="sb-content">
                                    <ul className="category-blog-list">
                                        {bloglist.map((itm, idx)=> <li key={idx}>
                                            <a href="blog-single.html" className="text-md link">
                                                {itm?.BlogCategory}
                                            </a>
                                        </li>)}

                                    </ul>
                                </div>
                            </div>
                            <div className="sb-item">
                                <p className="sb-title text-xl fw-medium">Recent Posts</p>
                                <div className="sb-content">
                                    <ul className="recent-blog-list">
                                        {recentBlogg.map((itm, idx)=> <li className="hover-img" key={idx}>
                                            <div className="image">
                                                <a href="blog-single.html" className="img-style d-block">
                                                    <img  src={import.meta.env.VITE_PUBLIC_CART_IMAGE+itm?.ImagePath}
                                                        data-src="images/blog/recent-4.jpg" alt="" className="lazyload"/>
                                                </a>
                                            </div>
                                            <div className="post-content">
                                                <a href="blog-single.html" className="link text-md fw-medium">{itm?.Title}</a>
                                                <p className="entry_date">
                                                   {itm?.BlogDate}
                                                </p>
                                            </div>
                                        </li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="sb-item">
                                <p className="sb-title text-xl fw-medium">Tags</p>
                                <div className="sb-content entry-tag">
                                    <ul className="tag-blog-list style-list">
                                        <li>
                                            <a href="#" className="type-life">
                                                Lifestyle
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="type-design">
                                                Designs
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="type-bag">
                                                Bags
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="type-trick">
                                                Tricks &amp; Tips
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="sb-item">
                                <div className="sb-banner hover-img">
                                    <div className="image img-style">
                                        <img src={import.meta.env.VITE_PUBLIC_CART_IMAGE+bloglist[1]?.ImagePath} data-src="images/blog/sb-banner.jpg"
                                            alt="banner" className="lazyload"/>
                                    </div>
                                    <div className="banner-content">
                                        <p className="title">
                                            Elevate <br/> Your Style
                                        </p>
                                        <Link to="/" className="tf-btn btn-white hover-primary">Shop Now</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
                          </Box>
                        </Drawer>
   </>
  )
}

export default Blog_Page
