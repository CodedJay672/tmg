"use client";

import React from "react";
import ProductDetails from "./shared/ProductDetails";
import { useStore } from "@/store/appStore";
import { useGetProducts } from "@/lib/queries/productQueries/products";
import { Loader2Icon } from "lucide-react";
import PaginationButtons from "./shared/PaginationButtons";

const ProductListing = ({
  query,
  param,
}: {
  query?: string;
  param?: string;
}) => {
  const { category } = useStore();
  const {
    data: products,
    isPending: loading,
    isPlaceholderData,
  } = useGetProducts(false, query ?? category !== "all" ? category : "", param);

  return (
    <section className="w-full p-1 lg:p-2 space-y-4">
      {loading ? (
        <Loader2Icon size={24} className="text-primary animate-spin mx-auto" />
      ) : products?.data?.length ? (
        products?.data?.map((data) => (
          <ProductDetails key={data.$id} data={data} />
        ))
      ) : (
        <p className="text-base text-dark-200 text-center">
          No products to show.
        </p>
      )}

      {products?.data?.length && (
        <div className="w-full mt-16 flex justify-center lg:justify-end pr-10">
          <PaginationButtons
            data={products}
            isPlaceholderData={isPlaceholderData}
          />
        </div>
      )}
    </section>
  );
};

export default ProductListing;
