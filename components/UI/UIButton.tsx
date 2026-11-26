
"use client";

import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import { LoaderCircle } from "lucide-react";

export type UIButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "ghost"
  | "outline"
  | "alert";

export type UIButtonSize = "sm" | "md" | "lg";

type UIButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: UIButtonVariant;
  size?: UIButtonSize;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

const variantStyles: Record<UIButtonVariant, string> = {
  primary: `
    bg-primary text-primary-foreground
    shadow-lg shadow-primary/10
    hover:bg-primary-hover hover:shadow-primary/20
  `,

  secondary: `
    border border-border bg-surface-elevated text-foreground
    hover:border-border-strong hover:bg-surface-hover
  `,

  danger: `
    bg-error text-white
    shadow-lg shadow-error/10
    hover:bg-error/90
  `,

  success: `
    bg-success text-[#0B090B]
    hover:bg-success/90
  `,

  warning: `
    bg-warning text-[#0B090B]
    hover:bg-warning/90
  `,

  ghost: `
    bg-transparent text-muted
    hover:bg-surface-hover hover:text-foreground
  `,

  outline: `
    border border-primary/40 bg-transparent text-primary
    hover:border-primary hover:bg-primary-soft
  `,

  alert: `
    border border-error/20 bg-error-soft text-error
    hover:border-error/40 hover:bg-error/15
  `,
};

const sizeStyles: Record<UIButtonSize, string> = {
  sm: "h-8 px-3 text-xs gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-5 text-sm gap-2.5 rounded-xl",
};

export default function UIButton({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  type = "button",
  ...buttonProps
}: UIButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      {...buttonProps}
      type={type}
      disabled={isDisabled}
      aria-busy={loading}
      className={`
        inline-flex items-center justify-center
        font-semibold whitespace-nowrap
        outline-none select-none
        transition-all duration-200
        active:scale-[0.98]
        focus-visible:ring-2
        focus-visible:ring-primary/40
        focus-visible:ring-offset-2
        focus-visible:ring-offset-background
        disabled:pointer-events-none
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <LoaderCircle
          size={16}
          className="shrink-0 animate-spin"
        />
      ) : (
        leftIcon
      )}

      {children}

      {!loading && rightIcon}
    </button>
  );
}
