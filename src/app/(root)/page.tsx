import Carousel from "@/components/Carousel";
import CategoryTab from "@/components/CategoryTab";
import MobileProductsGallery from "@/components/MobileProductsGallery";
import ProductGallery from "@/components/ProductGallery";
import { slides } from "@/constants";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { Loader2Icon } from "lucide-react";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const { page } = await searchParams;
  const user = await getLoggedInUser();

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />
      <CategoryTab />

      <div className="w-full flex-1">
        <Suspense
          fallback={
            <div className="flex-center gap-2">
              <Loader2Icon size={20} className="text-primary animate-spin" />
              <span className="text-base">Fetching products</span>
            </div>
          }
        >
          <ProductGallery param={page} userId={user?.$id} />
        </Suspense>
      </div>

      <div className="w-full mt-6 lg:hidden">
        <MobileProductsGallery userId={user?.$id} />
      </div>
    </section>
  );
}
