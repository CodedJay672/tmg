"use client";

import Link from "next/link";
import React from "react";
import {
  HeadphonesIcon,
  HeartIcon,
  LucideX,
  MailIcon,
  ShieldCloseIcon,
  ShoppingBasketIcon,
  User2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SignOut from "./shared/SignOut";
import { Models } from "node-appwrite";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/appStore";

const SidebarLinks = ({ user }: { user?: Models.Document }) => {
  const { showProfileMenu, toggleProfileMenu } = useStore();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.endsWith(path);
  };

  return (
    <aside
      className={cn(
        "w-full h-screen shrink-0 lg:h-120 lg:w-xs  p-1 translate-x-200 lg:translate-0 lg:flex flex-col transition-transform transform-gpu duration-300 fixed lg:static top-0 left-0 bg-foreground lg:bg-dark-100/50 rounded-lg z-90 lg:z-0",
        {
          "translate-x-0": showProfileMenu,
        }
      )}
    >
      <LucideX
        size={32}
        onClick={toggleProfileMenu}
        className="place-self-end text-primary lg:hidden"
      />
      {user ? (
        <>
          <h3 className="text-primary text-xl lg:hidden font-bold">Menu</h3>

          <div className="flex items-center justify-center lg:justify-start  flex-col lg:flex-row gap-3">
            <div className="size-28 lg:size-10 flex-center overflow-hidden rounded-full bg-secondary relative">
              {user.imgUrl ? (
                <Image
                  src={user?.imgUrl}
                  alt={user?.fullname}
                  fill
                  className="object-cover"
                />
              ) : (
                <h3 className="text-5xl lg:text-lg font-bold text-primary">
                  {user.fullname[0]}
                </h3>
              )}
            </div>
            <h3 className="text-2xl lg:text-base font-bold">
              {user?.fullname}
            </h3>
          </div>

          <Link
            href={`/user/${user?.accountId}`}
            onClick={toggleProfileMenu}
            className={cn(
              "py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-secondary/30 transition-all",
              {
                "text-primary": isActive(`/user/${user?.accountId}`),
              }
            )}
          >
            <User2Icon size={16} /> Profile
          </Link>
          <Link
            href={`/orders/${user?.accountId}`}
            onClick={toggleProfileMenu}
            className={cn(
              "py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-secondary/30 transition-all",
              {
                "text-primary": isActive(`/orders/${user?.accountId}`),
              }
            )}
          >
            <ShoppingBasketIcon size={16} /> Orders
          </Link>
          <Link
            href={`/watchlist/${user?.accountId}`}
            onClick={toggleProfileMenu}
            className={cn(
              "py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-secondary/30 transition-all",
              {
                "text-primary": isActive(`/watchlist/${user?.accountId}`),
              }
            )}
          >
            <HeartIcon size={16} /> Watchlist
          </Link>
          <Link
            href={`/recover-password`}
            onClick={toggleProfileMenu}
            className="py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-secondary/30 transition-all"
          >
            <ShieldCloseIcon size={16} /> Password reset
          </Link>

          <Link
            href="tel:+2348135637156"
            onClick={toggleProfileMenu}
            className="text-base font-light flex items-center gap-3 py-2 px-4"
          >
            <HeadphonesIcon size={16} />
            Contact us
          </Link>

          <Link
            href="mailto:info@tmgprocurement.com"
            onClick={toggleProfileMenu}
            className="text-base font-light flex items-center gap-3 py-2 px-4"
          >
            <MailIcon size={16} /> Email us
          </Link>

          <SignOut />
        </>
      ) : (
        <div className="w-full flex-center gap-3">
          <Link
            href="/sign-in"
            className="px-3 py-2 rounded-lg text-foreground bg-primary"
          >
            Sign in
          </Link>

          <Link
            href="/sign-up"
            className="px-3 py-2 rounded-lg text-foreground bg-primary"
          >
            Sign up
          </Link>
        </div>
      )}
    </aside>
  );
};

export default SidebarLinks;
