"use client";

import React from "react";
import ProductDetails from "./shared/ProductDetails";
import { useStore } from "@/store/appStore";
import { useGetProducts } from "@/lib/queries/productQueries/products";
import { Loader2Icon } from "lucide-react";

const ProductListing = ({ query }: { query?: string }) => {
  const { category } = useStore();
  const { data: products, isPending: loading } = useGetProducts(
    false,
    query ?? category !== "all" ? category : ""
  );

  return (
    <section className="w-full p-1 lg:p-2 space-y-4">
      {loading ? (
        <Loader2Icon size={24} className="text-primary animate-spin mx-auto" />
      ) : products?.data?.total ? (
        products?.data?.documents?.map((data) => (
          <ProductDetails key={data.$id} data={data} />
        ))
      ) : (
        <p className="text-base text-dark-200 text-center">
          No products to show.
        </p>
      )}
    </section>
  );
};

export default ProductListing;
