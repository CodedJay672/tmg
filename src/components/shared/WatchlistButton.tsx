"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  useGetUserById,
  useUpdateUserInfo,
} from "@/lib/queries/userQueried/users";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { Models } from "node-appwrite";
import { toast } from "sonner";

const WatchlistButton = ({
  userId,
  productId,
  label,
}: {
  userId: string | undefined;
  productId: string;
  label?: string;
}) => {
  const { data: userInfo } = useGetUserById(userId);
  const { mutateAsync: updateWatchlist, isPending: loading } =
    useUpdateUserInfo();

  const isAdded = () => {
    return userInfo?.data?.documents?.[0].watchlist.find(
      (item: Models.Document) => item.$id === productId
    );
  };

  const handleClick = async () => {
    try {
      const response = await updateWatchlist({
        id: userInfo?.data?.documents?.[0].$id!,
        data: {},
        productId,
      });

      if (!response.status) return toast.error(response.message);

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-full p-1 flex-center rounded-full overflow-hidden gap-1"
    >
      {loading ? (
        <Loader2Icon size={16} className="text-primary animate-spin" />
      ) : (
        <>
          <HeartIcon
            size={16}
            className={cn("stroke-dark-300 cursor-pointer", {
              "fill-primary": isAdded(),
            })}
          />
          {label && <span className="text-sm text-dark-300">{label}</span>}
        </>
      )}
    </div>
  );
};

export default WatchlistButton;
