"use client";

import GlobalContext from "@/context/GlobalContext";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store/appStore";

const DropdownSwitch = () => {
  const { showDropdown, toggleDropdown } = useStore();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDropdown}
      className="size-6 ml-3 cursor-pointer"
    >
      <ChevronDownIcon
        className={cn(
          "transition-transform transform-gpu rotate-none duration-300",
          {
            "rotate-180": showDropdown,
          }
        )}
      />
    </Button>
  );
};

export default DropdownSwitch;
