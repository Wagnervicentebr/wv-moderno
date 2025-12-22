"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "./utils";

interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  className?: string;
  "aria-label"?: string;
  disabled?: boolean;
}

function Switch({ className, checked, onCheckedChange, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "dark:focus-visible:ring-white dark:focus-visible:ring-offset-black",
        checked 
          ? "bg-black dark:bg-white" 
          : "bg-gray-300 dark:bg-gray-600",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform",
          "dark:bg-black",
          checked ? "translate-x-5" : "translate-x-0.5"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
