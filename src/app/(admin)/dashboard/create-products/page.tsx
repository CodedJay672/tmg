import ProductForm from "@/components/ProductForm";
import Image from "next/image";
import React from "react";

const CreateProducts = () => {
  return (
    <section className="dashboard-container flex flex-col">
      <div className="flex-1 pt-24">
        <Image
          src="/assets/logo.png"
          alt="tmg procurement"
          width={140}
          height={32}
          className="rounded-full mx-auto"
        />
        <h2 className="text-lg lg:text-xl text-center font-medium">
          Add Products
        </h2>
        <p className="text-sm lg:text-base text-center text-dark-300">
          Please enter the products details
        </p>
        <ProductForm />
      </div>
    </section>
  );
};

export default CreateProducts;
