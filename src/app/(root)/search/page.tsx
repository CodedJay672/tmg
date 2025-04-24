import SearchBar from "@/components/SearchBar";
import GoHome from "@/components/shared/GoHome";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;
  const products: any[] = [];

  return (
    <section className="content-wrapper flex-center flex-col">
      <div className="hidden lg:flex place-self-end p-3">
        <GoHome text="Go Home" />
      </div>

      <div className="w-full lg:hidden py-4">
        <SearchBar placeholder="Search products..." />
      </div>

      <div className="w-full flex-1 flex-center">
        {query && (
          <p className="text-base">
            Showing results for:{" "}
            <span className="text-primary font-medium">{query}</span>
          </p>
        )}

        {!query && !products.length && (
          <p className="text-dark-200">Enter your search term...</p>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
