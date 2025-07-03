import React, { Suspense } from "react";
import { Loader2Icon, PlusIcon } from "lucide-react";
import Link from "next/link";
import ProductListing from "@/components/ProductListing";
import CustomTab from "@/components/shared/CustomTab";
import { formatDate } from "@/lib/utils";
import { getAllProducts } from "@/lib/data/products/products.data";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string; page: string }>;
}) => {
  const { query, page } = await searchParams;
  const today = formatDate(new Date().toISOString());

  const allProducts = await getAllProducts(+page, query);

  return (
    <section className="dashboard-container">
      <div className="flex-between flex-col lg:flex-row">
        <h2 className="admin-title text-center">Products management</h2>
        <span className="text-sm text-dark-300 font-medium">
          Date: {today as string}
        </span>
      </div>

      <div className="w-full mt-6 mb-2 flex-between gap-3 lg:gap-6 ">
        <div className="flex-1 flex items-center space-x-1 md:space-x-3">
          <CustomTab name="admin" title="all" />
          <CustomTab name="admin" title="mechanical" />
          <CustomTab name="admin" title="steel" />
          <CustomTab name="admin" title="electrical" />
        </div>
        <div className="w-max">
          <Link
            href="create-products"
            className="bg-primary px-3 py-2 rounded-lg flex-center gap-2"
          >
            <PlusIcon size={24} color="white" />
            <span className="hidden lg:block text-base text-white font-medium">
              Add product
            </span>
          </Link>
        </div>
      </div>

      <div className="w-full flex-center flex-col">
        {query && (
          <p className="text-base lg:text-lg text-dark-200 text-left w-full truncate line-clamp-1">
            Search results for:{" "}
            <span className="text-primary font-medium text-lg lg:text-xl">
              &ldquo;{query}&rdquo;
            </span>
          </p>
        )}

        {allProducts.data ? (
          <Suspense
            fallback={
              <div className="w-full mt-10">
                <Loader2Icon size={24} className="text-primary animate-spin" />
              </div>
            }
          >
            <ProductListing query={query} products={allProducts?.data} />
          </Suspense>
        ) : (
          <p className="w-full text-center text-gray-300">
            No products listed.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
