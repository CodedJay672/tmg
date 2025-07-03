"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";
import CustomSheet from "./CustomSheet";
import { Models } from "node-appwrite";

const MyWatchlist = async ({
  watchlistProducts,
}: {
  watchlistProducts: Models.Document[];
}) => {
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
      </CustomSheet>
    </>
  );
};

export default MyWatchlist;
