import ProductForm from "@/components/ProductForm";
import Image from "next/image";
import React from "react";

const CreateProducts = () => {
  return (
    <section className="dashboard-container flex flex-col">
      <h2 className="text-lg lg:text-xl font-medium">Add Products</h2>
      <p className="text-sm lg:text-base text-dark-300">
        Please enter the products details
      </p>

      <div className="flex-1 flex-center flex-col gap-4">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={140}
          height={32}
          className="rounded-full"
        />
        <ProductForm />
      </div>
    </section>
  );
};

export default CreateProducts;
