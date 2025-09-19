import { Formik, Form, Field, ErrorMessage } from 'formik';
import React, { useEffect, useState } from 'react'
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication';
import { useToast } from '../../../Context/Tostify';
import { updateprofileValidation, UserPasswordValidation } from '../../../Utils/Forms/Validation/FieldValidation';

const AccountDetails = () => {
    const [FormValues, setFormValues]=useState();
    const [ClientID, setClientID] = useState(localStorage.getItem('ClientId') || '0')
    const [timeLeft, setTimeLeft] = useState(0);
    const [sendotp, setsendotp] = useState(false);
    const [loader, setloader] = useState(false);
    const [updatepassloader, setupdatepassloader] = useState(false)
    const { showToast } = useToast();
    const { user_common_api} = UserAuthentication();


/// use details 
    const FetchUserDetails = async ()=>{
        const OBJ = { 
            procName: 'UpdateProfile',
            Para:JSON.stringify({ClientId:ClientID, Actionmode:"GetProfile"})
         }
        const result = await user_common_api(OBJ)
        if(Array.isArray(result)){
            setFormValues({
                ClientName:result[0]?.ClientName,
                ContactNo:result[0]?.ContactNo,
                EmailId:result[0]?.EmailId,
                OTP:'',
            })
        }
    }

// Updating user Details 
    const handleSubmit = async(data)=>{
    setloader(true)
    const {ClientName, ContactNo, EmailId, OTP} = data
    const OBJ ={ 
        procName: 'UpdateProfile',
        Para:JSON.stringify({ClientId:ClientID, FirstName:ClientName, MobileNo:ContactNo, MobileOTP :OTP, Actionmode:"UpdateProfile"})
    }
     const result = await user_common_api(OBJ);
    if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.msg, 'success')
            setloader(false)
    }else{
         showToast(result[0]?.msg, 'error');
             setloader(false)
    }

    }

// Updating User password

    const HandlePasswordUpdate = async (data)=>{
          setupdatepassloader(true)
          const OBJ ={
             procName: 'UpdateProfile',
             Para:JSON.stringify({ClientId:ClientID, OldPassword:data?.pass , NewPassword:data?.newpass, Actionmode:"ChangePassword"})
          }  
        const result = await user_common_api(OBJ)
     if(result[0]?.StatusCode === '1'){
        showToast(result[0]?.msg, 'success');
        setupdatepassloader(false)
        }else{
            showToast(result[0]?.msg, 'error');
            setupdatepassloader(false)

        }      
    }


// send OTP 
const HandleOTP = async (data) =>{   
    const {ContactNo} = data
    const OBJ ={
    Para:JSON.stringify({MobileNo:ContactNo, ActionMode:'SendMobileOTP'}),
    procName : "RegistrationMobileOTP"
    }
    const result = await user_common_api(OBJ)
        if(result[0]?.StatusCode === 1){
        showToast(result[0]?.Msg, 'success')
        setsendotp(true)
        setTimeLeft(result[0]?.SecondsLeft)
        }else{
            setsendotp(false)
            showToast(result[0]?.Msg, 'error')
        }
}

// Set Coutdown
useEffect(() => {
    if (timeLeft <= 0){
      setsendotp(false)
      return; 
    } 
    if(sendotp === true){
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
    }, 1000);
  
    return () => clearTimeout(timer);  // Cleanup function
    }
  }, [timeLeft]);



  // setting timmer
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };


    useEffect(()=>{
        FetchUserDetails()
    },[])




  return (
    <div className="my-acount-content account-dashboard">
      <div action="#" className="form-edit-account">
        <h6 className="display-xs title-form">Account Details</h6>
        <Formik
          initialValues={FormValues}
          validationSchema={updateprofileValidation}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
            <Form className="form-name">
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  id="firstname"
                  placeholder=" "
                  type="text"
                  name="ClientName"
                />
                <label className="tf-field-label" for="firstname">
                  Full Name*
                </label>
                <ErrorMessage name="ClientName" component="div" />
              </div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  name="ContactNo"
                />
                <label className="tf-field-label" for="lastname">
                  Mobile Number*
                </label>
                <ErrorMessage name="ContactNo" component="div" />
              </div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="email"
                  name="EmailId"
                />
                <label className="tf-field-label" for="email" readOnly>
                  Email*
                </label>
                <ErrorMessage name="EmailId" component="div" />
              </div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  id="firstname"
                  placeholder=" "
                  type="password"
                  name="OTP"
                />
                <button
                  type="button"
                  className="px-2 py-1 send-otp-Btn"
                  onClick={() => (!sendotp ? HandleOTP(values) : null)}
                >
                  {timeLeft > 0 ? formatTime(timeLeft) : "Send OTP"}
                </button>
                <label className="tf-field-label" for="firstname">
                  OTP
                </label>
              </div>
              <button type="submit" className="tf-btn animate-btn">
                {loader ? (
                  <div
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></div>
                ) : null}
                Save Changes
              </button>
            </Form>
          )}
        </Formik>

        <Formik
          initialValues={{ pass: "", newpass: "", password: "" }}
          validationSchema={UserPasswordValidation}
          onSubmit={(values) => {
            HandlePasswordUpdate(values);
          }}
        >
          {({ errors, touched, values, setFieldValue, setFieldTouched }) => (
            <Form className="form-pass">
              {" "}
              {/* <- This is important */}
              <div className="text-lg title-pass">Password Change</div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="text"
                  autoComplete="off"
                  name="pass"
                />
                <label className="tf-field-label" htmlFor="pass">
                  Current password
                </label>
                <ErrorMessage name="pass" component="div" />
              </div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  autoComplete="off"
                  name="newpass"
                />
                <label className="tf-field-label" htmlFor="newpass">
                  New password
                </label>
                <ErrorMessage name="newpass" component="div" />
              </div>
              <div className="tf-field style-2 style-3">
                <Field
                  className="tf-field-input tf-input"
                  placeholder=" "
                  type="password"
                  autoComplete="off"
                  name="password"
                />
                <label className="tf-field-label" htmlFor="password">
                  Confirm password
                </label>
                <ErrorMessage name="password" component="div" />
              </div>
              <button type="submit" className="tf-btn animate-btn">
                {updatepassloader ? <div
                    class="spinner-border spinner-border-sm"
                    role="status"
                  ></div> : null }Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AccountDetails
