import React, { useContext } from 'react'
import Product_Slider from '../../Common/Slider/Product_Slider'
import ProductContext from '../../../Context/Products'

const Latest_Drop = (props) => {
    const {NewArrivals} = useContext(ProductContext)
    const {sliderPage} = props
    //console.log(NewArrivals);
    
  return (
    <>
    {NewArrivals.length > 0 ?  <section className="flat-spacing-3">
        <div className="container">
            <div className="flat-title wow fadeInUp">
                <h4 className="title">Top Picks You’ll Love</h4>
                    <p className="desc text-main text-md">Explore our most popular pieces that customers can't get enough of
                    </p>
            </div>
            <div className="hover-sw-nav wrap-pos-nav sw-over-product">
                <Product_Slider data={NewArrivals} ListType={sliderPage}/>
            </div>
        </div>
    </section> : null }
    </>
  )
}

export default Latest_Drop
