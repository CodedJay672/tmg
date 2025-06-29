"use client";

import { useGetProductsInfinite } from "@/lib/queries/productQueries/products";
import { useStore } from "@/store/appStore";
import { Loader2Icon } from "lucide-react";
import React from "react";
import ProductCard from "./shared/ProductCard";
import { Models } from "node-appwrite";
import { Button } from "./ui/button";

const InfiniteProducts = ({ user }: { user: Models.Document | undefined }) => {
  const { category } = useStore();

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
  } = useGetProductsInfinite(category === "all" ? "" : category);

  return isLoading ? (
    <Loader2Icon size={24} className="text-primary animate-spin mx-auto" />
  ) : status === "error" ? (
    <p className="text-sm text-red-300">Error: {error.message}</p>
  ) : (
    <>
      <div className="grid grid-cols-2 gap-2">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.data?.map((product) => (
              <React.Fragment key={product.$id}>{product.$id}</React.Fragment>
              // <ProductCard
              //   key={project.$id}
              //   item={project}
              //   user={user?.data?.documents?.[0]}
              // />
            ))}
          </React.Fragment>
        ))}
      </div>

      {hasNextPage && (
        <div className="flex-center mt-20">
          <Button
            variant="ghost"
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="border border-primary text-primary font-medium"
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </>
  );
};

export default InfiniteProducts;
