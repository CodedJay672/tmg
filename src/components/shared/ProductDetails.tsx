import Image from "next/image";
import { Models } from "node-appwrite";
import React from "react";
import ProductActionButton from "./ProductActionButton";

const ProductDetails = ({ data }: { data: Models.Document }) => {
  return (
    <article className="w-full p-2 lg:p-3 flex-between gap-2">
      <Image src={data.imgUrl} alt={data.name} width={140} height={110} />

      <div className="space-y-1 flex-1">
        <h1 className="text-base lg:text-lg font-bold capitalize">
          {data.name}
        </h1>
        <p className="text-dark-300 font-medium">
          {data.price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
      </div>
      <ProductActionButton productId={data.$id} />
    </article>
  );
};

export default ProductDetails;
