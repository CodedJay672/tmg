"use client";

import React from "react";
import CustomTable from "../CustomTable";
import { orderTable } from "../columns";
import { useGetTransactions } from "@/lib/queries/cartQueries/cart";
import { Loader2Icon } from "lucide-react";
import { useStore } from "@/store/appStore";

const OrdersTable = ({ query }: { query: string }) => {
  const { category } = useStore();
  const { data: orders, isPending: loading } = useGetTransactions(
    query ?? category === "all" ? "" : category
  );

  return (
    <>
      {loading ? (
        <Loader2Icon
          size={24}
          className="text-primary animate-spin mx-auto mt-10"
        />
      ) : (
        <>
          {query && (
            <p className="text-base font-medium mt-10">
              Search result for: <span className="text-primary">{query}</span>
            </p>
          )}
          <CustomTable
            columns={orderTable}
            data={
              orders?.data?.documents.sort(
                (a, b) =>
                  new Date(b.$createdAt).getTime() -
                  new Date(a.$createdAt).getTime()
              ) ?? []
            }
          />
        </>
      )}
    </>
  );
};

export default OrdersTable;
