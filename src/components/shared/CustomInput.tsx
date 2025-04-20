"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (t: string) => void;
  error?: string[];
}

const CustomInput = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
}: InputProps) => {
  return (
    <label
      htmlFor={name}
      className={cn(
        "w-full text-xs font-light capitalize space-y-2 text-primary transition-all",
        {
          "text-red-500 font-medium": error,
        }
      )}
    >
      {label}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full border border-secondary rounded-md p-2 lg:py-3 mt-2 outline-none transition-all",
          { "border-2 border-red-500": error }
        )}
      />
      {error && (
        <p className="text-[10px] text-red-500 font-medium capitalize">
          {error[0]}
        </p>
      )}
    </label>
  );
};

export default CustomInput;
