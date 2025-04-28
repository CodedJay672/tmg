import ProductGallery from "@/components/ProductGallery";
import SearchBar from "@/components/SearchBar";
import GoHome from "@/components/shared/GoHome";
import React from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) => {
  const { query } = await searchParams;

  return (
    <section className="content-wrapper flex-center flex-col">
      <div className="hidden lg:flex place-self-end p-3">
        <GoHome text="Go Home" />
      </div>

      <div className="w-full lg:hidden py-4">
        <SearchBar placeholder="Search products..." />
      </div>

      {query && (
        <p className="text-lg lg;text-xl w-full text-left">
          Showing results for:{" "}
          <span className="text-primary font-medium text-xl lg:text-2xl">
            {query}
          </span>
        </p>
      )}

      <div className="w-full flex-1">
        <ProductGallery query={query} enabled={false} />
      </div>
    </section>
  );
};

export default SearchPage;
