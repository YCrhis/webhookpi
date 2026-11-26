
"use client";

import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";

import {
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2,
  Info,
  AlertTriangle,
} from "lucide-react";

export type UIInputAlert = {
  type: "error" | "success" | "warning" | "info";
  message: string;
};

type UIInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> & {
  label?: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  error?: string;
  helperText?: string;
  alert?: UIInputAlert;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  showPasswordToggle?: boolean;
};

const alertStyles = {
  error: {
    text: "text-error",
    icon: AlertCircle,
  },
  success: {
    text: "text-success",
    icon: CheckCircle2,
  },
  warning: {
    text: "text-warning",
    icon: AlertTriangle,
  },
  info: {
    text: "text-info",
    icon: Info,
  },
};

export default function UIInput({
  label,
  type = "text",
  error,
  helperText,
  alert,
  leftIcon,
  rightIcon,
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  showPasswordToggle = true,
  id,
  className,
  disabled,
  required,
  ...inputProps
}: UIInputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType =
    isPassword && showPassword ? "text" : type;

  const activeError = error || (
    alert?.type === "error" ? alert.message : undefined
  );

  const activeAlert = error
    ? undefined
    : alert;

  const describedBy = [
    activeError ? `${inputId}-error` : undefined,
    helperText ? `${inputId}-helper` : undefined,
    activeAlert ? `${inputId}-alert` : undefined,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  const AlertIcon = activeAlert
    ? alertStyles[activeAlert.type].icon
    : null;

  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className={`text-sm font-medium text-foreground ${labelClassName}`}
        >
          {label}

          {required && (
            <span className="ml-1 text-primary">*</span>
          )}
        </label>
      )}

      {/* Input container */}
      <div className="relative">
        {/* Left icon */}
        {leftIcon && (
          <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors">
            {leftIcon}
          </div>
        )}

        <input
          {...inputProps}
          id={inputId}
          type={inputType}
          disabled={disabled}
          required={required}
          aria-invalid={Boolean(activeError)}
          aria-describedby={describedBy}
          className={`
            h-11 w-full rounded-xl border
            bg-surface-elevated
            px-3.5 text-sm text-foreground
            outline-none transition-all duration-200
            placeholder:text-muted-foreground
            focus:border-primary
            focus:ring-2 focus:ring-primary/20
            disabled:cursor-not-allowed
            disabled:opacity-50
            ${leftIcon ? "pl-10" : ""}
            ${rightIcon || (isPassword && showPasswordToggle) ? "pr-11" : ""}
            ${
              activeError
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-border hover:border-border-strong"
            }
            ${inputClassName}
            ${className ?? ""}
          `}
        />

        {/* Right icon / password toggle */}
        {isPassword && showPasswordToggle ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={
              showPassword ? "Hide password" : "Show password"
            }
            aria-pressed={showPassword}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition hover:text-primary disabled:cursor-not-allowed"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        ) : rightIcon ? (
          <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-muted">
            {rightIcon}
          </div>
        ) : null}
      </div>

      {/* Helper text */}
      {helperText && !activeError && (
        <p
          id={`${inputId}-helper`}
          className="text-xs leading-relaxed text-muted"
        >
          {helperText}
        </p>
      )}

      {/* Validation error */}
      {activeError && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="flex items-start gap-1.5 text-xs text-error"
        >
          <AlertCircle size={14} className="mt-0.5 shrink-0" />
          {activeError}
        </p>
      )}

      {/* Status alert */}
      {activeAlert && AlertIcon && (
        <div
          id={`${inputId}-alert`}
          role="status"
          className={`flex items-start gap-2 text-xs ${alertStyles[activeAlert.type].text}`}
        >
          <AlertIcon size={14} className="mt-0.5 shrink-0" />
          <span>{activeAlert.message}</span>
        </div>
      )}
    </div>
  );
}
