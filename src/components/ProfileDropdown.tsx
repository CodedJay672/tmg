"use client";

import { ShoppingBasketIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { Models } from "node-appwrite";
import React, { useContext } from "react";
import SignOut from "./shared/SignOut";
import GlobalContext from "@/context/GlobalContext";
import { cn } from "@/lib/utils";

const ProfileDropdown = ({
  user,
}: {
  user: Models.User<Models.Preferences>;
}) => {
  const { showDropdown } = useContext(GlobalContext);

  return (
    <article
      className={cn(
        "w-64 h-0 absolute top-10 right-0 hidden lg:block bg-foreground py-6 px-3 rounded-lg shadow-md z-90 transition-all transform-gpu scale-0 duration-300",
        {
          "h-64 scale-100": showDropdown,
        }
      )}
    >
      <h3 className="text-base font-bold">{user?.name}</h3>
      <p className="text-sm text-gray-400">{user?.email}</p>

      <hr className="w-full my-4 text-gray-300" />

      <div className="space-y-1">
        <Link
          href={`/user/${user?.$id}`}
          className="text-base font-light flex items-center gap-1"
        >
          <User2Icon size={16} />
          Profile
        </Link>
        <Link
          href={`#`}
          className="text-base font-light flex items-center gap-1"
        >
          <ShoppingBasketIcon size={16} />
          Orders
        </Link>
        <SignOut />
      </div>

      <hr className="w-full my-4 text-gray-300" />

      <p className="text-sm font-light">Customer support</p>
    </article>
  );
};

export default ProfileDropdown;
