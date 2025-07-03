import React from "react";
import ProductCard from "./shared/ProductCard";
import PaginationButtons from "./shared/PaginationButtons";
import { getAllProducts } from "@/lib/data/products/products.data";
import { getUser } from "@/lib/data/user/getLoggedInUser";

const ProductGallery = async ({
  userId,
  query,
  param,
}: {
  userId: string | undefined;
  query?: string;
  param?: string;
}) => {
  const user = getUser(userId);
  const products = getAllProducts(+(param ?? "0"), query);

  //get user and all products in parallel
  const [currentUser, allProducts] = await Promise.all([user, products]);

  if (query && !allProducts?.data?.length) {
    return (
      <p className="text-base text-center w-max flex-center gap-2 mx-auto mt-10">
        No products found.
      </p>
    );
  }

  return (
    <>
      {query && allProducts?.data?.length ? (
        <>
          <h2 className="text-lg lg:text-xl font-medium text-left w-full mt-4 lg:mt-10 capitalize">
            {query ? `${query}` : "All Products"}{" "}
            <span className="text-primary text-xl font-bold">
              ({allProducts?.data?.length})
            </span>
          </h2>
          <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mt-6">
            {allProducts?.data?.length &&
              allProducts.data.map((item) => (
                <ProductCard
                  key={item.$id}
                  user={currentUser?.data?.documents?.[0]}
                  item={item}
                />
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
