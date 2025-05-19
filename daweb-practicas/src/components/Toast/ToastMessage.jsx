import { useEffect, useRef } from "react";

const ToastMessage = ({ show = false, type = "success", message, onClose }) => {
  const toastRef = useRef(null);

  useEffect(() => {
    if (toastRef.current && show && window.bootstrap) {
      const toast = window.bootstrap.Toast.getOrCreateInstance(
        toastRef.current,
        {
          autohide: true,
          delay: 3000,
        }
      );

      toast.show();

      toastRef.current.addEventListener("hidden.bs.toast", () => {
        if (onClose) onClose();
      });
    }
  }, [show, onClose]);

  const bgClass = type === "success" ? "bg-success" : "bg-danger";

  return (
    <div
      className="toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div
        ref={toastRef}
        className={`toast align-items-center text-white ${bgClass} border-0`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{message}</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ToastMessage;
