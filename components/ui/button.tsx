// components/ui/button.tsx
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({ children, variant = "outline", size = "md", className, ...props }) => {
  const sizeStyles = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-5",
  };
  const baseStyles = "px-4 py-2 rounded font-medium focus:outline-none";
  const variantStyles =
    variant === "outline" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-200 text-black hover:bg-gray-300";

  return (
    <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${className || ""}`} {...props}>
      {children}
    </button>
  );
};
