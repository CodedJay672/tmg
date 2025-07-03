"use client";

import React, { useMemo } from "react";
import CustomTable from "../CustomTable";
import { orderTable } from "../columns";
import { useStore } from "@/store/appStore";
import { Models } from "node-appwrite";

const OrdersTable = ({ orders }: { orders: Models.Document[] | undefined }) => {
  const { category } = useStore();

  if (!orders) return null;

  const data = useMemo(() => {
    const result = orders.filter(
      (order) => order?.status === category.toUpperCase()
    );

    return category === "all" ? orders : result;
  }, [category]);

  return (
    <div className="w-full overflow-hidden">
      <CustomTable
        columns={orderTable}
        data={
          data?.sort(
            (a: Models.Document, b: Models.Document) =>
              new Date(b.$createdAt).getTime() -
              new Date(a.$createdAt).getTime()
          ) ?? []
        }
      />
    </div>
  );
};

export default OrdersTable;
