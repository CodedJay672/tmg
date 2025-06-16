import ProfileMenuSwitch from "@/components/shared/ProfileMenuSwitch";
import Segments from "@/components/shared/Segments";
import WatchlistContent from "@/components/WatchlistContent";
import { getUserWatchlist } from "@/lib/actions/products.actions";
import { getUser } from "@/lib/actions/user.actions";
import React from "react";

const Watchlist = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser(id);

  const watchlistItems = await getUserWatchlist(user?.data?.documents?.[0].$id);

  return (
    <section className="w-full">
      <div className="w-full py-3 lg:py-10 hidden lg:flex items-center gap-1">
        <Segments title="Watchlist" />
      </div>
      <div className="w-full lg:py-3 py-2 flex justify-between items-center lg:justify-start mb-4">
        <div className="">
          <h2 className="text-lg font-bold">Watchlist</h2>
          <p className="hidden lg:block text-base text-dark-300">
            Manage your watchlist.
          </p>
        </div>
        <ProfileMenuSwitch />
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 no-scrollbar">
        <WatchlistContent
          user={user?.data?.documents?.[0]}
          item={watchlistItems}
        />
      </div>
    </section>
  );
};

export default Watchlist;
