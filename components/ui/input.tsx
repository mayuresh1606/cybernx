// components/ui/input.tsx
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className || ""}`}
      {...props}
    />
  );
};
