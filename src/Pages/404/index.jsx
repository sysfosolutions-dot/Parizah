import React from 'react'
import {Link } from 'react-router-dom'

const Page_NotFound = () => {
  return (
    <section className="">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wg-404">
                            <div className="image">
                                <img src={`${import.meta.env.BASE_URL}assets/Images/banner/404.png`} data-src="./images/banner/404.png" alt="404"
                                    className="lazyload"/>
                            </div>
                            <h1 className="title display-xl-2">
                                Whoops!
                            </h1>
                            <p className="text-md sub text-main">We couldn’t find the page you were looking for.</p>
                            <div className="bot">
                                <Link to="/" className="tf-btn btn-md animate-btn font-4">
                                    Return to Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default Page_NotFound
