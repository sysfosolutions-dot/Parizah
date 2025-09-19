import { Box, Drawer } from '@mui/material'
import Cookies from "js-cookie";
import React, { useContext } from 'react'
import AccountContext from '../../../Context/Account'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useToast } from '../../../Context/Tostify';
import { UserAuthentication } from '../../../Services/Authentication/UserAuthentication';

const Reset_Drawer = () => {
    const { showToast } = useToast();
    const {resetDrawer, setresetDrawer, LoginDrawerOpen,  setLoginDrawerOpen} = useContext(AccountContext)
    const {User_sendresetLink} = UserAuthentication()
    const forgetpassSchema = Yup.object().shape({
        EmailId: Yup.string().email("Enter Valid Email")
        .required('Mobile number is required')
      });

 // sending reset link
const Handleforgetpass = async(data)=>{
    const result = await User_sendresetLink(data);
    if(result[0]?.StatusCode === "1"){
        showToast(result[0]?.Msg, 'success');
        setresetDrawer(!resetDrawer);
        setLoginDrawerOpen(!LoginDrawerOpen) 
    }else{
        showToast(result[0]?.Msg, 'error');
        setresetDrawer(!resetDrawer) 
    }
}



  return (
   <Drawer anchor="right" 
           slotProps={{
               paper: {
                 className: ' offcanvas-end popup-style-1 popup-login'
               }
             }}
           open={resetDrawer} onClose={()=> setresetDrawer(!resetDrawer)}>
            <Box className="offcanvas-end popup-style-1 popup-reset-pass">
            <div className="canvas-wrapper">
            <div className="canvas-header popup-header">
                <span className="title">Reset Your Password</span>
                <button className="icon-close icon-close-popup bg-transparent text-dark border-0" onClick={()=> setresetDrawer(!resetDrawer)}></button>
            </div>
            <div className="canvas-body popup-inner">
            <Formik
        initialValues={{
            EmailId: "",
        }}
        validationSchema={forgetpassSchema}
        onSubmit={(values, { resetForm }) => {
            Handleforgetpass(values) ;
            resetForm()
        }}
      >
            <Form>
                    <div className="">
                        <p className="text text-sm text-main-2 mt-2">Forgot your password? No worries! Enter your registered
                            email to receive a link and securely reset it in just a few steps.</p>
                        <fieldset className="email mb_12 mt-2">
                            <Field type="email" placeholder="Enter Your Email*" name='EmailId'/>
                        </fieldset>
                         <ErrorMessage name="EmailId" />
                    </div>
                    <div className="bot mt-4">
                        <div className="button-wrap d-md-flex gap-5">
                            <button className="subscribe-button tf-btn animate-btn bg-dark-2 w-100" type="submit">Reset
                                Password</button>
                            <button type="button" 
                                className="tf-btn btn-out-line-dark2 w-100 mt-3 mt-md-0">Cancel</button>
                        </div>
                    </div>
            </Form>
        </Formik>
            </div>
        </div>
            </Box>
   </Drawer>
  )
}

export default Reset_Drawer
