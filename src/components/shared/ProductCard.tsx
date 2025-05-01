import Image from "next/image";
import React from "react";
import { Models } from "node-appwrite";
import CartActionButton from "./CartActionButton";

const ProductCard = ({ item }: { item: Models.Document }) => {
  return (
    <article className="w-full space-y-4 rounded-md shadow-md">
      <Image
        src={item.imgUrl}
        alt={item.name}
        width={400}
        height={64}
        className="object-cover"
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
    </article>
  );
};

export default ProductCard;
