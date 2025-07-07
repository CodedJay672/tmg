import React from "react";
import ProductDetails from "./shared/ProductDetails";
import PaginationButtons from "./shared/PaginationButtons";

const ProductListing = ({
  products,
}: {
  products: ProductDataType[] | undefined;
}) => {
  return (
    <div className="w-full lg:p-2 space-y-4 mt-4 lg:mt-0">
      {products && products.length > 0 ? (
        products?.map((data) => <ProductDetails key={data?.$id} data={data} />)
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
