"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useStore } from "@/store/appStore";

const ProductQuantity = ({ item }: { item: TCart }) => {
  const { changeQty } = useStore();

  return (
    <>
      <Button
        disabled={item.qty === 1}
        onClick={() => changeQty("decrease", item)}
        className="size-6"
      >
        <ChevronLeftIcon size={16} className="text-foreground" />
      </Button>
      <span className="px-2 flex-center">{item.qty}</span>
      <Button onClick={() => changeQty("increase", item)} className="size-6">
        <ChevronRightIcon size={16} className="text-foreground" />
      </Button>
    </>
  );
};

export default ProductQuantity;
