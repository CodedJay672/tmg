"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useUpdateWatchlist } from "@/lib/queries/productQueries/products";
import { AppwriteException } from "node-appwrite";

const WatchlistButton = ({
  userId,
  productId,
  isLiked,
  label,
}: {
  userId: string | undefined;
  productId: string;
  isLiked?: boolean;
  label?: string;
}) => {
  const { mutateAsync: updateWatchlist, isPending: updating } =
    useUpdateWatchlist();

  const handleClick = async () => {
    try {
      const response = await updateWatchlist({
        productId,
        userId,
      });

      if (!response) return toast.error("Failed");

      toast.success("Success!");
    } catch (error) {
      if (error instanceof AppwriteException) toast.error(error.message);
      throw error;
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full p-1 flex-center rounded-full overflow-hidden gap-1 cursor-pointer"
    >
      {updating ? (
        <Loader2Icon size={16} className="text-primary animate-spin" />
      ) : (
        <>
          <HeartIcon
            size={16}
            className={cn("stroke-dark-300", {
              "fill-primary": isLiked,
            })}
          />
          {label && <span className="text-sm text-dark-300">{label}</span>}
        </>
      )}
    </div>
  );
};

export default WatchlistButton;
