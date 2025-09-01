import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

// Usando el TooltipProvider original de Radix
const TooltipProvider = TooltipPrimitive.Provider;

// Versiones simplificadas de los otros componentes
export const Tooltip: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const TooltipTrigger: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const TooltipContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export { TooltipProvider };
