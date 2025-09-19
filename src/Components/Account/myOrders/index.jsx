import React, { useContext, useEffect, useState} from 'react'
import { TbFileInvoice } from "react-icons/tb";
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication';
import Page_NotFound from '../../../Pages/404';
import OrderDetailsModal from '../../Common/Modal/OrderDetails';
import AccountContext from '../../../Context/Account';

const My_Orders = () => {
    const [OrderList, setOrderList] = useState([]);
    const {Currency} =useContext(AccountContext)
    const {user_common_api} = UserAuthentication();
    const [pageNo, setpageNo] = useState(1)
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0');

 /// Fetching Order List   
        const FetchOrderList = async ()=>{
        const OBJ ={
            Para:JSON.stringify({ClientId:ClientID, PageNumber:pageNo, Actionmode:'SearchBymemeber'}),
            procName:'SalesOrder'
        }
        const result = await user_common_api(OBJ);
        if(Array.isArray(result)){
            setOrderList(result)
        }else{
            setOrderList([]) 
        }

    }

    useEffect(()=>{
        FetchOrderList()
    },[])

  return (
    <div className="my-acount-content account-orders">
    {OrderList.length > 0 ? <div className="account-orders-wrap">
        <h5 className="title">
            Order History
        </h5>
        <div className="wrap-account-order">
            <table>
                <thead>
                    <tr>
                        <th className="text-md fw-medium">Order ID</th>
                        <th className="text-md fw-medium">Date</th>
                        <th className="text-md fw-medium">Status</th>
                        <th className="text-md fw-medium">Total</th>
                        <th className='text-md fw-medium'>Invoice</th>
                        <th className="text-md fw-medium">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {OrderList.map((itm, idx)=> <tr className="tf-order-item">
                        <td className="text-md">
                            <div dangerouslySetInnerHTML={{ __html: itm?.OrderNumber }} />
                        </td>
                        <td className="text-md">
                            {itm?.OrderDate}
                        </td>
                        <td className="text-md text-delivered">
                            <div dangerouslySetInnerHTML={{ __html: itm?.Status }} />
                        </td>
                        <td className="text-md">
                            {Currency?.Symbol}{itm?.OrderTotal}
                        </td>
                        <td className='text-md'>
                            <Link to={`/invoice/${itm?.OrderID}`} target='_blank'>
                                <TbFileInvoice  size={25} className='invoice-icon'/>
                            </Link>
                        </td>
                        <td>
                            <OrderDetailsModal  orderData={itm} />
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div> : <>
        <Page_NotFound/>
    </>}
</div>
  )
}

export default My_Orders
