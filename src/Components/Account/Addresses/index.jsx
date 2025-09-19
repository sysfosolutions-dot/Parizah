import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { IoCloseSharp } from "react-icons/io5";
import * as Yup from 'yup';
import {AddressSchema} from '../../../Utils/Forms/Validation/FieldValidation'
import {user_Address} from '../../../Utils/Forms/Validation/intialvalues'
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication';
import { useToast } from '../../../Context/Tostify';
import { useSweetAlert } from '../../../Context/SweetAlert';
import { FiPlusCircle } from "react-icons/fi";

const Addresses_Container = (props) => {
    const [formOpen, setOpenform] = useState(false);
    const [checkpincode, setcheckpincode] = useState({ error:false, msg:''});
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0')
    const [pincodeData, setpincodeData] = useState([]);
    const [CountryList, setCountryList] =useState([]);
    const {ShowConfirmAlert} = useSweetAlert()
    const [loader, setloader] = useState(false)
    const [FormValues, setFormValues]=useState()
    const { showToast } = useToast();
    const {ChceckPinCode, user_common_api} = UserAuthentication()
    const {userAddress, pageName, setreloadlist, reloadlist, setShippingID, ShippingID} = props

// Getting Country List
const FetchCountryList = async()=>{
    const OBJ = {
        procName: 'Country',Para:JSON.stringify({ActionMode:"GetCountry"})
    }
    const result = await user_common_api(OBJ);
    if(Array.isArray(result)){
        setCountryList(result)
    }else{
        setCountryList([])
    }
    
} 

const FetchStateList = async (ID)=>{
    const OBJ ={
         procName: 'State',
         Para:JSON.stringify({CountryId:ID, ActionMode:"GetState"}) 
        }
    const result = await user_common_api(OBJ);
    return result;
    

}


// submitting user Address form 
const handleSubmit = async(data)=>{
    setloader(true)
    const OBJ ={
        Para:JSON.stringify({
        ClientId:ClientID,
        ClientType:'User',
        FullName:data?.FullName,
        MobileNo:data?.MobileNo,
        AddressType:data?.AddressType,
        FlatHouseBuildingNo:data?.FlatHouseBuildingNo,
        Locality:data?.Locality,
        Pincode:data?.Pincode,
        LandMark:data?.LandMark,
        CountryId:String(data?.Country),
        StateName:data?.State,
        CityName:data?.City,
        AddressId:0,
        Type:userAddress?.length > 0 ? 'Shipping' : 'Billing',
        IsShipping:data?.defaultAddress ? 'Y' : 'N',
        ActionMode:'Insert'}),
        ProcName:'DeliveryAddress'
    }
    const result = await user_common_api(OBJ);
    if(result[0]?.StatusCode === "1"){
        setloader(false);
        showToast(result[0]?.Msg, 'success');
        setreloadlist(!reloadlist);
        setOpenform(!formOpen)
    }else{
          showToast(result[0]?.Msg, 'error');
        setloader(false)
    }

    
}

/// Check Pincode 
const CheckPinCode = async (e, setFieldValue, setFieldTouched) => {
  if (e.length === 6) {
    const result = await ChceckPinCode(e);
    if (result[0]?.Status === "Success") {
      const postOffice = result[0]?.PostOffice[0];

      setpincodeData(postOffice);

      // Set values
      setFieldValue('Country', postOffice.Country);
      setFieldValue('State', postOffice.State);
      setFieldValue('City', postOffice.Block);

      // Mark fields as touched so errors can go away if they were showing
      setFieldTouched('Country', false);
      setFieldTouched('State', false);
      setFieldTouched('City', false);

      setcheckpincode({ error: false, msg: '' });
    } else if (result[0]?.Status === "Error") {
      setcheckpincode({ error: true, msg: 'Invalid pincode.' });
      setFieldValue('Country', '');
      setFieldValue('State', '');
      setFieldValue('City', '');

      // Mark fields as touched so errors can go away if they were showing
      setFieldTouched('Country', true);
      setFieldTouched('State', true);
      setFieldTouched('City', true);
    }
  } else {
    setcheckpincode({ error: false, msg: '' });
    setFieldValue('Country', '');
    setFieldValue('State', '');
    setFieldValue('City', '');
    return;
  }
};

// Delete User Shipping address
const DeleteUser_Address = async (ID)=>{
   const confirm = await ShowConfirmAlert("Are you sure you want to delete!");   
   if(confirm){
         const OBJ ={
      para :JSON.stringify({ClientId:ClientID, AddressId:ID,  ActionMode:"RemoveAddress"}),
      procName:"DeliveryAddress"
    }
    const result = await user_common_api(OBJ);
    if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.Msg, 'success');
        setreloadlist(!reloadlist);
    }else{
        showToast(result[0]?.Msg, 'error');
    }
   }else{
    return;
   }


}
// Edit user Address
const EditAddress = async (ID)=>{
    setOpenform(true)
    const filtered = userAddress.filter((itm)=> itm?.AddressId === ID);
    setFormValues(
        {
    FullName:filtered[0]?.FullName,
    MobileNo:filtered[0]?.MobileNo,
    AddressType:filtered[0]?.AddressType,
    FlatHouseBuildingNo: filtered[0]?.FlatHouseBuildingNo,
    Locality:filtered[0]?.Locality,
    LandMark:filtered[0]?.LandMark,
    Pincode:filtered[0]?.Pincode,
    Country:filtered[0]?.CountryName,
    State:filtered[0]?.StateName,
    City:filtered[0]?.CityName,
    defaultAddress: false,
    }
    )
}


