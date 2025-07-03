import Image from "next/image";
import React from "react";
import ProductActionButton from "./ProductActionButton";

const ProductDetails = ({ data }: { data: ProductDataType }) => {
  if (!data) return null;

  return (
    <article className="w-full lg:p-3 flex-between gap-2">
      <div className="w-16 lg:w-24 h-18 lg:h-20 relative">
        <Image src={data.imgUrl} alt={data.name} fill />
      </div>

      <div className="flex-1">
        <h1 className="text-lg lg:text-xl font-semibold capitalize leading-7.5">
          {data.name}
        </h1>
        <p className="text-dark-300 font-medium leading-4.5">
          {data.price.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
          })}
        </p>
        <p className="text-base font-semibold leading-4.5">
          Category: <span className="font-normal">{data.category}</span>
        </p>
      </div>
      <ProductActionButton
        datasheetId={data.datasheetId}
        fileId={data.imgId}
        productId={data.$id!}
      />
    </article>
  );
};

export default ProductDetails;
