import React, { useContext, useEffect, useState } from 'react'
import { ToWords } from 'to-words';
import { UserAuthentication } from '../../Services/Authentication/UserAuthentication';
import { useParams } from 'react-router-dom';
import AccountContext from '../../Context/Account';
    const Innvoice_Page = () => {
    const {user_common_api} = UserAuthentication();
    const [InvoiceDetails, setInvoiceDetails] = useState([]);
    const [ProductDetails, setProductDetails] = useState([]);
    const [BillingAddress, setBillingAddress] = useState([]);
    const [ShippingAddress, setShippingAddress] = useState([]);
    const [WordAmt, setWordAmt] = useState('')
    const [productTotalData, setproductTotalData] = useState({})
    const {CompanyDetails} = useContext(AccountContext);
    const param = useParams();

    
    const fetchInvoice_Details = async ()=>{
        const OBJ ={
            procName:'GetInvoiceAdmin',
            Para:JSON.stringify({OrderId:param?.invoiceId, ActionMode:'GetInvoiceDetailsByOrderId'})
        }
        const result = await user_common_api(OBJ);
        setInvoiceDetails(JSON.parse(result[0]?.InvoiceDetails));
        setProductDetails(JSON.parse(result[0]?.ProductDetails));
        setBillingAddress(JSON.parse(result[0]?.BillingAddress));
        setShippingAddress(JSON.parse(result[0]?.ShippingAddress));
        console.log(JSON.parse(result[0]?.InvoiceDetails));
        
        const TotalQty = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.Qty;
        }, 0);

         const TotalAmount = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.Amount;
        }, 0);

        const TaxableAmount = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.TaxableAmount;
        }, 0);

        const ProductTax = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.ProductTax;
        }, 0);

        const NetAmount = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.NetAmount;
        }, 0);

        const VoucherDiscount = JSON.parse(result[0]?.ProductDetails).reduce((accumulator, currentItem) => {
        return accumulator + currentItem.VoucherDiscount;
        }, 0);
        const toWords = new ToWords();
        const amount = (productTotalData?.NetAmount || 0) - (productTotalData?.VoucherDiscount || 0);
        const AmtinWords = toWords.convert(amount);
        setWordAmt(AmtinWords)
        setproductTotalData({TotalQty, TotalAmount, TaxableAmount, ProductTax, NetAmount, VoucherDiscount})
        
    }

    useEffect(()=>{
        fetchInvoice_Details()
    },[])



  return (
    <div  className='py-4 d-flex justify-content-center invoiceaTable'>
        <table cellPadding="0" cellSpacing="0" width="80%" align="center" className="table-width">
          <tbody>
            <tr>
              <td valign="top" className="alt1">
                <table border="0" cellPadding="0" cellSpacing="0" width="98%" align="center">
                  <tbody>
                    <tr>
                      <td className="pageleft" valign="top">
                        <div className="pageleftimg"></div>
                      </td>
                      <td valign="top">
                        <center>
                          <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                            <tbody>
                              <tr>
                                <td colSpan="8">
                                  <table border="0" cellSpacing="0" cellPadding="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td width="25%" align="left" valign="top" style={{borderRadius: '10px'}} className='px-2'>
                                          <img src={`${import.meta.env.VITE_PUBLIC_COMPANY_LOGO}${CompanyDetails && CompanyDetails[0]?.CompanyLogo}`} height="50" alt="" style={{marginTop:'15px', background:'black', borderRadius:'7px'}} />
                                        </td>
                                        <td width="50%" className="Logo_company" align="left" valign="top">
                                          <div>
                                            <p>
                                              <b>
                                                <span id="lblCompanyName">
                                                  <b>BNR EXIM PRIVATE LIMITED</b>
                                                </span>
                                              </b>
                                              <br />
                                              <label>
                                                <b>Registered Office:</b>
                                              </label>
                                              <span id="Label4">63/2 FLAT NO-01 FIRST FLOOR HARBANS MOHAL KANPUR, 208001</span>
                                              <br />
                                              <label>
                                                <span id="Label5">
                                                  <b> Phone: </b>7275026006,
                                                </span>
                                              </label>
                                              <br />
                                              <span id="Label7">
                                                <b>Mail ID: </b>info@Leimodastore.com,
                                              </span>
                                              <br />
                                              <span id="Label8">
                                                <b>Website: </b>www.leimodastore.com
                                              </span>
                                              <br />
                                              <label>
                                                <b>GSTIN: </b>
                                                <span id="Label9">09AALCB1525B1Z2</span>,
                                              </label>
                                              <label>
                                                <b>PAN: </b>
                                                <span id="Label6">AALCB1525B</span>
                                              </label>
                                            </p>
                                          </div>
                                        </td>
                                        <td width="25%" valign="top" align="right" className="Logo_company">
                                          <p></p>
                                          <div>
                                            <b>Shipped From:<br />
                                              <span id="Label10">BNR EXIM PRIVATE LIMITED</span>
                                            </b>
                                            <span id="Label11">
                                              <br />
                                              63/2 FLAT NO-01 FIRST FLOOR HARBANS MOHAL KANPUR, 208001
                                            </span>
                                          </div>
                                          <div></div>
                                          <p>
                                            <span id="Label12"></span>
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8">
                                  <hr color="#000" />
                                </td>
                              </tr>
                              <tr>
                                <td width="100%" align="center" colSpan="8">
                                  <u>
                                    <label id="lblhead" style={{fontSize:'17px'}}>
                                      <b>GST TAX INVOICE</b>
                                    </label>
                                  </u>
                                  <center><small>(Original for Receipient)</small></center>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8">
                                  <hr color="#000" />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8" height="5">&nbsp;</td>
                              </tr>
                              <tr>
                                <td width="15%" align="left" height="15">Order No.</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" colSpan="2" height="15">
                                  <span id="lblOrderNo">{InvoiceDetails[0]?.OrderNo}</span>
                                </td>
                              </tr>
                              
                              <tr>
                                <td width="15%" align="left" height="15">Invoice No.</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" colSpan="2" height="15">
                                  <span id="lblInvoiceNo">{InvoiceDetails[0]?.InvoiceNo}</span>
                                </td>
                                <td width="15%" align="left" height="15">Transport Mode</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblTransmode">{InvoiceDetails[0]?.DispatchBy}</span>
                                </td>
                              </tr>
                              <tr>
                                <td width="15%" align="left" height="15">Invoice Date</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" colSpan="2" height="15">
                                  <span id="lblInvoiceDate">{InvoiceDetails[0]?.InvoiceDate}</span>
                                </td>
                                <td width="15%" align="left" height="15">Vehicle No.</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblVehicleNo">{InvoiceDetails[0]?.VehicleNo}</span>
                                </td>
                              </tr>
                              <tr>
                                <td width="15%" align="left" height="15">Reverse Charge (Y/N)</td>
                                <td width="5%" height="15">:</td>
                                <td width="20%" align="left" height="15">
                                  <span id="lblReverseCharge">{InvoiceDetails[0]?.ReverseCharge}</span>
                                </td>
                                <td width="10%" align="left" height="15"></td>
                                <td width="15%" align="left" height="15">Date Of Supply</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblDateOfSupply">{InvoiceDetails[0]?.DateOfSupply}</span>
                                </td>
                              </tr>
                              <tr>
                                <td width="10%" align="left" height="15">
                                  <span id="lblUTCode"></span>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8" height="5">&nbsp;</td>
                              </tr>
                              <tr>
                                <td colSpan="8">
                                  <hr color="#000" />
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="4" width="50%" align="center">
                                  <b>Bill To Party</b>
                                </td>
                                <td colSpan="4" width="50%" align="center">
                                  <b>Ship To Party</b>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8">
                                  <hr color="#000" />
                                </td>
                              </tr>
                              <tr>
                                <td width="15%" align="left" height="15">Name</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblBillingIBOName">{BillingAddress[0]?.IBOName}</span>
                                </td>
                                <td width="15%" align="left" height="15">Name</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblShippingUserName">{ShippingAddress[0]?.IBOName}</span>
                                </td>
                              </tr>
                              <tr>
                                <td width="15%" align="left" height="15" style={{verticalAlign: 'baseline'}}>Address</td>
                                <td width="5%" height="15" style={{verticalAlign: 'baseline'}}>:</td>
                                <td width="30%" align="left" height="15" colSpan="2" style={{verticalAlign: 'baseline'}}>
                                   <p dangerouslySetInnerHTML={{
                                __html:BillingAddress[0]?.Address,
                                   }}
                                  />
                                 
                                </td>
                                <td width="15%" align="left" height="15" style={{verticalAlign: 'baseline'}}>Address</td>
                                <td width="5%" height="15" style={{verticalAlign: 'baseline'}}>:</td>
                                <td width="30%" align="left" height="15" colSpan="2" style={{verticalAlign: 'baseline'}}>
                                   <p dangerouslySetInnerHTML={{
                                __html:ShippingAddress[0]?.Address,
                                   }}
                                  />
                                </td>
                              </tr>
                              <tr style={{display:'none'}}>
                                <td width="15%" align="left" height="15">State</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblBillingState">Uttar Pradesh</span>
                                </td>
                                <td width="15%" align="left" height="15">State</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblShippingState">Uttar Pradesh</span>
                                </td>
                              </tr>
                              <tr style={{display:'none'}}>
                                <td width="15%" align="left" height="15">GSTIN</td>
                                <td width="5%" height="15">:</td>
                                <td width="20%" align="left" height="15">
                                  <span id="lblBillingGSTIN">09AALCB1525B1Z2</span>
                                </td>
                                <td width="10%" align="left" height="15">
                                  <span id="lblBillingUTCode"></span>
                                </td>
                                <td width="15%" align="left" height="15">GSTIN</td>
                                <td width="5%" height="15">:</td>
                                <td width="20%" align="left" height="15">
                                  <span id="lblShippingGSTIN">09AALCB1525B1Z2</span>
                                </td>
                                <td width="10%" align="left" height="15">
                                  <span id="lblShippingUTCode"></span>
                                </td>
                              </tr>
                              <tr style={{display:'none'}}>
                                <td width="15%" align="left" height="15">Pin Code</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblBillingPostalCode"><b>226001</b></span>
                                </td>
                                <td width="15%" align="left" height="15">Pin Code</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblShiipingPostalCode"><b>226001</b></span>
                                </td>
                              </tr>
                              <tr style={{display:'none'}}>
                                <td width="15%" align="left" height="15"></td>
                                <td width="5%" height="15"></td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <span id="lblbillname"></span>
                                </td>
                                <td width="15%" align="left" height="15">Mobile No</td>
                                <td width="5%" height="15">:</td>
                                <td width="30%" align="left" height="15" colSpan="2">
                                  <b>
                                    <span id="lblShippingMobileNo">9026071291</span>
                                  </b>
                                </td>
                              </tr>
                              <tr>
                                <td colSpan="8">
                                  <hr color="#000" />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          
                          <table width="100%" cellSpacing="0" className="tblDetails">
                            <thead>
                              <tr>
                                <th rowSpan="2">S No.</th>
                                <th rowSpan="2">Product Description</th>
                                <th rowSpan="2">HSN / SAC Code</th>
                                <th rowSpan="2">Product SKU</th>
                                <th rowSpan="2">Qty</th>
                                <th rowSpan="2">Rate</th>
                                <th rowSpan="2">Amount</th>
                                <th rowSpan="2">Discount</th>
                                <th rowSpan="2">Taxable Amount</th>
                                <th colSpan="2">GST</th>
                                <th rowSpan="2">Total</th>
                              </tr>
                              <tr>
                                <th>Rate</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ProductDetails.map((itm, idx)=> <tr>
                                <td style={{textAlign:'center'}}><span id="rptProduct_lblSrno_0">{itm?.SNo}</span></td>
                                <td style={{textAlign:'center'}}><span id="rptProduct_lblPackageName_0">{itm?.PackageName}</span></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblHSNCode_0">{itm?.HSNCode}</span></td>
                                <td style={{textAlign:'center'}}><span id="rptProduct_lblUOM_0">{itm?.UOM}</span></td>
                                <td style={{textAlign: 'center'}}><span id="rptProduct_lblQuantity_0">{itm?.Qty}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblRate_0">{itm?.Rate}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblAmount_0">{itm?.Amount}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblDiscount_0">{itm?.Discount}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblTaxableAmount_0">{itm?.TaxableAmount}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblGSTPer_0">{itm?.TaxPercentage}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblGSTAmount_0">{itm?.ProductTax}</span></td>
                                <td style={{textAlign: 'right'}}><span id="rptProduct_lblTotal_0">{itm?.NetAmount}</span></td>
                              </tr>)}
                            </tbody>
                            <tfoot>
                              <tr className="trClass">
                                <td></td>
                                <td style={{textAlign:'right'}}><b>Total</b></td>
                                <td style={{textAlign:'center'}}></td>
                                <td></td>
                                <td style={{textAlign:'center'}}><span id="rptProduct_lblFQty">{productTotalData?.TotalQty}</span></td>
                                <td style={{textAlign:'right'}}></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblFAmount">{productTotalData?.TotalAmount}</span></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblDiscount">{productTotalData?.VoucherDiscount}</span></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblTaxbleAmount">{productTotalData?.TaxableAmount}</span></td>
                                <td></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblGSTAmount">{productTotalData?.ProductTax}</span></td>
                                <td style={{textAlign:'right'}}><span id="rptProduct_lblFTotal">{productTotalData?.NetAmount}</span></td>
                              </tr>
                            </tfoot>
                          </table>
                          
                          <table border="0" cellSpacing="0" cellPadding="0" width="100%" className="tblDetails">
                            <tbody>
                              <tr></tr>
                              <tr>
                                <td colSpan="1" rowSpan="7" valign="top" width="37%" style={{borderTop:'0px !important'}}>
                                  <b>Total Invoice Amount in Words:</b>
                                  <br />
                                  <br />
                                  <span id="lblamtwords">{WordAmt}</span>
                                </td>
                                <td width="20%" valign="top" style={{borderTop:'0px !important'}}>
                                  Total Amount Before Tax:
                                </td>
                                <td width="10%" valign="top" style={{borderTop:'0px !important'}}>
                                  <div align="right">
                                    <span id="lblPreTaxAmount">{productTotalData?.TotalAmount}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr id="igstTD"></tr>
                              <tr id="cgstTD"></tr>
                              <tr id="sgstTD"></tr>
                              <tr>
                                <td width="20%" valign="top">
                                  GST Amount:
                                </td>
                                <td width="10%" valign="top">
                                  <div align="right">
                                    <span id="lblTotalTaxAmount">{productTotalData?.ProductTax}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="20%" valign="top">
                                  Total Amount after Tax:
                                </td>
                                <td width="10%" valign="top">
                                  <div align="right">
                                    <span id="lblPostTaxAmount">{productTotalData?.NetAmount}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td width="20%" valign="top">
                                  Coupon Discount Amount:
                                </td>
                                <td width="10%" valign="top">
                                  <div align="right">
                                    <span id="lblCouponDiscount">{productTotalData?.VoucherDiscount}</span>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td style={{display:'block'}}></td>
                                <td width="20%" valign="top">
                                  Total Amount:
                                </td>
                                <td width="10%" valign="top">
                                  <div align="right">
                                    <span id="lblTotalAmount">{productTotalData?.NetAmount - productTotalData?.VoucherDiscount}</span>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table border="0" cellPadding="0" cellSpacing="0" width="100%">
                            <tbody>
                              <tr>
                                <td width="40%" valign="top">
                                  <tr>
                                    <table border="0" className="borderCls" cellPadding="0" cellSpacing="0" width="100%">
                                      <tbody>
                                        <tr>
                                          <td align="center" colSpan="2" style={{borderTop:'0px !important'}}>
                                            <b>Payment Details</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" width="20%" style={{display:'none'}}>
                                            Bank A/C:
                                          </td>
                                          <td align="left" style={{display:'none'}}>
                                            <span id="BankAccount"></span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" width="20%" style={{display:'none'}}>
                                            Bank IFSC:
                                          </td>
                                          <td align="left" style={{display:'none'}}>
                                            <span id="BankIFSC"></span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" width="20%">
                                            Mode  of Payment:
                                          </td>
                                          <td align="center">
                                            <span id="PaymentMode">COD</span>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" align="center">
                                            <b>Terms &amp; Conditions</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2" style={{borderTop:'none'}}>
                                            &nbsp;
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </tr>
                                </td>
                                <td width="30%" valign="top">
                                  <table border="0" className="borderCls" cellPadding="0" cellSpacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          <br />
                                          <br />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td style={{textAlign:'center', padding:'2px'}}>
                                          Common Seal
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td width="30%" valign="top">
                                  <table border="0" className="borderCls" cellPadding="0" cellSpacing="0" width="100%">
                                    <tbody>
                                      <tr>
                                        <td width="20%" valign="top" style={{borderTop:'0px'}}>
                                          GST on Reverse Charge:
                                        </td>
                                        <td width="10%" valign="top" align="right" style={{borderTop:'0px'}}>
                                          <label id="Label1">N</label>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" valign="top">
                                          <small>Certified that the particulars given above are true and correct</small>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" valign="top" align="center">
                                          <b>For BNR EXIM PRIVATE LIMITED </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" style={{borderTop:'none', borderBottom:'none'}}>
                                          &nbsp;
                                        </td>
                                      </tr>
                                      <tr>
                                        <td colSpan="2" align="center">
                                          <b>Authorised signatory</b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </center>
                      </td>
                      <td className="pageright" valign="top">
                        <div className="pagerightimg"></div>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3" valign="top" className="pageleft">
                        <div className="pagebot">
                          <div className="pagebr">
                            <div className="pagebl"></div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

    </div>
  );
};

export default Innvoice_Page;