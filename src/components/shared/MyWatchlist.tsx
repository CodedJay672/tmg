"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import { useGetUserWatchlist } from "@/lib/queries/productQueries/products";
import { useGetUserById } from "@/lib/queries/userQueried/users";
import CustomSheet from "./CustomSheet";
import WatchlistContent from "../WatchlistContent";

const MyWatchlist = ({ userId }: { userId: string }) => {
  const { data: userInfo } = useGetUserById(userId);
  const { data: myWatchlist, isPending: loading } = useGetUserWatchlist(
    userInfo?.data?.documents?.[0].$id
  );
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        title="Watchlist"
        size="icon"
        onClick={() => setOpen((prev) => !prev)}
        className="small-icons border border-secondary"
      >
        <HeartIcon />
      </Button>
      <CustomSheet open={open} onOpenChange={setOpen}>
        <div className="w-full mb-3">
          <h2 className="text-2xl font-semibold">Watchlist</h2>
          <p className="text-dark-300">
            Never lose track of your favorite products
          </p>
        </div>
        <div className="w-full grid grid-cols-2 gap-2 no-scrollbar">
          <WatchlistContent
            user={userInfo?.data?.documents?.[0]}
            item={myWatchlist}
          />
        </div>
      </CustomSheet>
    </>
  );
};

export default MyWatchlist;
