import React from "react";
import SearchBar from "./SearchBar";
import { redirect } from "next/navigation";
import MyOrders from "./shared/MyOrders";
import MyWatchlist from "./shared/MyWatchlist";
import Link from "next/link";

const Topbar = () => {
  return (
    <header className="w-full px-6 lg:px-10 py-4 bg-primary lg:bg-dark-100 flex justify-between items-center  sticky top-0 left-0">
      <h1 className="text-3xl font-bold text-foreground lg:text-background">
        Logo<span className="align-super text-[8px] -ml-0.5">TM</span>
      </h1>

      <div className="hidden lg:flex justify-between items-center gap-2">
        <SearchBar placeholder="Search over 300+ products..." />
        <MyOrders />
        <MyWatchlist />
        <Link
          href="/sign-in"
          className="bg-primary text-foreground py-2 px-4 rounded-lg"
        >
          Sign in
        </Link>
      </div>

      <div className="w-max lg:hidden">
        <p className="text-foreground text-sm">Location</p>
      </div>
    </header>
  );
};

export default Topbar;
