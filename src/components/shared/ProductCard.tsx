"use client";

import Image from "next/image";
import { Models } from "node-appwrite";
import CartActionButton from "./CartActionButton";
import WatchlistButton from "./WatchlistButton";
import { useGetUserById } from "@/lib/queries/userQueried/users";
import { useGetAllLocations } from "@/lib/queries/locationQueries/location";
import { calculateInterest } from "@/lib/utils";

interface ProductCardProps {
  item: Models.Document;
  userId: string | undefined;
}

const ProductCard = ({ item, userId }: ProductCardProps) => {
  const { data: currentUser } = useGetUserById(userId);
  const { data: userLocationInfo } = useGetAllLocations(
    currentUser?.data?.documents?.[0].delivery_location
  );

  const percentIncrease = calculateInterest(
    userLocationInfo?.data?.documents?.[0].charge,
    item.price
  );

  const price = item.price + percentIncrease;

  return (
    <article className="w-full space-y-4 rounded-md shadow-md relative">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={400}
        height={64}
        className="object-cover rounded-md overflow-hidden"
      />
      <div className="p-2 lg:py-2 lg:px-3 space-y-2">
        <p className="text-lg font-semibold truncate line-clamp-1 capitalize">
          {item.name}
        </p>
        <div className="flex-between">
          <span className="text-sm lg:text-base font-medium">
            {price
              ? price.toLocaleString("en-NG", {
                  style: "currency",
                  currency: "NGN",
                })
              : "Location required"}
          </span>
          {currentUser?.data?.documents?.[0].delivery_location && (
            <CartActionButton item={{ ...item, price: price }} />
          )}
        </div>
      </div>

      <div className="absolute top-1 right-1 flex-center bg-foreground rounded-full">
        <WatchlistButton userId={userId} productId={item.$id} />
      </div>
    </article>
  );
};

export default ProductCard;
