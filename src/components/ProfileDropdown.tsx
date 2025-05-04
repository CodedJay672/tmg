"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/appStore";
import { useWindowScroll } from "react-use";

const ProfileDropdown = ({ children }: { children: React.ReactNode }) => {
  const { showDropdown, hideDropdown } = useStore();
  const { y } = useWindowScroll();

  //perform some options onscroll
  useEffect(() => {
    if (showDropdown) hideDropdown();
  }, [y]);

  return (
    <article
      className={cn(
        "w-64 h-0 absolute top-10 right-0 bg-foreground py-6 px-3 rounded-lg shadow-md z-90 transition-all transform-gpu duration-300 overflow-hidden -translate-y-20 opacity-0",
        {
          "h-68 translate-y-0 opacity-100": showDropdown,
        }
      )}
    >
      {children}
    </article>
  );
};

export default ProfileDropdown;
