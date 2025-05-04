import { getAllProducts } from "@/lib/actions/products.actions";
import { Loader2Icon } from "lucide-react";
import React from "react";
import ProductDetails from "./shared/ProductDetails";

const ProductListing = async ({ query }: { query?: string }) => {
  const products = await getAllProducts(query);
  return (
    <section className="w-full p-1 lg:p-2 space-y-4 mt-10">
      {products?.data?.total ? (
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
