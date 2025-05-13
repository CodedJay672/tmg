"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store/appStore";
import OrderInfo from "./OrderInfo";
import CustomSheet from "./CustomSheet";
import { useGetCartById } from "@/lib/queries/cartQueries/cart";
import { Loader2Icon } from "lucide-react";

const TransactionCard = ({ info }: { info: Models.Document }) => {
  const { togglePopover } = useStore();
  const [orderId, setOrderId] = useState<string>("");
  const { data: orderDetails, isPending: loading } = useGetCartById(
    info.order.$id
  );
  const [client, setClient] = useState(false);

  const orderDate = formatDate(info.$createdAt);
  const totalAmt = formatCurrency(info.total);

  // ensure component is rendered
  useEffect(() => {
    if (!client) return;

    setClient(true);
  }, []);

  const handleClick = useCallback(
    (id: string) => {
      setOrderId(id);
      togglePopover();
    },
    [orderId]
  );

  return (
    <article className="w-full p-4 border border-dark-200 rounded-xl">
      <div className="space-y-1">
        <div className="flex-between">
          <p
            className={`text-xs text-foreground rounded-lg uppercase text-center py-1 px-3 ${
              info.status === "COMPLETED"
                ? "bg-primary"
                : info.status === "PROCESSING"
                ? "bg-amber-400"
                : "bg-red-500"
            }`}
          >
            {info.status}
          </p>
        </div>
        <div className="flex-between p-3 border-b border-dark-100 gap-7">
          <p className="text-sm text-dark-300">
            {orderDate as string} | Order ID: {info.$id}
          </p>
          <p className="text-sm font-medium text-dark-300">
            Total:{" "}
            <span className="text-lg lg:text-xl font-semibold">{totalAmt}</span>
          </p>
        </div>
      </div>
      <div className="w-full flex-between flex-col lg:flex-row gap-10 p-3">
        <div className="w-full flex items-center gap-3">
          <div className="w-50 h-32 flex-center relative">
            {loading ? (
              <Loader2Icon size={24} className="animate-spin text-primary" />
            ) : (
              <Image
                src={
                  orderDetails?.data?.documents?.[0].product?.[0].imgUrl ?? null
                }
                alt={orderDetails?.data?.documents?.[0].product?.[0].name}
                width={200}
                height={128}
              />
            )}
          </div>
          <div>
            <p className="text-base font-bold">
              {orderDetails?.data?.documents?.[0].product?.[0].name}
            </p>
            <p className="text-sm font-medium text-dark-300">
              {formatCurrency(
                orderDetails?.data?.documents?.[0].product?.[0].price
              )}{" "}
              X {info.order.qty[0]}
            </p>
          </div>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleClick(info.order.$id)}
          className="text-primary font-bold bg-foreground border-primary"
        >
          View Details
        </Button>
        <CustomSheet>
          <OrderInfo orderId={orderId} />
        </CustomSheet>
      </div>
    </article>
  );
};

export default TransactionCard;
