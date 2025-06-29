import Carousel from "@/components/Carousel";
import CategoryTab from "@/components/CategoryTab";
import ProductCard from "@/components/shared/ProductCard";
import { slides } from "@/constants";
import { getAllProducts } from "@/lib/actions/products.actions";
import { getUser } from "@/lib/actions/user.actions";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const allProducts = await getAllProducts(+page);
  const user = await getLoggedInUser();
  const currentUser = await getUser(user?.$id);

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />
      <CategoryTab />

      <div className="w-full flex-1 grid grid-cols-2 lg:grid-cols-5 gap-1 lg:gap-4">
        <Suspense
          fallback={
            <div className="flex-center gap-2">
              <Loader2Icon size={20} className="text-primary animate-spin" />
              <span className="text-base">Fetching products</span>
            </div>
          }
        >
          {allProducts?.data?.map((product) => (
            <ProductCard
              key={product.$id}
              item={product}
              user={currentUser.data?.documents?.[0]}
            />
          ))}
        </Suspense>
      </div>
    </section>
  );
}
