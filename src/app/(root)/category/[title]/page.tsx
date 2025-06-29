import React from "react";
import Segments from "@/components/shared/Segments";
import ProductGallery from "@/components/ProductGallery";
import { getLoggedInUser } from "@/lib/server/appwrite";

const Category = async ({
  params,
  searchParams,
}: {
  params: Promise<{ title: string }>;
  searchParams: Promise<{ page: string }>;
}) => {
  const { title } = await params;
  const { page } = await searchParams;
  const user = await getLoggedInUser();

  return (
    <section className="content-wrapper flex-center flex-col">
      <div className="py-6 w-full">
        <Segments title={title} />
      </div>

      <div className="w-full flex-1">
        <ProductGallery param={page} query={title} userId={user?.$id} />
      </div>
    </section>
  );
};

export default Category;
