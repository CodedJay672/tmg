"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import {
  useGetLikedProducts,
  useUpdateWatchlist,
} from "@/lib/queries/productQueries/products";

const WatchlistButton = ({
  userId,
  productId,
  label,
}: {
  userId: string | undefined;
  productId: string;
  label?: string;
}) => {
  const { data: isLiked } = useGetLikedProducts(productId, userId);
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
      toast.error("Something went wrong");
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
