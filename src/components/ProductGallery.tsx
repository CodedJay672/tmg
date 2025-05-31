"use client";

import React from "react";
import { useGetProducts } from "@/lib/queries/productQueries/products";
import { Loader2Icon } from "lucide-react";
import ProductCard from "./shared/ProductCard";
import PaginationButtons from "./shared/PaginationButtons";
import { useGetUserById } from "@/lib/queries/userQueried/users";

const ProductGallery = ({
  userId,
  query,
  enabled,
  param,
}: {
  userId: string | undefined;
  enabled: boolean;
  query?: string;
  param?: string;
}) => {
  const {
    data: allProducts,
    isLoading,
    isPlaceholderData,
  } = useGetProducts(enabled, query, +(param ?? 0));
  const { data: user } = useGetUserById(userId);

  return (
    <>
      {isLoading && !allProducts && (
        <div className="flex-center mt-24 gap-1">
          <Loader2Icon size={24} className="animate-spin" />
          <p className="text-sm lg:text-base text-dark-300">
            Fetching products
          </p>
        </div>
      )}

      {!isLoading && !allProducts?.data?.total && (
        <div className="flex-center mt-24 gap-1">
          <p className="text-lg lg:text-xl text-dark-200">
            {query
              ? "No products found."
              : "Search from over 5000+ products..."}
          </p>
        </div>
      )}

      {!isLoading && allProducts?.data?.total && (
        <>
          <h2 className="text-lg lg:text-xl font-medium text-left w-full mt-4 lg:mt-10 capitalize">
            {query ? `${query}` : "All products"}{" "}
            <span className="text-primary text-xl font-bold">
              ({allProducts.data?.total})
            </span>
          </h2>
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-6">
            {allProducts?.data?.total &&
              allProducts.data.documents.map((item) => {
                return (
                  <ProductCard
                    key={item.$id}
                    user={user?.data?.documents?.[0]}
                    item={item}
                  />
                );
              })}
          </div>
          <div className="w-full flex justify-center lg:justify-end mt-16">
            <PaginationButtons
              data={allProducts}
              isPlaceholderData={isPlaceholderData}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ProductGallery;
