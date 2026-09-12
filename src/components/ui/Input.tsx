import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        className={`
          w-full rounded-xl border bg-white px-4 py-3
          text-sm text-slate-900
          outline-none transition
          placeholder:text-slate-400
          focus:border-[#4361ee]
          focus:ring-4 focus:ring-[#4361ee]/10
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200"
          }
          ${className}
        `}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}

      {!error && helperText && (
        <p className="mt-1.5 text-xs text-slate-500">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
