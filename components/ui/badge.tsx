// components/ui/badge.tsx
import React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error";
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = "default", className, ...props }) => {
  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-200 text-green-800",
    warning: "bg-yellow-200 text-yellow-800",
    error: "bg-red-200 text-red-800",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-sm font-semibold rounded ${variantStyles[variant]} ${className || ""}`}
      {...props}
    >
      {children}
    </span>
  );
};
