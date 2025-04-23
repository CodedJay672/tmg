import Carousel from "@/components/Carousel";
import { slides } from "@/constants";
import { getLoggedInUser } from "@/lib/server/appwrite";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getLoggedInUser();

  if (!user) redirect("/sign-in");

  return (
    <section className="content-wrapper">
      <Carousel slides={slides} />

      {/** TO DO */}

      {/**
       * Top categories for desktop and mobile
       * Trending category should be hidden for desktop
       * mobile categories should have only text without picture.
       * Desktop: When the user clicks on any category, he should be redirected to the category route with the result of the search using that category query.
       * Mobile: the categories should be in form of tabs and should fetch the products under that category without redirecting
       */}

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
