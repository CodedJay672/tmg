"use client";

import { useGetUserById } from "@/lib/queries/userQueried/users";
import React, { useMemo } from "react";
import TransactionCard from "./shared/TransactionCard";
import { useStore } from "@/store/appStore";
import { Models } from "node-appwrite";
import { Loader2Icon } from "lucide-react";

const UserTransactionContent = ({ userId }: { userId: string }) => {
  const { category } = useStore();
  const { data: userInfo, isPending: loading } = useGetUserById(userId);

  const query = category === "all" ? "" : category;

  const filteredData: Models.Document[] = useMemo(
    () =>
      userInfo?.data?.documents?.[0].transactions
        .filter((item: Models.Document) =>
          item.status.includes(query.toUpperCase())
        )
        .sort(
          (a: Models.Document, b: Models.Document) =>
            new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        ),
    [category]
  );

  if (loading)
    <Loader2Icon
      size={24}
      className="text-primary animate-spin mx-auto mt-10"
    />;

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
