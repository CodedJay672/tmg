import Image from "next/image";
import React from "react";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({
  imgUrl,
  name,
  price,
}: {
  imgUrl: string;
  name: string;
  price: number;
}) => {
  return (
    <article className="w-full space-y-4 rounded-md shadow-md">
      <Image
        src={imgUrl}
        alt={name}
        width={400}
        height={64}
        className="object-cover"
      />
      <div className="py-2 px-3">
        <p className="text-lg font-medium truncate line-clamp-1 capitalize">
          {name}
        </p>
        <div className="flex-between">
          <span>
            {price.toLocaleString("en-NG", {
              style: "currency",
              currency: "NGN",
            })}
          </span>
          <AddToCartButton />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
