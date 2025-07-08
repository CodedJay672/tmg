import Carousel from "@/components/Carousel";
import CategoryLink from "@/components/shared/CategoryLink";
import CustomTab from "@/components/shared/CustomTab";
import PaginationButtons from "@/components/shared/PaginationButtons";
import ProductCard from "@/components/shared/ProductCard";
import { slides } from "@/constants";
import { getAllProducts } from "@/lib/data/products/products.data";
import { getCurrentUser } from "@/lib/data/user/getLoggedInUser";
import { Loader2Icon } from "lucide-react";
import { userInfo } from "os";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string; query: string }>;
}) {
  const { page, query } = await searchParams;

  //reconstruct the query to get the category
  const category = query ? (query === "all" ? "" : query) : "";

  //fetch user and products in parallel
  const user = getCurrentUser();
  const products = getAllProducts(+page, category);

  // use Promise.all to get all information
  const [currentUser, allProducts] = await Promise.allSettled([user, products]);

  //extract info from promise
  const userData =
    currentUser?.status === "fulfilled" ? currentUser?.value : null;
  const productsInfo =
    allProducts?.status === "fulfilled" ? allProducts?.value : null;

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />

      <div className="w-full max-w-5xl lg:mx-auto  mt-6 mb-2 lg:my-6 lg:p-10 lg:bg-dark-100/50 rounded-xl">
        <h2 className="hidden lg:block text-2xl leading-5.5 text-center font-semibold mb-6">
          Top Categories
        </h2>

        {/* desktop categories */}
        <div className="hidden w-full lg:flex items-center justify-center gap-1 lg:gap-10 lg:my-1 overflow-x-scroll no-scrollbar">
          <CategoryLink img="/assets/rods.jpg" title="mechanical" />
          <CategoryLink img="/assets/grinder.jpg" title="steel" />
          <CategoryLink img="/assets/tools.jpg" title="electrical" />
        </div>

        {/* Mobile tabs for category */}
        <div className="flex-1 flex items-center space-x-1 lg:hidden">
          <CustomTab name="all" />
          <CustomTab name="mechanical" />
          <CustomTab name="steel" />
          <CustomTab name="electrical" />
        </div>
      </div>

      <Suspense
        fallback={
          <div className="flex-center gap-2">
            <Loader2Icon size={20} className="text-primary animate-spin" />
            <span className="text-base">Fetching products</span>
          </div>
        }
      >
        {productsInfo?.data && productsInfo.data.length > 0 ? (
          <div className="mt-10">
            <p className="text-lg lg:text-2xl font-semibold capitalize">
              {category ? category : "all products"}{" "}
              <span className="text-primary">
                ({productsInfo?.data?.length})
              </span>
            </p>
            <div className="w-full flex-1 grid grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-4 mt-6 mb-10">
              {productsInfo?.data?.map((product) => (
                <ProductCard
                  key={product.$id}
                  item={product}
                  user={userData?.documents?.[0]}
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
    </section>
  );
}
