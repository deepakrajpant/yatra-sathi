import React from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
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

      <select
        className={`
          w-full rounded-xl border bg-white px-4 py-3
          text-sm text-slate-900
          outline-none transition
          focus:border-[#4361ee]
          focus:ring-4 focus:ring-[#4361ee]/10
          ${
            error
              ? "border-red-500"
              : "border-slate-200"
          }
          ${className}
        `}
        {...props}
      >
        <option value="">Select an option</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
