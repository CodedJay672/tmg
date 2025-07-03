import ProductGallery from "@/components/ProductGallery";
import SearchBar from "@/components/SearchBar";
import GoHome from "@/components/shared/GoHome";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import { Loader2Icon } from "lucide-react";
import React, { Suspense } from "react";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { page, query } = await searchParams;

  const user = await getCurrentUser();

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
        <Suspense
          fallback={
            <div className="flex-center gap-2">
              <Loader2Icon size={20} className="text-primary animate-spin" />
              <span className="text-base">Fetching products</span>
            </div>
          }
        >
          <ProductGallery
            userId={user?.documents?.[0].$id}
            query={query}
            param={page}
          />
        </Suspense>
      </div>
    </section>
  );
};

export default SearchPage;
