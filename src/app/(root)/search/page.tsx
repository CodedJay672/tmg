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
    <section className="content-wrapper">
      <div className="hidden lg:flex place-self-end p-3">
        <GoHome text="Go Home" />
      </div>

      <div className="w-full lg:hidden py-4">
        <SearchBar placeholder="Search products..." />
      </div>

      {query && (
        <p className="text-base">
          Showing results for{" "}
          <span className="text-primay font-medium">{query}</span>
        </p>
      )}
    </section>
  );
};

export default SearchPage;
