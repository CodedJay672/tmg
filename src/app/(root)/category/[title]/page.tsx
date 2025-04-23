import React from "react";
import Segments from "@/components/shared/Segments";

const Category = async ({ params }: { params: Promise<{ title: string }> }) => {
  const { title } = await params;

  return (
    <section className="content-wrapper flex-center flex-col">
      <div className="py-6 w-full">
        <Segments title={title} />
      </div>

      <div className="w-full flex-1 flex-center">
        <p className="text-sm text-dark-200">No products in this category.</p>
      </div>
    </section>
  );
};

export default Category;
