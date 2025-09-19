import React, { useEffect, useState } from 'react'
import { BlogsServie } from '../../Services/BlogSevice/BlogsServie'
import { FaUserAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const BlogDetails_Pages = () => {
      const {UseBlogAPi_call} = BlogsServie();
      const [blogDetails, setblogDetails] = useState([])
      const param = useParams();


      const FetchBlog_Details = async ()=>{
        const OBJ ={
          Para:JSON.stringify({ActionMode:'Select', Id:param?.blogid}),
          procName:'BlogMaster'
        }
        const result = await UseBlogAPi_call(OBJ);
        if(Array.isArray(result)){
          setblogDetails(result)
        }else{
          setblogDetails([])
        }
   }


      useEffect(()=>{
        FetchBlog_Details()
      }, [param])



  return (
    <section className="s-blog-single line-bottom-container">
            <div className="container">
                <div className="heading blog-item">
                    <div className="entry-tag">
                        <ul className="style-list">
                            <li>
                                <a href="#" className="type-life">
                                    {blogDetails[0]?.BlogCategory}
                                </a>
                            </li>
                        </ul>
                    </div>
                    <p className="entry_title display-sm fw-medium">
                        {blogDetails[0]?.Title}
                    </p>
                    <ul className="entry-meta">
                        <li className="entry_author">
                            {/* <div className="avatar">
                                <img src="images/avatar/blog-author-1.jpg"
                                    data-src="./images/avatar/blog-author-1.jpg" alt="avatar" className="lazyload"/>
                            </div> */}
                            <FaUserAlt />
                            <p className="entry_name text-md">
                                Post by <span className="fw-medium"> {blogDetails[0]?.Name} </span>
                            </p>
                        </li>
                        <li className="br-line"></li>
                        <li className="entry_date">
                            <p className="text-md">
                                {blogDetails[0]?.BlogDates}
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
                <div className="content">
                    <div className="entry_image text-center">
                        <img src={import.meta.env.VITE_PUBLIC_CART_IMAGE + 'app/BlogsImage/' + blogDetails[0]?.ImagePath} data-src="./images/blog/blog-single-1.jpg" alt=""
                            className="lazyload"/>
                    </div>
                    <p className="text" dangerouslySetInnerHTML={{ __html:  blogDetails[0]?.Description }} />
                    <div className="group-image">
                        <div className="entry_image">
                            <img src="images/blog/blog-single-2.jpg" data-src="./images/blog/blog-single-2.jpg" alt=""
                                className="lazyload"/>
                        </div>
                        <div className="entry_image">
                            <img src="images/blog/blog-single-3.jpg" data-src="./images/blog/blog-single-3.jpg" alt=""
                                className="lazyload"/>
                        </div>
                    </div>
                    <div className="bot">
                        {/* <div className="entry-tag">
                            <p>
                                Tags:
                            </p>
                            <ul className="style-list">
                                <li>
                                    <a href="#">
                                        Lifestyle
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Fashion
                                    </a>
                                </li>
                            </ul>
                        </div> */}
                        <div className="entry-social">
                            <p>
                                Share:
                            </p>
                            <ul className="tf-social-icon style-large ">
                                <li>
                                    <a href="https://www.facebook.com/" className="social-item social-facebook">
                                        <i className="icon icon-fb"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/" className="social-item social-instagram">
                                        <i className="icon icon-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://x.com/" className="social-item social-x">
                                        <i className="icon icon-x"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.snapchat.com/" className="social-item social-snapchat"><i
                                            className="icon icon-snapchat"></i></a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* <div className="related-post">
                        <a href="blog-single.html" className="post prev">
                            <div className="icon">
                                <i className="icon-arr-left"></i>
                            </div>
                            <div className="text-wrap-left">
                                <p>PREVIOUS POST</p>
                                <p className="name-post">5 Timeless Wardrobe Essentials Every Woman Should Own
                                </p>
                            </div>
                        </a>
                        <a href="blog-single.html" className="post next">
                            <div className="text-wrap-right">
                                <p>NEXT POST</p>
                                <p className="name-post">10 Must-Have Accessories for Every Season</p>
                            </div>
                            <div className="icon">
                                <i className="icon-arr-right2"></i>
                            </div>
                        </a>
                    </div> */}
                </div>
                {/* <div className="leave-comment-wrap">
                    <p className="title">
                        Leave a comment
                    </p>
                    <form action="#" className="form-default">
                        <div className="wrap">
                            <div className="cols">
                                <fieldset>
                                    <label for="username">Your name*</label>
                                    <input id="username" type="text" name="username" required/>
                                </fieldset>
                                <fieldset>
                                    <label for="email">Your email*</label>
                                    <input id="email" type="email" name="email" required/>
                                </fieldset>
                            </div>
                            <div className="cols">
                                <fieldset className="textarea">
                                    <label for="mess">Your comment*</label>
                                    <textarea id="mess" required></textarea>
                                </fieldset>
                            </div>
                            <p className="notice">
                                Please note, your email won’t be published.
                            </p>
                            <div className="button-submit">
                                <button className="tf-btn text-sm animate-btn text-transform-none" type="submit">Post
                                    comment
                                </button>
                            </div>
                        </div>
                    </form>
                </div> */}
            </div>
        </section>
  )
}

export default BlogDetails_Pages
