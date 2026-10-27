import React from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
  hint?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  autoComplete?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  hint,
  placeholder,
  required = false,
  disabled = false,
  autoComplete,
}: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700"
      >
        {label}
        {required && (
          <span className="ml-1 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        aria-invalid={error ? "true" : undefined}
        className={[
          "w-full px-3 py-2 text-sm border rounded-md",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
          error
            ? "border-red-400 bg-red-50 text-red-900 placeholder-red-300"
            : "border-slate-300 bg-white text-slate-900",
        ].join(" ")}
      />

      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}

      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
    </div>
  );
}
