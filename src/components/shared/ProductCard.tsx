"use client";

import Image from "next/image";
import { Models } from "node-appwrite";
import CartActionButton from "./CartActionButton";
import WatchlistButton from "./WatchlistButton";
import { useGetAllLocations } from "@/lib/queries/locationQueries/location";
import { Loader2Icon } from "lucide-react";
import { calculateInterest } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";

interface ProductCardProps {
  item: Models.Document;
  user: Models.Document | undefined;
}

const ProductCard = ({ item, user }: ProductCardProps) => {
  const { data: location, isPending: loading } = useGetAllLocations(
    user?.delivery_location
  );
  const interest = calculateInterest(
    location?.data?.documents?.[0].charge,
    item.price
  );

  const total = item.price + interest;

  return (
    <article className="w-full space-y-4 border border-gray-200 rounded-md shadow-md relative">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={400}
        height={64}
        className="object-cover rounded-md overflow-hidden"
      />
      <div className="p-2 lg:py-2 lg:px-3 space-y-2">
        <p className="text-lg lg:text-xl font-semibold truncate line-clamp-1 capitalize">
          {item.name}
        </p>

        <span className="text-base font-medium">
          {loading ? (
            <Loader2Icon size={20} className="text-primary animate-spin" />
          ) : location?.data?.total === 1 ? (
            total.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })
          ) : (
            "Location required"
          )}
        </span>
        <div className="w-full space-y-1.5 lg:space-y-0 lg:grid grid-cols-2 gap-2 mt-3">
          {user?.delivery_location && (
            <>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-600">
                <Link href={`/details/${item.$id}`} className="text-white">
                  Details
                </Link>
              </Button>
              <CartActionButton item={{ ...item, price: total }} />
            </>
          )}
        </div>
      </div>

      <div className="absolute top-1 right-1 flex-center bg-foreground rounded-full">
        <WatchlistButton userId={user?.$id} productId={item.$id} />
      </div>
    </article>
  );
};

export default ProductCard;
