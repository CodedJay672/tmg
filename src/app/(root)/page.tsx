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

      <div className="flex-center w-full my-8">
        <p>Categories go here</p>
      </div>
    </section>
  );
}
