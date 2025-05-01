"use client";

import { HeartIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import React from "react";
import ProductQuantity from "./ProductQuantity";
import { useStore } from "@/store/appStore";
import { cn } from "@/lib/utils";

const CartCard = ({ id, name, price, category, imgUrl, qty }: TCart) => {
  const { clearCart } = useStore();

  return (
    <article className="w-full space-y-1">
      <div className="flex items-center gap-2">
        <Image
          src={imgUrl}
          alt={name}
          width={64}
          height={64}
          className="rounded-lg overflow-hidden"
        />
        <div className="">
          <p className="text-sm lg:text-base font-normal text-light-200">
            {name}
          </p>
          <p className="text-base lg:text-lg font-medium">
            {price.toLocaleString("en-Ng", {
              style: "currency",
              currency: "NGN",
            })}
          </p>
        </div>
      </div>
      <div className="w-full mt-3 flex-between">
        <div className="flex items-center gap-10 lg:gap-4">
          <div
            onClick={() => clearCart(id)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Trash2Icon size={12} className="text-dark-300" />
            <span className="text-sm text-dark-300">Delete</span>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <HeartIcon size={12} className="text-dark-300" />
            <span className="text-sm text-dark-300">Add to wishlist</span>
          </div>
        </div>
        <div className="flex items-center">
          <ProductQuantity
            item={{
              id,
              name,
              price,
              category,
              imgUrl,
              qty,
            }}
          />
        </div>
      </div>
    </article>
  );
};

export default CartCard;
