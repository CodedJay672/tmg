"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import Image from "next/image";
import { Models } from "node-appwrite";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useStore } from "@/store/appStore";

const TransactionCard = ({ info }: { info: Models.Document }) => {
  const { priceByLocation: totalCost, setPriceByLocation } = useStore();
  const orderDate = formatDate(info.$createdAt);
  const totalAmt = formatCurrency(info.total);

  // ensure component is rendered
  useEffect(() => {
    setPriceByLocation(
      info.delivery_location.charge,
      info.order.products?.[0].price
    );
  }, []);

  return (
    <article className="w-full p-4 border border-dark-200 rounded-xl">
      <div className="space-y-0.5">
        <p
          className={`w-max text-xs text-foreground rounded-lg uppercase text-center p-1 lg:px-3 ${
            info.status === "COMPLETED"
              ? "bg-primary"
              : info.status === "PROCESSING"
              ? "bg-amber-400"
              : "bg-red-500"
          }`}
        >
          {info.status}
        </p>

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
      <div className="w-full flex-between flex-col md:flex-row gap-10 p-3">
        <div className="w-full flex items-center gap-3">
          <div className="w-full lg:w-32 h-28 relative">
            <Image
              src={info.order.products?.[0].imgUrl ?? null}
              alt={info.order.products?.[0].name}
              fill
            />
          </div>
          <div>
            <p className="text-base font-bold">
              {info.order.products?.[0].name}
            </p>
            <p className="text-sm font-medium text-dark-300">
              {formatCurrency(totalCost)} X {info.order.qty[0]}
            </p>
            {info.order.products.length > 1 && (
              <p className="text-xs font-medium text-dark-200 mt-3">
                And {info.order.products.length - 1} More...
              </p>
            )}
          </div>
        </div>
        <Button
          type="button"
          variant="link"
          asChild
          className="text-primary font-bold bg-foreground border-primary border"
        >
          <Link href={`/orders/details/${info.order.$id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  );
};

export default TransactionCard;
