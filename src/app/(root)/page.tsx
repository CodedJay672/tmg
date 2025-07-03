import Carousel from "@/components/Carousel";
import CategoryTab from "@/components/CategoryTab";
import PaginationButtons from "@/components/shared/PaginationButtons";
import ProductCard from "@/components/shared/ProductCard";
import { slides } from "@/constants";
import { getAllProducts } from "@/lib/data/products/products.data";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;

  const currentUser = await getCurrentUser();
  const allProducts = await getAllProducts(+page);

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />
      <CategoryTab />

      <div className="hidden lg:block">
        <Suspense
          fallback={
            <div className="flex-center gap-2">
              <Loader2Icon size={20} className="text-primary animate-spin" />
              <span className="text-base">Fetching products</span>
            </div>
          }
        >
          {allProducts?.status ? (
            <div className="mt-10">
              <p className="text-lg lg:text-2xl font-semibold">
                All Products{" "}
                <span className="text-primary">
                  ({allProducts?.data?.length})
                </span>
              </p>
              <div className="w-full flex-1 grid grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-4 mt-6 mb-10">
                {allProducts?.data?.map((product) => (
                  <ProductCard
                    key={product.$id}
                    item={product}
                    user={currentUser?.documents?.[0]}
                  />
                ))}
              </div>
              <div className="flex place-self-end">
                <PaginationButtons isPlaceholderData={false} />
              </div>
            </div>
          ) : (
            <p className="text-base lg:text-lg text-gray-300 text-center w-full mt-10">
              No products to view
            </p>
          )}
        </Suspense>
      </div>

      {/* <div className="lg:hidden grid grid-cols-2 gap-1 mt-5">
        <MobileProductsGallery />
      </div> */}
    </section>
  );
}
