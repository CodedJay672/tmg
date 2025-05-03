"use client";

import Image from "next/image";
import { Models } from "node-appwrite";
import CartActionButton from "./CartActionButton";
import { getLoggedInUser } from "@/lib/server/appwrite";
import WatchlistButton from "./WatchlistButton";
import { useEffect, useState } from "react";

const ProductCard = ({ item }: { item: Models.Document }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );

  useEffect(() => {
    const getUser = async () => {
      const res = await getLoggedInUser();

      if (!res) return;

      setUser(res);
    };

    getUser();
  }, []);

  return (
    <article className="w-full space-y-4 rounded-md shadow-md relative">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={400}
        height={64}
        className="object-cover rounded-md overflow-hidden"
      />
      <div className="py-2 px-3 space-y-2">
        <p className="text-lg font-medium truncate line-clamp-1 capitalize">
          {item.name}
        </p>
        <div className="flex-between">
          <span>
            {item.price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
          <CartActionButton item={item} />
        </div>
      </div>
      {user && (
        <div className="absolute top-1 right-1 flex-center bg-foreground rounded-full">
          <WatchlistButton userId={user?.$id} productId={item.$id} />
        </div>
      )}
    </article>
  );
};

export default ProductCard;