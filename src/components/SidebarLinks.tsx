"use client";

import Link from "next/link";
import React, { useContext, useEffect } from "react";
import SignOut from "./shared/SignOut";
import {
  HeartIcon,
  ShoppingBasketIcon,
  User2Icon,
  XCircleIcon,
} from "lucide-react";
import GlobalContext from "@/context/GlobalContext";
import { cn } from "@/lib/utils";

const SidebarLinks = ({ user }: { user: any }) => {
  const { showProfileMenu, toggleProfileMenu } = useContext(GlobalContext);

  return (
    <aside
      className={cn(
        "w-full lg:w-sm  p-6 space-y-4 translate-x-200 lg:translate-0 lg:flex flex-col transition-transform transform-gpu duration-300 fixed lg:static top-0 left-0 bg-foreground z-90",
        {
          "lg:z-0 translate-x-0": showProfileMenu,
        }
      )}
    >
      <XCircleIcon
        size={32}
        onClick={toggleProfileMenu}
        className="place-self-end text-primary lg:hidden"
      />

      <h3 className="text-primary text-xl lg:hidden font-bold">Menu</h3>
      <Link
        href={`/user/${user.$id}`}
        className="py-2 px-4 rounded-lg flex items-center gap-1"
      >
        <User2Icon size={16} /> Profile
      </Link>
      <Link
        href={`/user/${user.$id}`}
        className="py-2 px-4 rounded-lg flex items-center gap-1"
      >
        <ShoppingBasketIcon size={16} /> Orders
      </Link>
      <Link
        href={`/user/${user.$id}`}
        className="py-2 px-4 rounded-lg flex items-center gap-1"
      >
        <HeartIcon size={16} /> Watchlist
      </Link>

      {user ? (
        <SignOut />
      ) : (
        <Link
          href="/sign-up"
          className="bg-primary text-foreground py-2 px-4 rounded-lg"
        >
          Sign in
        </Link>
      )}
    </aside>
  );
};

export default SidebarLinks;
