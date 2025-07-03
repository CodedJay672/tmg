import Image from "next/image";
import { Models } from "node-appwrite";
import CartActionButton from "./CartActionButton";
import WatchlistButton from "./WatchlistButton";
import { calculateInterest } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { getAllLocations } from "@/lib/data/locations/locations.data";

interface ProductCardProps {
  item: Models.Document;
  user: Models.Document | undefined;
}

const ProductCard = async ({ item, user }: ProductCardProps) => {
  const location = await getAllLocations(user?.delivery_location);

  //calculate the interest based on the location
  const interest = calculateInterest(
    location?.data?.documents?.[0].charge,
    item.price
  );

  const total = item.price + interest;

  return (
    <article className="w-full space-y-4 border border-gray-200 rounded-md shadow-md relative">
      <div className="w-full h-40 relative">
        <Image
          src={item.imgUrl}
          alt={item.name}
          fill
          className="object-cover rounded-md overflow-hidden"
        />
      </div>
      <div className="p-2 lg:py-2 lg:px-3 space-y-2">
        <p className="text-lg lg:text-xl font-semibold truncate line-clamp-1 capitalize">
          {item.name}
        </p>

        <span className="text-base font-medium">
          {location?.data?.total === 1 ? (
            total.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })
          ) : (
            <span className="text-xs font-light">Location is required</span>
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
        <WatchlistButton
          userId={user?.$id}
          productId={item.$id}
          isLiked={item.isLiked}
        />
      </div>
    </article>
  );
};

export default ProductCard;
