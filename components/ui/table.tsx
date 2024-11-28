// components/ui/table.tsx
import React from "react";

export const Table: React.FC<React.HTMLAttributes<HTMLTableElement>> = ({ children, className, ...props }) => {
  return <table className={`min-w-full border-collapse ${className || ""}`} {...props}>{children}</table>;
};

export const TableHead: React.FC<React.HTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return <th className={`bg-gray-100 dark:bg-gray-700 px-4 py-2 ${className || ""}`} {...props}>{children}</th>;
};

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return <tbody className={className || ""} {...props}>{children}</tbody>;
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => {
  return <tr className={`border-b ${className || ""}`} {...props}>{children}</tr>;
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => {
  return <td className={`px-4 py-2 ${className || ""}`} {...props}>{children}</td>;
};

export const TableHeader: React.FC<React.ThHTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => {
  return <thead className={`px-4 py-2 text-left font-medium dark:bg-[#2E073F] ${className || ""}`} {...props}>{children}</thead>;
};
