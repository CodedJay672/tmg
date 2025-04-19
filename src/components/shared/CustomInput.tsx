"use client";

import React from "react";

interface InputProps {
  label: string;
  type: string;
  name: string;
  value: string;
  onChange: (t: string) => void;
}

const CustomInput = ({ label, type, name, value, onChange }: InputProps) => {
  return (
    <label
      htmlFor={name}
      className="w-full text-xs font-light capitalize space-y-2 text-primary"
    >
      {label}
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-secondary rounded-md p-2 lg:py-3 mt-2 outline-none"
      />
    </label>
  );
};

export default CustomInput;
