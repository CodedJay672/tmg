"use client";

import React from "react";
import { Button } from "../ui/button";
import { HeartIcon } from "lucide-react";

const MyWatchlist = () => {
  return (
    <Button
      variant="ghost"
      title="Watchlist"
      size="icon"
      className="small-icons"
    >
      <HeartIcon />
    </Button>
  );
};

export default MyWatchlist;
