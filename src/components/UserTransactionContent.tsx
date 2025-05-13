"use client";

import { useGetUserById } from "@/lib/queries/userQueried/users";
import React, { useMemo } from "react";
import TransactionCard from "./shared/TransactionCard";
import { useStore } from "@/store/appStore";
import { Models } from "node-appwrite";

const UserTransactionContent = ({ userId }: { userId: string }) => {
  const { category } = useStore();
  const userInfo = useGetUserById(userId);

  const filteredData: Models.Document[] = useMemo(
    () =>
      userInfo.data?.data?.documents?.[0].transactions.filter(
        (item: Models.Document) => {
          if (category === "all") return true;

          return item.status === category.toUpperCase();
        }
      ),
    [category]
  );

  return (
    <div className="w-full flex-center flex-col gap-6 mt-10">
      {filteredData?.length > 0 ? (
        filteredData?.map((item: Models.Document) => (
          <TransactionCard key={item.$id} info={item} />
        ))
      ) : (
        <span className="text-sm text-dark-200">No transactions</span>
      )}
    </div>
  );
};

export default UserTransactionContent;
