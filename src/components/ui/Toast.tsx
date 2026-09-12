import React from "react";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "warning" | "info";
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = "info",
  onClose,
}) => {
  const styles = {
    success: "border-green-200 bg-green-50 text-green-800",
    error: "border-red-200 bg-red-50 text-red-800",
    warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
    info: "border-blue-200 bg-blue-50 text-blue-800",
  };

  return (
    <div
      className={`
        flex items-center justify-between gap-4
        rounded-xl border px-4 py-3
        shadow-lg
        ${styles[type]}
      `}
      role="alert"
    >
      <span className="text-sm font-medium">
        {message}
      </span>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-sm opacity-70 hover:opacity-100"
          aria-label="Close notification"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Toast;