/// Setting Shipping Address

const SettingShippingID = (ID)=>{
    if(ShippingID === ID){
         setShippingID(null)
    }else{
            setShippingID(ID)
    }
   
}


useEffect(()=>{
    FetchCountryList()
}, [])


  return (
    <div className="my-acount-content account-address">
    {!formOpen && userAddress.length > 0 ? <h6 className="title-account"> Your addresses ({userAddress.length}) </h6> : null}
    <div className="widget-inner-address ">
        {!formOpen && userAddress.length > 0 ? <button type='button' className="tf-btn btn-add-address animate-btn" onClick={()=> setOpenform(!formOpen)}>
            Add new address
        </button> : null}
        <div className={`d-flex align-items-center text-danger py-2 ${formOpen ? 'justify-content-end' : 'justify-content-start'}` }>
              {(!formOpen && userAddress.length > 0 && ShippingID === null)   ? <p className='py-2 fw-medium text-md'>Choose shipping Address</p> : null}
            {formOpen ? <span className='Address-form-closeBtn'><IoCloseSharp size={30} onClick={()=> { setOpenform(!formOpen); setShippingID(null) }}/></span> :null}
        </div>
        {!formOpen && userAddress.length === 0 ?<div>
            <div className='row '>
                   <div className='address-home-icon col-md-6 text-center'>
                    <img src={import.meta.env.BASE_URL + `assets/Images/section/home.png`}/>
                    <h6 className='mt-2'>Address not Found!</h6>
            </div>
            <div className='add-address-icon col-md-6 text-center'>
                 <img src={import.meta.env.BASE_URL + `assets/Images/section/plus.png`} onClick={()=> setOpenform(!formOpen)}/>
                 <h6 className='mt-2'>Add Your Billing Address</h6>
            </div>
            </div>
        </div> : null}
        {formOpen ? <Formik
            initialValues={FormValues || user_Address}
            validationSchema={AddressSchema}
            onSubmit={(values) => {
                handleSubmit(values)
              }}
            enableReinitialize
        >
    {({ errors, touched, values, setFieldValue, setFieldTouched   }) => (
        <Form  className="wd-form-address form-default ">
            <div className="cols">
                <fieldset>
                    <Field type="text" name="FullName" placeholder="Enter Your Full Name*"/>
                    <ErrorMessage name="FullName" className='text-danger' component="div"/>
                </fieldset>
                <fieldset>
                    <Field type="text" name="MobileNo"  placeholder="Enter Your Mobile Number*"/>
                    <ErrorMessage name="MobileNo" className='text-danger' component="div"/>
                </fieldset>
            </div>
            <div className="cols">
              <div className="tf-select select-square">
                    <Field as="select" name="AddressType"   placeholder="Address Type*">
                        <option value="">Choose Address Type*</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                        <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="AddressType" className='text-danger' component="div"/>
                </div>
            </div>
            <div className="cols">
                <fieldset>
                    <Field type="text"  name="FlatHouseBuildingNo" placeholder="Enter Address Line 1*"/>
                    <ErrorMessage name="FlatHouseBuildingNo" className='text-danger' component="div"/>

                </fieldset>
            </div>
                        <div className="cols">
                <fieldset>
                    <Field type="text"  name="Locality" placeholder="Enter Address Line 2"/>
                </fieldset>
            </div>
            <div className="cols">
                <fieldset>
                    <Field type="text" name="LandMark" placeholder="Enter LandMark*"/>
                    <ErrorMessage name="LandMark" className='text-danger' component="div"/>

                </fieldset>
 
            </div>
            <div className="cols">
                <fieldset>
                    <Field type="text"  name="Pincode" placeholder="Enter Pincode*"/>
                    <ErrorMessage name="Pincode" className='text-danger' component="div"/>
                </fieldset>
                   <fieldset>
                   <div class="tf-select select-square">
                        <Field type="text" as="select"  name="Country" placeholder="choose Country Name*">
                             {CountryList.map((itm, idx)=>(<option key={idx} value={itm?.CountryId} selected={itm?.CountryName === "India"}>{itm?.CountryName}</option>))}
                        </Field>
                        </div>
                 <ErrorMessage name="Country" className='text-danger' component="div"/>
                </fieldset>
            </div>
            <div className="cols">
                                 <fieldset>
                    <Field type="text"  name="State" placeholder="Enter State Name*"/>
                    <ErrorMessage name="State" className='text-danger' component="div"/>

                </fieldset>
                <fieldset>
                    <Field type="text"  name="City" placeholder="Enter City Name*"/>
                    <ErrorMessage name="City" className='text-danger' component="div"/>
                </fieldset>
            </div>
            {userAddress.length === 0 ? <div className="tf-cart-checkbox">
                <Field type="checkbox" name="defaultAddress" className="tf-check" 
                    id="default-address-add"/>
                <label for="default-address-add" className="label">
                    <span>Set as Shipping address</span>
                </label>
            </div>  : null}
            <div className="box-btn">
                <button className="tf-btn animate-btn" type="submit">
                   {loader ? <div className="spinner-border text-light spinner-border-sm" role="status"></div> : null } Submit
                </button>
                <button onClick={()=> setOpenform(!formOpen)} className="tf-btn btn-out-line-dark btn-hide-address" type="button">
                    Cancel
                </button>
            </div>
        </Form>
                 )}
        </Formik> : null}
          {!formOpen ? <ul className="list-account-address tf-grid-layout md-col-2">
            {userAddress.map((itm, idx)=> <li className="account-address-item" key={idx}>
                <div className='d-flex align-items-center justify-content-between pe-3'>
                    <p className="title text-md fw-medium">
                    ({itm?.Type})
                </p>
               {pageName === "checkout" && itm?.Type != "Billing" ? <span>  
               <div class="checkbox-wrapper-19">
                    <input type="checkbox" onClick={()=> SettingShippingID(itm?.AddressId)} id={idx}  />
                    <label for={idx} class="check-box"/>
                </div>
                    </span> : 
                    null} 
                </div>
                <div className="info-detail">
                    <div className="box-infor">
                        <p className="text-md">{itm?.FullName}</p>
                        <p className="text-md">{itm?.UseremailID}</p>
                        <p className="text-md">{itm?.AddressType}</p>
                        <p className="text-md">{itm?.FlatHouseBuildingNo} {itm?.Locality}</p>
                        <p className="text-md">{itm?.CityName}, {itm?.StateName}, {itm?.CountryName}, {itm?.MobileNo},</p>
                    </div>
                
                    <div className="box-btn">
                        <button  className="tf-btn btn-out-line-dark btn-edit-address"  onClick={()=>  EditAddress(itm?.AddressId) }>
                            Edit
                        </button>
                    {itm?.Type != "Billing" ?  
                        <button  className="tf-btn btn-out-line-dark btn-delete-address" onClick={()=> itm?.Type === "Shipping" ? DeleteUser_Address(itm?.AddressId) :  showToast('You can not delete Billing Address', 'warning')}>
                            Delete
                        </button>
                         : null} 
                    </div>
                    
                </div>
            </li>)}
        </ul> : null}
    </div>
</div>
  )
}

export default Addresses_Container
