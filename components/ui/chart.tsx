// File: /components/ui/chart/ChartContainer.tsx

import React from "react";

interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
}

interface ChartTooltipContentProps {
    label?: string;
    items?: { color: string; name: string; value: string }[];
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border rounded-lg bg-white dark:bg-[#1A1A1D] shadow-md ${className}`}>
      {children}
    </div>
  );
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    color: string;
    name: string;
    value: string | number;
  }>;
  label?: string | number;
  content: React.ReactNode;
}

export const ChartTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="p-2 bg-gray-800 text-white rounded shadow-lg">
      <p className="mb-1 text-sm">{label}</p>
      {payload.map((item: { color: string; name: string; value: string | number; }, index: number) => (
        <p key={index} className="text-xs">
          <span style={{ color: item.color }}>●</span> {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({ label, items = [] }) => {
    return (
      <div className="p-2 bg-gray-800 text-white rounded shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        {items.map((item, index) => (
          <div key={index} className="flex items-center text-sm">
            <span
              style={{ backgroundColor: item.color }}
              className="w-3 h-3 rounded-full inline-block mr-2"
            ></span>
            {item.name}: {item.value}
          </div>
        ))}
      </div>
    );
  };