import React, { Suspense } from "react";
import Segments from "@/components/shared/Segments";
import { Loader2Icon } from "lucide-react";
import ProductCard from "@/components/shared/ProductCard";
import { getAllProducts } from "@/lib/data/products/products.data";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";

const Category = async ({
  params,
  searchParams,
}: {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { title } = await params;
  const { page } = await searchParams;

  //get products and users
  const allProducts = await getAllProducts(+page, title);
  const currentUser = await getCurrentUser();

  return (
    <section className="content-wrapper">
      <div className="py-6 w-full">
        <Segments title={title} />
      </div>

      <Suspense
        fallback={
          <div className="flex-center gap-2">
            <Loader2Icon size={20} className="text-primary animate-spin" />
            <span className="text-base">Fetching products</span>
          </div>
        }
      >
        {allProducts?.status ? (
          <div className="w-full flex-1 grid grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-4 mt-6">
            {allProducts?.data?.map((product) => (
              <ProductCard
                key={product.$id}
                item={product}
                user={currentUser?.documents?.[0]}
              />
            ))}
          </div>
        ) : (
          <p className="text-base lg:text-lg text-gray-300 text-center w-full mt-10">
            No products in {title} category.
          </p>
        )}
      </Suspense>
    </section>
  );
};

export default Category;
