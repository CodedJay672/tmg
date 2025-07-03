import Image from "next/image";
import { Models } from "node-appwrite";
import React from "react";

const ProductMiniCard = ({ order }: { order: Models.Document }) => {
  return (
    <article className="w-full flex gap-2">
      <div className="w-10 h-10 relative">
        <Image
          src={order.imgUrl}
          alt={order.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="w-14 space-y-0.5 overflow-hidden">
        <h3 className="text-sm font-medium truncate ">{order.name}</h3>
        <p className="text-xs text-pretty">{order.category}</p>
        {order.length && (
          <p className="text-xs textgray-400">{order.length} more</p>
        )}
      </div>
    </article>
  );
};

export default ProductMiniCard;
