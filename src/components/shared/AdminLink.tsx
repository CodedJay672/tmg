"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AdminLink = ({
  path,
  label,
  icon,
}: {
  path: string;
  label: string;
  icon: React.ReactNode;
}) => {
  const pathname = usePathname();

  const isActive = (link: string) => {
    return pathname.endsWith(link);
  };

  return (
    <Link
      href={path}
      className={cn(
        "lg:w-full px-4 lg:px-8 py-2 flex justify-center lg:justify-start items-center gap-2 hover:bg-secondary/50 transition-all",
        {
          "lg:bg-primary font-medium text-primary lg:text-foreground hover:bg-primary":
            isActive(path),
        }
      )}
    >
      {icon}
      <span className="hidden lg:block">{label}</span>
    </Link>
  );
};

export default AdminLink;
