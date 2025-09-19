import * as Yup from 'yup';
export const AddressSchema = Yup.object().shape({
    FullName: Yup.string().required('FullName is Required'),
    MobileNo: Yup.string().required('Mobile Number is Required'),
    AddressType: Yup.string().required('AddressType is Required'),
    FlatHouseBuildingNo: Yup.string().required('Address Line is Required'),
    Locality: Yup.string().optional(),
    LandMark: Yup.string().required('LandMark is Required'),
    Pincode: Yup.string().required('Pincode is Required'),
    Country: Yup.string().required('Country is Required'),
    State: Yup.string().required('State is Required'),
    City:Yup.string().required('City is required'),
    defaultAddress: Yup.boolean(),
  });

  export const  userReview_Validation = Yup.object().shape({
    Rating:Yup.string().required('Please select a star rating.'),
    Name:Yup.string().required('Name is Required'),
    Email:Yup.string().required('Email is requied'),
    Comment:Yup.string().required('Comment is required')
  }); 

  export const Checkout_Validation = Yup.object().shape({
    Coupon:Yup.string().optional(),
    PaymentMethod:Yup.string().required('Please Select Payment Method'),
  }); 


export const updateprofileValidation = Yup.object().shape({
  ClientName: Yup.string()
    .required('Full Name is required')
    .min(2, 'Name must be at least 2 characters'),
  
  ContactNo: Yup.string()
    .required('Mobile Number is required')
    .matches(/^[0-9]{10}$/, 'Mobile Number must be 10 digits'),

  EmailId: Yup.string()
    .required('Email is required')
    .email('Invalid email address'),
  OTP:Yup.string()
});


export const UserPasswordValidation = Yup.object().shape({
  pass: Yup.string()
    .required('Current password is required'),

  newpass: Yup.string()
    .required('New password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Must contain at least one number')
    .matches(/[@$!%*?&#]/, 'Must contain at least one special character'),

  password: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newpass')], 'Passwords must match'),
});

export const ContactSchema = Yup.object().shape({
  username: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobileNo: Yup.string().required("Mobile No is required"),
  subject: Yup.string().required("Subject is required"),
  message: Yup.string().required("Message is required"),
});
