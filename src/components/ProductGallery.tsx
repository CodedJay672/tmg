import React from "react";
import ProductCard from "./shared/ProductCard";
import PaginationButtons from "./shared/PaginationButtons";
import { Models } from "node-appwrite";

const ProductGallery = async ({
  user,
  query,
  allProducts,
}: {
  allProducts: Models.Document[] | undefined;
  user: Models.Document | undefined;
  query?: string;
}) => {
  if (query && !allProducts?.length) {
    return (
      <p className="text-base text-center w-max flex-center gap-2 mx-auto mt-10">
        No products found.
      </p>
    );
  }

  return (
    <>
      {query && allProducts?.length ? (
        <>
          <h2 className="text-lg lg:text-xl font-medium text-left w-full mt-4 lg:mt-10 capitalize">
            {query ? `${query}` : "All Products"}{" "}
            <span className="text-primary text-xl font-bold">
              ({allProducts?.length})
            </span>
          </h2>
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-6">
            {allProducts?.length &&
              allProducts.map((item) => (
                <ProductCard key={item?.$id} user={user} item={item} />
              ))}
          </div>
          <div className="w-full flex justify-center lg:justify-end mt-16">
            <PaginationButtons isPlaceholderData={false} />
          </div>
        </>
      ) : (
        <p className="text-xl lg:text-2xl text-center font-medium text-gray-300 w-max flex-center gap-2 mx-auto mt-10">
          Search from over 500+ products
        </p>
      )}
    </>
  );
};

export default ProductGallery;
