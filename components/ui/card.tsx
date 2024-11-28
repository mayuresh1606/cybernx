// components/ui/card.tsx
import React, { HTMLAttributes } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div className={`shadow-lg rounded-lg border p-4 bg-white dark:bg-[#1A1A1D] ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div className={`border-b pb-2 mb-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className, ...props }) => {
  return (
    <h2 className={`text-lg font-semibold dark:text-white text-gray-800 ${className || ""}`} {...props}>
      {children}
    </h2>
  );
};

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => {
  return (
    <div className={className || ""} {...props}>
      {children}
    </div>
  );
};

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ className, children, ...props }) => {
  return (
    <p
      className={
        `text-sm text-gray-600 ${className && className}`}
      {...props}
    >
      {children}
    </p>
  );
};