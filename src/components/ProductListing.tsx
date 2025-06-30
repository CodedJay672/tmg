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
    <section className="w-full lg:p-2 space-y-4 mt-4 lg:mt-0">
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
        <div className="w-full mt-16 flex place-content-center lg:place-content-end">
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
