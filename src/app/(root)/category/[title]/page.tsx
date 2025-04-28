import React from "react";
import Segments from "@/components/shared/Segments";
import ProductGallery from "@/components/ProductGallery";

const Category = async ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = await params;

  return (
    <section className="content-wrapper flex-center flex-col">
      <div className="py-6 w-full">
        <Segments title={title} />
      </div>

      <div className="w-full flex-1">
        <ProductGallery query={title} />
      </div>
    </section>
  );
};

export default Category;
