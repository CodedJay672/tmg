"use client";

import { useGetProductsInfinite } from "@/lib/queries/productQueries/products";
import { useStore } from "@/store/appStore";
import React from "react";
import ProductCard from "./shared/ProductCard";
import { Loader2Icon } from "lucide-react";
import { Button } from "./ui/button";

const MobileProductsGallery = ({ userId }: { userId: string | undefined }) => {
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
            {group?.data?.documents.map((project) => (
              <ProductCard key={project.$id} item={project} userId={userId} />
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
            className="border"
          >
            Load more
          </Button>
        </div>
      )}
    </>
  );
};

export default MobileProductsGallery;
