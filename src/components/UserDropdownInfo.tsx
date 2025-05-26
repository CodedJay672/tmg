"use client";

import React from "react";
import { ShoppingBasketIcon, User2Icon } from "lucide-react";
import SignOut from "./shared/SignOut";
import { Models } from "node-appwrite";
import Link from "next/link";

const UserDropdownInfo = ({
  user,
  action,
}: {
  user: Models.User<Models.Preferences>;
  action: (t: boolean) => void;
}) => {
  return (
    <div className="w-64">
      <h3 className="text-base font-bold">{user?.name}</h3>
      <p className="text-sm text-gray-400">{user?.email}</p>

      <hr className="w-full my-4 text-gray-300" />

      <div className="space-y-2">
        <Link
          href={`/user/${user?.$id}`}
          onClick={() => action(false)}
          className="text-base font-light flex items-center gap-3"
        >
          <User2Icon size={16} />
          Profile
        </Link>
        <Link
          href={`/orders/${user?.$id}`}
          onClick={() => action(false)}
          className="text-base font-light flex items-center gap-3"
        >
          <ShoppingBasketIcon size={16} />
          Orders
        </Link>
        <SignOut />
      </div>

      <hr className="w-full my-4 text-gray-300" />

      <p className="text-sm font-light">Customer support</p>
    </div>
  );
};

export default UserDropdownInfo;
