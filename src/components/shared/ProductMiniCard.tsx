import Image from "next/image";
import { Models } from "node-appwrite";
import React from "react";

const ProductMiniCard = ({ order }: { order: Models.Document }) => {
  return (
    <article className="w-full flex gap-2">
      <Image
        src={order.imgUrl}
        alt={order.name}
        width={60}
        height={40}
        className="object-contain"
      />

      <div className="-full space-y-0.5 overflow-hidden">
        <h3 className="text-base font-bold truncate">{order.name}</h3>
        <p className="text-sm text-pretty">{order.category}</p>
        {order.length && (
          <p className="text-xs textgray-400">{order.length} more</p>
        )}
      </div>
    </article>
  );
};

export default ProductMiniCard;
