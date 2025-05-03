import Carousel from "@/components/Carousel";
import CategoryTab from "@/components/CategoryTab";
import MobileProductsGallery from "@/components/MobileProductsGallery";
import ProductGallery from "@/components/ProductGallery";
import { slides } from "@/constants";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />
      <CategoryTab />

      <div className="hidden lg:block w-full flex-1">
        <ProductGallery userId={user?.$id} query="" enabled={true} />
      </div>

      <div className="lg:hidden">
        <MobileProductsGallery userId={user?.$id} />
      </div>
    </section>
  );
}
