"use client";

import { useGetCartById } from "@/lib/queries/cartQueries/cart";
import React from "react";

const OrderInfo = ({ orderId }: { orderId: string }) => {
  const { data: orderDetails, isPending: loading } = useGetCartById(orderId);

  console.log(orderDetails?.data?.documents);

  return (
    <article className="w-full">
      <h2 className="text-3xl font-medium">Order: #{orderId}</h2>
    </article>
  );
};

export default OrderInfo;
