"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { useWindowScroll } from "react-use";

const ProfileDropdown = ({
  show,
  setShow,
  children,
}: {
  children: React.ReactNode;
  show: boolean;
  setShow: (t: boolean) => void;
}) => {
  const { y } = useWindowScroll();

  //perform some options onscroll
  useEffect(() => {
    if (!show) return;

    setShow(false);
  }, [y]);

  return (
    <article
      className={cn(
        "w-max h-0 absolute overflow-hidden top-15 right-0 bg-foreground py-6 px-3 rounded-lg shadow-lg z-90 transition-all transform-gpu duration-300  -translate-y-100 opacity-0",
        {
          "h-max translate-y-0 opacity-100": show,
        }
      )}
    >
      {children}
    </article>
  );
};

export default ProfileDropdown;
