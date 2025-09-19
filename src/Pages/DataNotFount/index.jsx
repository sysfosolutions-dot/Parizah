import React from 'react'
import {Link } from 'react-router-dom'

const Data_NotFound = () => {
  return (
    <section className="">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="wg-404 py-5">
                            <div className="image">
                                <img src={`${import.meta.env.BASE_URL}assets/Images/banner/noData.png`} data-src="./images/banner/noData.png" alt="No Data"
                                    className="lazyload"/>
                            </div>
                            <h1 className="title display-xl-2">
                                Uh-oh! No Results Found
                            </h1>
                            <p className="text-md sub text-main">We couldn’t find the data you were looking for.</p>
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

export default Data_NotFound
