"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useGetUserById } from "@/lib/queries/userQueried/users";
import { HeartIcon, Loader2Icon } from "lucide-react";
import { Models } from "node-appwrite";
import { toast } from "sonner";
import { TUserDetails } from "@/constants/validations/schema";
import { updateUserInfo } from "@/lib/actions/user.actions";

const WatchlistButton = ({
  userId,
  productId,
  label,
}: {
  userId: string;
  productId: string;
  label?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const { data: userInfo } = useGetUserById(userId);

  const isAdded = () => {
    return userInfo?.data?.documents?.[0].watchlist.find(
      (item: Models.Document) => item.$id === productId
    );
  };

  const updateWatchlist = async ({
    id,
    data,
    productId,
  }: {
    id: string;
    data: TUserDetails;
    productId: string;
  }) => {
    try {
      setLoading(true);
      const response = await updateUserInfo({ data, productId }, undefined, id);

      if (!response.status) return toast.error(response.message);

      return toast.success(response.message);
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={() =>
        updateWatchlist({
          id: userInfo?.data?.documents?.[0].$id || "",
          data: {},
          productId,
        })
      }
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
