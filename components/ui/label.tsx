import { LabelHTMLAttributes } from "react";
import clsx from "clsx"; // Optional, for conditional class management

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string; // For custom styling
}

export const Label: React.FC<LabelProps> = ({ className, children, ...props }) => {
  return (
    <label
      className={clsx(
        "block text-sm font-medium text-gray-700", // Default styles
        className // Allow customization through props
      )}
      {...props}
    >
      {children}
    </label>
  );
};