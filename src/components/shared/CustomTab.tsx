"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/appStore";

const CustomTab = ({ title, name }: { name: string; title: string }) => {
  const { category, changeCategory } = useStore();

  return (
    <label
      htmlFor={title}
      className={cn(
        "text-base text-dark-200 font-medium transition-all px-1 capitalize",
        {
          "text-primary font-medium border-b-4 border-primary":
            category === title,
        }
      )}
    >
      {title}
      <input
        type="radio"
        name={name}
        id={title}
        onClick={() => changeCategory(title)}
        className="hidden"
      />
    </label>
  );
};

export default CustomTab;
