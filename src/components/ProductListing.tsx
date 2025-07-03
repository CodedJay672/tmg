"use client";

import React, { useMemo } from "react";
import ProductDetails from "./shared/ProductDetails";
import { useStore } from "@/store/appStore";
import PaginationButtons from "./shared/PaginationButtons";

const ProductListing = ({
  query,
  products,
}: {
  query?: string;
  products: ProductDataType[];
}) => {
  const { category } = useStore();

  const productCatalog = useMemo(() => {
    const info = products.filter((product) => product?.category === category);

    return category === "all" ? products : info;
  }, [category, query]);

  return (
    <div className="w-full lg:p-2 space-y-4 mt-4 lg:mt-0">
      {productCatalog.length > 0 ? (
        productCatalog?.map((data) => (
          <ProductDetails key={data?.$id} data={data} />
        ))
      ) : (
        <p className="text-base text-gray-300 text-center">
          No products in this category.
        </p>
      )}

      <div className="w-full mt-16 flex place-content-center lg:place-content-end">
        <PaginationButtons isPlaceholderData={false} />
      </div>
    </div>
  );
};

export default ProductListing;
