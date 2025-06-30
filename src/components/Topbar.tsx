import React from "react";
import MyOrders from "./shared/MyOrders";
import MyWatchlist from "./shared/MyWatchlist";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";
import Image from "next/image";
import GlobalSearch from "./shared/GlobalSearch";
import LocationDropdown from "./LocationDropdown";
import UserInfo from "./shared/UserInfo";

const Topbar = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/sign-up");
  }

  return (
    <header className="w-full px-4 lg:px-16 bg-dark-100 flex justify-between items-center  sticky top-0 left-0 z-50">
      <div className="flex items-center gap-4">
        <Link href="/" className="rounded-full">
          <Image
            src="/assets/logo.png"
            alt="tmg procurement"
            width={100}
            height={32}
            className="rounded-full"
          />
        </Link>
        <div className="w-80 hidden rounded-full p-1 lg:p-2 lg:flex items-center gap-2 relative">
          <LocationDropdown user={user} />
        </div>
      </div>

      <div className="hidden w-full max-w-3xl lg:flex justify-between items-center gap-2">
        <GlobalSearch />
        <MyOrders userId={user?.$id} />
        {/* <MyWatchlist userId={user?.$id} /> */}

        {user ? (
          <UserInfo user={user} />
        ) : (
          <Link
            href="/sign-up"
            className="bg-primary text-foreground py-2 px-4 rounded-lg"
          >
            Sign in
          </Link>
        )}
      </div>

      <div className="w-48 lg:hidden bg-secondary rounded-full px-3 flex items-center gap-2 relative">
        <LocationDropdown user={user} />
      </div>
    </header>
  );
};

export default Topbar;
