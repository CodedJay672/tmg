"use client";

import { useStore } from "@/store/appStore";
import { Models } from "node-appwrite";
import React from "react";
import { Button } from "../ui/button";
import ProductQuantity from "./ProductQuantity";

const CartActionButton = ({ item }: { item: Models.Document }) => {
  const { cart, addToCart } = useStore();

  const isAdded = cart.find((entry) => entry.id === item.$id);

  return (
    <React.Fragment>
      {isAdded ? (
        <div className="flex-center">
          <ProductQuantity item={isAdded} />
        </div>
      ) : (
        <Button
          onClick={() =>
            addToCart({
              id: item.$id,
              name: item.name,
              category: item.category,
              price: item.price,
              imgUrl: item.imgUrl,
            })
          }
          className="w-16 h-8 text-foreground text-xs lg:text-sm"
        >
          Add
        </Button>
      )}
    </React.Fragment>
  );
};

export default CartActionButton;
