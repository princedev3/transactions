import React from "react";

export interface ButtonProps {
  type?: "reset" | "submit" | "button";
  onClick?: () => void;
  children?: React.ReactNode;
  variant?: "filled" | "outlined";
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  variant,
  children,
  onClick,
  type,
  className,
  disabled,
  isLoading,
}: ButtonProps) {
  const filledVariant = `bg-primary text-white border-2 ${
    disabled
      ? "bg-[#ABBAD9] border-[#ABBAD9]"
      : "hover:bg-[#2C52A1] bg-primary border-primary"
  }`;

  const outlinedVariant = `bg-white border-2 ${
    disabled
      ? "text-[#ABBAD9] border-[#ABBAD9]"
      : "hover:bg-[#ABBAD9] border-primary text-primary"
  }`;

  const variants =
    variant === "filled"
      ? filledVariant
      : variant === "outlined"
      ? outlinedVariant
      : "text-primary";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type ? type : "button"}
      className={`rounded-lg text-sm font-semibold ${variant && "px-5 py-2"} ${
        disabled ? "opacity-50" : ""
      } grid grid-flow-col justify-center items-center gap-3 transition-all duration-300 ${className} ${variants}`}
    >
      {isLoading ? (
        <span
          className={`block w-6 h-6 rounded-full border-2 border-b-transparent animate-spin ${
            variant === "filled" ? "border-white" : "border-primary"
          }`}
        ></span>
      ) : (
        children
      )}
    </button>
  );
}
