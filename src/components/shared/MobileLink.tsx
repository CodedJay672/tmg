"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useStore } from "@/store/appStore";
import CountBadge from "./CountBadge";

const MobileLink = ({ path, icon }: BottomBarProps) => {
  const pathname = usePathname();
  const { cart } = useStore();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  const isActive = () => {
    return pathname.endsWith(path);
  };

  if (!client) return;

  return (
    <Link
      href={path}
      className={cn("text-dark-300 relative py-1 px-2", {
        "text-primary": isActive(),
      })}
    >
      {icon}
      {cart.length > 0 && (
        <div className="absolute -top-1 -right-1">
          {cart.length > 0 && path === "/cart" && <CountBadge item={cart} />}
        </div>
      )}
    </Link>
  );
};

export default MobileLink;
