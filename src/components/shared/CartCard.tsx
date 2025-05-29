"use client";

import { Loader2Icon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import ProductQuantity from "./ProductQuantity";
import { useStore } from "@/store/appStore";
import WatchlistButton from "./WatchlistButton";
import { Models } from "node-appwrite";

interface TCartProps {
  data: TCart;
  user?: Models.Document;
}

const CartCard = ({ data, user }: TCartProps) => {
  const { clearCart } = useStore();

  if (!user) {
    return <Loader2Icon size={24} className="text-primary animate-spin" />;
  }
  console.log(data);
  return (
    <article className="w-full space-y-1">
      <div className="flex items-center gap-2">
        <Image
          src={data.imgUrl}
          alt={data.name}
          width={64}
          height={64}
          className="rounded-lg overflow-hidden"
        />
        <div className="">
          <p className="text-sm lg:text-base font-normal text-light-200">
            {data?.name}
          </p>
          <p className="text-base lg:text-lg font-medium">
            {data?.price &&
              data?.price?.toLocaleString("en-Ng", {
                style: "currency",
                currency: "NGN",
              })}
          </p>
        </div>
      </div>
      <div className="w-full mt-3 flex-between">
        <div className="flex items-center gap-10 lg:gap-4">
          <div
            onClick={() => clearCart(data?.id)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Trash2Icon size={12} className="text-dark-300" />
            <span className="text-sm text-dark-300">Delete</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <WatchlistButton
              userId={user?.accountId || ""}
              productId={data?.id}
              label="Add to watchlist"
            />
          </div>
        </div>
        <div className="flex items-center">
          <ProductQuantity item={data} />
        </div>
      </div>
    </article>
  );
};

export default CartCard;
