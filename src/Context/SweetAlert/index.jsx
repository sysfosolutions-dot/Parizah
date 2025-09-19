// src/context/SweetAlertContext.jsx
import React, { createContext, useContext } from 'react';
import Swal from 'sweetalert2';

const SweetAlertContext = createContext(undefined);

export const SweetAlertProvider = ({ children }) => {
  const showAlert = (title, text) => {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'OK',
      didOpen: () => {
    document.body.style.paddingRight = '0px'; // Remove auto padding
  },
    });
  };

  const showLoginAlert = (title, text) => {
  return Swal.fire({
    title,
    text,
    icon: 'error',
    confirmButtonText: '<i class="fa fa-check"></i> Got It',
    buttonsStyling: false,
    customClass: {
      confirmButton: 'btn btn-primary px-4 py-2 rounded-pill fw-bold'
    },
    didOpen: () => {
      document.body.style.paddingRight = '0px';
    }
  });
};


  const showInputAlert = (title, inputPlaceholder) => {
    return Swal.fire({
      title,
      input: 'text',
      inputPlaceholder,
      showCancelButton: true,
    });
  };

  const ShowSuccessAlert = (title) => {
    return Swal.fire({
      icon: 'success',
      title,
      showConfirmButton: false,
      timer: 1500,
      didOpen: () => {
    document.body.style.paddingRight = '0px'; // Remove auto padding
  },
    });
  };

  const ShowConfirmAlert = (title, text) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, proceed!',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  };

  const ShowConfirmBox = (title, text) => {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Procced To Deposit',
      cancelButtonText: 'No, cancel!',
    }).then((result) => {
      return result.isConfirmed;
    });
  };

  return (
    <SweetAlertContext.Provider
      value={{ showAlert, showInputAlert, ShowSuccessAlert, ShowConfirmAlert, ShowConfirmBox }}
    >
      {children}
    </SweetAlertContext.Provider>
  );
};

export const useSweetAlert = () => {
  const context = useContext(SweetAlertContext);
  if (!context) {
    throw new Error('useSweetAlert must be used within a SweetAlertProvider');
  }
  return context;
};
