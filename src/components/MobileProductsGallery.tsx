"use client";

import React from "react";

import { getUser } from "@/lib/actions/user.actions";
import { useStore } from "@/store/appStore";
import { useGetProductsInfinite } from "@/lib/queries/productQueries/products";
import { Models } from "node-appwrite";

type MobileProductsGalleryProps = {
  userId?: string;
};

const MobileProductsGallery: React.FC<MobileProductsGalleryProps> = ({
  userId,
}) => {
  const { category } = useStore();
  const { data, isLoading, isError, error } = useGetProductsInfinite(
    category === "all" ? "" : category
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  // Flatten the products from all pages
  const products =
    data?.pages?.flatMap((page) =>
      page && "data" in page && Array.isArray(page.data) ? page.data : []
    ) ?? [];

  return (
    <div>
      {products.length === 0 ? (
        <div className="w-full flex-center mt-10">
          <span className="text-base text-gray-300">No products found</span>
        </div>
      ) : (
        products.map((product) => <div key={product.$id}>{product.$id}</div>)
      )}
    </div>
  );
};

export default MobileProductsGallery;
