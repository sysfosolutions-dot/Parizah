import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context create karo
const ToastContext = createContext(null);

// Provider Component
export const ToastProvider = ({ children }) => {
  // Ye function toast messages ko trigger karega
  const showToast = (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else if (type === "info") {
      toast.info(message);
    } else {
      toast.warning(message);
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* ToastContainer ko yaha ek hi baar define kiya hai */}
      <ToastContainer position="top-right" autoClose={3000} />
    </ToastContext.Provider>
  );
};

// Custom hook for using the toast context
export const useToast = () => useContext(ToastContext);
