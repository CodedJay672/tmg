import React from "react";
import MyOrders from "./shared/MyOrders";
import MyWatchlist from "./shared/MyWatchlist";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import DropdownSwitch from "./shared/DropdownSwitch";
import ProfileDropdown from "./ProfileDropdown";
import Image from "next/image";
import GlobalSearch from "./shared/GlobalSearch";
import LocationDropdown from "./LocationDropdown";
import UserDropdownInfo from "./UserDropdownInfo";

const Topbar = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/sign-up");
  }

  return (
    <header className="w-full px-4 lg:px-16 bg-dark-100 flex justify-between items-center  sticky top-0 left-0 z-50">
      <Link href="/" className="rounded-full">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={100}
          height={32}
          className="rounded-full"
        />
      </Link>

      <div className="hidden w-xl lg:flex justify-between items-center gap-2">
        <GlobalSearch />
        <MyOrders userId={user?.$id} />
        <MyWatchlist />

        {user ? (
          <div className="w-83 bg-secondary flex-center p-1 rounded-full pr-3 relative">
            <div className="size-7 bg-primary rounded-full flex-center">
              <h2 className="text-sm uppercase font-medium">{user?.name[0]}</h2>
            </div>
            <span className="text-sm ml-1">{user?.name}</span>
            <DropdownSwitch />
            <ProfileDropdown>
              <UserDropdownInfo user={user} />
            </ProfileDropdown>
          </div>
        ) : (
          <Link
            href="/sign-up"
            className="bg-primary text-foreground py-2 px-4 rounded-lg"
          >
            Sign in
          </Link>
        )}
      </div>

      <div className="w-48 lg:hidden bg-secondary rounded-full p-1 flex items-center gap-2 relative">
        <LocationDropdown user={user} />
      </div>
    </header>
  );
};

export default Topbar;
