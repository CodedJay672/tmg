import React from "react";
import SearchBar from "@/components/SearchBar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <section className="dashboard-container">
      <div className="px-1 py-2 lg:py-3">
        <h2 className="text-base lg:text-lg font-semibold">
          Manage all products
        </h2>
        <span className="text-sm lg:text-base text-dark-200">
          You can manage all products here.
        </span>
      </div>

      <div className="w-full mt-3 mb-2 flex-between gap-3 lg:gap-6">
        <div className="flex-1">
          <SearchBar placeholder="Search available products..." />
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
              "{query}"
            </span>
          </p>
        )}
        <ProductGallery query={query} enabled />
      </div>
    </section>
  );
};

export default ProductsPage;
