"use client";

import { Models } from "node-appwrite";
import React, { useEffect, useState } from "react";
import ProductCard from "./shared/ProductCard";
import { getProductById } from "@/lib/actions/products.actions";

const WatchlistContent = ({
  user,
  item,
}: {
  user: Models.Document | undefined;
  item: Models.DocumentList<Models.Document> | undefined;
}) => {
  const [watchlistProducts, setWatchlistProducts] = useState<Models.Document[]>(
    []
  );

  useEffect(() => {
    const getWatchlistProducts = async () => {
      // return if no items to show
      if (!item?.total) return;

      // get the products for all the product ids returned;
      for (const items of item?.documents) {
        const product = await getProductById(items.productId);

        setWatchlistProducts([
          product?.data?.documents?.[0] as Models.Document,
        ]);
      }
    };

    // call the function to populate the product state array
    getWatchlistProducts();
  }, [item?.total]);

  return (
    <>
      {watchlistProducts.length > 0 ? (
        watchlistProducts.map((product) => (
          <ProductCard key={product.$id} item={product} user={user} />
        ))
      ) : (
        <p className="w-full text-base text-center text-dark-200 mt-6 col-span-2">
          No products added.
        </p>
      )}
    </>
  );
};

export default WatchlistContent;
