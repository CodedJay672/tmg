"use client";

import React from "react";
import { Button } from "../ui/button";
import { updateTransactionStatus } from "@/lib/actions/cart.actions";

const OrderActionButton = ({
  data,
}: {
  data: {
    id: string;
    status: "CANCELLED" | "PROCESSING" | "COMPLETED";
    label: string;
  };
}) => {
  const handleClick = async () => {
    try {
      const res = await updateTransactionStatus({
        id: data.id,
        status: data.status,
      });

      if (!res.status) return false;

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      variant="destructive"
      onClick={handleClick}
      className="py-1 px-2 bg-red-500 flex-center cursor-pointer"
    >
      <span className="text-foreground text-sm capitalize">{data.label}</span>
    </Button>
  );
};

export default OrderActionButton;
