import React from "react";
import SearchBar from "./SearchBar";
import MyOrders from "./shared/MyOrders";
import MyWatchlist from "./shared/MyWatchlist";
import Link from "next/link";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

const Topbar = async () => {
  const user = await getLoggedInUser();

  if (!user) {
    redirect("/sign-up");
  }

  return (
    <header className="w-full px-6 lg:px-10 py-4 bg-primary lg:bg-dark-100 flex justify-between items-center  sticky top-0 left-0 z-50">
      <Link
        href="/"
        className="text-3xl font-bold text-foreground lg:text-background"
      >
        Logo<span className="align-super text-[8px] -ml-0.5">TM</span>
      </Link>

      <div className="hidden lg:flex justify-between items-center gap-2">
        <SearchBar placeholder="Search over 300+ products..." />
        <MyOrders />
        <MyWatchlist />

        {user ? (
          <div className="bg-secondary">
            <div className="bg-primary rounded-full flex-center">
              <h2 className="uppercase font-medium">{user?.name[0]}</h2>
            </div>
            <span>{user?.name}</span>
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

      <div className="w-max lg:hidden">
        <p className="text-foreground text-sm">Location</p>
      </div>
    </header>
  );
};

export default Topbar;
