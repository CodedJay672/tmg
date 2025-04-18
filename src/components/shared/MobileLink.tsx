"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileLink = ({ path, icon }: BottomBarProps) => {
  const pathname = usePathname();

  const isActive = () => {
    return pathname.endsWith(path);
  };

  return (
    <Link
      href={path}
      className={cn("text-dark-300", {
        "text-primary": isActive(),
      })}
    >
      {icon}
    </Link>
  );
};

export default MobileLink;
