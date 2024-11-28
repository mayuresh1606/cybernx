// components/ui/switch.tsx
import React, { useState } from "react";

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

export const Switch: React.FC<SwitchProps> = ({ checked = false, onChange, className, ...props }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggleSwitch = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <button
      onClick={toggleSwitch}
      className={`relative inline-flex h-6 w-12 items-center rounded-full ${
        isChecked ? "bg-blue-500" : "bg-gray-300"
      } ${className || ""}`}
      {...props}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
          isChecked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
};
