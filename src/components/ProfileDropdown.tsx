"use client";

import React, { useContext, useRef } from "react";
import GlobalContext from "@/context/GlobalContext";
import { cn } from "@/lib/utils";

const ProfileDropdown = ({ children }: { children: React.ReactNode }) => {
  const { showDropdown, toggleDropdown } = useContext(GlobalContext);
  const dropdownRef = useRef<HTMLElement | null>(null);

  const closeDropdown = (e: React.MouseEvent<HTMLElement>) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      toggleDropdown();
    }
    return;
  };

  return (
    <article
      className={cn(
        "w-64 h-0 absolute top-10 right-0 bg-foreground py-6 px-3 rounded-lg shadow-md z-90 transition-all transform-gpu duration-300 overflow-hidden -translate-y-20 opacity-0",
        {
          "h-68 translate-y-0 opacity-100": showDropdown,
        }
      )}
      ref={dropdownRef}
      onClick={closeDropdown}
    >
      {children}
    </article>
  );
};

export default ProfileDropdown;
