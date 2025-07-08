"use client";

import React from "react";
import {
  HeadphonesIcon,
  MailIcon,
  ShoppingBasketIcon,
  User2Icon,
} from "lucide-react";
import SignOut from "./shared/SignOut";
import { Models } from "node-appwrite";
import Link from "next/link";

const UserDropdownInfo = ({
  user,
  action,
}: {
  user: Models.Document;
  action: (t: boolean) => void;
}) => {
  return (
    <div className="w-64">
      <h3 className="text-base font-bold">{user?.name}</h3>
      <p className="text-sm text-gray-400">{user?.email}</p>

      <hr className="w-full my-4 text-gray-300" />

      <div className="space-y-2">
        <Link
          href={`/user/${user?.accountId}`}
          onClick={() => action(false)}
          className="text-base font-light flex items-center gap-3"
        >
          <User2Icon size={16} />
          Profile
        </Link>
        <Link
          href={`/orders/${user?.accountId}`}
          onClick={() => action(false)}
          className="text-base font-light flex items-center gap-3"
        >
          <ShoppingBasketIcon size={16} />
          Orders
        </Link>
        <SignOut />
      </div>

      <hr className="w-full my-4 text-gray-300" />

      <Link
        href="tel:+2348135637156"
        className="text-base font-light flex items-center gap-3"
      >
        <HeadphonesIcon size={16} />
        Contact us
      </Link>

      <Link
        href="mailto:info@tmgprocurement.com"
        className="text-base font-light flex items-center gap-3"
      >
        <MailIcon size={16} /> Email us
      </Link>
    </div>
  );
};

export default UserDropdownInfo;
