import React from "react";
import SearchBar from "@/components/SearchBar";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

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

      <div className="w-full my-6 flex-between gap-3 lg:gap-6">
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

      <div className="w-full mt-6 flex-center">
        {query ? (
          <p className="text-dark-200 text-left w-full">
            Search results for:
            <span className="text-primary font-medium text-lg">{query}</span>
          </p>
        ) : (
          <p className="text-dark-200">No products yet.</p>
        )}
      </div>
    </section>
  );
};

export default ProductsPage;
