import Carousel from "@/components/Carousel";
import CategoryTab from "@/components/CategoryTab";
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

      {/** Top categories for desktop only */}

      {/**
       * All products for desktop and mobile
       * Desktop: This section should have pagination and should show the current page / total pages
       * Mobile: This section should fetch the products under the category that the user has clicked and display the product in this section.
       * Mobile: this section should have infinite scroll without pagination and current page indicators.
       */}
    </section>
  );
}
