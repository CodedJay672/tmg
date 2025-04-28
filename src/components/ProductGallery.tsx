"use client";

import React from "react";
import { useGetProducts } from "@/lib/queries/productQueries/products";
import { Loader2Icon } from "lucide-react";
import ProductCard from "./shared/ProductCard";

const ProductGallery = ({
  query,
  enabled,
}: {
  query: string;
  enabled: boolean;
}) => {
  const { data: allProducts, isPending: loading } = useGetProducts(
    enabled,
    query
  );

  return (
    <>
      {loading && !allProducts && (
        <div className="flex-center mt-24 gap-1">
          <Loader2Icon size={24} className="animate-spin" />
          <p className="text-sm lg:text-base text-dark-300">
            Fetching products
          </p>
        </div>
      )}

      {!loading && !allProducts?.status && (
        <div className="flex-center mt-24 gap-1">
          <p className="text-sm lg:text-base text-dark-200">
            No products to view!
          </p>
        </div>
      )}

      {!loading && allProducts?.status && (
        <>
          <h2 className="text-lg lg:text-xl font-medium text-left w-full mt-4 lg:mt-10 capitalize">
            {query ? `${query}` : "All products"}{" "}
            <span className="text-primary text-xl font-bold">
              ({allProducts.data?.total})
            </span>
          </h2>
          <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6">
            {allProducts?.data?.total &&
              allProducts.data.documents.map((item) => (
                <ProductCard
                  key={item.$id}
                  imgUrl={item.imgUrl}
                  name={item.name}
                  price={item.price}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductGallery;
