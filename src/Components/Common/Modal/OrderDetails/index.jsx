import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useContext, useEffect, useState } from 'react'
import { UserAuthentication } from '../../../../Services/Authentication/UserAuthentication';
import AccountContext from '../../../../Context/Account';

const OrderDetailsModal = (props) => {
    const {user_common_api} = UserAuthentication();
    const [orderDetails, setorderDetails] = useState([]);
    const {Currency} = useContext(AccountContext)
    //{ procName: 'SalesOrder',Para:'{"OrderId":4046,"ActionMode":"ProductDetails"}' }
    const {orderData} = props
    // //console.log(orderData);
    
        const [modal, setModal] = useState(false);
            const toggle = () =>{
        setModal(!modal);
        if(!modal){
            setQty(1)
        }
            } 

    // Fettching orderDetails 
    const FetchOrderDetails = async ()=>{
        const OBJ = { 
            procName: 'SalesOrder',
            Para:JSON.stringify({OrderId:orderData?.OrderID, ActionMode:"ProductDetails"})
        }
        const result = await user_common_api(OBJ);
        // //console.log(result);
        if(Array.isArray(result)){
            setorderDetails(result);
        }else{
             setorderDetails([]);
        }
        
    }


    useEffect(()=>{
        if(modal){
            FetchOrderDetails()
        }
    },[modal])


  return (
<>

    <a onClick={toggle} className="view-detail">Detail</a>  
        <Modal isOpen={modal} toggle={toggle}  size="xl">
                    <div className="modal-order-detail" id="order_detail">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="header">
                        <div className="heading">Order Detail</div>
                        <span className="icon-close icon-close-popup" onClick={toggle}></span>
                    </div>
                    <ul className="list-infor">
           
                        <li dangerouslySetInnerHTML={{ __html: `#${orderData?.OrderNumber}` }}/>
                        <li>{orderData?.OrderDate}</li>
                        <li>{orderDetails[0]?.ItemCount} items</li>
                        <li className="text-delivered" dangerouslySetInnerHTML={{ __html: `${orderData?.Status}` }}/>
                    </ul>
                    <div className="tb-order-detail">
                        <div className="top">
                            <div className="title item">Product</div>
                            <div className="title item d-md-block d-none">Quantity</div>
                            <div className="title item d-md-block d-none">Price</div>
                            <div className="title item d-md-block d-none">Total</div>
                        </div>
                         <div className="tb-content">
                            {orderDetails.map((itm, idx)=><div className="order-detail-item">
                                <div className="item">
                                    <div className="infor-content">
                                        <div className="image">
                                            <a href="product-detail.html">
                                                <img className="lazyload" 
                                                    src={import.meta.env.VITE_PUBLIC_CART_IMG+itm?.ProductImage} alt="img-product"/>
                                            </a>
                                        </div>
                                        <div>
                                            <a className="link" href="product-detail.html">{itm?.ProductName}</a>
                                            <div className="size" dangerouslySetInnerHTML={{ __html: itm?.ProductVariation }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="item" data-title="Quantity">
                                    {itm?.Quantity}
                                </div>
                                <div className="item" data-title="Price">
                                    {Currency?.Symbol}{itm?.ProductPrice}
                                </div>
                                <div className="item" data-title="Total">
                                    {Currency?.Symbol}{itm?.TotalProductPrice}
                                </div>
                            </div>)}
                            <div className="order-detail-item subtotal">
                                <div className="item d-md-block d-none"></div>
                                <div className="item d-md-block d-none"></div>
                                <div className="item subtotal-text">
                                    Sub Total:
                                </div>
                                <div className="item subtotal-price">
                                    {Currency?.Symbol}{orderDetails[0]?.GrandTotal}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bottom text-center">
                        Not happy with the order? You can <a href="return-and-refund.html"
                            className="fw-medium btn-underline">Request a free return</a> in <span className="fw-medium">14
                            days</span>
                    </div> */}
                </div>
            </div>
        </div>
        </Modal>

</>

  )
}

export default OrderDetailsModal
