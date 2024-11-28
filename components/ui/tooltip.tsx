import React, { ReactNode, useState } from "react";

interface TooltipProps {
  children: ReactNode;
  content?: ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

interface TooltipProviderProps {
  children: ReactNode;
}

export const TooltipProvider: React.FC<TooltipProviderProps> = ({ children }) => {
  return <div>{children}</div>; // Wraps tooltips for accessibility/scoping
};

export const TooltipTrigger: React.FC<{ children: ReactNode, asChild?: boolean }> = ({ children, asChild = false }) => {
  if (asChild && React.isValidElement(children)){
    return React.cloneElement(children)
  }
  return <div>{children}</div>; // Acts as a placeholder for the triggering element
};

export const TooltipContent: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className="absolute z-10 p-2 text-sm text-white bg-black rounded shadow-lg"
      style={{ whiteSpace: "nowrap" }}
    >
      {children}
    </div>
  );
};

export const Tooltip: React.FC<TooltipProps> = ({ children, content, placement = "left" }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = (state: boolean) => setVisible(state);

  const getPlacementStyles = () => {
    switch (placement) {
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "";
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => toggleVisibility(true)}
      onMouseLeave={() => toggleVisibility(false)}
    >
      <TooltipTrigger>{children}</TooltipTrigger>
      {visible && (
        <div className={`absolute ${getPlacementStyles()}`}>
          <TooltipContent>{content}</TooltipContent>
        </div>
      )}
    </div>
  );
};
