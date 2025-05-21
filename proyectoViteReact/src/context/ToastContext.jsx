import { createContext, useState, useContext } from "react";
import ToastMessage from "@/components/ToastMessage";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toastData, setToastData] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const showToast = (message, type = "success") => {
    setToastData({ show: true, type, message });
  };

  const hideToast = () => {
    setToastData({ ...toastData, show: false });
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastMessage
        show={toastData.show}
        type={toastData.type}
        message={toastData.message}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
