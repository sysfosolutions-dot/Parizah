import React, { useEffect, useState } from 'react'
import Product_Slider from '../../Common/Slider/Product_Slider'
import { Common_Service } from '../../../Services/Common/CommonService'

const Limited_Deal = (props) => {
    const {sliderPage} = props
    const [P_list, setP_list] = useState([])
    const {UseFetchProductService} = Common_Service()
    const Fetch_BestSeller = async ()=>{
        const OBJ={ClientId : "0", CookieId:'9SvR2QSR', Type:'NewArrivals'}
        const result = await UseFetchProductService(OBJ);
        if(Array.isArray(result)){
          setP_list(result)
        }
    }

    useEffect(()=>{
      Fetch_BestSeller()
    }, [])

  return (
  <section>
       {P_list.length > 0 ?
              <>
                <div className="container">
                <div className="flat-title wow fadeInUp">
                    <h4 className="title">Best Deals</h4>
                    <p className="desc text-main text-md">Explore our most popular pieces that customers can't get enough of
                    </p>
                </div>
            </div>
            <div className="hover-sw-nav wrap-pos-nav sw-over-product px-md-5 px-3">
                <Product_Slider data={P_list}  ListType={sliderPage}/>
            </div>
              </>
             : null}
    </section>
  )
}

export default Limited_Deal
