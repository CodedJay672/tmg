import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import React from "react";

const Watchlist = () => {
  return (
    <section className="content-wrapper w-full">
      <div className="w-full py-3 lg:py-10 px-6 hidden lg:flex items-center gap-1">
        <Segments title="Orders" />
      </div>
      <div className="w-full lg:py-3 py-2 px-4 flex justify-between items-center lg:justify-start">
        <div className="">
          <h2 className="text-lg font-bold">Watchlist</h2>
          <p className="hidden lg:block text-base text-dark-300">
            Manage your watchlist.
          </p>
        </div>
        <ProfileMenuSwitch />
      </div>
    </section>
  );
};

export default Watchlist;
