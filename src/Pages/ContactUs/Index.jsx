import React, { useContext, useState } from "react";
import Breadcrumb_Container from "../../Components/Common/Breadcrumb/Index";
import AccountContext from "../../Context/Account";
import {ContactSchema} from '../../Utils/Forms/Validation/FieldValidation'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserAuthentication } from "../../Services/Authentication/UserAuthentication";
import { useToast } from "../../Context/Tostify";
function ContactUsPage() {
  const [submitLoader, setsubmitLoader] = useState(false);
  const { showToast } = useToast();
  const { CompanyDetails} = useContext(AccountContext);
  const {user_common_api} = UserAuthentication();
  
  const HandleSubmit = async(data, resetForm, setSubmitting)=>{ 
    setsubmitLoader(true)
    const OBJ ={
      Para:JSON.stringify({FirstName:data?.username, MobileNo:data?.mobileNo, Email:data?.email, Subject:data?.subject,  Message:data?.message,  Actionmode:"Contact"}),
      procName: 'ContactUs',
    }

    const result = await user_common_api(OBJ);
    if(result[0]?.StatusCode === 1){
        setsubmitLoader(false);
        showToast(result[0]?.msg, 'success');
        resetForm();
        setSubmitting(false);
    }else{
      setsubmitLoader(false);
       showToast(result[0]?.msg, 'error');
    }

  }
    

  return (
    <>
      <Breadcrumb_Container />
      <section className="s-contact flat-spacing-13">
        <div className="container">
          <div className="wg-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.816539408052!2d80.98723257521965!3d26.782117376725314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd09c000001d%3A0x9f0b6f25a99fca59!2sSysfo%20Software%20Solutions%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1747390996420!5m2!1sen!2sin"
              className="map"
              style={{ border: "none" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="content-left">
                <div className="title fw-medium display-md-2">Contact Us</div>
                <p className="sub-title text-main">
                  Have a question? Please contact us using the customer support
                  <br /> channels below.
                </p>
                <ul className="contact-list">
                  <li>
                    <p>
                      Address:
                      <a
                        className="link"
                        href="https://www.google.com/maps?q=15Yarranst,Punchbowl,NSW,Australia"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {CompanyDetails[0]?.Address}
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Phone number:
                      <a className="link" href={`tel:${CompanyDetails[0]?.ContactNo}`}>
                      {CompanyDetails[0]?.ContactNo}
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Email:
                      <a className="link" href="mailto:contact@vineta.com">
                         {CompanyDetails[0]?.EmailId}
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      Open:
                      <span className="text-main">8am - 7pm, Mon - Sat</span>
                    </p>
                  </li>
                </ul>
                <ul className="tf-social-icon style-large">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      className="social-item social-facebook"
                    >
                      <i className="icon icon-fb"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/"
                      className="social-item social-instagram"
                    >
                      <i className="icon icon-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="https://x.com/" className="social-item social-x">
                      <i className="icon icon-x"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.snapchat.com/"
                      className="social-item social-snapchat"
                    >
                      <i className="icon icon-snapchat"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="content-right">
                <div className="title fw-medium display-md-2">Get In Touch</div>
                <p className="sub-title text-main">
                  Please submit all general enquiries in the contact form below
                  and we look forward to hearing from you soon.
                </p>
                <div className="form-contact-wrap">
                  <Formik
                    initialValues={{
                      username: "",
                      email: "",
                      mobileNo: "",
                      subject: "",
                      message: "",
                    }}
                    validationSchema={ContactSchema}
                    onSubmit={async(values, { resetForm,  setSubmitting}) => {
       
                     HandleSubmit(values, resetForm, setSubmitting);

                            }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="form-default">
                        <div className="wrap">
                          <div className="cols">
                            <fieldset>
                              <label>Full Name*</label>
                              <Field
                                id="username"
                                className="radius-8"
                                type="text"
                                name="username"
                              />
                              <ErrorMessage
                                name="username"
                                component="div"
                                className="error"
                              />
                            </fieldset>

                            <fieldset>
                              <label>Your email*</label>
                              <Field
                                id="email"
                                className="radius-8"
                                type="email"
                                name="email"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className="error"
                              />
                            </fieldset>
                          </div>

                          <div className="cols">
                            <fieldset>
                              <label>Mobile No *</label>
                              <Field
                                className="radius-8"
                                type="text"
                                name="mobileNo"
                              />
                              <ErrorMessage
                                name="mobileNo"
                                component="div"
                                className="error"
                              />
                            </fieldset>

                            <fieldset>
                              <label>Subject*</label>
                              <Field
                                className="radius-8"
                                type="text"
                                name="subject"
                              />
                              <ErrorMessage
                                name="subject"
                                component="div"
                                className="error"
                              />
                            </fieldset>
                          </div>

                          <div className="cols">
                            <fieldset className="textarea">
                              <label>Message*</label>
                              <Field
                                as="textarea"
                                name="message"
                                className="radius-8"
                              />
                              <ErrorMessage
                                name="message"
                                component="div"
                                className="error"
                              />
                            </fieldset>
                          </div>

                          <div className="button-submit">
                            <button
                              className="tf-btn animate-btn"
                              type="submit"
                              disabled={isSubmitting}
                            >
                              {submitLoader ? <div class="spinner-border spinner-border-sm" role="status"></div> : null}
                              Send
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUsPage;
